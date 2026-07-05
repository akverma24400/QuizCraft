import { Brain, FileText, Timer, Trophy } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-blue-600" />,
      title: "AI Powered",
      desc: "Generate intelligent quizzes using Groq AI from your uploaded study material.",
    },
    {
      icon: <FileText className="w-10 h-10 text-green-600" />,
      title: "Multiple Formats",
      desc: "Supports PDF, DOC, DOCX, PPT, PPTX and TXT documents.",
    },
    {
      icon: <Timer className="w-10 h-10 text-orange-500" />,
      title: "Timer Mode",
      desc: "Practice with or without a timer for interview preparation.",
    },
    {
      icon: <Trophy className="w-10 h-10 text-purple-600" />,
      title: "Instant Results",
      desc: "View score, accuracy and performance after quiz completion.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center text-slate-800">
          About QuizCraft AI
        </h1>

        <p className="text-center text-slate-500 mt-5 max-w-3xl mx-auto text-lg">
          QuizCraft AI converts your study material into interactive quizzes
          using Artificial Intelligence, helping students prepare smarter.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 transition"
            >
              {feature.icon}

              <h2 className="text-xl font-semibold mt-5">{feature.title}</h2>

              <p className="text-slate-500 mt-3">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
