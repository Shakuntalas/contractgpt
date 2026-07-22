import json
import re

from app.services.vector_store import get_vector_store

# Flag to control mock vs real mode — flip this once Gemini access is confirmed working
USE_MOCK_LLM = False


def get_relevant_chunks(document_id: str, question: str, k: int = 4):
    """
    Retrieves the top-k most relevant chunks for a question from a specific document's
    vector store collection. Returns an empty list (instead of raising) if embedding
    fails — e.g. while Gemini API access is not yet available.
    """
    try:
        vector_store = get_vector_store(collection_name=document_id)
        results = vector_store.similarity_search(question, k=k)
        return results
    except Exception as e:
        print(f"[WARNING] Retrieval failed (likely Gemini API access issue): {e}")
        return []


def answer_question(document_id: str, question: str):
    """
    Runs the full RAG pipeline: retrieve relevant chunks, then generate an answer.
    Currently mocked until Gemini access is confirmed.
    """
    chunks = get_relevant_chunks(document_id, question)

    if not chunks:
        return {
            "answer": (
                "No content could be found for this document. Please check that the "
                "document_id is correct and that the document was uploaded successfully."
            ),
            "sources": [],
        }

    if USE_MOCK_LLM:
        preview = chunks[0].page_content[:200]
        answer = (
            f"[MOCK ANSWER] Based on the document, here's the most relevant excerpt "
            f"I found: \"{preview}...\" (Real Gemini-generated answers will replace this "
            f"once AI access is connected.)"
        )
    else:
        from app.services.llm import get_llm
        llm = get_llm()

        context_text = "\n\n".join([c.page_content for c in chunks])
        prompt = f"""You are a legal assistant. Answer the question based only on the context below.
If the answer isn't in the context, say you don't know.

Context:
{context_text}

Question: {question}

Answer:"""

        response = llm.invoke(prompt)
        answer = response.content

    sources = [
        {"page": c.metadata.get("page_label"), "excerpt": c.page_content[:150]}
        for c in chunks
    ]

    return {"answer": answer, "sources": sources}


def summarize_document(document_id: str):
    """
    Retrieves all chunks for a document and generates a structured summary:
    overview, key terms, and risky clauses.
    """
    try:
        vector_store = get_vector_store(collection_name=document_id)
        all_data = vector_store.get()
        documents = all_data.get("documents", [])
    except Exception as e:
        print(f"[WARNING] Could not retrieve document for summary: {e}")
        documents = []

    if not documents:
        return {
            "summary": (
                "No content could be found for this document. Please check that the "
                "document_id is correct and that the document was uploaded successfully."
            ),
            "key_terms": [],
            "risky_clauses": [],
        }

    full_text = "\n\n".join(documents)

    if USE_MOCK_LLM:
        return {
            "summary": (
                f"[MOCK SUMMARY] This document contains {len(documents)} chunks of text. "
                f"A real Gemini-generated summary will appear here once AI access is connected. "
                f"Preview of content: \"{full_text[:200]}...\""
            ),
            "key_terms": ["[MOCK] Term extraction pending Gemini connection"],
            "risky_clauses": ["[MOCK] Risk detection pending Gemini connection"],
        }

    from app.services.llm import get_llm
    llm = get_llm()

    prompt = f"""You are a legal assistant analyzing a contract. Based on the document text below, respond with ONLY a valid JSON object (no markdown formatting, no code fences, no extra text) in exactly this structure:

{{
  "summary": "A clear, plain-English summary of what this document is and what it covers (3-5 sentences)",
  "key_terms": ["term or obligation 1", "term or obligation 2", "..."],
  "risky_clauses": ["risky clause description 1", "risky clause description 2", "..."]
}}

Each item in key_terms and risky_clauses should be a complete, self-contained description (do not split a single clause across multiple list items just because it contains commas internally).

Document text:
{full_text[:8000]}
"""

    response = llm.invoke(prompt)
    raw_output = response.content.strip()

    # Strip markdown code fences if Gemini wraps the JSON in ```json ... ```
    raw_output = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_output.strip())

    try:
        parsed = json.loads(raw_output)
        summary_text = parsed.get("summary", "")
        key_terms = parsed.get("key_terms", [])
        risky_clauses = parsed.get("risky_clauses", [])
    except json.JSONDecodeError as e:
        print(f"[WARNING] Failed to parse Gemini's JSON response: {e}")
        # Fallback: return raw text so nothing is silently lost
        summary_text = raw_output
        key_terms = []
        risky_clauses = []

    return {
        "summary": summary_text,
        "key_terms": key_terms,
        "risky_clauses": risky_clauses,
    }


    full_text = "\n\n".join(documents)

    if USE_MOCK_LLM:
        return {
            "summary": (
                f"[MOCK SUMMARY] This document contains {len(documents)} chunks of text. "
                f"A real Gemini-generated summary will appear here once AI access is connected. "
                f"Preview of content: \"{full_text[:200]}...\""
            ),
            "key_terms": ["[MOCK] Term extraction pending Gemini connection"],
            "risky_clauses": ["[MOCK] Risk detection pending Gemini connection"],
        }

    from app.services.llm import get_llm
    llm = get_llm()

    prompt = f"""You are a legal assistant analyzing a contract. Based on the document text below, provide:

1. SUMMARY: A clear, plain-English summary of what this document is and what it covers (3-5 sentences).
2. KEY TERMS: A list of important defined terms, obligations, dates, or amounts mentioned.
3. RISKY CLAUSES: A list of any clauses that could be risky, unfavorable, or worth extra attention (e.g. liability limits, termination conditions, penalties, auto-renewal clauses).

Document text:
{full_text[:8000]}

Respond in this exact format:
SUMMARY: <your summary>
KEY TERMS: <comma-separated list>
RISKY CLAUSES: <comma-separated list>
"""

    response = llm.invoke(prompt)
    raw_output = response.content

    # Basic parsing of the structured response
    summary_text = raw_output
    key_terms = []
    risky_clauses = []

    if "KEY TERMS:" in raw_output:
        parts = raw_output.split("KEY TERMS:")
        summary_text = parts[0].replace("SUMMARY:", "").strip()
        rest = parts[1]

        if "RISKY CLAUSES:" in rest:
            terms_part, risky_part = rest.split("RISKY CLAUSES:")
            key_terms = [t.strip() for t in terms_part.split(",") if t.strip()]
            risky_clauses = [r.strip() for r in risky_part.split(",") if r.strip()]
        else:
            key_terms = [t.strip() for t in rest.split(",") if t.strip()]

    return {
        "summary": summary_text,
        "key_terms": key_terms,
        "risky_clauses": risky_clauses,
    }