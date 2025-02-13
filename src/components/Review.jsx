import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Review({ history, myPicks }) {
  return (
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
        {history.map((questionObject, questionIndex) => {
          return (
            <div key={questionObject.question} className="question-text-review">
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
                      className={`option-review ${isMyPick ? "my-pick" : ""} ${
                        isCorrect ? "correct-pick" : ""
                      } ${isWrong ? "wrong-pick" : ""}`}
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
