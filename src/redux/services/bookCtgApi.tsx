import {
  /* BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError, */
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
// import { addToken, logout } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-catalog-application-backend.vercel.app/api/v1",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 403) {
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/auth/refresh-token", api, extraOptions);
//     if (refreshResult?.data) {
//       // store the new token
//       api.dispatch(addToken(refreshResult.data as Record<string, string>), );
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes:["books", "wishlist", "readinglist"],
  endpoints: () => ({}),
});
