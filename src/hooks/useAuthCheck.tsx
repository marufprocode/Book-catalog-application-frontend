import { useEffect, useState } from "react";
import { addUser, selectAuth } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function useAuthcheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!user) {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        dispatch(addUser(parsedAuth));
      }
    }
    setAuthChecked(true);
  }, [dispatch, user]);

  return authChecked;
}