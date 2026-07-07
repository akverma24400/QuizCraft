import { useQuiz } from "../../context/QuizContext";

export default function QuestionCard() {
  const { quiz, currentQuestion, answers, setAnswers } = useQuiz();

  const question = quiz[currentQuestion];

  if (!question) return null;

  const selectedOption = answers[currentQuestion];

  const handleSelect = (index) => {
    setAnswers((prev) => {
      // Deselect if clicked again
      if (prev[currentQuestion] === index) {
        const updated = { ...prev };

        delete updated[currentQuestion];

        return updated;
      }

      return {
        ...prev,
        [currentQuestion]: index,
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-8">
        Q{currentQuestion + 1}. {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left rounded-xl border px-5 py-4 transition-all duration-200

            ${
              selectedOption === index
                ? "bg-gray-300 border-gray-400"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            <span className="font-semibold mr-3">
              {String.fromCharCode(65 + index)}.
            </span>

            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
