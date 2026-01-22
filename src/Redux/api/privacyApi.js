import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "setting/find_by_privacy_policys",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    createPrivacy: builder.mutation({
      query: ({ PrivacyPolicy }) => ({
        url: "setting/privacy_policys",
        method: "POST",
        body: { PrivacyPolicy },
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useCreatePrivacyMutation } = privacyApi;
