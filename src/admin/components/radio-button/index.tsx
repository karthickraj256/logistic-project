import React from "react";
import { CheckBoxIcon, UncheckBoxIcon } from "../../../assets/icons/color-svg";

interface RadioButtonInterface {
  activeValue: string[];
  buttonList: {
    name: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  type?: 'row' | 'column';
}

function RadioButton(props: RadioButtonInterface) {
  const { activeValue, buttonList, onChange, type = "row" } = props;
  return (
    <div className="radio-button-wrap">
      <div className={`radio-button-list ${type}`}>
        {buttonList.map((button) => (
          <div
            className="radio-button-item"
            onClick={() => onChange(button.value)}
          >
            <div className="icon">
              {activeValue.includes(button.value) ? (
                <CheckBoxIcon />
              ) : (
                <UncheckBoxIcon />
              )}
            </div>
            <div className="label">{button.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButton;
