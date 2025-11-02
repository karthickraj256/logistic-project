import React, { useState, useEffect, useRef } from "react";
import {
  CalenderIcon,
  LeftArrowButton,
  RightArrowButton,
} from "../../../assets/icons/normal-svg";

interface InputBoxPropsInterface {
  label?: string;
  name: string;
  value: string | number;
  required?: boolean;
  disabled?: boolean;
  onChange: (name: string, value: string | number) => void;
}

function DateInputBox(props: InputBoxPropsInterface) {
  const { label, name, value, required, disabled, onChange } = props;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});
  const [currentDate, setCurrentDate] = useState<{
    month: string;
    year: number;
    monthNumber: number;
    dates: any[];
  }>({
    month: "",
    monthNumber: 0,
    year: 0,
    dates: [],
  });

  const getFormattedDaysInCurrentMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const lastDate = lastDay.getDate();

    const monthName = firstDay.toLocaleString("en-US", { month: "long" });
    const firstDayIndex = firstDay.getDay(); // 0-6 (Sun-Sat)

    const dates = Array.from({ length: lastDate }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const dayDate = date.getDate();

      return {
        date: dayDate,
        fullDay: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayDate
        ).padStart(2, "0")}`,
        weekDay: date.toLocaleString("en-US", { weekday: "short" }),
        isCurrentMonth: true,
      };
    });

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDayIndex; i++) {
      dates.unshift({
        date: 0,
        fullDay: "",
        weekDay: "",
        isCurrentMonth: false,
      });
    }

    return {
      month: monthName,
      monthNumber: month,
      year,
      dates,
    };
  };

  const selectBoxHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    const closestInputBox = (e.target as HTMLElement).closest(
      ".date-input-box-wrap"
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

  const inputTextChange = (changeValue: string) => {
    onChange(name, changeValue);
    setStyle({});
  };

  const previousMonth = () => {
    let prevMonth = currentDate.monthNumber - 1;
    let prevYear = currentDate.year;

    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const formattedDays = getFormattedDaysInCurrentMonth(prevMonth, prevYear);
    setCurrentDate(formattedDays);
  };
  const nextMonth = () => {
    let prevMonth = currentDate.monthNumber + 1;
    let prevYear = currentDate.year;

    if (prevMonth === 13) {
      prevMonth = 1;
      prevYear += 1;
    }
    console.log(prevMonth, prevYear);

    const formattedDays = getFormattedDaysInCurrentMonth(prevMonth, prevYear);
    setCurrentDate(formattedDays);
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

    const now = new Date();
    const formattedDays = getFormattedDaysInCurrentMonth(
      now.getMonth(),
      now.getFullYear()
    );
    setCurrentDate(formattedDays);

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="date-input-box-wrap" ref={inputRef}>
      {label && (
        <label className="input-label" htmlFor="input-box">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="input-box" onClick={selectBoxHandle}>
        <input
          type="text"
          id="input-box"
          value={value}
          autoComplete="off"
          required={required}
          readOnly
          disabled={disabled}
        />
        <span className="input-icon">
          <CalenderIcon />
        </span>
      </div>
      <div className="calender-container" style={style}>
        <div id="calender_height">
          <div className="calender-header">
            <div className="calender-title">
              {currentDate.month} {currentDate.year}
            </div>
            <div className="change-buttons">
              <div className="button-item" onClick={() => previousMonth()}>
                <LeftArrowButton />
              </div>
              <div className="button-item" onClick={() => nextMonth()}>
                <RightArrowButton />
              </div>
            </div>
          </div>
          <div className="calender-body">
            <div className="calender-body-dates">
              <div className="calender-week-dates">
                {days.map((item) => (
                  <div className="item" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="calender-month-dates">
                {currentDate.dates.map((item: any, index: number) => (
                  <div
                    className="item"
                    onClick={() => inputTextChange(item.fullDay)}
                    key={index}
                  >
                    {item.isCurrentMonth ? item.date : ""}
                  </div>
                ))}
                {/* <div className="item active">1</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateInputBox;
