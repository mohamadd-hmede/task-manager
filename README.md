# Task Manager

A modern Task Manager web application built with **React**, **TypeScript**, and **Vite**.

The application helps users organize daily tasks, track progress, and improve productivity through task management features such as task creation, editing, filtering, sorting, and due dates.

---

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Search tasks by title
- Filter tasks by:
  - Status
  - Priority
  - Due Date
- Sort tasks by:
  - Newest
  - Oldest
  - Due Date
  - Priority
- Reset all filters
- Track task completion progress
- Responsive user interface
- Persist tasks using Local Storage

---

## Project Evolution

### Version 1 — React & TypeScript Foundation

The first version establishes the core Task Manager as a multi-component React and TypeScript application.

#### Implemented

- Built the application using reusable React components
- Used TypeScript for task types and component props
- Added task creation, editing, deletion, and completion
- Added task searching
- Added filtering by status, priority, and due date
- Added sorting by newest, oldest, due date, and priority
- Added filter reset functionality
- Added completion percentage tracking
- Added responsive styling
- Used Local Storage to persist tasks after page refresh

#### Technologies

- React
- TypeScript
- Vite
- CSS
- Local Storage API

### Version 2 — State Management Refactor

The second version improves the application's state architecture while preserving the existing Task Manager functionality.

Task state and actions were moved out of `App.tsx` into a centralized state management structure.

#### Implemented

- Added React Context for sharing task state and actions
- Replaced scattered task state logic with `useReducer`
- Created a custom `useTasks` hook
- Added a `TaskProvider` for providing task state throughout the application
- Extracted task actions into a separate reducer
- Preserved Local Storage persistence
- Kept existing search, filter, sort, CRUD, and completion functionality

#### Concepts Practised

- React Context
- `useReducer`
- Custom hooks
- Provider pattern
- Centralized client state management

### Version 3 — UI Rebuild with Radix UI & Tailwind CSS

The third version rebuilds the application's presentation layer while keeping the existing state management, logic, and TypeScript types intact.

The previous custom CSS interface was replaced with Tailwind CSS and accessible Radix UI primitives.

#### Implemented

- Installed Tailwind CSS v4 using the `@tailwindcss/vite` plugin
- Added Radix UI component primitives
- Rebuilt the main UI components using Radix UI and Tailwind CSS
- Removed the previous custom CSS
- Preserved the existing application logic and state management

#### Radix UI Components

| Component                  | Purpose                       |
| -------------------------- | ----------------------------- |
| `@radix-ui/react-checkbox` | Task completion toggle        |
| `@radix-ui/react-select`   | Priority and sorting controls |
| `@radix-ui/react-label`    | Accessible form labels        |
| `@radix-ui/react-progress` | Task completion progress      |

#### Components Rebuilt

| Component          | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `Header.tsx`       | Application title and completion progress     |
| `FilterBar.tsx`    | All, Active, and Completed filters            |
| `TaskForm.tsx`     | New task creation form                        |
| `TaskControls.tsx` | Search, filtering, and sorting controls       |
| `TaskList.tsx`     | Task list and empty state                     |
| `TaskItem.tsx`     | Individual task with edit and delete controls |

### Version 4 — Accessibility Pass

The fourth version improves accessibility across the existing interface through semantic HTML, ARIA attributes, keyboard support, visible focus states, and improved colour contrast.

#### Semantic HTML

- Replaced generic wrappers with semantic elements such as:
  - `<header>`
  - `<main>`
  - `<nav>`
  - `<section>`
  - `<ul>`
  - `<li>`
- Connected sections to headings using `aria-labelledby`

#### Labels & ARIA

- Added accessible labels to progress indicators and task checkboxes
- Added labels to Edit and Delete controls
- Used `aria-labelledby` with Radix Select triggers
- Added accessible labels to edit-state inputs
- Added `aria-pressed` to communicate the active task filter
- Added `aria-hidden="true"` to decorative SVG icons

#### Keyboard Navigation

- Ensured interactive elements are reachable and operable using the keyboard
- Added Escape-key support to cancel task editing
- Added visible `focus-visible` styles to interactive controls

#### Colour Contrast

- Improved low-contrast secondary text
- Improved text colours for form inputs and select controls
- Adjusted interface colours to improve readability and WCAG AA compliance

---

## Screenshot

### Main Dashboard

The main interface displaying the task list, progress summary, task creation form, and filtering controls.

![Main Dashboard](screenshots/home.png)

---

## Project Structure

```text
task-manager/
│
├── public/
├── src/
│   ├── components/
│   ├── types/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── screenshots/
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```
