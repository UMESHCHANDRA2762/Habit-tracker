import { useState } from "react";
import styles from "../styles/Home.module.css"; // Import the specific CSS for HabitForm

export default function HabitForm({
  closeModal,
  addHabit,
  setSuccessMessage, // Accept setSuccessMessage as prop
}: {
  closeModal: () => void;
  addHabit: (habit: any) => void;
  setSuccessMessage: (message: string) => void; // Type for setSuccessMessage
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [period, setPeriod] = useState("1"); // Set default to "1"
  const [type, setType] = useState("everyday");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || goal.trim() === "") {
      alert("Please fill in all fields!"); // You can still use alert for validation
      return;
    }

    const newHabit = {
      name,
      goal,
      period: `${period} days`, // Add "days" to the period
      type,
      completed: false,
    };

    addHabit(newHabit);
    setSuccessMessage("Done! New habit has been added. Let's do our best to achieve the goal!");
    closeModal();
  };

  return (
    <div className={styles.habitFormModal}>
      <div className={styles.habitForm}>
        <h2>Create New Habit</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Your Goal:
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter your goal"
              required
            />
          </label>
          <label>
            Habit Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter habit name"
              required
            />
          </label>
          <label>
            Period:
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              {[...Array(30).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} day{(i + 1) > 1 && 's'}
                </option>
              ))}
            </select>
          </label>
          <label>
            Habit Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="everyday">Everyday</option>
              <option value="once_a_week">Once a Week</option>
              <option value="once_a_month">Once a Month</option>
            </select>
          </label>
          <button type="submit">Create New</button>
        </form>
        <button className={styles.closeButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
