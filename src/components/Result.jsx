export default function Result({ picks }) {
  return (
    <div className="finish-message">
      <div className="result-number">{`${picks.length}`}</div>{" "}
      {`correct answer${picks.length !== 1 ? "s" : ""}`}
    </div>
  );
}
