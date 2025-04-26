import { useEffect, useState } from "react";
import QuestionsPage from "./components/QuestionsPage";
import StartPage from "./components/StartPage";
import FinishPage from "./components/FinishPage";
import QuestionContextProvider from "./store/QuestionContext";
import { useAppDispatch } from "./store/hooks";
import { fetchQuizData } from "./store/cart-actions";

export default function StartingPage() {
  const [quizHasStarted, setQuizHasStarted] = useState(false);
  const [quizHasFinished, setQuizHasFinished] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuizData());
  }, []);

  function handleStartQuiz() {
    setQuizHasStarted(true);
  }

  function handleFinishQuiz() {
    setQuizHasStarted(false);
    setQuizHasFinished(true);
  }

  function handleAgain() {
    setQuizHasStarted(true);
    setQuizHasFinished(false);
  }

  return (
    <QuestionContextProvider>
      {!quizHasStarted && !quizHasFinished && (
        <StartPage onStart={handleStartQuiz} />
      )}
      {quizHasStarted && <QuestionsPage onFinish={handleFinishQuiz} />}
      {quizHasFinished && <FinishPage onTryAgain={handleAgain} />}
    </QuestionContextProvider>
  );
}
