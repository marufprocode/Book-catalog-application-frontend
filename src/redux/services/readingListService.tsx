import { apiSlice } from "./bookCtgApi";

export const readingListService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReadingList: builder.query({
      query: () => "/readinglist",
    }),
    updateReadingList: builder.mutation({
      query: (item) => ({
        url: '/readinglist',
        method: "PATCH",
        body: item as Record<string, unknown>
      }),
    }),
    removeFromReadingList: builder.mutation<void, string>({
      query: (id) => ({
        url: `readinglist/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {useGetReadingListQuery, useUpdateReadingListMutation, useRemoveFromReadingListMutation} = readingListService;
