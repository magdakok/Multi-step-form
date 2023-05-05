import { useContext } from "react";
import css from "./StepControllers.module.scss";
import { StepChangeContext } from "../App/App";
import { StepControllerProp } from "../../types";

function StepControllers({
  buttonLabel,
  allowGoStepBack = false,
  navigationButtons = true
}: StepControllerProp) {
  const handleStepChange = useContext(StepChangeContext);

  return (
    <>
      {navigationButtons && (
        <div className={css.formNav}>
          {allowGoStepBack && (
            <button
              className={css.btnLink}
              type="button"
              onClick={() => handleStepChange && handleStepChange(-1)}
            >
              Go back
            </button>
          )}
          <button className={css.btnPrimary} type="submit">
            {buttonLabel && buttonLabel}
          </button>
        </div>
      )}
    </>
  );
}

export default StepControllers;
