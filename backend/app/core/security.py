from fastapi import HTTPException, UploadFile


ALLOWED_EXTENSIONS = [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".txt"
]

MAX_FILE_SIZE = 10 * 1024 * 1024


def validate_pdf(file: UploadFile):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )


async def validate_file_size(file: UploadFile):

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Maximum allowed file size is 10 MB."
        )

    await file.seek(0)