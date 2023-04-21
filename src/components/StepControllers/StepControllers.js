import React from "react";

function StepControllers({
  handleStepChange,
  buttonLabel,
  allowGoStepBack = false,
  navigationButtons = true,
}) {
  return (
    navigationButtons && (
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
    )
  );
}

export default StepControllers;
