import { useState } from "react";
import QuestionsPage from "./components/QuestionsPage";
import StartPage from "./components/StartPage";
import FinishPage from "./components/FinishPage";
import QuestionContextProvider from "./components/store/QuestionContext";

export default function StartingPage() {
  const [quizHasStarted, setQuizHasStarted] = useState(false);
  const [quizHasFinished, setQuizHasFinished] = useState(false);

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
    <QuestionContextProvider onFinish={handleFinishQuiz}>
      {!quizHasStarted && !quizHasFinished && (
        <StartPage onStart={handleStartQuiz} />
      )}
      {quizHasStarted && <QuestionsPage />}
      {quizHasFinished && <FinishPage onTryAgain={handleAgain} />}
    </QuestionContextProvider>
  );
}
