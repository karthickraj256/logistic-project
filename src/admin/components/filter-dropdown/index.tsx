import React, { useEffect, useRef, useState } from "react";
import { CloseIcon, FilterIcon } from "../../../assets/icons/normal-svg";
import InputBox from "../input-box";
import Button from "../botton";
import DateInputBox from "../date-input-box";
import { FilterDataInterface } from "../../interface/common";

interface FilterDropDownInterface {
  filterData: FilterDataInterface[];
  onChange: (value: FilterDataInterface[]) => void;
}

function FilterDropDown(props: FilterDropDownInterface) {
  const { filterData, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({ display: "none" });
  const [currentValue, setCurrentValue] = useState<FilterDataInterface[]>(filterData);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".filter-dropdown-wrap"
    );
    const totalCalender = document
      .getElementById("filter_height")
      ?.getBoundingClientRect();
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      const newStyle: any = {
        height: 'auto',
        width: totalCalender?.width || 250,
        opacity: 1,
        display: "flex",
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

  const onChangeLocal = (name: string, value: string | number) => {
    const updatedValues = currentValue.map((item) => {
      if (item.name === name) {
        return { ...item, value: value };
      }
      return item;
    });
    setCurrentValue(updatedValues);
  };

  const submit = () => {
    onChange(currentValue);
    setStyle({ display: "none" });
  }

  const reset = () => {
    onChange(currentValue.map(item => ({ ...item, value: "" })));
    setCurrentValue(currentValue.map(item => ({ ...item, value: "" })));
    setStyle({ display: "none" });
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setStyle({ display: "none" });
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    setCurrentValue(filterData);
  }, [filterData]);

  return (
    <div className="filter-dropdown-wrap" ref={inputRef}>
      <div className="filter-button" onClick={toggleDropdown}>
        <FilterIcon />
      </div>
      <div className="filter-dropdown" style={style} id="filter_height">
        <div className="filter-header">
          <div className="title">Filter Options</div>
          <div className="close-btn" onClick={() => setStyle({})}>
            <CloseIcon />
          </div>
        </div>
        <div className="filter-form-content">
          {currentValue.map((item: FilterDataInterface) =>
            item.type === "date" ? (
              <div className="filter-form-input">
                <DateInputBox
                  label={item.label}
                  name={item.name}
                  onChange={onChangeLocal}
                  value={item.value}
                />
              </div>
            ) : (
              <div className="filter-form-input">
                <InputBox
                  label={item.label}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={onChangeLocal}
                  type={item.type}
                  dataList={item.dataList || []}
                  value={item.value}
                />
              </div>
            )
          )}
        </div>
        <div className="filter-form-buttons">
          <Button label="Reset" type="default" onClick={reset} />
          <Button label="Apply" type="primary" onClick={submit} />
        </div>
      </div>
    </div>
  );
}

export default FilterDropDown;
