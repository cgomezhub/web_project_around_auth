import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";

function Auth({ isLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/signin"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
}

export default Auth;
