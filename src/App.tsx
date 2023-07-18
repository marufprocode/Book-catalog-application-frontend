import { RouterProvider } from "react-router-dom";
import routes from "./router/router";
import { Toaster } from "react-hot-toast";
import useAuthcheck from "./hooks/useAuthCheck";

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
