import Question from "./Question";
import "./QuestionsPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "./store/QuestionContext";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function QuestionsPage() {
  const [timeLeft, setTimeLeft] = useState(100);
  const [showAnswer, setShowAnswer] = useState(false);
  const [skippedForReview, setSkippedForReview] = useState(false);

  const { isFetching, error, questionsData, newTimer, handleNextQuestion } =
    useContext(QuestionContext);

  const intervalRef = useRef();

  useEffect(() => {
    setShowAnswer(false);
    setTimeLeft(100);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 2);
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, [newTimer]);

  function handleStopTimer() {
    clearInterval(intervalRef.current);
    setShowAnswer(true);
  }

  useEffect(() => {
    if (timeLeft === 0) {
      handleStopTimer();
      handleNextQuestion();
      setSkippedForReview((trigger) => !trigger);
    }
  }, [timeLeft]);

  if (isFetching) {
    return <div className="loading-message">Loading questions...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!questionsData || questionsData.length === 0) {
    return <div className="no-questions-message">No questions available.</div>;
  }

  return (
    <div className="start-site">
      <div className="quiz-frame">
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={timeLeft}
            sx={{ height: "8px", borderRadius: "10px" }}
          />
        </Box>
        {questionsData && (
          <Question
            onStopTimer={handleStopTimer}
            showAnswer={showAnswer}
            skippedForReview={skippedForReview}
          />
        )}
      </div>
    </div>
  );
}
