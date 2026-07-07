import { Link } from "react-router-dom";
import { BookOpen, Mail, Send, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}

          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">QuizCraft</h2>

                <p className="text-slate-400 text-sm">AI Quiz Generator</p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Generate AI-powered quizzes from PDFs, DOCX, PPT and TXT files in
              seconds.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="font-semibold text-xl mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-slate-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-slate-400 hover:text-white transition"
              >
                About
              </Link>

              <Link
                to="/quiz"
                className="text-slate-400 hover:text-white transition"
              >
                Quiz
              </Link>
            </div>
          </div>

          {/* Features */}

          <div>
            <h3 className="font-semibold text-xl mb-5">Features</h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <p>📄 Multiple File Upload</p>

              <p>🤖 AI Quiz Generation</p>

              <p>⚡ Ai Powered</p>

              <p>📊 Instant Analytics</p>
            </div>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="font-semibold text-xl mb-5">Stay Updated</h3>

            <p className="text-slate-400 mb-5">
              Subscribe for product updates.
            </p>

            <div className="flex">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-l-xl bg-slate-800 border border-slate-700 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
                />
              </div>

              <button className="rounded-r-xl bg-blue-600 px-5 hover:bg-blue-700 transition">
                <Send />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} QuizCraft AI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
