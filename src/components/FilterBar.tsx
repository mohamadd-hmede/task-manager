import clsx from "clsx";
import type { Filter } from "../types/Filter";

type FilterBarProps = {
  filter: Filter;
  completedCount: number;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
};

const filters: Filter[] = ["all", "active", "completed"];

function FilterBar({
  filter,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onFilterChange(f)}
          className={clsx(
            "px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors capitalize",
            filter === f
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
          )}
        >
          {f}
        </button>
      ))}
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="ml-auto px-4 py-1.5 rounded-lg text-sm font-medium border border-slate-200 bg-white text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Clear completed
      </button>
    </div>
  );
}

export default FilterBar;
