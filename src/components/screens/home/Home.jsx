import { useState } from "react";
import Header from "../../atoms/navigators/Header";
import "../../../styles/Home.css";
import { Outlet } from "react-router-dom";
import Login from "../login/Login";

export default function Home() {
  const [token, setToken] = useState(false);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
