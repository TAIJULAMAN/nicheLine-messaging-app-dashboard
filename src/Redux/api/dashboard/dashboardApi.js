import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    userGrowth: builder.query({
      query: ({ year }) => ({
        url: "user/get_user_growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    totalUser: builder.query({
      query: () => ({
        url: "auth/dashboard_entity_count",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardQuery, useUserGrowthQuery, useTotalUserQuery } =
  dashboardApi;
