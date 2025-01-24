import ProgressCircle from "./ProgressCircle";

export default function Header({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="header">
      <p>{formattedDate}</p>
      <h1>
        Hello, <span style={{ color: "#ff7f00" }}>Umesh!</span>
      </h1>
      <div className="progress-section">
        <ProgressCircle completed={completed} total={total} />
        <div className="progress-text">

        </div>
      </div>
    </header>
  );
}
