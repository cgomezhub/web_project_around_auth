import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
//import api from "../utils/api";

function Auth({ onRegisterSubmit }) {
  //const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/signup"
        element={<Register onRegisterSubmit={onRegisterSubmit} />}
      />
      <Route path="/signin" element={<Login />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}
export default Auth;
