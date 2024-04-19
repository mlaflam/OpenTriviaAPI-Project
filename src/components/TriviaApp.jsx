import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme.jsx'; // Import your custom theme

const TriviaApp = () => {
  const [questions, setQuestions] = useState(null);
  const [answerVisibility, setAnswerVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('https://the-trivia-api.com/v2/questions');
        const resultJSON = await result.json();

        // Shuffle answers for each question once
        const shuffledQuestions = resultJSON.map(question => {
          const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
          const shuffledAnswers = shuffleArray(allAnswers);
          return { ...question, shuffledAnswers };
        });

        setQuestions(shuffledQuestions);
        console.log('Success! Status:', result.status);
        console.log('JSON Results:', resultJSON);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAnswerClick = (answer, correctAnswer) => {
    const isCorrect = correctAnswer[0] === answer;
    console.log(correctAnswer);
    console.log(answer);
    console.log(isCorrect);
    setAnswerVisibility((prevVisibility) => ({
      ...prevVisibility,
      [answer]: isCorrect ? "success" : "error",
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Trivia App</h1>
        {questions && questions.map((question, questionIndex) => {
          const correctAnswer = [question.correctAnswer];
          const shuffledAnswers = question.shuffledAnswers;
          
          return (
            <div key={questionIndex}>
              <p>{question.question.text}</p>
              <div className='answers-container'>
                {shuffledAnswers.map((answer, answerIndex) => (
                  <div key={answerIndex}>
                    <Button
                      variant="contained"
                      color={answerVisibility[answer] ? (answerVisibility[answer] === "success" ? "success" : "error") : "primary"}
                      onClick={() => handleAnswerClick(answer, correctAnswer)}
                    >
                      {answer}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
};

export default TriviaApp;
