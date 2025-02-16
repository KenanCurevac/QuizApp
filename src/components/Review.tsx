import "./Review.css";
import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionData } from "../model/questionData";

type ReviewProps = {
  history: QuestionData[];
  myPicks: string[];
};

export default function Review({ history, myPicks }: ReviewProps) {
  const accordionRef = useRef<HTMLDivElement | null>(null);

  function handleAccordionExpansion(
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) {
    if (accordionRef.current && isExpanded) {
      setTimeout(() => {
        accordionRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 200);
    }
  }

  return (
    <Accordion
      square={false}
      ref={accordionRef}
      onChange={handleAccordionExpansion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <div>Check Your Answers!</div>
      </AccordionSummary>
      <AccordionDetails className="game-review">
        {history.map((questionObject, questionIndex) => {
          return (
            <div key={questionObject.question} className="questions-review">
              {questionObject.question}
              <div className="options-review">
                {history[questionIndex].options.map((questionOption) => {
                  const isMyPick = questionOption === myPicks[questionIndex];
                  const isCorrect =
                    questionOption === history[questionIndex].correctAnswer;
                  const isWrong = isMyPick && !isCorrect;

                  return (
                    <div
                      key={questionOption}
                      className={`option-from-review ${
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
  );
}
