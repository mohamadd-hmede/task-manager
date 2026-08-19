import type { Priority } from "../types/Task";
import type { SortOption } from "../types/SortOption";

type TaskControlsProps = {
  search: string;
  priorityFilter: "all" | Priority;
  sortOption: SortOption;
  dateFilter: string;
  hasActiveFilters: boolean;

  onSearchChange: (value: string) => void;
  onPriorityFilterChange: (value: "all" | Priority) => void;
  onSortChange: (value: SortOption) => void;
  onDateFilterChange: (value: string) => void;
  onResetFilters: () => void;
};

function TaskControls({
  search,
  priorityFilter,
  sortOption,
  dateFilter,
  hasActiveFilters,
  onSearchChange,
  onPriorityFilterChange,
  onSortChange,
  onDateFilterChange,
  onResetFilters,
}: TaskControlsProps) {
  return (
    <section className="controls-section">
      <div className="controls-header">
        <div className="section-heading">
          <span className="filter-icon">⌄</span>
          <h2>Filters & Sort</h2>
        </div>

        <button
          className="reset-filters-button"
          type="button"
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="task-controls">
        <label className="control-field search-control">
          <span>Search Tasks</span>

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by task title..."
          />
        </label>

        <label className="control-field priority-control">
          <span>Priority</span>

          <select
            value={priorityFilter}
            onChange={(event) =>
              onPriorityFilterChange(event.target.value as "all" | Priority)
            }
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="control-field date-control">
          <span>Due Date</span>

          <input
            type="date"
            value={dateFilter}
            onChange={(event) => onDateFilterChange(event.target.value)}
          />
        </label>

        <label className="control-field sort-control">
          <span>Sort By</span>

          <select
            value={sortOption}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="dueDate">Due date</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default TaskControls;
