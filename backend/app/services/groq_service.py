from groq import Groq
from app.core.config import settings


class GroqService:

    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

    async def generate(self, prompt: str):

        response = self.client.chat.completions.create(
            model=settings.MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert quiz generator. Return ONLY valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )

        result = response.choices[0].message.content.strip()

        print("\n========== GROQ RESPONSE ==========\n")
        print(result)
        print("\n===================================\n")

        return result