from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.rag_chain import compare_documents

router = APIRouter()


class CompareRequest(BaseModel):
    doc1_id: str
    doc2_id: str


@router.post("/compare")
async def compare_contracts_endpoint(request: CompareRequest):
    if not request.doc1_id or not request.doc2_id:
        raise HTTPException(status_code=400, detail="Both doc1_id and doc2_id are required.")

    try:
        result = compare_documents(request.doc1_id, request.doc2_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")
