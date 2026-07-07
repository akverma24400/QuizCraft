import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useQuiz } from "../context/QuizContext";

import InstructionCard from "../components/quiz/InstructionCard";
import QuestionCard from "../components/quiz/QuestionCard";
import QuestionIndex from "../components/quiz/QuestionIndex";
import Timer from "../components/quiz/Timer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function Quiz() {
  const navigate = useNavigate();

  const {
    quiz,

    settings,

    started,
    setStarted,

    currentQuestion,
    setCurrentQuestion,

    answers,

    submitted,
    setSubmitted,
  } = useQuiz();

  const [dialogOpen, setDialogOpen] = useState(false);

  if (!quiz.length) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h2 className="text-2xl font-bold">No Quiz Found</h2>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  const unansweredCount = quiz.length - answeredCount;

  const startQuiz = () => {
    setStarted(true);
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setDialogOpen(true);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-100 flex justify-center items-center px-6">
        <InstructionCard
          questions={quiz.length}
          timer={settings.timer}
          duration={settings.duration}
          onStart={startQuiz}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quiz Assessment</h1>

            <p className="text-slate-500">
              Question {currentQuestion + 1}
              {" / "}
              {quiz.length}
            </p>
          </div>

          <Timer />
        </div>
        <div className="grid grid-cols-12 gap-10">
          {/* Left */}

          <div className="col-span-8">
            <QuestionCard />

            <div className="mt-8 bg-white rounded-2xl shadow-lg border p-6">
              <div className="flex justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-8 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>

                <button
                  onClick={nextQuestion}
                  className={`px-8 py-3 rounded-xl text-white font-semibold transition ${
                    currentQuestion === quiz.length - 1
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {currentQuestion === quiz.length - 1 ? "Submit" : "Next →"}
                </button>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="col-span-4">
            <QuestionIndex />
          </div>
        </div>{" "}
        {/* Submit Dialog */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to submit the quiz?
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Answered Questions</span>

                    <span className="font-semibold text-green-600">
                      {answeredCount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Unanswered Questions</span>

                    <span className="font-semibold text-red-600">
                      {unansweredCount}
                    </span>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={() => {
                  setSubmitted(true);

                  navigate("/result");
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
