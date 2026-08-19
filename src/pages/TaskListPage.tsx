import { useState } from "react";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../store/tasksApi";
import type { Filter } from "../types/Filter";
import type { Priority } from "../types/Task";
import type { SortOption } from "../types/SortOption";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskControls from "../components/TaskControls";
import TaskList from "../components/TaskList";

export default function TaskListPage() {
  // ── RTK Query hooks (replaces useTasks) ──────────────────────
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // ── Local UI state (filter/sort stays local) ──────────────────
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [dateFilter, setDateFilter] = useState("");

  // ── Loading / error states ────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Failed to load tasks. Please try again.
        </p>
      </div>
    );
  }

  // ── Filter + sort (same logic as your old App.tsx) ────────────
  const filteredTasks = tasks.filter((task) => {
    if (!task.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (dateFilter !== "" && task.dueDate !== dateFilter) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
      return false;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const priorityOrder: Record<Priority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "newest") return b.id - a.id;
    if (sortOption === "oldest") return a.id - b.id;
    if (sortOption === "priority")
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortOption === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    return 0;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  function resetFilters() {
    setSearch("");
    setPriorityFilter("all");
    setDateFilter("");
    setSortOption("newest");
  }

  // ── Handlers — call RTK mutations instead of dispatch ─────────
  // AFTER
  function handleAdd(title: string, priority: Priority, dueDate: string) {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    addTask({ id: nextId, title, priority, dueDate, completed: false });
  }

  function handleToggle(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (task) updateTask({ id, completed: !task.completed });
  }

  function handleEdit(
    id: number,
    title: string,
    priority: Priority,
    dueDate: string,
  ) {
    updateTask({ id, title, priority, dueDate });
  }

  function handleDelete(id: number) {
    deleteTask(id);
  }

  function handleClearCompleted() {
    tasks.filter((t) => t.completed).forEach((t) => deleteTask(t.id));
  }

  // ── UI ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <main className="max-w-2xl mx-auto space-y-4" aria-label="Task Manager">
        <Header completedCount={completedCount} totalCount={tasks.length} />
        <FilterBar
          filter={filter}
          completedCount={completedCount}
          onFilterChange={setFilter}
          onClearCompleted={handleClearCompleted}
        />
        <TaskForm onAdd={handleAdd} />
        <TaskControls
          search={search}
          priorityFilter={priorityFilter}
          dateFilter={dateFilter}
          sortOption={sortOption}
          onSearchChange={setSearch}
          onPriorityFilterChange={setPriorityFilter}
          onDateFilterChange={setDateFilter}
          onSortChange={setSortOption}
          onResetFilters={resetFilters}
          hasActiveFilters={
            search !== "" ||
            priorityFilter !== "all" ||
            dateFilter !== "" ||
            sortOption !== "newest"
          }
        />
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}
