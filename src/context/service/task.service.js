import { apiSlice } from "./api.service";

export const taskService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - POST: /tasks/mystate
    getMyState: builder.query({
      query: () => ({
        url: "tasks/mystate",
        method: "GET",
      }),
      providesTags: ["update"],
    }),

    // Post task self confirm - POST: /tasks/selfConfirm
    postTaskSelfConfirm: builder.mutation({
      query: ({ task_id, result }) => ({
        url: "tasks/selfConfirm",
        method: "POST",
        body: {
          task_id: task_id || null,
          result: result || null,
        },
      }),
      invalidatesTags: ["update"],
    }),

    // Get html - GET: /static/html/{page}
    getHtml: builder.query({
      query: (page) => ({
        url: `static/html/${page}`,
        method: "GET",
      }),
    }),

    // Get task - GET: /tasks/getUserTaskByTaskId/{taskId}
    getUserTaskByTaskId: builder.query({
      query: (taskId) => ({
        url: `tasks/getUserTaskByTaskId/${taskId}`,
        method: "GET",
      }),
    }),

    // Get user task - GET: /tasks/getUserTask/{taskId}
    getUserTask: builder.query({
      query: (taskId) => ({
        url: `tasks/getUserTask/${taskId}`,
        method: "GET",
      }),
    }),

    // Send referal - POST: /referal/follow
    sendReferal: builder.mutation({
      query: (user_id) => ({
        url: "referal/follow",
        method: "POST",
        body: { user_id: user_id || null },
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetMyStateQuery,
  usePostTaskSelfConfirmMutation,
  useGetHtmlQuery,
  useGetUserTaskByTaskIdQuery,
  useGetUserTaskQuery,
  useSendReferalMutation,
} = taskService;
