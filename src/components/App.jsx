import { useState } from "react";
import Navigation from "./Navigation";
import "../css/App.css";
import { Outlet } from "react-router-dom";
import Login from "./Login";

export default function App() {
  const [token, setToken] = useState(false);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Navigation />
      <h1>FMB</h1>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
