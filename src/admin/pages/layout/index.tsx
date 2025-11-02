import React from "react";
import { Outlet } from "react-router-dom";

import AppRouter from "../router";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function Layout() {
  return (
    <div className="admin-layout-wrap">
      <div className="admin-layout-sidebar">
        <Sidebar />
      </div>
      <div className="admin-layout-content">
        <Header />
        <div className="content-body">
          <AppRouter />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
