import React from "react";
import BillingPlanDescription from "../BillingPlanDescription/BillingPlanDescription";

function BaseRadio({
  legend,
  name,
  radios,
  regularity,
  checked,
  customStyle,
  billingPlanDescription,
  handleRadioClick,
}) {
  const radioStyle =
    customStyle === "toggle" ? "c-toggle-radio" : "c-base-radio";

  return (
    <div className={`${radioStyle}__group`}>
      <fieldset className={`${radioStyle}__fieldset`}>
        <legend className={`${radioStyle}__legend visuallyhidden`}>
          {legend}
        </legend>
        {radios.map((radio, i) => {
          const value = i;
          return (
            <React.Fragment key={radio.id}>
              <input
                className={`${radioStyle}__input`}
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
                className={`${radioStyle}__radio ${
                  checked === value ? radioStyle + "__radio--selected" : ""
                }`}
                htmlFor={radio.id}
              >
                {radio.svgIcon && (
                  <span className={`${radioStyle}__icon`}>
                    <span dangerouslySetInnerHTML={{ __html: radio.svgIcon }} />
                  </span>
                )}
                <span className={`${radioStyle}__text-area`}>
                  <p className={`${radioStyle}__label`}>{radio.label}</p>
                  {billingPlanDescription && (
                    <BillingPlanDescription
                      description={radio.description}
                      regularity={regularity}
                    />
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
