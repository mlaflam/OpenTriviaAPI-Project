import React, { useState, useEffect } from 'react';

const TriviaApp = () => {
  const [questions, setQuestions] = useState(null);
  const [answerVisibility, setAnswerVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('https://opentdb.com/api.php?amount=10');
        const resultJSON = await result.json();
        setQuestions(resultJSON.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const toggleAnswerVisibility = index => {
  //   setAnswerVisibility(prevState => ({
  //     ...prevState,
  //     [index]: !prevState[index]
  //   }));
  // };

  // const handleClick = () => {
  //   setAnswerVisibility(!answerVisibility);
  // };
  {/* </div>onClick={() => toggleAnswerVisibility(index)}*/}

  return (
    <div>
      <h1>Trivia App</h1>
      {questions && questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <div className='answers-container'>
            <div>
              <button>{question.correct_answer}</button>
            </div>
            {question.incorrect_answers.map((answer, answerIndex) => (
              <>
              <div key={answerIndex}>
                  <button className={answerVisibility[index] ? "incorrect-button-hide" : "incorrect-button-show"}
                    > {answer}</button>
              </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TriviaApp;
