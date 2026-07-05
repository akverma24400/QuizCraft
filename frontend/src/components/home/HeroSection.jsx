import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, FileText } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Blur */}

      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300 opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-blue-700 font-medium shadow-sm">
            <Sparkles size={18} />
            AI Powered Quiz Generator
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-slate-900">
            Transform
            <span className="text-blue-600"> Documents </span>
            into
            <span className="text-indigo-600"> Smart Quizzes</span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            Upload PDFs, DOCX, PPTs, or Notes and instantly generate AI-powered
            quizzes with customizable difficulty, timer, and number of
            questions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-blue-600" />

              <span className="font-medium text-slate-700">AI Powered</span>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" />

              <span className="font-medium text-slate-700">
                Multiple File Support
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
