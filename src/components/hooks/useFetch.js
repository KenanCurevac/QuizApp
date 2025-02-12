import { useEffect, useState } from "react";

export default function useFetch(fetchFun) {
  const [fetchedData, setFetchedData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [newGameTrigger, setNewGameTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFun();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFun, newGameTrigger]);

  return {
    fetchedData,
    setFetchedData,
    isFetching,
    error,
    setNewGameTrigger,
  };
}
