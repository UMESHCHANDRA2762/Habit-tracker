import { useState } from 'react';
import styles from '../styles/HabitList.module.css';  // Import the CSS module

export default function HabitList({
  habits,
  setHabits,
}: {
  habits: any[];
  setHabits: (habits: any[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);  // Track if editing mode is active
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which habit is being edited
  const [editedHabitName, setEditedHabitName] = useState<string>('');

  const toggleHabit = (index: number) => {
    const updatedHabits = [...habits];
    updatedHabits[index].completed = !updatedHabits[index].completed;
    setHabits(updatedHabits);
  };

  const deleteHabit = (index: number) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  const handleEditClick = (index: number, name: string) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditedHabitName(name);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedHabitName.trim() === "") {
      alert("Please enter a valid name!");
      return;
    }

    const updatedHabits = [...habits];
    updatedHabits[editIndex!] = { ...updatedHabits[editIndex!], name: editedHabitName }; // Update the habit name
    setHabits(updatedHabits);
    setIsEditing(false); // Close the editing mode
    setEditIndex(null); // Reset the editing index
  };

  return (
    <ul className={styles.habitList}>
      {habits.map((habit, index) => (
        <li key={index} className={`${styles.habitItem} ${habit.completed ? styles.completed : ''}`}>
          <span className={styles.habitName}>{habit.name}</span>
          <div className={styles.habitActions}>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(index)}
              className={styles.habitCheckbox}
            />
            <button onClick={() => deleteHabit(index)} className={styles.deleteButton}>
              Delete
            </button>
            <button onClick={() => handleEditClick(index, habit.name)} className={styles.editButton}>
              Edit
            </button>
          </div>
        </li>
      ))}

      {isEditing && (
        <div className={styles.editFormContainer}>
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <label>
              Edit Habit Name:
              <input
                type="text"
                value={editedHabitName}
                onChange={(e) => setEditedHabitName(e.target.value)}
                required
                className={styles.editInput}
              />
            </label>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditIndex(null);
              }}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </ul>
  );
}
