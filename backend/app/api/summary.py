from fastapi import APIRouter, HTTPException

from app.services.rag_chain import summarize_document

router = APIRouter()


@router.get("/summary/{document_id}")
async def get_document_summary(document_id: str):
    try:
        result = summarize_document(document_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate summary: {str(e)}")

    return {
        "document_id": document_id,
        "summary": result["summary"],
        "key_terms": result["key_terms"],
        "risky_clauses": result["risky_clauses"],
    }