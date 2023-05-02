import { useContext } from "react";
import css from "./StepControllers.module.scss";
import { StepChangeContext } from "../App/App";

function StepControllers({
  buttonLabel,
  allowGoStepBack = false,
  navigationButtons = true,
}) {
  const handleStepChange = useContext(StepChangeContext);

  return (
    navigationButtons && (
      <div className={css.formNav}>
        {allowGoStepBack && (
          <button
            className={css.btnLink}
            type="button"
            onClick={() => handleStepChange(-1)}
          >
            Go back
          </button>
        )}
        <button className={css.btnPrimary} type="submit">
          {buttonLabel}
        </button>
      </div>
    )
  );
}

export default StepControllers;
