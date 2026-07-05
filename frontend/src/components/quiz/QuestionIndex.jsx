import { useQuiz } from "../../context/QuizContext";

export default function QuestionIndex() {
  const { quiz, answers, currentQuestion, setCurrentQuestion } = useQuiz();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold mb-6 text-center">Question Index</h2>

      <div className="grid grid-cols-5 gap-3">
        {quiz.map((_, index) => {
          let bg = "bg-red-500 hover:bg-red-600";

          if (answers[index] !== undefined) {
            bg = "bg-green-500 hover:bg-green-600";
          }

          if (currentQuestion === index) {
            bg = "bg-blue-600 hover:bg-blue-700";
          }

          return (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-11 h-11 rounded-full text-white font-semibold transition-all duration-200 shadow ${bg}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>

          <span className="text-sm">Current Question</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>

          <span className="text-sm">Answered</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>

          <span className="text-sm">Unanswered</span>
        </div>
      </div>

      <div className="mt-8 border-t pt-5">
        <div className="flex justify-between">
          <span>Total</span>

          <span className="font-semibold">{quiz.length}</span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Answered</span>

          <span className="font-semibold text-green-600">
            {Object.keys(answers).length}
          </span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Remaining</span>

          <span className="font-semibold text-red-600">
            {quiz.length - Object.keys(answers).length}
          </span>
        </div>
      </div>
    </div>
  );
}
