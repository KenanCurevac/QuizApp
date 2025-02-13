import { createContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const QuestionContext = createContext();

async function fetchQuestions() {
  const response = await axios.get("https://the-trivia-api.com/v2/questions");
  return response.data;
}

function QuestionContextProvider({ children, onFinish }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [history, setHistory] = useState([]);
  const [newCountdownTrigger, setNewCountdownTrigger] = useState(false);

  const pickedAnswersRef = useRef([]);

  const { fetchedData, setFetchedData, isFetching, error, setNewGameTrigger } =
    useFetch(fetchQuestions);

  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      const unshuffledOptions = [
        fetchedData[questionNumber].correctAnswer,
        ...fetchedData[questionNumber].incorrectAnswers,
      ];
      const currentQuestionObject = {
        question: fetchedData[questionNumber].question.text,
        correctAnswer: fetchedData[questionNumber].correctAnswer,
        options: unshuffledOptions.sort(() => Math.random() - 0.5),
      };

      setCurrentQuestion(currentQuestionObject);
      setHistory((prevHistory) => [
        ...prevHistory,
        {
          question: currentQuestionObject.question,
          correctAnswer: currentQuestionObject.correctAnswer,
          options: currentQuestionObject.options,
        },
      ]);
    }
  }, [fetchedData, questionNumber]);

  function handleNextQuestion() {
    const questionCounter = setTimeout(() => {
      setQuestionNumber((prevNum) => {
        if (prevNum < fetchedData.length - 1) {
          return prevNum + 1;
        } else {
          onFinish();
          return prevNum;
        }
      });

      setNewCountdownTrigger((trigger) => !trigger);
    }, 1500);

    return () => {
      clearTimeout(questionCounter);
    };
  }

  function handleNewGame() {
    setNewGameTrigger((trigger) => !trigger);
    setFetchedData(null);
    setQuestionNumber(0);
    setHistory([]);
  }

  function handleAddPicksToHistory(myPicks) {
    pickedAnswersRef.current = myPicks;
  }

  const questionCtx = {
    handleNextQuestion,
    currentQuestion,
    fetchedData,
    isFetching,
    error,
    handleNewGame,
    newCountdownTrigger,
    handleAddPicksToHistory,
    pickedAnswersRef,
    history,
  };

  return (
    <QuestionContext.Provider value={questionCtx}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContextProvider;

export { QuestionContext };
