import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "../../screens/home/Home";
import Tasbeeh from "../../screens/tasbeeh/Tasbeeh";
import "../../../styles/index.css";
import Calendar from "../../screens/calendar/Calendar";
const router = createBrowserRouter([
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
  ]);

const Navigation = () => {
  return <RouterProvider router={router} />;
};

export default Navigation;