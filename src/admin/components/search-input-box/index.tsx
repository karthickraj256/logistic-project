import React from "react";
import { SearchIconInput } from "../../../assets/icons/normal-svg";

function SearchInputBox() {
  return <div className="admin-search-input-box">
    <div className="admin-search-input-icon">
      <SearchIconInput />
    </div>
    <input type="text" placeholder="Search..." className="admin-search-input" />
  </div>;
}

export default SearchInputBox;
