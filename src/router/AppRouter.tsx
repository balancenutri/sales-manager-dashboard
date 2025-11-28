import KeySourceConversion from "@/components/home/overview/KeySourceConversion";
import MentorCounsellorPerformance from "@/components/home/overview/leadCard/MentorCounsellorPerformance";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/key-source-conversion",
        element: <KeySourceConversion />,
      },
      {
        path: "/team-performance",
        element: <MentorCounsellorPerformance />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
