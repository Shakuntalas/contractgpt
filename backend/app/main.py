import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.api import upload, chat, summary, compare, explain

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("contractgpt")

app = FastAPI(
    title="ContractGPT",
    description="AI-powered legal contract assistant",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info("%s %s -> %s (%.1fms)", request.method, request.url.path, response.status_code, duration_ms)
    return response


app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(summary.router, prefix="/api", tags=["Summary"])
app.include_router(compare.router, prefix="/api", tags=["Compare"])
app.include_router(explain.router, prefix="/api", tags=["Explain"])


@app.get("/")
def read_root():
    return {"message": "ContractGPT is running", "version": "2.0.0"}


@app.get("/ping")
def ping():
    return {"status": "ok"}
