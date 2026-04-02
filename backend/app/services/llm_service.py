from google import genai
from app.core.config import settings
from app.services.rag_service import retrieve_context

# Create client
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# Use stable model
MODEL_NAME = "gemini-flash-lite-latest"

def generate_response(user_query: str) -> str:
    try:
        # 🔍 Retrieve context (RAG)
        context = retrieve_context(user_query)

        # 🧠 Prompt
        prompt = f"""
You are UniBot, a helpful and friendly AI assistant for IILM University.

Use the provided context to answer the user's question accurately.
Context blocks might contain FAQs, Faculty details, or Notices.

Guidelines:
1. Synthesize the answer naturally based ONLY on the provided context.
2. If the context contains exactly what is asked, provide a concise and helpful answer.
3. If the context does NOT contain the answer, politely state: "I don't have that information right now, please check the main university portal or contact administration."
4. Do not hallucinates or guess outside the given context.

=== CONTEXT ===
{context}

=== USER QUESTION ===
{user_query}
"""

        # 🔥 New SDK call
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text

    except Exception as e:
        return f"Error generating response: {str(e)}"