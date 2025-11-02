import React from "react";
import HeaderTitle from "../../components/header-title";

function Consumer() {
  return (
    <div className="consumer-wrap">
      <div className="dashboard-header">
        <div className="header-left">
          <HeaderTitle title="Consumer" />
        </div>
      </div>
      <div className="consumer-body">
        <div className="consumer-more-options"></div>
      </div>
    </div>
  );
}

export default Consumer;
