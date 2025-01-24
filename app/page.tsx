"use client"
import { useState, useEffect } from "react";
import styles from "./styles/Home.module.css";
import Header from "./components/Header";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import SuccessMessage from "./components/SuccessMessage"; // Import SuccessMessage

type Habit = {
  name: string;
  goal: string;
  period: string;
  type: string;
  completed: boolean;
};

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([]); // Update to use Habit type
  const [completed, setCompleted] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    setHabits(storedHabits);
    calculateCompleted(storedHabits);
  }, []);

  const calculateCompleted = (habits: Habit[]) => {
    const completedCount = habits.filter((habit) => habit.completed).length;
    setCompleted(completedCount);
  };

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    calculateCompleted(habits);
  }, [habits]);

  const addHabit = (habit: Habit) => { // Updated to use Habit type
    setHabits((prevHabits) => [...prevHabits, habit]);
    setSuccessMessage("Done! New habit has been added. Let's do our best to achieve the goal!");

    // Hide the success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className={styles.homeContainer}>
      <Header completed={completed} total={habits.length} />
      <HabitList habits={habits} setHabits={setHabits} />

      <button
        className={styles.addHabitButton}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <HabitForm
          closeModal={() => setIsModalOpen(false)}
          addHabit={addHabit}
          setSuccessMessage={setSuccessMessage} // Pass success message setter
        />
      )}

      {/* Conditionally Render Success Message */}
      {successMessage && <SuccessMessage message={successMessage} />}
    </div>
  );
}
