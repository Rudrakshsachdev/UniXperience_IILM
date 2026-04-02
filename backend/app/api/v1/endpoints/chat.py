from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm_service import generate_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    user_message = request.message

    # Generate AI response
    reply = generate_response(user_message)

    return ChatResponse(response=reply)