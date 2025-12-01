import React from "react";

interface ButtonInterface {
  label: string;
  onClick?: () => void;
  type?: "primary" | "success" | "danger" | "warning" | "default";
  icon?: React.ReactNode;
  disabled?: boolean;
}
function Button(props: ButtonInterface) {
  const { label, onClick, type, icon, disabled } = props;
  return (
    <div className="button-wrap">
      <div className={`button ${type}-button ${disabled ? "disabled" : ""}`} onClick={disabled ? undefined : onClick}>
        {icon}
        {label}
      </div>
    </div>
  );
}

export default Button;
