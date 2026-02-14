print("🔥 THIS MAIN.PY IS RUNNING 🔥")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import *
import ai_service

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Creovate Backend is Running", "docs_url": "http://localhost:8000/docs"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/generate-brand")
def brand(req: BrandRequest):
    return {"brands": ai_service.generate_brand_names(req.model_dump())}

@app.post("/api/generate-content")
def content(req: ContentRequest):
    return {"content": ai_service.generate_content(req.model_dump())}

@app.post("/api/analyze-sentiment")
def sentiment(req: SentimentRequest):
    return ai_service.analyze_sentiment(req.text)

@app.post("/api/chat")
def chat(req: ChatRequest):
    return {"reply": ai_service.chatbot_reply(req.message)}

@app.post("/api/generate-logo")
def logo(req: LogoRequest):
    return {"prompt": ai_service.generate_logo_prompt(req.model_dump())}

@app.get("/test-all")
def test():
    return {"status": "all routes loaded"}
