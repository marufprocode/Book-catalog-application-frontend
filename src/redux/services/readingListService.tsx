import { apiSlice } from "./bookCtgApi";

export const readingListService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReadingList: builder.query({
      query: () => "/readinglist",
      providesTags:["books","readinglist"]
    }),
    updateReadingList: builder.mutation({
      query: (data) => ({
        url: '/readinglist',
        method: "PATCH",
        body: data as Record<string, unknown>
      }),
      invalidatesTags:["readinglist"]
    }),
    removeFromReadingList: builder.mutation<void, string>({
      query: (id) => ({
        url: `readinglist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["readinglist"]
    }),
  }),
});

export const {useGetReadingListQuery, useUpdateReadingListMutation, useRemoveFromReadingListMutation} = readingListService;
