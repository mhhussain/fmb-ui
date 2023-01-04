import React, { useState } from "react";
import "@/styles/Login.css";
import { getJamaatMemberByITSId } from "../../../api/thaaliApi";

function isITSvalid(its) {
  var r = getJamaatMemberByITSId(its);
  if (r) {
    console.log(r);
    return true;
  } else {
    return false;
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p className="form-label">Username</p>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          <p className="form-label">Password</p>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="submit-button">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(e) => setToken(isITSvalid(e.target.value))}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
