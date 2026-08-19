import type { Filter } from "../types/Filter";

type FilterBarProps = {
  filter: Filter;
  completedCount: number;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
};

function FilterBar({
  filter,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="filter-buttons">
      <button
        type="button"
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>

      <button
        type="button"
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>

      <button
        type="button"
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default FilterBar;
