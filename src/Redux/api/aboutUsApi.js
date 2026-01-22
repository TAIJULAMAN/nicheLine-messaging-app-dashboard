import { baseApi } from "./baseApi";

const aboutUsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query({
            query: () => ({
                url: "setting/find_by_about_us",
                method: "GET",
            }),
            providesTags: ["aboutUs"],
        }),

        createAboutUs: builder.mutation({
            query: ({ aboutUs }) => ({
                url: "setting/about",
                method: "POST",
                body: { aboutUs },
            }),
            invalidatesTags: ["aboutUs"],
        }),
    }),
});

export const { useGetAboutUsQuery, useCreateAboutUsMutation } = aboutUsApi;
