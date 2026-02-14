import os
import requests
import base64
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Core AI call
def ask_ai(prompt: str):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content


# ============================
# Project AI Functions
# ============================

def generate_brand_names(data):
    prompt = f"""
    Generate 10 sophisticated, premium, and luxury brand names.
    Industry: {data['industry']}
    Keywords: {data['keywords']} (Focus on elegance, prestige, modern luxury)
    Tone: {data['tone']} (High-end, Exclusive)
    """
    return ask_ai(prompt)


def generate_content(data):
    prompt = f"""
    Write high-quality, professional, and sophisticated marketing content.
    Description: {data['description']}
    Tone: {data['tone']} (Professional, Persuasive, Elegant)
    Content Type: {data['content_type']}
    Ensure vocabulary is refined and impactful.
    """
    return ask_ai(prompt)


def analyze_sentiment(text):
    prompt = f"""
    Analyze the sentiment of this text.
    Respond only with Positive, Negative or Neutral.

    Text: {text}
    """
    return {"sentiment": ask_ai(prompt)}


def chatbot_reply(message):
    prompt = f"You are Creovate, a luxury AI assistant. Respond politely, professionally, and concisely. User: {message}"
    return ask_ai(prompt)


def generate_logo_prompt(data):
    # This now just returns a string prompt for the image generator
    prompt = f"A professional minimalist luxury logo for a brand named '{data['brand_name']}' in the {data['industry']} industry. Style: {data['keywords']}. Primary color: {data.get('color', 'gold')}. Elegant, high-end, vector style, white background, high resolution."
    return prompt

def generate_logo_image(data):
    # Step 1: Get a good prompt from Groq (optional, but let's just use a direct prompt for now)
    prompt = f"Professional minimalist luxury logo design, '{data['brand_name']}', industry: {data['industry']}, style: {data['keywords']}, primary color: {data.get('color', 'gold')}, flat vector art, isolated on white background, premium aesthetic, 4k"
    
    API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell"
    headers = {"Authorization": f"Bearer {os.getenv('HF_API_KEY')}"}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content

    image_bytes = query({"inputs": prompt})
    
    # Convert to base64
    base64_image = base64.b64encode(image_bytes).decode('utf-8')
    return base64_image
