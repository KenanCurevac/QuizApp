type ResultProps = {
  picks: string[];
  type: string;
};

export default function Result({ picks, type }: ResultProps) {
  return (
    <div>
      <div style={{ fontSize: "55px" }}>{`${picks.length}`}</div>{" "}
      {`${type} answer${picks.length !== 1 ? "s" : ""}`}
    </div>
  );
}
