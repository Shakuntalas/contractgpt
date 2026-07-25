from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma

PERSIST_DIR = "vectorstore"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def get_vector_store(collection_name: str):
    """
    Returns a Chroma vector store scoped to a specific document.
    """
    return Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR,
    )


def store_chunks(document_id: str, chunks):
    """
    Embeds and stores document chunks locally.
    No Gemini embedding API is used here.
    """
    vector_store = get_vector_store(collection_name=document_id)
    vector_store.add_documents(chunks)
    return vector_store