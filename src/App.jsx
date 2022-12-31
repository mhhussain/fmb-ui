import { useState, useEffect } from "react";
import "./App.css";

import { getJamaatMemberByITSId } from "./api/thaaliApi";

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
    <button onClick={() => setCount(count + 1)}>
      <Render_count count={count} />
    </button>
  );
}

function ModeManager({ mode }) {
  switch (mode) {
    case 0:
      return <Tasbeeh />;
    case 1:
      return <Calendar />;
  }
}

function App() {
  const [mode, setMode] = useState(0);
  const [itsId, setItsId] = useState(0);
  const [name, setName] = useState("");

  const handleChange = (e) => setItsId(e.target.value);

  const getMember = async () => {
    getJamaatMemberByITSId(itsId).then((d) => {
      //setName(`${d.data[0].FirstName} ${d.data[0].LastName}`);
      setName(JSON.stringify(d.data[0]));
    });
  };

  return (
    <div className="App">
      <h1>FMB</h1>
      <div className="font-black">
        <p>{itsId}</p>
        <p>{name}</p>
      </div>
      <div className="output">
        <input type="text" value={itsId} onChange={handleChange} />
        <button onClick={getMember}>Get Jamaat Member</button>
      </div>
      <button onClick={() => setMode(1)}>CalendarMode</button>
      <button onClick={() => setMode(0)}>TasbeehMode</button>
      <div className="card">
        <ModeManager mode={mode} />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}

export default App;
