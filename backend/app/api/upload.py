import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_loader import load_and_split_pdf
from app.services.vector_store import store_chunks

router = APIRouter()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    document_id = str(uuid.uuid4())
    saved_filename = f"{document_id}.pdf"
    file_path = os.path.join(UPLOAD_DIR, saved_filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    finally:
        file.file.close()

    try:
        chunks = load_and_split_pdf(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")

    # NEW: embed and store chunks in the vector store
    try:
        store_chunks(document_id, chunks)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to embed/store document: {str(e)}")

    return {
        "document_id": document_id,
        "original_filename": file.filename,
        "total_chunks": len(chunks),
        "total_pages": chunks[0].metadata.get("total_pages") if chunks else None,
        "message": "File uploaded, processed, and embedded successfully.",
    }