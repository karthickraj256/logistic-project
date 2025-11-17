import React, { useState, useEffect, useRef } from "react";
import {
  CalenderIcon,
  LeftArrowButton,
  RightArrowButton,
} from "../../../assets/icons/normal-svg";

interface DateRangeInputBoxPropsInterface {
  label?: string;
  name1: string;
  name2: string;
  value1: string | number;
  value2: string | number;
  required?: boolean;
  disabled?: boolean;
  onChange: (name: string, value: string | number) => void;
}

function DateRangeInputBox(props: DateRangeInputBoxPropsInterface) {
  const { label, name1, name2, value1, value2, required, disabled, onChange } =
    props;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>({});
  const [currentDate, setCurrentDate] = useState<{
    month1: string;
    year1: number;
    monthNumber1: number;
    dates1: any[];
    month2: string;
    year2: number;
    monthNumber2: number;
    dates2: any[];
  }>({
    month1: "",
    monthNumber1: 0,
    year1: 0,
    dates1: [],
    month2: "",
    monthNumber2: 0,
    year2: 0,
    dates2: [],
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
      ".date-range-input-box-wrap"
    );
    const totalCalender = document
      .getElementById("multi_calender_height")
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

  const inputTextChange = (name: string, changeValue: string) => {
    if (changeValue) {
      onChange(name, changeValue);
    }
    // setStyle({});
  };

  const previousMonth = () => {
    let prevMonth = currentDate.monthNumber1;
    let prevYear = currentDate.year1;
    let prevMonth1 = currentDate.monthNumber1 - 1;
    let prevYear1 = currentDate.year1;

    if (prevMonth1 < 0) {
      prevMonth1 = 11;
    }
    if (prevMonth1 === 11) {
      prevYear1 -= 1;
    }
    
    const formattedDays1 = getFormattedDaysInCurrentMonth(prevMonth1, prevYear1);
    const formattedDays2 = getFormattedDaysInCurrentMonth(prevMonth, prevYear);
    setCurrentDate({
      month1: formattedDays1.month,
      monthNumber1: formattedDays1.monthNumber,
      year1: formattedDays1.year,
      dates1: formattedDays1.dates,
      month2: formattedDays2.month,
      monthNumber2: formattedDays2.monthNumber,
      year2: formattedDays2.year,
      dates2: formattedDays2.dates,
    });
  };
  const nextMonth = () => {
    let prevMonth = currentDate.monthNumber2;
    let prevYear = currentDate.year2;
    let nextMonth = prevMonth + 1 === 12 ? 0 : prevMonth + 1;
    let nextYear = nextMonth === 0 ? prevYear + 1 : prevYear;

    const formattedDays1 = getFormattedDaysInCurrentMonth(prevMonth, prevYear);
    const formattedDays2 = getFormattedDaysInCurrentMonth(nextMonth, nextYear);
    setCurrentDate({
      month1: formattedDays1.month,
      monthNumber1: formattedDays1.monthNumber,
      year1: formattedDays1.year,
      dates1: formattedDays1.dates,
      month2: formattedDays2.month,
      monthNumber2: formattedDays2.monthNumber,
      year2: formattedDays2.year,
      dates2: formattedDays2.dates,
    });
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
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonth = prevMonthDate.getMonth() + 1; // (1–12)
    const previousYear = prevMonthDate.getFullYear();
    
    const formattedDays1 = getFormattedDaysInCurrentMonth(
      previousMonth - 1,
      previousYear
    );
    const formattedDays2 = getFormattedDaysInCurrentMonth(
      now.getMonth(),
      now.getFullYear()
    );
    setCurrentDate({
      month1: formattedDays1.month,
      monthNumber1: formattedDays1.monthNumber,
      year1: formattedDays1.year,
      dates1: formattedDays1.dates,
      month2: formattedDays2.month,
      monthNumber2: formattedDays2.monthNumber,
      year2: formattedDays2.year,
      dates2: formattedDays2.dates,
    });

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="date-range-input-box-wrap" ref={inputRef}>
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
          value={value1 && value2 ? `${value1} to ${value2}` : ""}
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
        <div id="multi_calender_height">
          <div>
            <div className="calender-header">
              <div className="calender-title">
                {currentDate.month1} {currentDate.year1} - {currentDate.month2}{" "}
                {currentDate.year2}
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
                  {currentDate.dates1.map((item: any, index: number) => (
                    <div
                      className="item"
                      onClick={() => inputTextChange(name1, item.fullDay)}
                      key={index}
                    >
                      {item.isCurrentMonth ? item.date : ""}
                    </div>
                  ))}
                  {/* <div className="item active">1</div> */}
                </div>
              </div>
              <div className="calender-body-dates">
                <div className="calender-week-dates">
                  {days.map((item) => (
                    <div className="item" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="calender-month-dates">
                  {currentDate.dates2.map((item: any, index: number) => (
                    <div
                      className="item"
                      onClick={() => inputTextChange(name2, item.fullDay)}
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
    </div>
  );
}

export default DateRangeInputBox;
