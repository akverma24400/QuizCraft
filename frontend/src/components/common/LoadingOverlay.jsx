import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-[520px] p-12">
        <div className="flex flex-col items-center">
          <Loader2 className="w-14 h-14 text-blue-600 animate-spin" />

          <h2 className="mt-8 text-3xl font-bold">Generating Quiz</h2>

          <p className="mt-3 text-slate-500">Reading uploaded documents...</p>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden mt-10">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            This may take a few seconds.
          </p>
        </div>
      </div>
    </div>
  );
}
