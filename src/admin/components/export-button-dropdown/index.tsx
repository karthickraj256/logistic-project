import React, { useEffect, useRef, useState } from "react";
import { ExportButtonIcon } from "../../../assets/icons/normal-svg";
import { ExcelFileIcon, PdfFileIcon } from "../../../assets/icons/color-svg";

interface ExportButtonDropDownInterface {
  onClick: (name: string) => void;
}

function ExportButtonDropDown(props: ExportButtonDropDownInterface) {
  const buttonList = [
    {
      label: 'Excel File',
      key: 'excel',
      icon: <PdfFileIcon />
    },
    {
      label: 'PDF File',
      key: 'pdf',
      icon: <ExcelFileIcon />
    },
    {
      label: 'JSON File',
      key: 'json',
      icon: <ExcelFileIcon />
    },
  ] 
  const { onClick } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".table-column-dropdown-wrap"
    );
    const totalCalender = document
      .getElementById("export_height")
      ?.getBoundingClientRect();
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      const newStyle: any = {
        height: 'auto',
        width: 200,
        opacity: 1,
      };
      if (
        totalCalender &&
        rect.top + rect.height + totalCalender.height >
          document.body.clientHeight
      ) {
        newStyle.bottom = rect.height;
      } else {
        newStyle.top = rect.height;
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
    <div className="table-column-dropdown-wrap" ref={inputRef}>
      <div className="table-column-button" onClick={toggleDropdown}>
        <ExportButtonIcon />
      </div>
      <div className="table-column-dropdown" style={style}>
        <div className="table-column-content" id="export_height">
          {buttonList.map((item) => (
            <div className="column-field" onClick={() => onClick(item.key)}>
              <div className="radio-button">
                {item.icon}
              </div>
              <div className="column-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExportButtonDropDown;
