import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../dashboard";
import Consumer from "../consumer";

function AppRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="consumer" element={<Consumer />} />
    </Routes>
  );
}

export default AppRouter;
