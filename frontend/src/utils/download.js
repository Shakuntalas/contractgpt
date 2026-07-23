import { jsPDF } from "jspdf";

export function downloadTextFile(content, filename = "contract-summary.txt") {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function buildSummaryText(report) {
  const sections = [
    ["EXECUTIVE SUMMARY", report.summary],
    ["KEY TERMS", report.key_terms],
    ["RISKY CLAUSES", report.risky_clauses],
    ["PAYMENT TERMS", report.payment_terms],
    ["OBLIGATIONS", report.obligations],
    ["RESPONSIBILITIES", report.responsibilities],
    ["LIABILITY", report.liability],
    ["TERMINATION", report.termination],
    ["RENEWAL", report.renewal],
    ["TIMELINE", report.timeline],
  ];

  let text = "CONTRACTGPT — AI CONTRACT SUMMARY\n";
  text += "=".repeat(50) + "\n\n";
  text += `Document ID: ${report.document_id || "N/A"}\n`;
  text += `Risk Score: ${report.risk_score ?? "N/A"}/100\n\n`;

  for (const [title, content] of sections) {
    text += `${title}\n${"-".repeat(title.length)}\n`;
    if (Array.isArray(content)) {
      content.length ? content.forEach((item, i) => { text += `  ${i + 1}. ${item}\n`; }) : (text += "  None identified\n");
    } else {
      text += `${content || "N/A"}\n`;
    }
    text += "\n";
  }

  text += "\n⚠️ AI-generated analysis. Not legal advice.\n";
  return text;
}

export function downloadSummaryPdf(report) {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;

  const addLine = (text, size = 11, bold = false) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += size * 0.45;
    }
    y += 4;
  };

  addLine("ContractGPT — AI Contract Summary", 18, true);
  addLine(`Document ID: ${report.document_id || "N/A"}`, 10);
  addLine(`Risk Score: ${report.risk_score ?? "N/A"}/100`, 10);
  y += 4;

  const sections = [
    ["Executive Summary", report.summary],
    ["Key Terms", report.key_terms],
    ["Risky Clauses", report.risky_clauses],
    ["Payment Terms", report.payment_terms],
    ["Obligations", report.obligations],
    ["Responsibilities", report.responsibilities],
    ["Liability", report.liability],
    ["Termination", report.termination],
    ["Renewal", report.renewal],
    ["Timeline", report.timeline],
  ];

  for (const [title, content] of sections) {
    addLine(title, 13, true);
    if (Array.isArray(content)) {
      content.length
        ? content.forEach((item, i) => addLine(`${i + 1}. ${item}`, 10))
        : addLine("None identified", 10);
    } else {
      addLine(content || "N/A", 10);
    }
    y += 2;
  }

  addLine("⚠️ AI-generated analysis. Not legal advice.", 9);
  doc.save(`contract-summary-${report.document_id?.slice(0, 8) || "report"}.pdf`);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function printSummary() {
  window.print();
}
