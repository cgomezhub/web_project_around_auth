import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../src/components/Login";

function Auth() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route exact path="/" element={<Login />} />
      <Route path="/*" element={navigate("/")} />
    </Routes>
  );
}

export default Auth;
