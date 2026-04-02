import google.generativeai as genai
from app.core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Choose model
model = genai.GenerativeModel("gemini-flash-lite-latest")

def generate_response(user_query: str) -> str:
    response = model.generate_content(
        f"You are a helpful university assistant.\n\nUser: {user_query}"
    )
    
    return response.text