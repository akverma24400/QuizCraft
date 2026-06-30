import json

from app.services.groq_service import GroqService
from app.utils.prompts import QUIZ_PROMPT


class QuizService:

    def __init__(self):
        self.groq = GroqService()

    async def generate_quiz(
        self,
        text: str,
        questions: int = 10
    ):

        prompt = QUIZ_PROMPT.format(
            questions=questions,
            text=text
        )

        response = await self.groq.generate(prompt)

        response = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            return json.loads(response)

        except Exception:
            raise Exception(
                "Groq returned invalid JSON."
            )