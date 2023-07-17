import { LoginValues } from "../../pages/login/Login";
import { AuthState, addUser } from "../slices/authSlice";
import { apiSlice } from "./bookCtgApi";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "post",
        body: userInfo as LoginValues,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = await queryFulfilled;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const authData = data.data as AuthState;
          dispatch(addUser(authData));
          localStorage.setItem("auth", JSON.stringify(authData));
          // eslint-disable-next-line no-empty
        } catch {}
      },
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "auth/signup",
        method: "POST",
        body: user as Record<string, unknown>,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authService;
