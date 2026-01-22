import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "setting/find_by_terms_conditions",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    createTerms: builder.mutation({
      query: ({ TermsConditions }) => ({
        url: "setting/terms_conditions",
        method: "POST",
        body: { TermsConditions },
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
});

export const { useGetTermsAndConditionsQuery, useCreateTermsMutation } =
  termsAndConditionsApi;
