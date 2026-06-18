import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-1.5-flash"
)

def get_chat_response(message):

    try:

        response = model.generate_content(
            f"""
            You are GramSathi AI.

            Help Indian rural citizens.

            User Question:
            {message}
            """
        )

        return response.text

    except Exception as e:

        return (
            "Sorry, AI service is temporarily unavailable."
        )