import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Tasbeeh from "./components/Tasbeeh";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./components/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
