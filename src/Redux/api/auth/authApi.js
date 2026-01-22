import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        console.log("Login API - Data being sent:", data);
        console.log("Login API - Endpoint: auth/login");
        return {
          url: "auth/login_user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "users/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "users/verification_forgot_user",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ userId, password }) => ({
        url: "users/reset_password",
        method: "POST",
        body: { userId, password },
      }),

      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
