import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "../types/Task";

export const tasksApi = createApi({
  reducerPath: "tasksApi",

  // 👇 points to json-server running on port 3001
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),

  keepUnusedDataFor: 60,
  tagTypes: ["Task"],

  endpoints: (builder) => ({
    // GET /tasks — fetch all tasks
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),

    // GET /tasks/:id — fetch one task
    getTask: builder.query<Task, number>({
      query: (id) => `/tasks/${id}`,
    }),

    // POST /tasks — add a new task
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),

    // PATCH /tasks/:id — edit a task
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Task"],
    }),

    // DELETE /tasks/:id — delete a task
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
