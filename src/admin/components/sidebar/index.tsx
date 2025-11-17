import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import { DashboardIcon } from "../../../assets/icons/normal-svg";

import { SidebarMenusInterface } from "../../interface/common";

function Sidebar() {
  const currentPathName: string = window.location.pathname;
  const routes: SidebarMenusInterface[] = [
    {
      icon: <DashboardIcon />,
      name: "Dashboard",
      active: ['/admin/dashboard'].includes(currentPathName),
      route: "/admin/dashboard",
    },
    {
      icon: <DashboardIcon />,
      name: "Customer",
      active: ['/admin/customer'].includes(currentPathName),
      route: "/admin/customer",
    },
    {
      icon: <DashboardIcon />,
      name: "Branch",
      active: ['/admin/branch'].includes(currentPathName),
      route: "/admin/branch",
    },
    {
      icon: <DashboardIcon />,
      name: "Vehicle",
      active: ['/admin/vehicle'].includes(currentPathName),
      route: "/admin/vehicle",
    },
    {
      icon: <DashboardIcon />,
      name: "Orders",
      active: ['/admin/orders'].includes(currentPathName),
      route: "/admin/orders",
    },
    {
      icon: <DashboardIcon />,
      name: "Transport",
      active: ['/admin/transport'].includes(currentPathName),
      route: "/admin/transport",
    },
    {
      icon: <DashboardIcon />,
      name: "Delivery",
      active: ['/admin/delivery'].includes(currentPathName),
      route: "/admin/delivery",
    },
    {
      icon: <DashboardIcon />,
      name: "Report",
      active: ['/admin/report'].includes(currentPathName),
      route: "/admin/report",
    },
    {
      icon: <DashboardIcon />,
      name: "Roles",
      active: ['/admin/roles'].includes(currentPathName),
      route: "/admin/roles",
    },
    {
      icon: <DashboardIcon />,
      name: "Users",
      active: ['/admin/users'].includes(currentPathName),
      route: "/admin/users",
    },
    {
      icon: <DashboardIcon />,
      name: "Transaction",
      active: ['/admin/transaction'].includes(currentPathName),
      route: "/admin/transaction",
    },
  ];
  const navigate = useNavigate();

  const redirectTo = (route: string) => {
    navigate(route);
  };
  return (
    <div className="admin-sidebar-wrap">
      <div className="admin-sidebar-header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="admin-sidebar-body">
        <div className="admin-sidebar-content">
          <div className="sidebar-content-session">
            {routes.map((menu: SidebarMenusInterface) => (
              <div className="sidebar-menu-item">
                <div
                  className={`sidebar-menu ${menu.active ? 'active' : ''}`}
                  onClick={() => redirectTo(menu.route)}
                  role="button"
                >
                  <div className="menu-icon">
                    {menu.icon}
                  </div>
                  <div className="menu-text">{menu.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
