import { apiSlice } from "./api.service";

export const meService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /me
    me: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      providesTags: ["me"],
    }),

    // Get static lang - GET: /static/lang/{lang}
    static: builder.query({
      query: (lang) => ({
        url: `static/lang/${lang || "en"}.json`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMeQuery, useStaticQuery } = meService;
