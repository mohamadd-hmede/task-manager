type HeaderProps = {
  completedCount: number;
  totalCount: number;
};

function Header({ completedCount, totalCount }: HeaderProps) {
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <header className="app-header">
      <div className="header-title">
        <div className="header-icon">✓</div>

        <div>
          <h1>Task Manager</h1>
          <p>
            Organize your tasks, track deadlines, and stay productive every day.
          </p>
        </div>
      </div>

      <div className="progress-summary">
        {totalCount === 0 ? (
          <div className="empty-progress">
            No tasks yet. Add your first task to get started.
          </div>
        ) : (
          <>
            <div className="progress-text">
              <span>
                {completedCount} of {totalCount} tasks completed
              </span>

              <strong>{progress}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-value"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
