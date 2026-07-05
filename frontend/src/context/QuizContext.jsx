import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quiz, setQuiz] = useState([]);

  const [files, setFiles] = useState([]);

  const [answers, setAnswers] = useState({});

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [started, setStarted] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [generated, setGenerated] = useState(false);

  const [score, setScore] = useState(0);

  const [settings, setSettings] = useState({
    difficulty: "Medium",

    questions: 10,

    timer: false,

    duration: 10,
  });

  const resetQuiz = () => {
    setQuiz([]);

    setFiles([]);

    setAnswers({});

    setCurrentQuestion(0);

    setStarted(false);

    setSubmitted(false);

    setGenerated(false);

    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,

        files,
        setFiles,

        answers,
        setAnswers,

        currentQuestion,
        setCurrentQuestion,

        started,
        setStarted,

        submitted,
        setSubmitted,

        loading,
        setLoading,

        generated,
        setGenerated,

        score,
        setScore,

        settings,
        setSettings,

        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
