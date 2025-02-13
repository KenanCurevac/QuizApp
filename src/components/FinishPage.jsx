import { useContext } from "react";
import "./FinishPage.css";
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
    <div className="finish-container">
      <div className="finish-frame">
        <img src={trophy} alt="Finish Page Picture" className="finish-image" />
        <h2>Quiz completed!</h2>
        <div className="result">
          <Result picks={correctPicks} />
          <span className="separator"></span>
          <Result picks={wrongPicks} />
          <span className="separator"></span>
          <Result picks={skipped} />
        </div>
        <button className="again-button" onClick={handleTryAgain}>
          Try Again
        </button>
        <Review history={history} myPicks={myPicks} />
      </div>
    </div>
  );
}
