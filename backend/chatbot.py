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

message_lower = message.lower()

if "farmer schemes" in message_lower:
    return """
🌾 Farmer Schemes:

1. PM Kisan Samman Nidhi
2. Kisan Credit Card (KCC)
3. PM Fasal Bima Yojana
4. Soil Health Card Scheme
"""

if "student schemes" in message_lower:
    return """
🎓 Student Schemes:

1. National Scholarship Portal (NSP)
2. UP Scholarship
3. PM Yasasvi Scheme
4. Merit Cum Means Scholarship
"""

if "ayushman card" in message_lower:
    return """
💳 Ayushman Card:

• Free treatment up to ₹5 lakh per family per year.
• Apply through Ayushman Bharat portal or CSC center.
"""

if "income certificate" in message_lower:
    return """
📄 Income Certificate:

Required Documents:
• Aadhaar Card
• Photo
• Residence Proof
• Income Proof
"""

if "complaint help" in message_lower:
    return """
📢 Complaint Help:

You can file complaints through:
• CPGRAMS Portal
• District Office
• Gram Panchayat
"""
    
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

   except Exception:
    return """
Maaf kijiye 🙏

AI service abhi temporary busy hai ya daily limit exceed ho gayi hai.

Kripya kuch der baad phir try karein.
"""