QUIZ_PROMPT = """
You are an expert quiz generator.

Generate {questions} multiple choice questions.

Rules:

1. Four options only.
2. One correct answer.
3. Return ONLY JSON.
4. No markdown.
5. No explanation.

JSON Format:

[
    {
        "question":"",
        "options":["","","",""],
        "answer":""
    }
]

Document:

{text}
"""