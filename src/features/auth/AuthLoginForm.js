import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLoginAPI } from "../users/authSlice";
import "./bootstrap.min.css";

function AuthLoginForm() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const doSubmit = (e) => {
    e.preventDefault();
    dispatch(authLoginAPI({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <form name="LoginForm" onSubmit={doSubmit} className="card border-success mb-3" style={{maxWidth: '50rem', alignItems: 'center', margin: 150, marginLeft: 420, padding: 50}}>
      <fieldset>
        <legend>Login Form</legend>
      <div className="form-group-collection" style={{maxWidth: '20rem'}}>
        <div className="form-group row">
          <label htmlFor="email" className="form-label mt-4">Email:</label>
          <input type="email" className="form-control" name="email" value={email} onChange={emailChange} />
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="form-label mt-4">Password:</label>
          <input type="password" className="form-control" name="password" value={password} onChange={passwordChange} />
        </div>
      </div>
      <button className="btn btn-secondary" type="submit" value="Login" style={{marginTop: 20}}>Submit</button>
      <div className="message">
        {authState.isLoginPending && <div>Please wait...</div>}
        {authState.isLoginSuccess && <div>Success.</div>}
        {authState.errorMessages && <div>{authState.errorMessages}</div>}
      </div>
      </fieldset>
    </form>
  )
}

export default AuthLoginForm;
