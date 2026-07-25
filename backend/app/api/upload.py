import logging
import os
import uuid
import traceback

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_loader import load_and_split_pdf
from app.services.vector_store import store_chunks

logger = logging.getLogger(__name__)

router = APIRouter()

UPLOAD_DIR = "data/uploads"
MAX_FILE_SIZE_MB = 20

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    # Check file type
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    # Read uploaded file
    content = await file.read()

    size_mb = len(content) / (1024 * 1024)

    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE_MB} MB.",
        )

    # Generate unique document ID
    document_id = str(uuid.uuid4())

    file_path = os.path.join(
        UPLOAD_DIR,
        f"{document_id}.pdf"
    )

    # Save PDF
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(content)

    except Exception as e:
        logger.exception("Failed to save file")

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )

    finally:
        await file.close()

    # Extract and split PDF text
    try:
        chunks = load_and_split_pdf(file_path)

        print("\n========== PDF PROCESSING ==========")
        print("Document ID:", document_id)
        print("Number of chunks:", len(chunks))

        if chunks:
            print("First chunk:")
            print(chunks[0].page_content[:500])

        print("====================================\n")

    except Exception as e:

        traceback.print_exc()
        logger.exception("Failed to process PDF")

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to process PDF: {str(e)}"
        )

    # Check extracted content
    if not chunks:
        raise HTTPException(
            status_code=400,
            detail="PDF appears to be empty or unreadable."
        )

    # Create embeddings and store in Chroma
    try:

        print("\n========== EMBEDDING START ==========")
        print("Attempting to embed", len(chunks), "chunks")

        store_chunks(document_id, chunks)

        print("Embedding completed successfully")
        print("=====================================\n")

    except Exception as e:

        print("\n========== EMBEDDING ERROR ==========")
        traceback.print_exc()
        print("=====================================\n")

        logger.exception("Failed to embed/store document")

        if os.path.exists(file_path):
            os.remove(file_path)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to embed/store document: {str(e)}"
        )

    logger.info(
        "Uploaded document %s (%s chunks)",
        document_id,
        len(chunks)
    )

    # Successful response
    return {
        "document_id": document_id,
        "original_filename": file.filename,
        "total_chunks": len(chunks),
        "total_pages": (
            chunks[0].metadata.get("total_pages")
            if chunks
            else None
        ),
        "message": "File uploaded, processed, and embedded successfully.",
    }