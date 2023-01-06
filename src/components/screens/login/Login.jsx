import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@/atoms/Alert';
import "@/styles/Login.css";
import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

export default function Login({ setToken, setMemberData }) {
  const [username, setUserName] = useState("");
  const [invalid, setInvalid] = useState(false);

  const updateITSValid = async () => {
    getJamaatMemberByITSId(username).then((d) => {
      if (d.data.length == 1) {
        console.log("valid ITS:", d.data[0]);
        setMemberData(d.data[0]);
        setToken(true);
      } else {
        console.log("invalid ITS");
        setToken(false);
        setInvalid(true);
      }
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
        <p className="form-label">Username</p>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <div className="submit-button">
        <button
          className="btn btn-primary"
          onClick={updateITSValid}
        >
          Submit
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
          Invalid ITS Number
        </Alert>
      </Snackbar>
    </div>
  );
}
