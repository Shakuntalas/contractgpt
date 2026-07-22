from langchain_google_genai import ChatGoogleGenerativeAI
from app.config import GOOGLE_API_KEY

def get_llm(temperature: float = 0.2):
    """
    Returns a Gemini chat model instance.
    Low temperature (0.2) keeps answers precise and factual — important for legal content.
    """
    return ChatGoogleGenerativeAI(
        model="models/gemini-flash-latest",
        google_api_key=GOOGLE_API_KEY,
        temperature=temperature,
    )