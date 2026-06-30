import fitz
from fastapi import HTTPException


class PDFService:

    @staticmethod
    async def extract_text(file_path: str) -> str:
        try:
            document = fitz.open(file_path)

            text = ""

            for page in document:
                text += page.get_text()

            document.close()

            if not text.strip():
                raise HTTPException(
                    status_code=400,
                    detail="No readable text found in PDF."
                )

            return text.strip()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"PDF Extraction Failed: {str(e)}"
            )