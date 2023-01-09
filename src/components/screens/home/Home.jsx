import { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "@/atoms/navigators/Header";
import "@/styles/Home.css";

import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

export default function Home() {
  const [itsId, setItsId] = useState(0);
  const [name, setName] = useState("");
  const {state} = useLocation();
  const { memberData } = state; // Read values passed on state

  const handleChange = (e) => setItsId(e.target.value);

  const getMember = async () => {
    getJamaatMemberByITSId(itsId).then((d) => {
      //setName(`${d.data[0].FirstName} ${d.data[0].LastName}`);
      setName(JSON.stringify(d));
    });
  };

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <div className="font-black">
        <p>Logged in as {memberData.FirstName} {memberData.LastName}</p>
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
