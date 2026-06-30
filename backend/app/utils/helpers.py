import os
import uuid


def generate_filename(filename: str):

    extension = os.path.splitext(filename)[1]

    return f"{uuid.uuid4().hex}{extension}"