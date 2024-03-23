from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from all origins with appropriate methods and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    type: str

@app.post("/flow")
async def chatbot_response(chat_request: ChatRequest):
    user_message = chat_request.message
    bot_type = chat_request.type

    # Lógica para gerar diferentes respostas dependendo do tipo de chatbot
    if bot_type == "book_a_room":
        bot_response = "Resposta do Bot 1."
    elif bot_type == "spa":
        bot_response = "Resposta do Bot 2."
    elif bot_type == "quote":
        bot_response = "Resposta do Bot 3."
    else:
        bot_response = "Tipo de chatbot não reconhecido."

    return {"reply": bot_response,"entities":{"Check in Date":"123"}}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
