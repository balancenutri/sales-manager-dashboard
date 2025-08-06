import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_BACKEND_URL!;

export const commonAPi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    headers: { source: "sales" },
  }),
  reducerPath: "commonApi",
  tagTypes: ["Common"],
  endpoints: (builder) => ({
    adminLogin: builder.query({
      query: (body) => {
        return {
          url: `/login-registration/login-admin`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAdminLoginQuery } = commonAPi;
