from app.services.pdf_loader import load_and_split_pdf

chunks = load_and_split_pdf("data/uploads/sample.pdf")

print(f"Total chunks created: {len(chunks)}")
print("\n--- First chunk preview ---")
print(chunks[0].page_content)
print("\n--- Metadata ---")
print(chunks[0].metadata)