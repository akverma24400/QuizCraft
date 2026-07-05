import fitz
from fastapi import HTTPException

from app.utils.parser import PDFParser


class PDFService:

    @staticmethod
    async def extract_text(file_path: str):

        try:

            document = fitz.open(file_path)

            text = ""

            for page in document:

                text += page.get_text()

            document.close()

            if not text.strip():
                raise HTTPException(status_code=400, detail="No readable text found.")

            return text

        except Exception as e:

            raise HTTPException(
                status_code=500, detail=f"PDF Extraction Failed : {str(e)}"
            )

    @staticmethod
    async def extract_quiz(file_path: str):

        text = await PDFService.extract_text(file_path)

        questions = PDFParser.extract_questions(text)

        answers = PDFParser.extract_answers(text)

        quiz = PDFParser.merge(
            questions,
            answers,
        )

        return quiz
