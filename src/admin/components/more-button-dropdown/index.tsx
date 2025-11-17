import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { MoreButtonIcon } from "../../../assets/icons/normal-svg";

interface ButtonListInterface {
  label: string;
  icon?: React.ReactNode;
  function: (value: string) => void;
  component?: React.ReactNode;
}
interface MoreButtonDropDownInterface {
  buttonList: ButtonListInterface[];
  value?: string;
}

function MoreButtonDropDown(props: MoreButtonDropDownInterface) {
  const { buttonList, value } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".more-button-dropdown-wrap"
    );
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      const newStyle: any = {
        height: "auto",
        width: 200,
        display: "flex",
        left: rect.left,
        top: rect.top + rect.height,
      };
      console.log(rect);

      if (
        rect.left + rect.width + 200 >
          document.body.clientWidth
      ) {
        newStyle.left = (rect.left + rect.width) - 200;
      }
      if (
        rect.top + rect.height + 100 >
          document.body.clientHeight
      ) {
        newStyle.top = (rect.top + rect.width) - 100;
      }
      setStyle(newStyle);
    }
  };
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setStyle({});
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="more-button-dropdown-wrap" ref={inputRef}>
      <div className="more-button-button" onClick={toggleDropdown}>
        <MoreButtonIcon />
      </div>
      {ReactDOM.createPortal(
        <div
          className="more-button-dropdown"
          style={style}
        >
          <div className="more-button-content">
            {buttonList.map(
              (item) =>
                item.component || (
                  <div
                    className="column-field"
                    onClick={() => item.function(value || "")}
                  >
                    <div className="radio-button">{item.icon}</div>
                    <div className="column-label">{item.label}</div>
                  </div>
                )
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default MoreButtonDropDown;
