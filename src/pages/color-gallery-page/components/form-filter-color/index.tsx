import React from "react";
import "./style.scss";

interface FormFIlterColorProps {
  checkboxes: { [key: string]: boolean };
  handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormFilterColor({
  checkboxes,
  handleChangeCheckbox,
}: FormFIlterColorProps) {
  return (
    <form className="filter-form">
      {Object.keys(checkboxes).map((key: string) => (
        <span className="checkbox-container" key={key}>
          <label>
            <input
              name={key}
              type="checkbox"
              checked={checkboxes[key]}
              onChange={handleChangeCheckbox}
            />
            {key} {">"} 50%
          </label>
        </span>
      ))}
    </form>
  );
}

export default FormFilterColor;
