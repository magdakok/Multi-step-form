import React from "react";
import { getPrice, getValueAndCurrency } from "../../helpers/helpers";
import css from "./BaseCheckboxGroup.module.scss";

function BaseCheckboxGroup({
  legend,
  name,
  checkboxes,
  regularityObj,
  checked,
  handleCheckboxClick,
}) {
  console.log("BaseCheckboxGroup re-rendered");
  return (
    <div>
      <fieldset className={css.fieldset}>
        <legend className={css.legend}>{legend}</legend>
        {checkboxes.map((checkbox, i) => {
          const value = i.toString();
          return (
            <React.Fragment key={checkbox.id}>
              <input
                className={css.input}
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
                className={
                  checked[i] === true ? css.checkboxSelected : css.checkbox
                }
                htmlFor={checkbox.id}
              >
                <span className={css.tick}></span>
                <span className="c-base-checkbox__text-area">
                  <p className={css.label}>{checkbox.label}</p>
                  <p className={css.description}>{checkbox.description}</p>
                </span>
                <span className={css.price}>
                  {getPrice(
                    ...getValueAndCurrency(checkbox.price, regularityObj),
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
