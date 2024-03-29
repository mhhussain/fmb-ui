import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import Navigation from '@/atoms/navigators/Navigation';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>
);
