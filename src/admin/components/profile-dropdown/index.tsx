import React, { useEffect, useState } from "react";
import profileImage from "../../../assets/images/profile-image.png";
import { CheckIcon, DownArrow } from "../../../assets/icons/normal-svg";
import { AccountIcon, LogIcon, LogoutIcon, PasswordIcon } from "../../../assets/icons/color-svg";

function ProfileDropdown() {
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setStyle((prevStyle: any) => ({
      ...prevStyle,
      height: "165px",
      opacity: 1,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".profile-dropdown-wrap");
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
    <div className="profile-dropdown-wrap">
      <div
        className="profile-dropdown-header"
        role="button"
        onClick={toggleDropdown}
      >
        <div className="image">
          <img
            src={profileImage}
            srcSet="https://flagcdn.com/w40/gb.png 2x"
            alt="English"
          />
        </div>
        <div className="text">
          <div className="title">Moni Roy</div>
          <div className="subtitle">Admin</div>
        </div>
        <div className="icon">
          <DownArrow />
        </div>
      </div>
      <div className="profile-dropdown-content" style={style}>
        <div className="profile-dropdown-body">
          <div className="profile-item">
            <div className="profile-image"><AccountIcon /></div>
            <div className="profile-text">Manage Account</div>
          </div>
          <div className="profile-item">
            <div className="profile-image"><PasswordIcon /></div>
            <div className="profile-text">Change Password</div>
          </div>
          <div className="profile-item">
            <div className="profile-image"><LogIcon /></div>
            <div className="profile-text">Activity Log</div>
          </div>
          <div className="profile-item">
            <div className="profile-image"><LogoutIcon /></div>
            <div className="profile-text">Log out</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
