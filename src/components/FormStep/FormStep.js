import React from "react";
import { ButtonClickContext } from "../App/App";

function FormStep({
  heading,
  description,
  buttonLabel,
  allowGoStepBack = false,
  navigationButtons = true,
  handleSubmit,
  children,
}) {
  const handleStepChange = React.useContext(ButtonClickContext);

  return (
    <>
      <div>
        <h2 className="c-form__heading">{heading}</h2>
        <p className="c-form__description"> {description}</p>
      </div>

      <form
        className="c-form-step"
        onSubmit={handleSubmit && handleSubmit(() => handleStepChange(1))}
      >
        <div className="c-form-step__content">{children}</div>
        {navigationButtons && (
          <div className="c-form-step__navigation">
            {allowGoStepBack && (
              <button
                className="c-form-step__btn c-form-step__btn--link"
                type="button"
                onClick={() => handleStepChange(-1)}
              >
                Go back
              </button>
            )}
            <button
              className="c-form-step__btn c-form-step__btn--primary"
              type="submit"
            >
              {buttonLabel}
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default FormStep;
