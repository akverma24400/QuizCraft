import re


class PDFParser:

    QUESTION_REGEX = re.compile(r"^(\d+)\.\s*(.*)")
    OPTION_REGEX = re.compile(r"^\(([a-dA-D])\)\s*(.*)")
    ANSWER_REGEX = re.compile(r"^(\d+)\.\s*\(([a-dA-D])\)\s*(.*)")

    @staticmethod
    def clean(text):

        text = text.replace("\u00a0", " ")
        text = re.sub(r"\s+", " ", text)

        return text.strip()

    @staticmethod
    def split_lines(text):

        lines = []

        for line in text.splitlines():

            line = PDFParser.clean(line)

            if line:
                lines.append(line)

        return lines

    @staticmethod
    def extract_questions(text):

        lines = PDFParser.split_lines(text)

        questions = []

        current = None

        current_option = None

        for line in lines:

            question_match = PDFParser.QUESTION_REGEX.match(line)

            if question_match:

                if current:
                    questions.append(current)

                current = {
                    "id": int(question_match.group(1)),
                    "question": question_match.group(2),
                    "options": [],
                }

                current_option = None

                continue

            option_match = PDFParser.OPTION_REGEX.match(line)

            if option_match and current:

                current_option = option_match.group(2)

                current["options"].append(current_option)

                continue

            if current_option is not None and current:

                current["options"][-1] += " " + line

                continue

            if current:

                current["question"] += " " + line

        if current:
            questions.append(current)

        return questions

    @staticmethod
    def extract_answers(text):

        lines = PDFParser.split_lines(text)

        answers = {}

        current_question = None

        current_explanation = []

        answer_letter = None

        for line in lines:

            match = PDFParser.ANSWER_REGEX.match(line)

            if match:

                if current_question is not None:

                    answers[current_question] = {
                        "answer": answer_letter,
                        "explanation": PDFParser.clean(" ".join(current_explanation)),
                    }

                current_question = int(match.group(1))

                answer_letter = match.group(2).lower()

                current_explanation = [match.group(3)]

                continue

            if current_question is not None:

                current_explanation.append(line)

        if current_question is not None:

            answers[current_question] = {
                "answer": answer_letter,
                "explanation": PDFParser.clean(" ".join(current_explanation)),
            }

        return answers

    @staticmethod
    def is_solved_paper(text):

        score = 0

        if re.search(r"\d+\.\s*\([a-dA-D]\)", text):
            score += 1

        if "Explanation" in text:
            score += 1

        if "Answer" in text:
            score += 1

        return score >= 1

    @staticmethod
    def merge(questions, answers):

        letter_to_index = {
            "a": 0,
            "b": 1,
            "c": 2,
            "d": 3,
        }

        quiz = []

        for question in questions:

            qid = question["id"]

            if qid not in answers:
                continue

            if len(question["options"]) != 4:
                continue

            answer_letter = answers[qid]["answer"]

            if answer_letter not in letter_to_index:
                continue

            correct_index = letter_to_index[answer_letter]

            if correct_index >= len(question["options"]):
                continue

            quiz.append(
                {
                    "id": qid,
                    "question": PDFParser.clean(question["question"]),
                    "options": [
                        PDFParser.clean(option) for option in question["options"]
                    ],
                    "correctOption": correct_index,
                    "correctAnswer": question["options"][correct_index],
                    "explanation": PDFParser.clean(answers[qid]["explanation"]),
                }
            )

        return quiz

    @staticmethod
    def debug(quiz):

        print("\n========== PARSED QUIZ ==========\n")

        for question in quiz[:5]:

            print("=" * 80)

            print(f"Question {question['id']}")

            print(question["question"])

            print()

            for i, option in enumerate(question["options"]):

                prefix = " "

                if i == question["correctOption"]:
                    prefix = "✓"

                print(f"{prefix} {chr(65+i)}. {option}")

            print()

            print("Correct Answer :", question["correctAnswer"])

            print()

            print("Explanation :")

            print(question["explanation"])

            print()

        print("=" * 80)
