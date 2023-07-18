import { RouterProvider } from "react-router-dom";
import routes from "./router/router";
import useAuthcheck from "./hooks/useAuthCheck";
import { Toaster } from "react-hot-toast";

export default function App() {
  const authChecked = useAuthcheck();

  if (!authChecked) return <p>Loading...</p>;

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}
