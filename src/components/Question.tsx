import "./Question.css";
import { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "./store/QuestionContext";

type QuestionProps = {
  onRevealAnswer: () => void;
  showAnswer: boolean;
  addSkipToHistoryTrigger: boolean;
};

export default function Question({
  onRevealAnswer,
  showAnswer,
  addSkipToHistoryTrigger,
}: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { currentQuestion, handleNextQuestion, handleAddPicksToHistory } =
    useContext(QuestionContext);
  const { question, correctAnswer, options } = currentQuestion;

  const pickedOptionsRef = useRef<string[]>([]);

  useEffect(() => {
    if (pickedOptionsRef.current.length > 0) {
      pickedOptionsRef.current.push("skipped");
    }

    if (pickedOptionsRef.current.length === 10) {
      handleAddPicksToHistory([...pickedOptionsRef.current]);
    }
  }, [addSkipToHistoryTrigger]);

  function handlePickedOption(option: string) {
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
        <div className="answer-options">
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
