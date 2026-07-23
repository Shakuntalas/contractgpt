import re
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


def clean_text(text: str) -> str:
    """
    Cleans up common PDF-extraction artifacts:
    - collapses weird internal spacing (e.g. 'AGRE EM ENT' -> 'AGREEMENT' is NOT safely
      reversible, so we only fix spacing around punctuation and excess whitespace)
    - normalizes multiple spaces/newlines into single spaces
    """
    # Collapse multiple spaces/tabs into one
    text = re.sub(r"[ \t]+", " ", text)

    # Collapse multiple newlines into a single newline
    text = re.sub(r"\n{2,}", "\n", text)

    # Fix space before punctuation (e.g. "agreement ." -> "agreement.")
    text = re.sub(r"\s+([.,;:)])", r"\1", text)

    # Fix space after opening parenthesis (e.g. "( the" -> "(the")
    text = re.sub(r"([(])\s+", r"\1", text)

    # Strip leading/trailing whitespace on each line, then rejoin
    lines = [line.strip() for line in text.split("\n")]
    text = "\n".join(line for line in lines if line)

    return text.strip()


def load_and_split_pdf(file_path: str):
    """
    Loads a PDF from disk, cleans the text, and splits it into overlapping chunks.
    Returns a list of LangChain Document objects.
    """
    loader = PyPDFLoader(file_path)
    pages = loader.load()  # one Document per PDF page
    total_pages = len(pages)

    # Clean each page's text before chunking and enrich metadata
    for i, page in enumerate(pages):
        page.page_content = clean_text(page.page_content)
        page.metadata["total_pages"] = total_pages
        page.metadata["page_label"] = i + 1

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", " ", ""],
    )

    chunks = splitter.split_documents(pages)
    return chunks