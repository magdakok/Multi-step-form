import React from "react";
import { ButtonClickContext } from "../App/App";
import ThankYouSvg from "../../images/icon-thank-you.svg";

function Step({
  heading,
  description,
  buttonLabel,
  allowGoStepBack = false,
  navigationButtons = true,
  formWrapper = true,
  finalImage = false,
  handleSubmit,
  children,
}) {
  const handleStepChange = React.useContext(ButtonClickContext);

  return (
    <div className={finalImage ? "c-step c-step--final" : "c-step"}>
      <div>
        {finalImage && (
          <img className="c-step__image" src={ThankYouSvg} alt="" />
        )}
        <h2 className="c-step__heading">{heading}</h2>
        <p className="c-step__description"> {description}</p>
      </div>
      {formWrapper && (
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
      )}
    </div>
  );
}

export default Step;
