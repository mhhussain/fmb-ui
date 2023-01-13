import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "@/screens/home/Home";
import Login from "@/screens/login/Login";
import Tasbeeh from "@/screens/tasbeeh/Tasbeeh";
import Calendar from "@/screens/calendar/Calendar";
import Query from "@/screens/admin/Query";

import "@/styles/index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "Tasbeeh",
        element: <Tasbeeh />,
      },
      {
        path: "Calendar",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "/admin/query",
    element: <Query />
  }
]);

const Navigation = () => {
  return <RouterProvider router={router} />;
};

export default Navigation;
