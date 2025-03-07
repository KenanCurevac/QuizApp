import { useEffect, useState } from "react";
import { QuizData } from "../../model/quizData";

type FetchFunction = () => Promise<QuizData[]>;

type FetchState = {
  fetchedData: QuizData[] | null;
  setFetchedData: React.Dispatch<React.SetStateAction<QuizData[] | null>>;
  isFetching: boolean;
  error: { message: string } | null;
  setFetchNewDataTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useFetch(fetchFun: FetchFunction): FetchState {
  const [fetchedData, setFetchedData] = useState<QuizData[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [fetchNewDataTrigger, setFetchNewDataTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const data = await fetchFun();
        setFetchedData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError({ message: error.message });
        } else {
          setError({ message: "An unexpected error occurred." });
        }
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFun, fetchNewDataTrigger]);

  return {
    fetchedData,
    setFetchedData,
    isFetching,
    error,
    setFetchNewDataTrigger,
  };
}
