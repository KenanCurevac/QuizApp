import "./QuestionsPage.css";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { myPicksActions, questionNumberActions } from "../store";

type QuestionsPageProps = {
  onFinish: () => void;
};

export default function QuestionsPage({ onFinish }: QuestionsPageProps) {
  const [timeLeft, setTimeLeft] = useState(100);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCountdownTrigger, setNewCountdownTrigger] = useState(false);
  const [currentPick, setCurrentPick] = useState("");

  const quizData = useAppSelector((state) => state.quizData);
  const questionNumber = useAppSelector((state) => state.questionNumber);
  const isLoading = useAppSelector((state) => state.dataStatus.isLoading);
  const errorMessage = useAppSelector((state) => state.dataStatus.errorMessage);
  const dispatch = useAppDispatch();

  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setShowAnswer(false);
    setTimeLeft(100);

    countdownRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 2);
    }, 200);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [newCountdownTrigger]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleQuestions("skipped");
    }
  }, [timeLeft]);

  function handleQuestions(option: string) {
    if (countdownRef.current !== null) {
      clearInterval(countdownRef.current);
    }
    setCurrentPick(option);
    dispatch(myPicksActions.setMyPicks(option));
    setShowAnswer(true);

    const questionCounter = setTimeout(() => {
      if (quizData && questionNumber < quizData.length - 1) {
        dispatch(questionNumberActions.nextQuestion());
      } else {
        onFinish();
      }
      setNewCountdownTrigger((trigger) => !trigger);
    }, 1500);

    return () => {
      clearTimeout(questionCounter);
    };
  }

  if (isLoading) {
    return <CircularProgress className="loading-spinner" />;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  const { question, correctAnswer, options } = quizData[questionNumber];

  return (
    <div className="question-page">
      <div className="quiz-frame">
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={timeLeft} />
        </Box>
        {quizData && (
          <div>
            {question && <div className="question-frame">{question}</div>}
            {options && options.length > 0 && (
              <div className="answer-options">
                {options.map((option, index) => {
                  let optionColor;

                  if (showAnswer && option === correctAnswer) {
                    optionColor = "correct-answer";
                  } else if (
                    showAnswer &&
                    option !== correctAnswer &&
                    option === currentPick
                  ) {
                    optionColor = "wrong-answer";
                  }

                  return (
                    <button
                      key={index}
                      className={`option ${optionColor} ${
                        showAnswer ? "disabled-button" : ""
                      }`}
                      onClick={() => {
                        handleQuestions(option);
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
