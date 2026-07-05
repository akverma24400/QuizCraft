import json
import re

from app.services.groq_service import GroqService
from app.utils.prompts import QUIZ_PROMPT


class QuizService:

    def __init__(self):
        self.groq = GroqService()

    async def generate_quiz(
        self,
        text: str,
        questions: int = 10,
    ):
        """
        Generates quiz for normal PDFs using Groq.

        If the PDF already contains an answer key,
        parser.py + PDFService.extract_quiz()
        should be used instead.
        """

        prompt = QUIZ_PROMPT.format(
            questions=questions,
            text=text,
        )

        response = await self.groq.generate(prompt)

        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

        print("\n========== CLEAN RESPONSE ==========\n")
        print(response)

        match = re.search(
            r"\[.*\]",
            response,
            re.DOTALL,
        )

        if not match:
            raise Exception("Groq did not return valid JSON.")

        try:

            quiz = json.loads(match.group())

        except json.JSONDecodeError as e:

            raise Exception(f"Invalid JSON\n\n{e}")

        # Normalize every question
        normalized = []

        for i, q in enumerate(quiz):

            answer = q.get("answer", "")

            options = q.get("options", [])

            correct_index = -1

            if answer in options:
                correct_index = options.index(answer)

            normalized.append(
                {
                    "id": i + 1,
                    "question": q.get("question"),
                    "options": options,
                    "correctOption": correct_index,
                    "correctAnswer": answer,
                    "explanation": q.get(
                        "explanation",
                        "",
                    ),
                }
            )

        print("\n========== FINAL QUIZ ==========\n")

        for q in normalized[:5]:
            print(json.dumps(q, indent=2))

        print("\n===============================\n")

        return normalized
