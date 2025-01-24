import styles from "../styles/ProgressCircle.module.css";

export default function ProgressCircle({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={styles.container}>
      {/* Circle Division */}
      <div className={styles.circleContainer}>
        <div className={styles.progressCircle}>
          <svg width="80" height="80" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <div className={styles.percentage}>{percentage}%</div>
        </div>
      </div>

      {/* Text Division */}
      <div className={styles.textContainer}>
        <p>{completed} of {total} habits completed</p>
      </div>
    </div>
  );
}
