import React from "react";
import { ButtonClickContext } from "../App/App";

function FormStep({
  heading,
  description,
  buttonLabel,
  handlePreviousClick,
  navigationButtons = true,
  handleSubmit,
  children,
}) {
  const handleSubmitButton = React.useContext(ButtonClickContext);

  return (
    <>
      <h2 className="c-form__heading">{heading}</h2>
      <p className="c-form__description"> {description}</p>

      <form className="c-form-step" onSubmit={handleSubmit(handleSubmitButton)}>
        <div className="c-form-step__content">{children}</div>
        <div className="c-form-step__navigation">
          {handlePreviousClick && (
            <button
              className="c-form-step__btn c-form-step__btn--link"
              type="button"
              onClick={handlePreviousClick}
            >
              Go back
            </button>
          )}
          {navigationButtons && (
            <button
              className="c-form-step__btn c-form-step__btn--primary"
              type="submit"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default FormStep;
