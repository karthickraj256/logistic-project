import React from "react";

import profileImage from "../../../assets/images/profile-image.png";

import { DownArrow, MenuIcon } from "../../../assets/icons/normal-svg";
import SearchInputBox from "../search-input-box";
import NotificationDropdown from "../notification-dropdown";
import LanguageDropdown from "../language-dropdown";
import ProfileDropdown from "../profile-dropdown";

function Header() {
  return (
    <div className="admin-header-wrap">
      <div className="admin-header-left">
        <div className="admin-header-icon">
          <MenuIcon />
        </div>
        <div className="admin-header-search">
          <SearchInputBox />
        </div>
      </div>
      <div className="admin-header-right">
        <div className="admin-header-notification">
          <NotificationDropdown />
        </div>
        <div className="admin-header-language">
          <LanguageDropdown />
        </div>
        <div className="admin-header-profile">
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

export default Header;
