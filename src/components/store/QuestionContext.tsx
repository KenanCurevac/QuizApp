import { createContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { QuizData } from "../../model/quizData";
import { QuestionData } from "../../model/questionData";

type QuestionContextProviderProps = {
  children: React.ReactNode;
  onFinish: () => void;
};

type ContextObject = {
  handleNextQuestion: () => void;
  currentQuestion: QuestionData;
  fetchedData: QuizData[];
  isFetching: boolean;
  error: any;
  handleNewGame: () => void;
  newCountdownTrigger: boolean;
  handleAddPicksToHistory: (myPicks: string[]) => void;
  pickedAnswersRef: string[];
  history: QuestionData[];
};

const QuestionContext = createContext<ContextObject>({
  handleNextQuestion: () => {},
  currentQuestion: { question: "", correctAnswer: "", options: [] },
  fetchedData: [],
  isFetching: false,
  error: null,
  handleNewGame: () => {},
  newCountdownTrigger: false,
  handleAddPicksToHistory: () => {},
  pickedAnswersRef: [],
  history: [],
});

async function fetchQuestions() {
  const response = await axios.get("https://the-trivia-api.com/v2/questions");
  return response.data;
}

function QuestionContextProvider({
  children,
  onFinish,
}: QuestionContextProviderProps) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData>({
    question: "",
    correctAnswer: "",
    options: [],
  });
  const [history, setHistory] = useState<QuestionData[]>([]);
  const [newCountdownTrigger, setNewCountdownTrigger] = useState(false);

  const pickedAnswersRef = useRef<string[]>([]);

  const {
    fetchedData,
    setFetchedData,
    isFetching,
    error,
    setFetchNewDataTrigger,
  } = useFetch(fetchQuestions);

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
      if (fetchedData && questionNumber < fetchedData.length - 1) {
        setQuestionNumber((prevNum) => {
          return prevNum + 1;
        });
      } else {
        onFinish();
      }

      setNewCountdownTrigger((trigger) => !trigger);
    }, 1500);

    return () => {
      clearTimeout(questionCounter);
    };
  }

  function handleNewGame() {
    setFetchNewDataTrigger((trigger) => !trigger);
    setFetchedData(null);
    setQuestionNumber(0);
    setHistory([]);
  }

  function handleAddPicksToHistory(myPicks: string[]) {
    pickedAnswersRef.current = myPicks;
  }

  const questionCtx: ContextObject = {
    handleNextQuestion,
    currentQuestion,
    fetchedData: fetchedData || [],
    isFetching,
    error,
    handleNewGame,
    newCountdownTrigger,
    handleAddPicksToHistory,
    pickedAnswersRef: pickedAnswersRef.current,
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
