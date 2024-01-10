import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
//import api from "../utils/api";

function Auth({ onRegisterSubmit, onSigninSubmit }) {
  //const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/signup"
        element={<Register onRegisterSubmit={onRegisterSubmit} />}
      />
      <Route
        path="/signin"
        element={<Login onSigninSubmit={onSigninSubmit} />}
      />
      <Route path="/*" element={<Login onSigninSubmit={onSigninSubmit} />} />
    </Routes>
  );
}
export default Auth;
