from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

from app.config import GOOGLE_API_KEY

PERSIST_DIR = "vectorstore"

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=GOOGLE_API_KEY,
)


def get_vector_store(collection_name: str):
    """
    Returns a Chroma vector store scoped to a specific document (by collection_name).
    We use document_id as the collection name so each document's chunks stay isolated.
    """
    return Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR,
    )


def store_chunks(document_id: str, chunks):
    """
    Embeds and stores a document's chunks in its own Chroma collection.
    """
    vector_store = get_vector_store(collection_name=document_id)
    vector_store.add_documents(chunks)
    return vector_store