import google.generativeai as genai
from app.config import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)

print("Available models and their supported methods:\n")
for model in genai.list_models():
    print(f"Name: {model.name}")
    print(f"  Supported methods: {model.supported_generation_methods}")
    print()