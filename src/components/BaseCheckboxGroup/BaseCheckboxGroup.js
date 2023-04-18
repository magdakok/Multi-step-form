import React from "react";
import { getPrice, getValueAndCurrency } from "../../helpers/helpers";

function BaseCheckboxGroup({
  legend,
  name,
  checkboxes,
  regularity,
  checked,
  handleCheckboxClick,
}) {
  console.log("BaseCheckboxGroup re-rendered");
  return (
    <div className="c-base-checkbox__group">
      <fieldset className="c-base-checkbox__fieldset">
        <legend className="c-base-checkbox__legend visuallyhidden">
          {legend}
        </legend>
        {checkboxes.map((checkbox, i) => {
          const value = i.toString();
          console.log(checked[i] === true);
          return (
            <React.Fragment key={checkbox.id}>
              <input
                className="c-base-checkbox__input"
                type="checkbox"
                name={name}
                id={checkbox.id}
                value={value}
                checked={checked[i] === true}
                onChange={() => {
                  handleCheckboxClick(value);
                }}
              />
              <label
                className={`c-base-checkbox__checkbox ${
                  checked[i] === true
                    ? "c-base-checkbox__checkbox--selected"
                    : ""
                }`}
                htmlFor={checkbox.id}
              >
                <span className="c-base-checkbox__tick"></span>
                <span className="c-base-checkbox__text-area">
                  <p className="c-base-checkbox__label">{checkbox.label}</p>
                  <p className="c-base-checkbox__description">
                    {checkbox.description}
                  </p>
                </span>
                <span className="c-base-checkbox__price">
                  {getPrice(
                    ...getValueAndCurrency(checkbox.price, regularity),
                    { signDisplay: "always" }
                  )}
                </span>
              </label>
            </React.Fragment>
          );
        })}
      </fieldset>
    </div>
  );
}

export default BaseCheckboxGroup;
