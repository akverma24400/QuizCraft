import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, CircleCheckBig, CircleX, CircleDashed } from "lucide-react";

import { useQuiz } from "../context/QuizContext";

export default function Result() {
  const navigate = useNavigate();

  const { quiz, answers, resetQuiz } = useQuiz();

  const result = useMemo(() => {
    let correct = 0;

    let wrong = 0;

    let unanswered = 0;

    quiz.forEach((question, index) => {
      const selected = answers[index];

      if (selected === undefined) {
        unanswered++;

        return;
      }

      if (selected === question.correctOption) {
        correct++;
      } else {
        wrong++;
      }
    });

    const accuracy =
      quiz.length === 0 ? 0 : Math.round((correct / quiz.length) * 100);

    return {
      correct,

      wrong,

      unanswered,

      accuracy,

      score: correct,
    };
  }, [quiz, answers]);

  const exitQuiz = () => {
    resetQuiz();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl w-full">
        <div className="flex justify-center">
          <Trophy className="text-yellow-500" size={90} />
        </div>

        <h1 className="text-center text-4xl font-bold mt-6">Quiz Completed</h1>

        <h2 className="text-center text-5xl font-bold text-blue-600 mt-8">
          {result.score}/{quiz.length}
        </h2>

        <p className="text-center text-slate-500 mt-2">Final Score</p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="rounded-2xl bg-green-50 p-6">
            <CircleCheckBig className="text-green-600" />

            <p className="mt-4 text-slate-500">Correct</p>

            <h3 className="text-3xl font-bold text-green-700">
              {result.correct}
            </h3>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <CircleX className="text-red-600" />

            <p className="mt-4 text-slate-500">Wrong</p>

            <h3 className="text-3xl font-bold text-red-700">{result.wrong}</h3>
          </div>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <CircleDashed className="text-yellow-600" />

            <p className="mt-4 text-slate-500">Unanswered</p>

            <h3 className="text-3xl font-bold text-yellow-700">
              {result.unanswered}
            </h3>
          </div>

          <div className="rounded-2xl bg-blue-50 p-6">
            <Trophy className="text-blue-600" />

            <p className="mt-4 text-slate-500">Accuracy</p>

            <h3 className="text-3xl font-bold text-blue-700">
              {result.accuracy}%
            </h3>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-center">Thank You</h2>

          <p className="text-center text-slate-500 mt-2">
            Thank you for attending this test.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={exitQuiz}
            className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl"
          >
            Exit
          </button>

          <button
            onClick={() => navigate("/check-answers")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            Check Answers
          </button>
        </div>
      </div>
    </div>
  );
}
