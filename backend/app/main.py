from fastapi import FastAPI
from app.api import upload, chat, summary

app = FastAPI(title="ContractGPT")

app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])


@app.get("/")
def read_root():
    return {"message": "ContractGPT is running"}


@app.get("/ping")
def ping():
    return {"status": "ok"}
