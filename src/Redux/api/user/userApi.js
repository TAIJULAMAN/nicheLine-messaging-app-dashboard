import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "auth/find_by_admin_all_users",
        method: "GET",
        params,
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/delete_account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `auth/change_status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} = userApi;
