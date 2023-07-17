import { apiSlice } from "./bookCtgApi";

export const wishlistService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (item) => ({
        url: "wishlist",
        method: "POST",
        body: item as Record<string, unknown>,
      }),
    }),
    getWishlist: builder.query({
      query: () => "wishlist",
    }),
    removeFromWishlist: builder.mutation<void, string>({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistService;
