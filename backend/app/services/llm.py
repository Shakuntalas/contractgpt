import os
from langchain_google_genai import ChatGoogleGenerativeAI
from app.config import GOOGLE_API_KEY


def get_llm(temperature: float = 0.2):
    """
    Returns a Gemini chat model instance.
    Low temperature (0.2) keeps answers precise and factual.
    """
    model_name = os.getenv("GEMINI_MODEL", "models/gemini-3.6-flash")
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=GOOGLE_API_KEY,
        temperature=temperature,
    )