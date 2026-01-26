import { baseApi } from "../baseApi";

export const subscribersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscribers: builder.query({
            query: (params) => ({
                url: "current_subscription/find_by_all_active_subscriber_list",
                method: "GET",
                params,
            }),
            providesTags: ["subscribers"],
        }),
        updateSubscriber: builder.mutation({
            query: ({ id, data }) => ({
                url: `current_subscription/update_active_status_admin/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["subscribers"],
        }),
        getAllSubscriptions: builder.query({
            query: () => ({
                url: "subscription/find_by_all_subscription",
                method: "GET",
            }),
            providesTags: ["subscribers"],
        }),
        updateSubscription: builder.mutation({
            query: ({ id, data }) => ({
                url: `subscription/update_subscription/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["subscribers"],
        }),
    }),
});

export const {
    useGetAllSubscribersQuery,
    useUpdateSubscriberMutation,
    useGetAllSubscriptionsQuery,
    useUpdateSubscriptionMutation,
} = subscribersApi;
