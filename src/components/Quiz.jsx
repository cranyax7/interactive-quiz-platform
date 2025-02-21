// src/components/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { quizData } from '../data/questions';
import { saveAttempt, getAttempts } from '../db/indexedDB';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [integerInput, setIntegerInput] = useState('');

  useEffect(() => {
    loadAttempts();
  }, []);

  useEffect(() => {
    let timer;
    if (!answered && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !answered) {
      handleTimeout();
    }
    return () => clearInterval(timer);
  }, [timeLeft, answered]);

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  const handleTimeout = () => {
    setAnswered(true);
    // For MCQ, selectedAnswer will be null
    // For integer, we'll submit whatever is in the input
    const question = quizData.questions[currentQuestion];
    if (question.type === 'integer' && Number(integerInput) === question.correct) {
      setScore(score + 1);
    }
  };

  const loadAttempts = async () => {
    try {
      const savedAttempts = await getAttempts();
      setAttempts(savedAttempts);
    } catch (error) {
      console.error('Error loading attempts:', error);
    }
  };

  const handleMCQAnswer = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === quizData.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleIntegerSubmit = () => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(integerInput);
    
    if (Number(integerInput) === quizData.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setIntegerInput('');
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const attemptData = {
      score,
      totalQuestions: quizData.questions.length,
      percentage: (score / quizData.questions.length) * 100
    };
    
    try {
      await saveAttempt(attemptData);
      await loadAttempts();
      setShowResults(true);
    } catch (error) {
      console.error('Error saving attempt:', error);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswered(false);
    setIntegerInput('');
    setTimeLeft(30);
  };

  const renderQuestion = () => {
    const question = quizData.questions[currentQuestion];
    
    if (question.type === 'mcq') {
      return (
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleMCQAnswer(index)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                answered
                  ? index === question.correct
                    ? 'bg-green-500 text-white'
                    : index === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
      );
    } else if (question.type === 'integer') {
      return (
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Enter your answer"
              className="flex-1 p-4 border rounded-lg"
              value={integerInput}
              onChange={(e) => setIntegerInput(e.target.value)}
              disabled={answered}
            />
            <button
              onClick={handleIntegerSubmit}
              disabled={answered || !integerInput}
              className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Submit
            </button>
          </div>
          {answered && (
            <div className={`p-4 rounded-lg ${
              Number(selectedAnswer) === question.correct
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              Correct answer: {question.correct}
            </div>
          )}
        </div>
      );
    }
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-xl">Your Score: {score}/{quizData.questions.length}</p>
          <p className="text-lg">Percentage: {((score / quizData.questions.length) * 100).toFixed(1)}%</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Previous Attempts</h3>
          <div className="space-y-2">
            {attempts.map((attempt, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <p>Score: {attempt.score}/{attempt.totalQuestions}</p>
                <p>Percentage: {attempt.percentage.toFixed(1)}%</p>
                <p className="text-sm text-gray-500">
                  {new Date(attempt.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={restartQuiz}
          className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{quizData.title}</h1>
          <div className={`px-4 py-2 rounded-full ${
            timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            Time: {timeLeft}s
          </div>
        </div>
        <p className="text-gray-600">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl mb-4">{quizData.questions[currentQuestion].question}</h2>
        {renderQuestion()}
      </div>
      
      {answered && (
        <button
          onClick={nextQuestion}
          className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default Quiz;