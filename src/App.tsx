import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import type { Filter } from "./types/Filter";
import type { Priority } from "./types/Task";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import TaskControls from "./components/TaskControls";
import type { SortOption } from "./types/SortOption";
import { useTasks } from "./hooks/useTasks";

function App() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompletedTasks,
  } = useTasks();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (dateFilter !== "" && task.dueDate !== dateFilter) {
      return false;
    }

    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }

    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((taskA, taskB) => {
    if (sortOption === "newest") {
      return taskB.id - taskA.id;
    }

    if (sortOption === "oldest") {
      return taskA.id - taskB.id;
    }

    if (sortOption === "dueDate") {
      if (!taskA.dueDate && !taskB.dueDate) {
        return 0;
      }

      if (!taskA.dueDate) {
        return 1;
      }

      if (!taskB.dueDate) {
        return -1;
      }

      return taskA.dueDate.localeCompare(taskB.dueDate);
    }

    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  const totalCount = tasks.length;

  function resetFilters() {
    setSearch("");
    setPriorityFilter("all");
    setDateFilter("");
    setSortOption("newest");
  }

  return (
    <main className="app">
      <Header completedCount={completedCount} totalCount={totalCount} />

      <FilterBar
        filter={filter}
        completedCount={completedCount}
        onFilterChange={setFilter}
        onClearCompleted={clearCompletedTasks}
      />

      <TaskForm onAdd={addTask} />

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
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </main>
  );
}

export default App;
