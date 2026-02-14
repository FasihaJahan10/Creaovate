import os
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
    # Modified to request SVG code instead of a description
    prompt = f"""
    Create a minimal, luxury, and professional SVG logo code for a brand.
    Brand Name: {data['brand_name']}
    Industry: {data['industry']}
    Style: Minimalist, Premium aesthetic, Geometric, Elegant. (Use {data['keywords']} for specific colors/style if provided)
    
    IMPORTANT: 
    - Return ONLY the raw <svg> code. 
    - Do not include markdown backticks (```xml or ```svg).
    - Do not include explanation.
    - Ensure the SVG is viewable on a black background (use white or gold stroke/fill).
    """
    return ask_ai(prompt)
