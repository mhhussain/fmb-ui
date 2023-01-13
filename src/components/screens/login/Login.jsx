import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@/atoms/Alert';
import "@/styles/Login.css";
import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

export default function Login() {
  const [token, setToken] = useState(false);
  const [memberData, setMemberData] = useState();
  const [itsID, setItsID] = useState("");
  const [invalid, setInvalid] = useState(false);

  if (token) {
    return <Navigate to="/" replace={true} state={{ memberData: memberData }} />;
  }

  const updateITSValid = async () => {
    getJamaatMemberByITSId(itsID).then((d) => {
      setMemberData(d);
      setToken(true);
    },
    () => {
      setToken(false);
      setInvalid(true);
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setInvalid(false);
  };

  return (
    <div className="login-wrapper">
      <h1>FMB (alpha)</h1>
      <label>
        <p>ITS ID</p>
        <input
          type="text"
          onChange={(e) => setItsID(e.target.value)}
        />
      </label>
      <div>
        <button className="btn btn-primary" onClick={updateITSValid}>
          Login
        </button>
      </div>
      <p className="footer">© Anjuman-e-Najmi, Detroit 2023</p>
      <Snackbar
        open={invalid}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid ITS ID
        </Alert>
      </Snackbar>
    </div>
  );
}
