def contains_any(text, keywords):

    return any(
        keyword in text
        for keyword in keywords
    )


def normalize_text(text):

    text = text.lower().strip()

    replacements = {

        "पीएम किसान": "pm kisan",
        "पी एम किसान": "pm kisan",
        "आयुष्मान": "ayushman",
        "आधार": "aadhaar",
        "पैन": "pan",
        "राशन": "ration",
        "मतदाता": "voter",
        "छात्रवृत्ति": "scholarship",
        "पेंशन": "pension",
        "इनकम सर्टिफिकेट": "income certificate",
        "जाति प्रमाण पत्र": "caste certificate",
        "निवास प्रमाण पत्र": "domicile certificate"

    }

    for old, new in replacements.items():

        text = text.replace(old, new)

    return text


def get_chat_response(user_message):

    text = normalize_text(user_message)

    # PM Kisan

    if contains_any(text, [

        "pm kisan",
        "kisan",
        "farmer",
        "farmer scheme",
        "kisan yojana"

    ]):

        return """
🌾 PM Kisan Samman Nidhi Yojana

Eligible kisanon ko
₹6000 prati varsh ki sahayata di jati hai.

Rashi 3 kiston me di jati hai.
"""

    # Ayushman Bharat

    elif contains_any(text, [

        "ayushman",
        "health insurance",
        "health card",
        "medical scheme"

    ]):

        return """
🏥 Ayushman Bharat Yojana

Parivar ko ₹5 lakh tak ka
health insurance cover milta hai.
"""

    # Aadhaar

    elif contains_any(text, [

        "aadhaar",
        "aadhar",
        "uidai"

    ]):

        return """
🆔 Aadhaar Card

Required:
• Aadhaar Number
• Mobile Number

Official Website:
https://uidai.gov.in
"""

    # PAN Card

    elif contains_any(text, [

        "pan",
        "pan card"

    ]):

        return """
💳 PAN Card

Required:
• Aadhaar Card
• Photo
• Mobile Number
"""

    # Ration Card

    elif contains_any(text, [

        "ration",
        "ration card"

    ]):

        return """
🍚 Ration Card

Required:
• Aadhaar Card
• Family Details
• Residence Proof
"""

    # Voter ID

    elif contains_any(text, [

        "voter",
        "voter id",
        "election card"

    ]):

        return """
🗳️ Voter ID

Required:
• Aadhaar Card
• Passport Photo
• Mobile Number

Minimum Age: 18 Years
"""

    # Scholarship

    elif contains_any(text, [

        "scholarship",
        "student scholarship"

    ]):

        return """
🎓 Scholarship

Required:
• Aadhaar Card
• Income Certificate
• Marksheet
• Bank Passbook
"""

    # Pension

    elif contains_any(text, [

        "pension",
        "old age pension"

    ]):

        return """
👴 Pension Scheme

Required:
• Aadhaar Card
• Bank Account
• Age Proof
"""

    # Income Certificate

    elif contains_any(text, [

        "income certificate",
        "income"

    ]):

        return """
📄 Income Certificate

Required:
1. Aadhaar Card
2. Passport Photo
3. Residence Proof
4. Mobile Number
"""

    # Caste Certificate

    elif contains_any(text, [

        "caste certificate",
        "caste"

    ]):

        return """
📄 Caste Certificate

Required:
1. Aadhaar Card
2. Family Certificate
3. Residence Proof
4. Passport Photo
"""

    # Domicile Certificate

    elif contains_any(text, [

        "domicile certificate",
        "domicile",
        "residence certificate"

    ]):

        return """
🏠 Domicile Certificate

Required:
• Aadhaar Card
• Residence Proof
• Passport Photo
"""

    return """
🙏 Namaste

Main GramSathi AI hoon.

Main in services ke baare me madad kar sakta hoon:

• PM Kisan
• Ayushman Bharat
• Aadhaar Card
• PAN Card
• Ration Card
• Voter ID
• Scholarship
• Pension
• Income Certificate
• Caste Certificate
• Domicile Certificate

Aap Hindi, English ya Voice se sawal pooch sakte hain.
"""