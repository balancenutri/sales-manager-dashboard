import { RouterProvider } from "react-router";
import router from "./router/AppRouter";

export default function App() {
  return <RouterProvider router={router} />;
}
