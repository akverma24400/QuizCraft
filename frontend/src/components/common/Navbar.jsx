import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isQuizPage = location.pathname === "/quiz";

  const [open, setOpen] = useState(false);

  const handleEndQuiz = () => {
    setOpen(false);
    navigate("/result");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />

            <span className="text-2xl font-bold text-slate-800">
              QuizCraft AI
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            {!isQuizPage && (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-blue-600 transition"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-blue-600 transition"
                  }
                >
                  About
                </NavLink>
              </>
            )}

            {isQuizPage && (
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 transition px-5 py-2 text-white font-medium">
                    <LogOut className="w-4 h-4" />
                    End Quiz
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white border shadow-2xl rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>End Quiz?</AlertDialogTitle>

                    <AlertDialogDescription>
                      Are you sure you want to end the quiz?
                      <br />
                      Your progress will be submitted immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleEndQuiz}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      End Quiz
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
