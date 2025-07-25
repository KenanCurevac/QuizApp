import axios from "axios";
import { quizDataActions, dataStatusActions } from ".";
import { AppDispatch } from "./index";

export type APIResponse = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  regions: string[];
  tags: string[];
  type: string;
};

type QuizQuestion = {
  question: string;
  correctAnswer: string;
  options: string[];
};

export function fetchQuizData() {
  return async (dispatch: AppDispatch) => {
    dispatch(dataStatusActions.setLoading());

    async function fetchData() {
      const response = await axios.get(
        "https://the-trivia-api.com/v2/questions"
      );
      return response.data;
    }

    try {
      const fetchedQuizResponse = await fetchData();
      dispatch(dataStatusActions.resetStatus());
      const quizData = transformResponse(fetchedQuizResponse);
      dispatch(quizDataActions.setQuizData(quizData));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(dataStatusActions.setError(error.message));
      } else {
        dispatch(dataStatusActions.setError("An unknown error occurred"));
      }
    }
  };
}

function transformResponse(response: APIResponse[]): QuizQuestion[] {
  if (response && response.length > 0) {
    return response.map((object) => ({
      question: object.question.text,
      correctAnswer: object.correctAnswer,
      options: [object.correctAnswer, ...object.incorrectAnswers].sort(
        () => Math.random() - 0.5
      ),
    }));
  } else {
    return [];
  }
}
