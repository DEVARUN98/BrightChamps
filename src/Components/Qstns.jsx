import React, { useState, useEffect } from 'react';

const Qstns = () => {
  const [questions, setQuestions] = useState([
    { question: 'What is 2 + 2?', options: [3, 4, 5], answer: 4 },
    { question: 'What is 3 + 5?', options: [7, 8, 9], answer: 8 }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(10);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isTimeUp || isSubmitted) return;

    if (timer === 0) {
      setIsTimeUp(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isTimeUp, isSubmitted]);

  const handleOptionChange = (questionIndex, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsTimeUp(true);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.answer ? 1 : 0);
    }, 0);
  };

  if (isSubmitted || isTimeUp) {
    return (
      <div>
        <h2>Your Score: {calculateScore()} / {questions.length}</h2>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz</h1>
      <h2>Time left: {timer} seconds</h2>
      <div>
        <h3>{questions[currentQuestion].question}</h3>
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name={`question${currentQuestion}`}
              value={option}
              onChange={() => handleOptionChange(currentQuestion, option)}
            />
            {option}
          </div>
        ))}
      </div>
      <button
        onClick={() => setCurrentQuestion(prev => prev + 1)}
        disabled={currentQuestion === questions.length - 1}
      >
        Next Question
      </button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default Qstns;
