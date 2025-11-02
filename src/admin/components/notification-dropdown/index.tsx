import React, { useEffect, useState } from "react";
import {
  NotificationErrorIcon,
  NotificationEventIcon,
  NotificationIcon,
  NotificationProfileIcon,
  NotificationSettingIcon,
} from "../../../assets/icons/color-svg";

function NotificationDropdown() {
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setStyle((prevStyle: any) => ({
      ...prevStyle,
      height: "320px",
      opacity: 1,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".notification-dropdown-wrap");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setStyle({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-dropdown-wrap">
      <div
        className="notification-dropdown-header"
        role="button"
        onClick={toggleDropdown}
      >
        <NotificationIcon />
      </div>
      <div className="notification-dropdown-content" style={style}>
        <div className="notification-dropdown-header">
          <span>Notifications</span>
        </div>
        <div className="notification-dropdown-body">
          <div className="notification-item">
            <div className="notification-icon">
              <NotificationSettingIcon />
            </div>
            <div className="notification-text">
              <div className="title">Settings</div>
              <div className="subtitle">Update Dashboard</div>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-icon">
              <NotificationEventIcon />
            </div>
            <div className="notification-text">
              <div className="title">Event Update</div>
              <div className="subtitle">An event data update again</div>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-icon">
              <NotificationProfileIcon />
            </div>
            <div className="notification-text">
              <div className="title">Profile</div>
              <div className="subtitle">Update your profile</div>
            </div>
          </div>
          <div className="notification-item">
            <div className="notification-icon">
              <NotificationErrorIcon />
            </div>
            <div className="notification-text">
              <div className="title">Application Error</div>
              <div className="subtitle">Check your running application</div>
            </div>
          </div>
        </div>
        <div className="notification-dropdown-footer">
          <span>See all notifications</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
