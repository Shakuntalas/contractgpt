from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

from app.services.rag_chain import answer_question

router = APIRouter()


class ChatRequest(BaseModel):
    document_id: str
    question: str

    @field_validator("question")
    @classmethod
    def question_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError("Question cannot be empty.")
        return v


@router.post("/chat")
async def chat_with_document(request: ChatRequest):
    try:
        result = answer_question(request.document_id, request.question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to answer question: {str(e)}")

    return {
        "document_id": request.document_id,
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"],
    }