import type { Priority, Task } from "../types/Task";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    newTitle: string,
    priority: Priority,
    dueDate: string,
  ) => void;
};

function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-message">
          <span className="empty-icon">✓</span>
          <h3>No tasks found</h3>
          <p>Try changing the filters or add a new task.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
