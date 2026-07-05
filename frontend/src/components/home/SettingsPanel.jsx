import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { uploadQuizFiles } from "../../services/quizService";
import { useQuiz } from "../../context/QuizContext";

import LoadingOverlay from "../common/LoadingOverlay";

export default function SettingsPanel({ files }) {
  const navigate = useNavigate();

  const { setQuiz, setSettings, loading, setLoading, setGenerated } = useQuiz();

  const [questions, setQuestions] = useState(10);

  const [difficulty, setDifficulty] = useState("Medium");

  const [timer, setTimer] = useState(false);

  const [duration, setDuration] = useState(10);

  const durations = [10, 15, 20, 30, 45, 60, 90, 120, 180];

  async function handleGenerate() {
    if (!files.length) {
      toast.error("Please upload at least one document.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadQuizFiles({
        files,
        questions,
        difficulty,
        timer,
        duration,
      });

      if (!data.success) {
        toast.error("Quiz generation failed.");
        return;
      }

      setQuiz(data.questions);

      setSettings({
        questions,
        difficulty,
        timer,
        duration,
      });

      setGenerated(true);

      toast.success("Quiz generated successfully!");

      navigate("/quiz-ready");
    } catch (err) {
      console.error(err);

      toast.error("Unable to generate quiz.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
        <h2 className="text-3xl font-bold mb-8">Quiz Settings</h2>

        {/* Questions */}

        <div className="mb-6">
          <label className="font-semibold block mb-2">
            Number of Questions
          </label>

          <select
            value={questions}
            onChange={(e) => setQuestions(Number(e.target.value))}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Difficulty */}

        <div className="mb-6">
          <label className="font-semibold block mb-2">Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Timer */}

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Enable Timer</span>

            <input
              type="checkbox"
              checked={timer}
              onChange={() => setTimer(!timer)}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Duration */}

        {timer && (
          <div className="mb-8">
            <label className="font-semibold block mb-2">Duration</label>

            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {durations.map((item) => (
                <option key={item} value={item}>
                  {item >= 60
                    ? `${item / 60} Hour${item === 60 ? "" : "s"}`
                    : `${item} Minutes`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Generate */}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white text-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </>
  );
}
