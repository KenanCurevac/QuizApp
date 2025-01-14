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
  const [newTimer, setNewTimer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [allQuestions, setAllQuestions] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [allShuffledOptions, setAllShuffledOptions] = useState([]);

  const reviewPicksRef = useRef([]);

  const {
    fetchedData: questionsData,
    setFetchedData: setQuestionsData,
    isFetching,
    error,
    setNewGame,
  } = useFetch(fetchQuestions);

  useEffect(() => {
    if (questionsData && questionsData.length > 0) {
      const actualQuestion = {
        question: questionsData[questionNumber].question.text,
        correctAnswer: questionsData[questionNumber].correctAnswer,
        wrongAnswers: questionsData[questionNumber].incorrectAnswers,
      };
      setCurrentQuestion(actualQuestion);
      setAllQuestions((prevQuestions) => {
        return [
          ...prevQuestions,
          {
            question: actualQuestion.question,
            correctAnswer: actualQuestion.correctAnswer,
          },
        ];
      });

      const allOptions = [
        questionsData[questionNumber].correctAnswer,
        ...questionsData[questionNumber].incorrectAnswers,
      ];
      const shuffled = allOptions.sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setAllShuffledOptions((prevOptions) => [...prevOptions, shuffled]);
    }
  }, [questionsData, questionNumber]);

  function handleNextQuestion() {
    const questionCounter = setTimeout(() => {
      setQuestionNumber((prevNum) => {
        if (prevNum < questionsData.length - 1) {
          return prevNum + 1;
        } else {
          onFinish();
          return prevNum;
        }
      });

      setNewTimer((trigger) => !trigger);
    }, 1500);

    return () => {
      clearTimeout(questionCounter);
    };
  }

  function handleNewGame() {
    setNewGame((trigger) => !trigger);
    setQuestionsData(null);
    setQuestionNumber(0);
    setAllQuestions([]);
    setAllShuffledOptions([]);
  }

  function handleReviewMyPicks(myPicks) {
    reviewPicksRef.current = myPicks;
  }

  const questionCtx = {
    handleNextQuestion,
    currentQuestion,
    allQuestions,
    shuffledOptions,
    allShuffledOptions,
    questionsData,
    isFetching,
    error,
    handleNewGame,
    newTimer,
    handleReviewMyPicks,
    reviewPicksRef,
  };

  return (
    <QuestionContext.Provider value={questionCtx}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContextProvider;

export { QuestionContext };
