import React from 'react';

import logo from "../../../assets/images/logo.png";
import { DashboardIcon } from '../../../assets/icons/normal-svg';

function Sidebar() {
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
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu active">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Dashboard</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Customer</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Branch</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Vehicle</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Orders</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Manifest</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Transport</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Delivery</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Report</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Roles</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Users</div>
                    </div>
                  </div>
                  <div className="sidebar-menu-item">
                    <div className="sidebar-menu">
                      <div className="menu-icon"><DashboardIcon /></div>
                      <div className="menu-text">Transaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default Sidebar;