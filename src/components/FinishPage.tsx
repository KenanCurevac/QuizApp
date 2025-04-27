import "./FinishPage.css";
import { useEffect } from "react";
import trophy from "../assets/trophy.webp";
import Review from "./Review";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { myPicksActions, questionNumberActions } from "../store";
import { fetchQuizData } from "../store/cart-actions";

type FinishPageProps = {
  onTryAgain: () => void;
};

export default function FinishPage({ onTryAgain }: FinishPageProps) {
  const allQuestions = useAppSelector((state) => state.quizData);
  const myPicks = useAppSelector((state) => state.myPicks);
  const dispatch = useAppDispatch();

  function handleNewGame() {
    onTryAgain();
    dispatch(fetchQuizData());
    dispatch(questionNumberActions.startAgain());
    dispatch(myPicksActions.resetMyPicks());
  }

  useEffect(() => {
    const img = new Image();
    img.src = trophy;
  }, []);

  const correctPicks = myPicks.filter(
    (pick, index) => pick === allQuestions[index].correctAnswer
  );
  const wrongPicks = myPicks.filter(
    (pick, index) =>
      pick !== allQuestions[index].correctAnswer && pick !== "skipped"
  );
  const skipped = myPicks.filter((pick) => pick === "skipped");

  return (
    <div className="finish-page">
      <div className="finish-frame">
        <img src={trophy} alt="Finish Page Picture" className="finish-image" />
        <h2 className="finish-header">Quiz completed!</h2>
        <div className="results">
          <div className="result">
            <div className="answer-count">{`${correctPicks.length}`}</div>{" "}
            {`Correct answer${correctPicks.length !== 1 ? "s" : ""}`}
          </div>
          <span className="separator"></span>
          <div className="result">
            <div className="answer-count">{`${wrongPicks.length}`}</div>{" "}
            {`Wrong answer${wrongPicks.length !== 1 ? "s" : ""}`}
          </div>
          <span className="separator"></span>
          <div className="result">
            <div className="answer-count">{`${skipped.length}`}</div>{" "}
            {`Skipped answer${skipped.length !== 1 ? "s" : ""}`}
          </div>
        </div>
        <button className="again-button" onClick={handleNewGame}>
          Try Again
        </button>
      </div>
      <div className="review-container">
        <Review allQuestions={allQuestions} myPicks={myPicks} />
      </div>
    </div>
  );
}
