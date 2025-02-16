import { QuizData } from "../model/quizData";
import "./DataStatus.css";
import CircularProgress from "@mui/material/CircularProgress";

type DataStatusProps = {
  fetchedData: QuizData[];
  isFetching: boolean;
  error: any;
};

export default function DataStatus({
  fetchedData,
  isFetching,
  error,
}: DataStatusProps) {
  if (isFetching) {
    return <CircularProgress className="loading-spinner" />;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!isFetching && !fetchedData) {
    return (
      <div className="error-message" style={{ margin: "36vh 24vw" }}>
        No Questions available.
      </div>
    );
  }

  return null;
}
