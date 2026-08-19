import { useParams, Link } from "react-router-dom";
import { useGetTaskQuery } from "../store/tasksApi";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading, isError } = useGetTaskQuery(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow space-y-4">
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          ← Back to all tasks
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
        <p className="text-slate-600">
          Status:{" "}
          <span className="font-medium">
            {task.completed ? "Completed ✅" : "Active"}
          </span>
        </p>
        <p className="text-slate-600">
          Priority:{" "}
          <span className="font-medium capitalize">{task.priority}</span>
        </p>
        {task.dueDate && (
          <p className="text-slate-600">
            Due: <span className="font-medium">{task.dueDate}</span>
          </p>
        )}
      </div>
    </div>
  );
}
