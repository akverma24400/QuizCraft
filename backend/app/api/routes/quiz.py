from typing import List

from fastapi import APIRouter, File, UploadFile, Query

from app.core.security import (
    validate_pdf,
    validate_file_size,
)

from app.services.file_service import FileService
from app.services.pdf_service import PDFService
from app.services.quiz_service import QuizService

router = APIRouter()


@router.post("/upload")
async def upload_files(
    files: List[UploadFile] = File(...),
    questions: int = Query(10, ge=1, le=50),
):

    combined_text = ""

    parsed_quiz = []

    saved_files = []

    try:

        for file in files:

            validate_pdf(file)

            await validate_file_size(file)

            path = await FileService.save(file)

            saved_files.append(path)

            # Extract raw text
            text = await PDFService.extract_text(path)

            combined_text += "\n\n" + text

            # Try parser first
            quiz = await PDFService.extract_quiz(path)

            if len(quiz) > 0:

                parsed_quiz.extend(quiz)

        # ------------------------
        # If parser succeeded
        # ------------------------

        if len(parsed_quiz) > 0:

            print("\n✅ Solved Paper Detected\n")

            return {
                "success": True,
                "mode": "parsed",
                "uploaded_files": len(files),
                "total_questions": len(parsed_quiz),
                "questions": parsed_quiz,
            }

        # ------------------------
        # Otherwise use Groq
        # ------------------------

        print("\n🤖 Using Groq Quiz Generator\n")

        quiz = await QuizService().generate_quiz(
            combined_text,
            questions,
        )

        return {
            "success": True,
            "mode": "generated",
            "uploaded_files": len(files),
            "total_questions": len(quiz),
            "questions": quiz,
        }

    finally:

        for path in saved_files:

            FileService.delete(path)
