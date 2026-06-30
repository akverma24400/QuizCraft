from fastapi import APIRouter
from fastapi import File
from fastapi import UploadFile
from fastapi import Query

from app.core.security import (
    validate_pdf,
    validate_file_size
)

from app.services.file_service import FileService
from app.services.pdf_service import PDFService
from app.services.quiz_service import QuizService

router = APIRouter()


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    questions: int = Query(10, ge=1, le=50)
):

    validate_pdf(file)

    await validate_file_size(file)

    path = await FileService.save(file)

    try:

        text = await PDFService.extract_text(path)

        quiz = await QuizService().generate_quiz(
            text,
            questions
        )

        return {
            "success": True,
            "total_questions": len(quiz),
            "questions": quiz
        }

    finally:

        FileService.delete(path)