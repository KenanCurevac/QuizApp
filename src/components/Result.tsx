import "./Result.css";

type ResultProps = {
  picks: string[];
  type: string;
};

export default function Result({ picks, type }: ResultProps) {
  return (
    <div className="result">
      <div className="answer-count">{`${picks.length}`}</div>{" "}
      {`${type} answer${picks.length !== 1 ? "s" : ""}`}
    </div>
  );
}
