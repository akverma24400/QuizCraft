import { useNavigate } from "react-router-dom";

import QuizGeneratedCard from "../components/quiz/QuizGeneratedCard";
import { useQuiz } from "../context/QuizContext";

export default function QuizReady() {
  const navigate = useNavigate();

  const { quiz, settings } = useQuiz();

  return (
    <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center px-6">
      <QuizGeneratedCard
        quiz={quiz}
        settings={settings}
        onStart={() => navigate("/quiz")}
      />
    </div>
  );
}
