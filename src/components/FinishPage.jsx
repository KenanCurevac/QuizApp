import "./FinishPage.css";
import { useContext } from "react";
import { QuestionContext } from "./store/QuestionContext";
import trophy from "../assets/trophy.webp";
import Review from "./Review";
import Result from "./Result";

export default function FinishPage({ onTryAgain }) {
  const { handleNewGame, history, pickedAnswersRef } =
    useContext(QuestionContext);

  const myPicks = pickedAnswersRef.current;

  function handleTryAgain() {
    onTryAgain();
    handleNewGame();
  }

  const correctPicks = myPicks.filter(
    (pick, index) => pick === history[index].correctAnswer
  );
  const wrongPicks = myPicks.filter(
    (pick, index) => pick !== history[index].correctAnswer && pick !== " "
  );
  const skipped = myPicks.filter((pick) => pick === "skipped");

  return (
    <div className="finish-page">
      <div className="finish-frame">
        <img src={trophy} alt="Finish Page Picture" className="finish-image" />
        <h2 className="finish-header">Quiz completed!</h2>
        <div className="results">
          <Result picks={correctPicks} type="Correct" />
          <span className="separator"></span>
          <Result picks={wrongPicks} type="Wrong" />
          <span className="separator"></span>
          <Result picks={skipped} type="Skipped" />
        </div>
        <button className="again-button" onClick={handleTryAgain}>
          Try Again
        </button>
        <Review history={history} myPicks={myPicks} />
      </div>
    </div>
  );
}
