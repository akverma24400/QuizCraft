import { CheckCircle2, Clock3, FileQuestion, ShieldCheck } from "lucide-react";

export default function QuizGeneratedCard({ quiz, settings, onStart }) {
  return (
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10">
      <div className="flex justify-center">
        <CheckCircle2 className="w-24 h-24 text-green-600" />
      </div>

      <h1 className="text-4xl font-bold text-center mt-6">
        Quiz Generated Successfully
      </h1>

      <p className="text-center text-slate-500 mt-2">
        Your quiz is ready to begin.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mt-10">
        <div className="rounded-2xl bg-slate-100 p-6">
          <FileQuestion className="text-blue-600 mb-3" />

          <p className="text-slate-500">Questions</p>

          <h2 className="text-3xl font-bold">{quiz.length}</h2>
        </div>

        <div className="rounded-2xl bg-slate-100 p-6">
          <ShieldCheck className="text-green-600 mb-3" />

          <p className="text-slate-500">Difficulty</p>

          <h2 className="text-3xl font-bold">{settings.difficulty}</h2>
        </div>

        <div className="rounded-2xl bg-slate-100 p-6">
          <Clock3 className="text-orange-500 mb-3" />

          <p className="text-slate-500">Timer</p>

          <h2 className="text-3xl font-bold">
            {settings.timer ? "Enabled" : "Disabled"}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-100 p-6">
          <Clock3 className="text-purple-600 mb-3" />

          <p className="text-slate-500">Duration</p>

          <h2 className="text-3xl font-bold">
            {settings.timer ? `${settings.duration} Minutes` : "--"}
          </h2>
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-10 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 transition py-4 text-white text-xl font-semibold"
      >
        ▶ Start Quiz
      </button>
    </div>
  );
}
