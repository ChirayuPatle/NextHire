import React, { useState } from "react";

// Question type definition
type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "Which React hook is used to manage component state?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
  },
  {
    id: 2,
    question: "What is the primary purpose of React?",
    options: ["Database Management", "UI Development", "Server-side Rendering", "Machine Learning"],
    correctAnswer: "UI Development",
  },
  {
    id: 3,
    question: "What is the primary purpose of React?",
    options: ["Database Management", "UI Development", "Server-side Rendering", "Machine Learning"],
    correctAnswer: "UI Development",
  },
  {
    id: 4,
    question: "What is the primary purpose of React?",
    options: ["Database Management", "UI Development", "Server-side Rendering", "Machine Learning"],
    correctAnswer: "UI Development",
  },
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700">
        {isSubmitted ? (
          <h1 className="text-white text-2xl font-bold text-center">Quiz Submitted! Thank you for participating.</h1>
        ) : (
          <>
            <h1 className="text-white text-2xl font-bold mb-6 text-center">Q{currentQuestionIndex + 1}) {questions[currentQuestionIndex].question}</h1>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-4 border rounded-lg text-lg font-medium text-white ${
                    selectedAnswer === option ? "bg-blue-600 border-blue-400" : "bg-gray-700 border-gray-600 hover:bg-blue-500 hover:border-blue-400"
                  }`}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="p-2 px-5 rounded-full bg-blue-500 text-lg font-semibold hover:bg-blue-400"
                >
                  Next ▶
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="p-2 px-5 rounded-full bg-green-500 text-lg font-semibold hover:bg-green-400"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
