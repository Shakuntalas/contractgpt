const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

async function handleResponse(response) {
  if (!response.ok) {
    let detail = "Request failed";
    try {
      const err = await response.json();
      detail = err.detail || detail;
    } catch {
      /* ignore */
    }
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
  return response.json();
}

export async function uploadContract(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  if (onProgress) onProgress(10);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (onProgress) onProgress(80);
  const data = await handleResponse(response);
  if (onProgress) onProgress(100);
  return data;
}

export async function chatWithContract(documentId, question) {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id: documentId, question }),
  });
  return handleResponse(response);
}

export async function getSummary(documentId) {
  const response = await fetch(`${BASE_URL}/summary/${documentId}`);
  return handleResponse(response);
}

export async function compareContracts(doc1_id, doc2_id) {
  const response = await fetch(`${BASE_URL}/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc1_id, doc2_id }),
  });
  return handleResponse(response);
}

export async function explainClauseApi(clause) {
  const response = await fetch(`${BASE_URL}/explain-clause`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clause }),
  });
  return handleResponse(response);
}

export async function pingBackend() {
  const base = BASE_URL.replace("/api", "");
  const response = await fetch(`${base}/ping`);
  return handleResponse(response);
}
