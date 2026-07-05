QUIZ_PROMPT = """
You are an expert exam paper creator.

Generate exactly {questions} multiple-choice questions from the following text.

Rules:
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include ```json.
- Do NOT explain anything.
- Every question must have four options.
- One correct answer.

JSON format:

[
  {{
    "question": "Question here",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Option A"
  }}
]

TEXT:

{text}
"""