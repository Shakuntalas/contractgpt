from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

from app.services.rag_chain import explain_clause_text

router = APIRouter()


class ExplainRequest(BaseModel):
    clause: str

    @field_validator("clause")
    @classmethod
    def clause_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Clause text cannot be empty.")
        return v


@router.post("/explain-clause")
async def explain_clause_endpoint(request: ExplainRequest):
    try:
        result = explain_clause_text(request.clause)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Explanation failed: {str(e)}")
