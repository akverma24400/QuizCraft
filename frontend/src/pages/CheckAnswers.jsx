import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

export default function CheckAnswers() {
  const navigate = useNavigate();

  const { quiz, answers } = useQuiz();

  if (!quiz.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">No Quiz Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto py-10 px-6">
        <div className="sticky top-16 z-40 bg-slate-100/95 backdrop-blur-md py-4 mb-8 border-b">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate("/result")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-xl transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-3xl font-bold">Check Answers</h1>

            <div className="w-28"></div>
          </div>
        </div>

        <div className="space-y-8">
          {quiz.map((question, index) => {
            const selected = answers[index];

            const correct = selected === question.correctOption;

            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold mb-8">
                  Q{index + 1}. {question.question}
                </h2>

                <div className="space-y-4">
                  {question.options.map((option, optionIndex) => {
                    let style = "border-slate-300 bg-white";

                    if (optionIndex === question.correctOption) {
                      style = "border-green-600 bg-green-100";
                    }

                    if (
                      optionIndex === selected &&
                      optionIndex !== question.correctOption
                    ) {
                      style = "border-red-600 bg-red-100";
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`border rounded-xl px-5 py-4 ${style}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-semibold mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>

                            {option}
                          </div>

                          {optionIndex === question.correctOption && (
                            <CheckCircle2
                              className="text-green-600"
                              size={22}
                            />
                          )}

                          {optionIndex === selected &&
                            optionIndex !== question.correctOption && (
                              <XCircle className="text-red-600" size={22} />
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-red-50 p-5">
                    <h3 className="font-semibold mb-2">Your Answer</h3>

                    <p>
                      {selected === undefined
                        ? "Not Answered"
                        : question.options[selected]}
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-50 p-5">
                    <h3 className="font-semibold mb-2">Correct Answer</h3>

                    <p>{question.correctAnswer}</p>
                  </div>
                </div>

                {question.explanation && (
                  <div className="mt-8 bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-700 mb-3">
                      Explanation
                    </h3>

                    <p className="leading-7 text-slate-700">
                      {question.explanation}
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  {correct ? (
                    <span className="text-green-700 font-semibold">
                      ✓ Correct
                    </span>
                  ) : (
                    <span className="text-red-700 font-semibold">
                      ✗ Incorrect
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
