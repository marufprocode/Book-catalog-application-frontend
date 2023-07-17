import { apiSlice } from "./bookCtgApi";

export const usersService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books/create",
        method: "POST",
        body: book as Record<string, unknown>,
      }),
    }),
    getBookById: builder.query({
      query: (id) => `books/${id as string}`,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id as string}`,
        method: "DELETE",
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `books/${id as string}`,
        method: "PATCH",
        body: book as Record<string, unknown>,
      }),
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = usersService;
