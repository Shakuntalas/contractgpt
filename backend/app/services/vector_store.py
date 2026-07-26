from typing import List

from google import genai
from google.genai import types
from langchain_chroma import Chroma
from langchain_core.embeddings import Embeddings

from app.config import GOOGLE_API_KEY


PERSIST_DIR = "vectorstore"
EMBEDDING_MODEL = "gemini-embedding-2"
EMBEDDING_DIMENSION = 768


class GeminiEmbeddings(Embeddings):
    """
    LangChain-compatible Gemini embeddings.

    Each document is embedded separately so the number of
    embeddings always matches the number of documents sent
    to Chroma.
    """

    def __init__(self):
        if not GOOGLE_API_KEY:
            raise ValueError(
                "GOOGLE_API_KEY is not configured."
            )

        self.client = genai.Client(
            api_key=GOOGLE_API_KEY
        )

    def _embed_one(self, text: str) -> List[float]:
        """
        Generate one embedding for one piece of text.
        """

        if not text or not text.strip():
            raise ValueError(
                "Cannot generate embedding for empty text."
            )

        response = self.client.models.embed_content(
            model=EMBEDDING_MODEL,
            contents=text,
            config=types.EmbedContentConfig(
                output_dimensionality=EMBEDDING_DIMENSION
            ),
        )

        if not response.embeddings:
            raise RuntimeError(
                "Gemini returned no embedding."
            )

        values = response.embeddings[0].values

        if not values:
            raise RuntimeError(
                "Gemini returned an empty embedding vector."
            )

        return list(values)

    def embed_documents(
        self,
        texts: List[str]
    ) -> List[List[float]]:
        """
        Embed every document separately.

        Chroma requires exactly one embedding vector
        for every text passed to add_documents().
        """

        embeddings = []

        for index, text in enumerate(texts):
            try:
                vector = self._embed_one(text)
                embeddings.append(vector)

            except Exception as exc:
                raise RuntimeError(
                    f"Failed to embed document chunk "
                    f"{index + 1}/{len(texts)}: {exc}"
                ) from exc

        if len(embeddings) != len(texts):
            raise RuntimeError(
                "Embedding count mismatch. "
                f"Received {len(embeddings)} embeddings "
                f"for {len(texts)} texts."
            )

        return embeddings

    def embed_query(
        self,
        text: str
    ) -> List[float]:
        """
        Generate an embedding for a search question.
        """

        return self._embed_one(text)


_embeddings = None


def get_embeddings():
    """
    Create the Gemini embedding client only when first needed.
    """

    global _embeddings

    if _embeddings is None:
        _embeddings = GeminiEmbeddings()

    return _embeddings


def get_vector_store(collection_name: str):
    """
    Open or create the Chroma collection for a document.
    """

    return Chroma(
        collection_name=collection_name,
        embedding_function=get_embeddings(),
        persist_directory=PERSIST_DIR,
    )


def store_chunks(document_id: str, chunks):
    """
    Embed PDF chunks and store them in Chroma.
    """

    if not chunks:
        raise ValueError(
            "No document chunks were provided."
        )

    # Remove any accidentally empty chunks before embedding.
    valid_chunks = [
        chunk
        for chunk in chunks
        if chunk.page_content
        and chunk.page_content.strip()
    ]

    if not valid_chunks:
        raise ValueError(
            "All document chunks are empty."
        )

    print(
        f"Embedding {len(valid_chunks)} valid chunks "
        f"for document {document_id}"
    )

    vector_store = get_vector_store(
        collection_name=document_id
    )

    vector_store.add_documents(valid_chunks)

    print(
        f"Stored {len(valid_chunks)} chunks successfully."
    )

    return vector_store