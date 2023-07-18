import { apiSlice } from "./bookCtgApi";

export const usersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        console.log(queryParams, params)
        return `/books?${queryParams}`;
      },
      providesTags:["books"],
    }),
    getAllFilters: builder.query({
      query: (params) => `/books/distinct/${params}`,
      providesTags:["books"]
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books/create",
        method: "POST",
        body: book as Record<string, unknown>,
      }),
      invalidatesTags:["books"]
    }),
    getBookById: builder.query({
      query: (id) => `books/${id as string}`,
      providesTags:["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id as string}`,
        method: "DELETE",
      }),
      invalidatesTags:["books"]
    }),
    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `books/${id as string}`,
        method: "PATCH",
        body: book as Record<string, unknown>,
      }),
      invalidatesTags:["books"]
    }),
    postReview: builder.mutation({
      query: (payload) => ({
        url: `/books/review/${payload.bookId}`,
        method: 'POST',
        body: payload.reviewData,
      }),
      invalidatesTags:["books"]  
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetAllFiltersQuery,
  usePostReviewMutation
} = usersService;
