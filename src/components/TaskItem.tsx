import { useState } from "react";
import type { Priority, Task } from "../types/Task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newTitle: string,
    priority: Priority,
    dueDate: string,
  ) => void;
};

function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const [editedPriority, setEditedPriority] = useState<Priority>(task.priority);

  const [editedDueDate, setEditedDueDate] = useState(task.dueDate ?? "");

  const today = new Date().toISOString().split("T")[0];

  const isOverdue =
    task.dueDate !== undefined && task.dueDate < today && !task.completed;

  const isDueToday = task.dueDate === today && !task.completed;

  const formattedDueDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  function saveEdit() {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === "") {
      return;
    }

    onEdit(task.id, trimmedTitle, editedPriority, editedDueDate);
    setIsEditing(false);
  }

  return (
    <div className={`task-item ${task.completed ? "task-completed" : ""}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <div className="task-content">
          {isEditing ? (
            <div className="edit-task-fields">
              <input
                className="edit-task-input"
                type="text"
                value={editedTitle}
                onChange={(event) => setEditedTitle(event.target.value)}
              />

              <select
                value={editedPriority}
                onChange={(event) =>
                  setEditedPriority(event.target.value as Priority)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <input
                type="date"
                value={editedDueDate}
                onChange={(event) => setEditedDueDate(event.target.value)}
              />
            </div>
          ) : (
            <>
              <span className="task-title">{task.title}</span>

              <div className="task-details">
                <span className={`priority priority-${task.priority}`}>
                  {task.priority}
                </span>

                {task.dueDate && <span>Due: {formattedDueDate}</span>}

                {isOverdue && (
                  <strong className="status-overdue">Overdue</strong>
                )}

                {isDueToday && (
                  <strong className="status-today">Due today</strong>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-button" type="button" onClick={saveEdit}>
              Save
            </button>

            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                setEditedTitle(task.title);
                setEditedPriority(task.priority);
                setEditedDueDate(task.dueDate ?? "");
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-button"
              type="button"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
