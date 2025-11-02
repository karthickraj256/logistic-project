import React, { JSX, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DownArrow,
  EyeCloseIcon,
  EyeOpenIcon,
} from "../../../assets/icons/normal-svg";
import {
  AddPlusIcon,
  HorizontalLineIcon,
  SubMinusIcon,
} from "../../../assets/icons/normal-svg";
import { SelectBoxList, SelectBoxListItem } from "../../interface/common";

interface InputBoxPropsInterface {
  label?: string;
  name: string;
  placeholder?: string;
  frontIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
  type: "text" | "password" | "number" | "autocomplete" | "select" | "textarea";
  value: string | number;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  dataList?: SelectBoxList;
  onChange: (name: string, value: string | number) => void;
  onAutoCompleteClick?: (name: string, value: SelectBoxListItem) => void;
}

function InputBox(props: InputBoxPropsInterface) {
  const {
    label,
    name,
    placeholder,
    frontIcon,
    backIcon,
    value,
    type,
    required,
    readOnly,
    disabled,
    dataList,
    onChange,
    onAutoCompleteClick,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputType, setInputType] = useState<string>(type);
  const [style, setStyle] = useState<any>({});
  const [openAutoCompleteBox, setOpenAutoCompleteBox] =
    useState<boolean>(false);

  const [searchDataList, setSearchDataList] = useState<
    { id: string | number; name: string }[]
  >(dataList || []);

  const handleShowPassword = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleIncDecNumber = (isInc: boolean) => {
    let newValue = typeof value === "number" ? value : 0;
    if (isInc) {
      newValue++;
    } else {
      newValue--;
    }
    if (newValue < 0) newValue = 0;
    onChange(name, newValue);
  };

  const handleAutoCompletedClick = (id: string | number) => {
    const filterDataList = dataList
      ? dataList.find((item) => item.id === id)
      : undefined;
    if (filterDataList) {
      onAutoCompleteClick && onAutoCompleteClick(name, filterDataList);
      setOpenAutoCompleteBox(false);
    }
  };

  const textareaTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value: string | number = e.target.value;
    onChange(name, value);
  };

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    const closestInputBox = e.target.closest(".input-box-wrap");
    if (closestInputBox) {
      const rect = closestInputBox.getBoundingClientRect();
      setStyle({
        width: rect.width,
        top: rect.height,
      });
    }
    if ((type === "select" || type === "autocomplete") && dataList) {
      const filterDataList = value
        ? dataList.filter((item) =>
            item.name.toLowerCase().includes(String(value).toLowerCase())
          )
        : [];
      if (filterDataList.length > 0) {
        setOpenAutoCompleteBox(true);
      } else {
        setOpenAutoCompleteBox(false);
      }
      setSearchDataList(filterDataList);
    }
    if (type === "number") {
      const regex = /^[0-9\b]+$/;
      if (!regex.test(value) && value !== "") {
        return;
      }
      if (value === "") {
        value = 0;
      } else {
        value = parseInt(value, 10);
      }
    }
    onChange(name, value);
  };

  const selectBoxHandle = (e: any) => {
    if (type === "select") {
      const closestInputBox = e.target.closest(".input-box-wrap");
      inputRef.current?.focus();
      if (closestInputBox) {
        const rect = closestInputBox.getBoundingClientRect();
        const nowStyle: any = {
          width: rect.width,
        };
        if (rect.top + rect.height + 300 > document.body.clientHeight) {
          nowStyle.bottom = rect.height;
        } else {
          nowStyle.top = rect.height;
        }
        setOpenAutoCompleteBox(true);
        setStyle(nowStyle);
      }
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (type !== "select" && type !== "autocomplete") return;
      const targetElement = event.target as HTMLElement;
      if (!targetElement.closest(".input-box-wrap")) {
        setOpenAutoCompleteBox(false);
        const valueCheck = dataList?.find((item: any) => item.name === value);
        if (!valueCheck && type === "select") {
          onChange(name, "");
        }
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="input-box-wrap">
      {label && (
        <label className="input-label" htmlFor="input-box">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div
        className={`input-box ${type === "textarea" ? "textarea" : ""}`}
        onClick={selectBoxHandle}
      >
        {frontIcon && <span className="input-icon">{frontIcon}</span>}
        {type === "textarea" ? (
          <textarea
            id="input-box"
            placeholder={placeholder}
            autoComplete="off"
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            onChange={textareaTextChange}
            value={value}
          ></textarea>
        ) : (
          <input
            type={inputType}
            id="input-box"
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            onChange={inputTextChange}
          />
        )}
        {type === "text" && backIcon && (
          <span className="input-icon">{backIcon}</span>
        )}
        {type === "select" && (
          <span className="input-icon">
            <DownArrow />
          </span>
        )}
        {type === "password" && (
          <span className="input-icon" onClick={handleShowPassword}>
            {inputType === "password" ? <EyeOpenIcon /> : <EyeCloseIcon />}
          </span>
        )}
        {type === "number" && (
          <div className="number-input-arrows">
            <span
              className="input-icon"
              onClick={() => handleIncDecNumber(true)}
            >
              <AddPlusIcon />
            </span>
            <HorizontalLineIcon />
            <span
              className="input-icon"
              onClick={() => handleIncDecNumber(false)}
            >
              <SubMinusIcon />
            </span>
          </div>
        )}
      </div>
      {["autocomplete", "select"].includes(type) &&
        searchDataList.length > 0 &&
        openAutoCompleteBox && (
          <div className="autocompleted-container" style={style}>
            <div className="autocompleted-item-list">
              {searchDataList.map((item) => (
                <div
                  className="autocompleted-item"
                  key={uuidv4()}
                  onClick={() => handleAutoCompletedClick(item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

export default InputBox;
