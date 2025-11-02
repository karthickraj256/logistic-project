import React, { useEffect, useState } from "react";
import englishFlagImage from "../../../assets/images/Flag.png";
import { CheckIcon, DownArrow } from "../../../assets/icons/normal-svg";

function LanguageDropdown() {
  const [style, setStyle] = useState<any>({});

  const toggleDropdown = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setStyle((prevStyle: any) => ({
      ...prevStyle,
      height: "180px",
      opacity: 1,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".language-dropdown-wrap");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setStyle({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-dropdown-wrap">
      <div
        className="language-dropdown-header"
        role="button"
        onClick={toggleDropdown}
      >
        <div className="image">
          <img
            src={englishFlagImage}
            srcSet="https://flagcdn.com/w40/gb.png 2x"
            alt="English"
          />
        </div>
        <div className="text">English</div>
        <div className="icon">
          <DownArrow />
        </div>
      </div>
      <div className="language-dropdown-content" style={style}>
        <div className="language-dropdown-header">
          <span>Select Language</span>
        </div>
        <div className="language-dropdown-body">
          <div className="language-item">
            <div className="language-image">
              <img
                src={englishFlagImage}
                srcSet="https://flagcdn.com/w40/gb.png 2x"
                alt="English"
              />
            </div>
            <div className="language-text">English</div>
            <div className="language-icon"><CheckIcon /></div>
          </div>
          <div className="language-item">
            <div className="language-image">
              <img
                src={englishFlagImage}
                srcSet="https://flagcdn.com/w40/gb.png 2x"
                alt="English"
              />
            </div>
            <div className="language-text">English</div>
            <div className="language-icon"><CheckIcon /></div>
          </div>
          <div className="language-item">
            <div className="language-image">
              <img
                src={englishFlagImage}
                srcSet="https://flagcdn.com/w40/gb.png 2x"
                alt="English"
              />
            </div>
            <div className="language-text">English</div>
            <div className="language-icon"><CheckIcon /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageDropdown;
