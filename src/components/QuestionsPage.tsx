import "./QuestionsPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "./store/QuestionContext";
import Question from "./Question";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DataStatus from "./DataStatus";

export default function QuestionsPage() {
  const [timeLeft, setTimeLeft] = useState(100);
  const [showAnswer, setShowAnswer] = useState(false);
  const [addSkipToHistoryTrigger, setAddSkipToHistoryTrigger] = useState(false);

  const {
    isFetching,
    error,
    fetchedData,
    newCountdownTrigger,
    handleNextQuestion,
  } = useContext(QuestionContext);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setShowAnswer(false);
    setTimeLeft(100);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 2);
    }, 200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [newCountdownTrigger]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleRevealAnswer();
      handleNextQuestion();
      setAddSkipToHistoryTrigger((trigger) => !trigger);
    }
  }, [timeLeft]);

  function handleRevealAnswer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setShowAnswer(true);
  }

  const statusMessage = (
    <DataStatus
      fetchedData={fetchedData}
      isFetching={isFetching}
      error={error}
    />
  );

  if (isFetching || error || !fetchedData || fetchedData.length === 0) {
    return statusMessage;
  }

  return (
    <div className="question-page">
      <div className="quiz-frame">
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={timeLeft} />
        </Box>
        {fetchedData && (
          <Question
            onRevealAnswer={handleRevealAnswer}
            showAnswer={showAnswer}
            addSkipToHistoryTrigger={addSkipToHistoryTrigger}
          />
        )}
      </div>
    </div>
  );
}
