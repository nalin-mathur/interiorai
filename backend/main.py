from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import base64

app = FastAPI()

# Enable CORS - updated configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/process-image")
async def process_image(file: UploadFile = File(...)):
    # Dummy function that just acknowledges receipt of image
    return {
        "message": "Image received successfully",
        "filename": file.filename
    }

@app.post("/api/chat")
async def chat(message: ChatMessage):
    # Dummy chat response - you can replace this with actual logic
    response = f"I received your message: '{message.message}'. This is a dummy response."
    return {"response": response} 