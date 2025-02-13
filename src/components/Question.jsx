import { useContext, useEffect, useRef, useState } from "react";
import "./Question.css";
import { QuestionContext } from "./store/QuestionContext";

export default function Question({
  onRevealAnswer,
  showAnswer,
  addSkipToHistoryTrigger,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const { currentQuestion, handleNextQuestion, handleAddPicksToHistory } =
    useContext(QuestionContext);
  const { question, correctAnswer, options } = currentQuestion;

  const pickedOptionsRef = useRef([]);

  useEffect(() => {
    if (pickedOptionsRef.current.length > 0) {
      pickedOptionsRef.current.push("skipped");
    }

    if (pickedOptionsRef.current.length === 10) {
      handleAddPicksToHistory([...pickedOptionsRef.current]);
    }
  }, [addSkipToHistoryTrigger]);

  function handlePickedOption(option) {
    onRevealAnswer();
    setSelectedOption(option);
    handleNextQuestion();
    pickedOptionsRef.current.push(option);

    if (pickedOptionsRef.current.length === 10) {
      handleAddPicksToHistory([...pickedOptionsRef.current]);
    }
  }

  return (
    <>
      {question && <div className="question-frame">{question}</div>}
      {options && options.length > 0 && (
        <div className={`answer-options ${showAnswer ? "show-answer" : ""}`}>
          {options.map((option, index) => {
            let optionColor;

            if (showAnswer && option === correctAnswer) {
              optionColor = "correct-answer";
            } else if (
              showAnswer &&
              correctAnswer !== option &&
              selectedOption === option
            ) {
              optionColor = "wrong-answer";
            }

            return (
              <button
                key={index}
                className={`option ${optionColor} ${
                  showAnswer ? "disabled-button" : ""
                }`}
                onClick={() => handlePickedOption(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
