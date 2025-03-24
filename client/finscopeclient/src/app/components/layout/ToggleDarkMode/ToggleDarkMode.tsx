import React from "react";
import { useDarkMode } from "../../../hooks/useDarkMode";
import "./ToggleDarkMode.css";

const ToggleDarkMode = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        className="theme-switch__checkbox"
        checked={isDark}
        onChange={toggleDarkMode}
      />
      <div className="theme-switch__container">
        <div className="theme-switch__clouds"></div>
        <div className="theme-switch__stars-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 144 55"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133..."
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container">
            <div className="theme-switch__moon">
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
              <div className="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default ToggleDarkMode;
