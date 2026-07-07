import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

export default function Timer() {
  const navigate = useNavigate();

  const { settings, started, submitted, setSubmitted } = useQuiz();

  const [timeLeft, setTimeLeft] = useState(settings.duration * 60);

  useEffect(() => {
    setTimeLeft(settings.duration * 60);
  }, [settings.duration]);

  useEffect(() => {
    if (!settings.timer || !started || submitted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(true);
          navigate("/result");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, submitted, settings.timer, navigate, setSubmitted]);

  if (!settings.timer) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  let color = "text-green-600 border-green-200";

  if (timeLeft <= 300) color = "text-orange-500 border-orange-200";

  if (timeLeft <= 60) color = "text-red-600 border-red-200";

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border bg-white shadow-sm ${color}`}
    >
      <Clock3 className="w-6 h-6" />

      <div>
        <p className="text-xs uppercase tracking-wide">Time Left</p>

        <h3 className="text-xl font-bold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </h3>
      </div>
    </div>
  );
}
