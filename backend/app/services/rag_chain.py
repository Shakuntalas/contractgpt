import json
import logging
import re

from app.services.vector_store import get_vector_store

logger = logging.getLogger(__name__)

USE_MOCK_LLM = False

DEFAULT_SUMMARY = {
    "summary": "",
    "key_terms": [],
    "risky_clauses": [],
    "payment_terms": [],
    "obligations": [],
    "responsibilities": [],
    "liability": [],
    "termination": [],
    "renewal": [],
    "timeline": [],
    "risk_score": 0,
}


def get_relevant_chunks(document_id: str, question: str, k: int = 6):
    try:
        vector_store = get_vector_store(collection_name=document_id)
        return vector_store.similarity_search(question, k=k)
    except Exception as e:
        logger.warning("Retrieval failed for %s: %s", document_id, e)
        return []


def answer_question(document_id: str, question: str):
    chunks = get_relevant_chunks(document_id, question)

    if not chunks:
        return {
            "answer": (
                "I couldn't find any information for this document.\n\n"
                "Please make sure the document was uploaded successfully."
            ),
            "sources": [],
        }

    if USE_MOCK_LLM:
        return {
            "answer": f"[MOCK]\n\n{chunks[0].page_content[:250]}...",
            "sources": [],
        }

    from app.services.llm import get_llm

    llm = get_llm()
    context = "\n\n".join(chunk.page_content for chunk in chunks)

    prompt = f"""You are ContractGPT, an AI legal contract assistant.

Your job is to explain contracts in SIMPLE English.

Rules:
• Never invent information.
• Answer ONLY from the provided contract.
• If the answer isn't present, clearly say:
  "This information is not available in the uploaded contract."
• Keep answers concise and helpful.
• Use markdown formatting.
• Prefer bullet points for lists.
• Explain legal language in plain English.

Finish every answer with:

---
⚠️ This is an AI-generated explanation and should not replace professional legal advice.

CONTRACT:

{context}

QUESTION:

{question}

ANSWER:
"""

    response = llm.invoke(prompt)
    answer = response.content.strip()

    sources = [
        {
            "page": chunk.metadata.get("page_label"),
            "excerpt": chunk.page_content[:180],
        }
        for chunk in chunks
    ]

    return {"answer": answer, "sources": sources}


def _parse_summary_json(raw_output: str) -> dict:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_output.strip()).strip()

    try:
        parsed = json.loads(cleaned)
        result = {**DEFAULT_SUMMARY}
        for key in DEFAULT_SUMMARY:
            if key in parsed:
                result[key] = parsed[key]
        if isinstance(result["risk_score"], str):
            try:
                result["risk_score"] = int(re.search(r"\d+", result["risk_score"]).group())
            except (AttributeError, ValueError):
                result["risk_score"] = 50
        result["risk_score"] = max(0, min(100, int(result["risk_score"] or 0)))
        return result
    except json.JSONDecodeError as e:
        logger.warning("JSON parsing failed: %s", e)
        return {
            **DEFAULT_SUMMARY,
            "summary": raw_output,
        }


def summarize_document(document_id: str):
    try:
        vector_store = get_vector_store(collection_name=document_id)
        all_data = vector_store.get()
        documents = all_data.get("documents", [])
    except Exception as e:
        logger.warning("Summary retrieval failed for %s: %s", document_id, e)
        documents = []

    if not documents:
        return {
            **DEFAULT_SUMMARY,
            "summary": "No document content found.",
        }

    full_text = "\n\n".join(documents)

    if USE_MOCK_LLM:
        return {
            **DEFAULT_SUMMARY,
            "summary": "[MOCK] Contract summary.",
            "key_terms": ["Party obligations", "Payment schedule", "Termination notice"],
            "risky_clauses": ["Auto-renewal clause without opt-out window"],
            "payment_terms": ["Monthly payment due on the 1st"],
            "risk_score": 35,
        }

    from app.services.llm import get_llm

    llm = get_llm()

    prompt = f"""You are ContractGPT, an expert legal contract analyst.

Analyze this contract and return ONLY valid JSON (no markdown, no code fences).

Use exactly this structure:

{{
  "summary": "Executive summary in 4-6 sentences, plain English.",
  "key_terms": ["Important term 1", "Important term 2"],
  "risky_clauses": ["Risky clause description 1", "Risky clause description 2"],
  "payment_terms": ["Payment detail 1", "Payment detail 2"],
  "obligations": ["Party obligation 1", "Party obligation 2"],
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "liability": ["Liability point 1", "Liability point 2"],
  "termination": ["Termination condition 1"],
  "renewal": ["Renewal condition 1"],
  "timeline": ["Key date or milestone 1", "Key date or milestone 2"],
  "risk_score": 45
}}

Rules:
• risk_score is 0-100 (0=very safe, 100=very risky).
• Use empty arrays [] if a section is not found in the contract.
• Never invent information not present in the contract.
• Each array item should be a complete, readable sentence.

CONTRACT:

{full_text[:45000]}
"""

    response = llm.invoke(prompt)
    return _parse_summary_json(response.content)


def explain_clause_text(clause_text: str) -> dict:
    """
    Explains a standalone contract clause in plain English using Gemini.
    """
    if not clause_text.strip():
        return {"explanation": "Please provide a valid clause to explain."}

    from app.services.llm import get_llm
    llm = get_llm(temperature=0.2)

    prompt = f"""You are ContractGPT, an expert legal assistant.

Explain the following contract clause in SIMPLE, plain English.

Provide your output in a clear structure:
1. Executive Explanation (2-3 sentences explaining what this clause means in practice)
2. Key Obligations & Rights (Bullet points)
3. Potential Risks or Things to Watch Out For (Bullet points)

CLAUSE:
\"\"\"
{clause_text}
\"\"\"
"""
    response = llm.invoke(prompt)
    return {"explanation": response.content.strip()}


def compare_documents(doc1_id: str, doc2_id: str) -> dict:
    """
    Compares two contracts stored in ChromaDB collections.
    """
    try:
        store1 = get_vector_store(collection_name=doc1_id).get()
        text1 = "\n\n".join(store1.get("documents", []))[:20000]
    except Exception:
        text1 = "Document 1 content not found."

    try:
        store2 = get_vector_store(collection_name=doc2_id).get()
        text2 = "\n\n".join(store2.get("documents", []))[:20000]
    except Exception:
        text2 = "Document 2 content not found."

    from app.services.llm import get_llm
    llm = get_llm(temperature=0.2)

    prompt = f"""You are ContractGPT, an expert legal analyst.

Compare these two legal contracts and return ONLY valid JSON matching this schema:

{{
  "doc1_risk": "Low/Medium/High",
  "doc2_risk": "Low/Medium/High",
  "comparison_summary": "Overall summary comparing both contracts in plain English.",
  "differences": [
    {{ "category": "Payment / Compensation", "doc1": "Details for Doc 1", "doc2": "Details for Doc 2" }},
    {{ "category": "Termination / Notice", "doc1": "Details for Doc 1", "doc2": "Details for Doc 2" }},
    {{ "category": "Liability / Indemnity", "doc1": "Details for Doc 1", "doc2": "Details for Doc 2" }}
  ],
  "recommendation": "Which contract is more favorable and why."
}}

CONTRACT 1:
{text1}

CONTRACT 2:
{text2}
"""
    response = llm.invoke(prompt)
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", response.content.strip()).strip()
    try:
        return json.loads(cleaned)
    except Exception:
        return {
            "doc1_risk": "Medium",
            "doc2_risk": "Medium",
            "comparison_summary": response.content.strip(),
            "differences": [],
            "recommendation": "Review both documents carefully."
        }

