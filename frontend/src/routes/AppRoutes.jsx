import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import QuizReady from "../pages/QuizReady";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import NotFound from "../pages/NotFound";
import CheckAnswers from "@/pages/CheckAnswers";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/quiz-ready" element={<QuizReady />} />

      <Route path="/quiz" element={<Quiz />} />

      <Route path="/result" element={<Result />} />

      <Route path="/check-answers" element={<CheckAnswers />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
