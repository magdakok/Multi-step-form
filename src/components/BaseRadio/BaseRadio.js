import React from "react";
import BillingPlanDescription from "../BillingPlanDescription/BillingPlanDescription";
import css from "./BaseRadio.module.scss";

function BaseRadio({
  legend,
  name,
  radios,
  regularityObj,
  checked,
  customStyle,
  billingPlanDescription,
  handleRadioClick,
}) {
  const radioStyle = customStyle === "toggle" ? "toggle" : "radio";

  return (
    <div className={css[`${radioStyle + "Group"}`]}>
      <fieldset className={css[`${radioStyle + "Fieldset"}`]}>
        <legend className={css[`${radioStyle + "Legend"}`]}>{legend}</legend>
        {radios.map((radio, i) => {
          const value = i;
          return (
            <React.Fragment key={radio.id}>
              <input
                className={css[`${radioStyle + "Input"}`]}
                type="radio"
                name={name}
                id={radio.id}
                value={value}
                checked={checked === value}
                onChange={() => {
                  handleRadioClick(value);
                }}
              />
              <label
                className={
                  checked === value
                    ? css[`${radioStyle + "RadioSelected"}`]
                    : css[`${radioStyle + "Radio"}`]
                }
                htmlFor={radio.id}
              >
                {radio.svgIcon && (
                  <span className={css[`${radioStyle + "Icon"}`]}>
                    <span dangerouslySetInnerHTML={{ __html: radio.svgIcon }} />
                  </span>
                )}
                <span className={css[`${radioStyle + "TextArea"}`]}>
                  <p className={css[`${radioStyle + "Label"}`]}>
                    {radio.label}
                  </p>
                  {billingPlanDescription && (
                    <span className={css[`${radioStyle + "Description"}`]}>
                      <BillingPlanDescription
                        description={radio.description}
                        regularityObj={regularityObj}
                      />
                    </span>
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

export default BaseRadio;
