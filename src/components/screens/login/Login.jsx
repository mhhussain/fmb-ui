import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@/atoms/Alert';
import "@/styles/Login.css";
import { useLoginJamaatMemberByITSIdMutation } from "../../../api/thaaliApi";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./loginSlice";

export default function Login() {
  const [itsID, setItsID] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [ login, {data} ] = useLoginJamaatMemberByITSIdMutation();
  const loggedIn = useSelector((state) => state.loggedIn.loggedIn);
  const dispatch = useDispatch();


  if (loggedIn) {
    return <Navigate to="/" replace={true}/>;
  }
  
  const updateITSValid = async () => {
    try {
      const result = await login(itsID).unwrap();
      dispatch(logIn(itsID));
    } catch (error) {
      setInvalid(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setInvalid(false);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      updateITSValid();
    }
  }

  return (
    <div className="login-wrapper">
      <h1>FMB (alpha)</h1>
      <label>
        <p>ITS ID</p>
        <input
          type="text"
          onChange={(e) => setItsID(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </label>
      <div>
        <button className="btn btn-primary" onClick={updateITSValid} onKeyUp={handleKeyUp}>
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
