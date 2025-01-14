import { useContext, useEffect, useRef, useState } from "react";
import "./Question.css";
import { QuestionContext } from "./store/QuestionContext";

export default function Question({
  onStopTimer,
  showAnswer,
  skippedForReview,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    currentQuestion,
    shuffledOptions,
    handleNextQuestion,
    handleReviewMyPicks,
  } = useContext(QuestionContext);
  const { question, correctAnswer, wrongAnswers } = currentQuestion;

  const pickedOptionsRef = useRef([]);

  function handlePickOption(option) {
    onStopTimer();
    setSelectedOption(option);
    handleNextQuestion();
    pickedOptionsRef.current.push(option);
    handleSendPicks();
  }

  useEffect(() => {
    if (pickedOptionsRef.current.length > 0) {
      pickedOptionsRef.current.push(" ");
    }
    handleSendPicks();
  }, [skippedForReview]);

  function handleSendPicks() {
    if (pickedOptionsRef.current.length === 10) {
      handleReviewMyPicks([...pickedOptionsRef.current]);
    }
  }

  return (
    <>
      {question && <div className="question-frame">{question}</div>}
      {shuffledOptions && shuffledOptions.length > 0 ? (
        <div className={`answer-options ${showAnswer ? "show-answer" : ""}`}>
          {shuffledOptions.map((option, index) => {
            let optionColor;
            if (showAnswer && option === correctAnswer) {
              optionColor = "correct-answer";
            } else if (
              showAnswer &&
              wrongAnswers.includes(option) &&
              selectedOption === option
            ) {
              optionColor = "wrong-answer";
            } else {
              optionColor = "";
            }

            return (
              <button
                key={index}
                className={`option ${optionColor} ${
                  showAnswer ? "disabled-button" : ""
                }`}
                onClick={() => handlePickOption(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div>Loading options...</div>
      )}
    </>
  );
}
