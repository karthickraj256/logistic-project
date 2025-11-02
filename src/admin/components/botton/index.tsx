import React from "react";

interface ButtonInterface {
  label: string;
  onClick?: () => void;
  type?: "primary" | "success" | "danger" | "warning" | "default";
}
function Button(props: ButtonInterface) {
  return <div className="button-wrap">
    <div className={`button ${props.type}-button`}>{props.label}</div>
  </div>;
}

export default Button;
