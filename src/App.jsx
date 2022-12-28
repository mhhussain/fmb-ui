import { useState } from "react";
import "./App.css";
import Calendar from './Calendar'

function Render_count({ count }) {
  if (count % 2 == 0) {
    return "count is " + count;
  } else {
    return "get rekt";
  }
}

function Tasbeeh() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count+1)}>
      <Render_count count={count} />
    </button>
  )
}

function ModeManager({ mode }) {
  switch (mode) {
  case 0:
      return <Tasbeeh />
  case 1:
      return <Calendar />
  }
}

function App() {
  const [mode, setMode] = useState(0);
  return (
    <div className="App">
      <h1>FMB</h1>
      <button onClick={() => setMode(1)}>
        CalendarMode
      </button>
      <button onClick={() => setMode(0)}>
        TasbeehMode
      </button>
      <div className="card">
        <ModeManager mode={mode}/>
      </div>
      <p className="footer">
        © Anjuman-e-Najmi, Detroit 2023
      </p>
    </div>
  );
}

export default App;
