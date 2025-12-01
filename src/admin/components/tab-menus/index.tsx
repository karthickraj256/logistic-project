import React from "react";

interface TabMenusProps {
  tabs: { label: string; key: string }[];
  onTabClick: (key: string) => void;
  activeTabKey: string;
}
function TabMenus(props: TabMenusProps) {
  const { tabs, onTabClick, activeTabKey } = props;
  return (
    <div className="tab-menus-wrap">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={`tab-menu ${activeTabKey === tab.key ? "active" : ""}`}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default TabMenus;
