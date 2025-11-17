import React, { useEffect, useRef, useState } from "react";
import { TableColumnEditIcon } from "../../../assets/icons/normal-svg";
import { CheckBoxIcon, UncheckBoxIcon } from "../../../assets/icons/color-svg";

interface TableColumn {
  name: string;
  label: string;
}

interface TableColumnDropDownInterface {
  columnList: TableColumn[];
  selectedKeys: string[];
  onChange: (name: string) => void;
}

function TableColumnDropDown(props: TableColumnDropDownInterface) {
  const { columnList, onChange, selectedKeys } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".table-column-dropdown-wrap"
    );
    const totalCalender = document
      .getElementById("table_column_height")
      ?.getBoundingClientRect();
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      const newStyle: any = {
        height: totalCalender?.height || 250,
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
      if (
        totalCalender &&
        rect.left + totalCalender.width >
          document.body.clientWidth
      ) {
        newStyle.right = 0;
        newStyle.left = 'inherit'
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
        <TableColumnEditIcon />
      </div>
      <div className="table-column-dropdown" style={style} id="table_column_height">
        <div className="table-column-content">
          {columnList.map((item: TableColumn) => (
            <div className="column-field">
              <div className="radio-button">
                {selectedKeys.includes(item.name) ? <CheckBoxIcon /> : <UncheckBoxIcon />}
              </div>
              <div className="column-label" onClick={() => onChange(item.name)}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableColumnDropDown;
