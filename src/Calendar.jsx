import { useState } from "react";
import "./App.css";

function Calendar() {
  const [count, setCount] = useState(0);

  return (
    <div className="Calendar">
      <h1>Calendar</h1>
      <div className="card">
      </div>
      <p className="footer">
        © Anjuman-e-Najmi, Detroit 2023
      </p>
    </div>
  );
}
