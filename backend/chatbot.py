import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def get_chat_response(message):

    try:

        response = model.generate_content(
            f"""
You are GramSathi AI.

Answer briefly and clearly.

Rules:
- Maximum 5 lines
- Use simple Hindi or English
- Focus on government services
- Do not give long answers

Question:
{message}
"""
        )

        return response.text

    except Exception as e:

        return f"ERROR: {str(e)}"