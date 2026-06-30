from pydantic import BaseModel
from typing import List


class Question(BaseModel):

    question: str

    options: List[str]

    answer: str


class QuizResponse(BaseModel):

    success: bool

    questions: List[Question]