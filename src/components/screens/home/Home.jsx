import { useState } from "react";
import Header from "@/atoms/navigators/Header";
import "@/styles/Home.css";
import { Outlet } from "react-router-dom";
import Login from "@/screens/login/Login";

import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

export default function Home() {
  const [token, setToken] = useState(false);
  const [itsId, setItsId] = useState(0);
  const [name, setName] = useState("");

  const handleChange = (e) => setItsId(e.target.value);

  const getMember = async () => {
    getJamaatMemberByITSId(itsId).then((d) => {
      //setName(`${d.data[0].FirstName} ${d.data[0].LastName}`);
      setName(JSON.stringify(d.data[0]));
    });
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <div className="font-black">
        <p>{itsId}</p>
        <p>{name}</p>
      </div>
      <div className="output">
        <input type="text" value={itsId} onChange={handleChange} />
        <button onClick={getMember}>Get Jamaat Member</button>
      </div>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
