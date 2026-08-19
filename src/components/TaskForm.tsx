import { useState } from "react";
import type { Priority } from "../types/Task";

type TaskFormProps = {
  onAdd: (title: string, priority: Priority, dueDate: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAdd(trimmedTitle, priority, dueDate);
    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <span className="section-icon">+</span>

        <div>
          <h2>Add New Task</h2>
          <p className="section-subtitle">
            Create a task with an optional due date.
          </p>
        </div>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-title-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title..."
        />

        <select
          className="task-priority-select"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        <input
          className="task-date-input"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <button className="add-task-button" type="submit">
          + Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
