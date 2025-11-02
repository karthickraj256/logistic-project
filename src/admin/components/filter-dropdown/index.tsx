import React, { useEffect, useRef, useState } from "react";
import { CloseIcon, FilterIcon } from "../../../assets/icons/normal-svg";
import InputBox from "../input-box";
import Button from "../botton";
import DateInputBox from "../date-input-box";

interface FilterDataInterface {
  label: string;
  name: string;
  value: string | number;
  type: "text" | "select" | "date";
  dataList?: any[];
  placeholder?: string;
}

interface FilterDropDownInterface {
  filterData: FilterDataInterface[];
  onChange: (name: string, value: string | number) => void;
}

function FilterDropDown(props: FilterDropDownInterface) {
  const { filterData, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".filter-dropdown-wrap"
    );
    const totalCalender = document
      .getElementById("calender_height")
      ?.getBoundingClientRect();
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      const newStyle: any = {
        height: totalCalender?.height || 250,
        width: totalCalender?.width || 250,
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
    <div className="filter-dropdown-wrap" ref={inputRef}>
      <div className="filter-button" onClick={toggleDropdown}>
        <FilterIcon />
      </div>
      <div className="filter-dropdown" style={style} id="calender_height">
        <div className="filter-header">
          <div className="title">Filter Options</div>
          <div className="close-btn" onClick={() => setStyle({})}>
            <CloseIcon />
          </div>
        </div>
        <div className="filter-form-content">
          {filterData.map((item: FilterDataInterface) =>
            item.type === "date" ? (
              <div className="filter-form-input">
                <DateInputBox
                  label={item.label}
                  name={item.name}
                  onChange={onChange}
                  value={item.value}
                />
              </div>
            ) : (
              <div className="filter-form-input">
                <InputBox
                  label={item.label}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={onChange}
                  type={item.type}
                  dataList={item.dataList || []}
                  value={item.value}
                />
              </div>
            )
          )}
        </div>
        <div className="filter-form-buttons">
          <Button label="Reset" type="default" onClick={() => {}} />
          <Button label="Apply" type="primary" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default FilterDropDown;
