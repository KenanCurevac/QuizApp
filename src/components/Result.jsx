export default function Result({ picks, type }) {
  return (
    <div>
      <div style={{ fontSize: "55px" }}>{`${picks.length}`}</div>{" "}
      {`${type} answer${picks.length !== 1 ? "s" : ""}`}
    </div>
  );
}
