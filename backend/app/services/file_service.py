import os
import aiofiles

from app.utils.helpers import generate_filename


class FileService:

    UPLOAD_FOLDER = "app/uploads"

    @staticmethod
    async def save(file):

        filename = generate_filename(file.filename)

        path = os.path.join(
            FileService.UPLOAD_FOLDER,
            filename
        )

        async with aiofiles.open(path, "wb") as f:
            content = await file.read()
            await f.write(content)

        return path

    @staticmethod
    def delete(path):

        if os.path.exists(path):
            os.remove(path)