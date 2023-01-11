import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation, Outlet } from "react-router-dom";
import Header from "@/atoms/navigators/Header";
import "@/styles/Home.css";

import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

export default function Home() {
  // TODO: Move to using Redux for state management
  const {state} = useLocation();

  // If state and memberData does not exist - redirect to /login
  if (!state || !state.memberData) {
    return <Navigate to="/login" replace={true} />;
  }

  const { memberData } = state; // Read values passed on state

  return (
    <div className="App">
      <Header />
      <h1>FMB</h1>
      <div className="font-black">
        <p>Logged in as {memberData.FirstName} {memberData.LastName}</p>
      </div>
      <div>
        <Outlet />
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
    </div>
  );
}
