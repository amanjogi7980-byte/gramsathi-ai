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

    You help Indian rural citizens.

    Rules:
    - Reply in simple Hindi.
    - Be polite and helpful.
    - Explain step by step.
    - Help with government schemes.
    - Help with agriculture.
    - Help with education.
    - Help with documents like Aadhaar, PAN, Income Certificate, Caste Certificate.
    - If user asks about a government scheme, explain:
      1. Benefits
      2. Eligibility
      3. Required Documents
      4. How to Apply

    User Question:
    {message}
    """
)

        return response.text

    except Exception as e:

        return f"ERROR: {str(e)}"