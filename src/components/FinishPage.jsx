import { useContext } from "react";
import "./FinishPage.css";
import { QuestionContext } from "./store/QuestionContext";
import trophy from "../assets/trophy.webp";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FinishPage({ onTryAgain }) {
  const { handleNewGame, allShuffledOptions, allQuestions, reviewPicksRef } =
    useContext(QuestionContext);

  const myPicks = reviewPicksRef.current;

  function handleTryAgain() {
    onTryAgain();
    handleNewGame();
  }

  const correctPick = myPicks.filter(
    (pick, index) => pick === allQuestions[index].correctAnswer
  );
  const wrongPick = myPicks.filter(
    (pick, index) => pick !== allQuestions[index].correctAnswer && pick !== " "
  );
  const skipped = myPicks.filter((pick) => pick === " ");

  return (
    <div className="finish-container">
      <div className="finish-frame">
        <img src={trophy} alt="Finish Page Picture" className="finish-image" />
        <h2>Quiz completed!</h2>
        <div className="result">
          <div className="finish-message">
            <div className="result-number">{`${correctPick.length}`}</div>{" "}
            {`correct answer${correctPick.length !== 1 ? "s" : ""}`}
          </div>
          <span className="separator"></span>
          <div className="finish-message">
            <div className="result-number">{`${wrongPick.length}`}</div>{" "}
            {`wrong answer${wrongPick.length !== 1 ? "s" : ""}`}
          </div>
          <span className="separator"></span>
          <div className="finish-message">
            <div className="result-number">{`${skipped.length}`}</div>{" "}
            {`skipped answer${skipped.length !== 1 ? "s" : ""}`}
          </div>
        </div>
        <button className="again-button" onClick={handleTryAgain}>
          Try Again
        </button>

        <Accordion
          square="false"
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
            background: "linear-gradient(#064848, #096C5C)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              "&:hover": { background: "#0C9292" },
              color: "#cefada",
              fontWeight: "bold",
              fontSize: "27px",
            }}
          >
            <div>Check Your Answers!</div>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              borderTop: "2px solid #121e16",
              padding: "35px 40px",
            }}
          >
            {allQuestions.map((questionObject, questionIndex) => {
              return (
                <div
                  key={questionObject.question}
                  className="question-text-review"
                >
                  {questionObject.question}
                  <div className="options-review">
                    {allShuffledOptions[questionIndex].map((questionOption) => {
                      const isMyPick =
                        questionOption === myPicks[questionIndex];
                      const isCorrect =
                        questionOption ===
                        allQuestions[questionIndex].correctAnswer;
                      const isWrong = isMyPick && !isCorrect;

                      return (
                        <div
                          key={questionOption}
                          className={`option-review ${
                            isMyPick ? "my-pick" : ""
                          } ${isCorrect ? "correct-pick" : ""} ${
                            isWrong ? "wrong-pick" : ""
                          }`}
                        >
                          {questionOption}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
