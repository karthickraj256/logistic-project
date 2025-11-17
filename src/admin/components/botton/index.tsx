import React from "react";

interface ButtonInterface {
  label: string;
  onClick?: () => void;
  type?: "primary" | "success" | "danger" | "warning" | "default";
  icon?: React.ReactNode;
}
function Button(props: ButtonInterface) {
  const { label, onClick, type, icon } = props;
  return (
    <div className="button-wrap" onClick={onClick}>
      <div className={`button ${type}-button`}>
        {icon}
        {label}
      </div>
    </div>
  );
}

export default Button;
