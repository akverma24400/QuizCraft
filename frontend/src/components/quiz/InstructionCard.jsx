import { CircleAlert } from "lucide-react";

export default function InstructionCard({
  questions,
  timer,
  duration,
  onStart,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
      <div className="flex items-center gap-3">
        <CircleAlert className="text-blue-600 w-8 h-8" />

        <h1 className="text-3xl font-bold">Quiz Instructions</h1>
      </div>

      <div className="mt-8 space-y-4 text-lg">
        <p>• Total Questions : {questions}</p>

        <p>• Timer :{timer ? " Enabled" : " Disabled"}</p>

        {timer && <p>• Duration : {duration} Minutes</p>}

        <p>• Select only one option for each question.</p>

        <p>• Clicking another option will replace the previous one.</p>

        <p>• Click Submit on the last question.</p>

        <p>• No negative marking.</p>
      </div>

      <button
        onClick={onStart}
        className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-white text-xl hover:bg-blue-700"
      >
        Start Quiz
      </button>
    </div>
  );
}
