import re


def clean_text(text: str) -> str:
    """
    Clean common PDF extraction artifacts.
    """

    # Collapse multiple spaces/tabs
    text = re.sub(r"[ \t]+", " ", text)

    # Collapse multiple newlines
    text = re.sub(r"\n{2,}", "\n", text)

    # Remove spaces before punctuation
    text = re.sub(r"\s+([.,;:)])", r"\1", text)

    # Remove spaces after opening parenthesis
    text = re.sub(r"([(])\s+", r"\1", text)

    # Clean individual lines
    lines = [line.strip() for line in text.split("\n")]
    text = "\n".join(line for line in lines if line)

    return text.strip()


def load_and_split_pdf(file_path: str):
    """
    Load a PDF, clean its text, and split it into chunks.

    Heavy LangChain dependencies are imported only when
    a PDF is uploaded. This keeps FastAPI startup lightweight.
    """

    from langchain_community.document_loaders import PyPDFLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter

    loader = PyPDFLoader(file_path)

    pages = loader.load()

    total_pages = len(pages)

    # Clean text and add metadata
    for i, page in enumerate(pages):

        page.page_content = clean_text(page.page_content)

        page.metadata["total_pages"] = total_pages
        page.metadata["page_label"] = i + 1

    # Split document into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=[
            "\n\n",
            "\n",
            ".",
            " ",
            "",
        ],
    )

    chunks = splitter.split_documents(pages)

    return chunks