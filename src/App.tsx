import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import type { Filter } from "./types/Filter";
import type { Priority, Task } from "./types/Task";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import TaskControls from "./components/TaskControls";
import type { SortOption } from "./types/SortOption";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks: Task[] = JSON.parse(savedTasks);

      return parsedTasks.map((task) => ({
        ...task,
        priority: task.priority ?? "medium",
      }));
    }

    return [
      {
        id: 1,
        title: "Learn React components",
        completed: false,
        priority: "high",
      },
      {
        id: 2,
        title: "Practice TypeScript",
        completed: true,
        priority: "medium",
      },
    ];
  });

  const [filter, setFilter] = useState<Filter>("all");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [search, setSearch] = useState("");

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");

  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const [dateFilter, setDateFilter] = useState("");

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function addTask(title: string, priority: Priority, dueDate: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
    };

    setTasks([...tasks, newTask]);
  }

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

  function editTask(
    id: number,
    newTitle: string,
    priority: Priority,
    dueDate: string,
  ) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              priority,
              dueDate: dueDate || undefined,
            }
          : task,
      ),
    );
  }

  function clearCompletedTasks() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  function resetFilters() {
    setSearch("");
    setPriorityFilter("all");
    setDateFilter("");
    setSortOption("newest");
  }

  return (
    <main className="app">
      {" "}
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
