import "./Review.css";
import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionData } from "../model/questionData";

type ReviewProps = {
  allQuestions: QuestionData[];
  myPicks: string[];
};

export default function Review({ allQuestions, myPicks }: ReviewProps) {
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
        {allQuestions.map((questionObject, questionIndex) => {
          const { question, correctAnswer, options } = questionObject;

          return (
            <div key={question} className="questions-review">
              {question}
              <div className="options-review">
                {options.map((option) => {
                  const isMyPick = option === myPicks[questionIndex];
                  const isCorrect = option === correctAnswer;
                  const isWrong = isMyPick && !isCorrect;

                  return (
                    <div
                      key={`${questionIndex}-${option}`}
                      className={`option-from-review ${
                        isMyPick ? "my-pick" : ""
                      } ${isCorrect ? "correct-pick" : ""} ${
                        isWrong ? "wrong-pick" : ""
                      }`}
                    >
                      {option}
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
