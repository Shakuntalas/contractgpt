from fastapi import APIRouter, HTTPException

from app.services.rag_chain import summarize_document

router = APIRouter()


@router.get("/summary/{document_id}")
async def get_document_summary(document_id: str):
    if not document_id.strip():
        raise HTTPException(status_code=400, detail="document_id is required.")

    try:
        result = summarize_document(document_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate summary: {str(e)}")

    return {
        "document_id": document_id,
        "summary": result.get("summary", ""),
        "key_terms": result.get("key_terms", []),
        "risky_clauses": result.get("risky_clauses", []),
        "payment_terms": result.get("payment_terms", []),
        "obligations": result.get("obligations", []),
        "responsibilities": result.get("responsibilities", []),
        "liability": result.get("liability", []),
        "termination": result.get("termination", []),
        "renewal": result.get("renewal", []),
        "timeline": result.get("timeline", []),
        "risk_score": result.get("risk_score", 0),
    }
