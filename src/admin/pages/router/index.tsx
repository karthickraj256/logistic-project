import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout";
import Dashboard from "../dashboard";
import Consumer from "../consumer";
import Roles from "../roles";

function AppRouter() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="customer" element={<Consumer />} />
      <Route path="roles" element={<Roles />} />
    </Routes>
  );
}

export default AppRouter;
