import React from "react";
import StepControllers from "../StepControllers/StepControllers";
import ThankYouSvg from "../../images/icon-thank-you.svg";
import css from "./StepWrapper.module.scss";
import { IsMobileContext } from "../App/App";

function StepWrapper({
  heading,
  description,
  stepControllersProps,
  formWrapper = true,
  finalImage = false,
  children,
}) {
  const isMobile = React.useContext(IsMobileContext);
  return (
    <div className={finalImage ? css.stepFinal : css.step}>
      <div>
        {finalImage && <img className={css.image} src={ThankYouSvg} alt="" />}
        <h2 className={css.heading}>{heading}</h2>
        <p className={css.description}> {description}</p>
      </div>
      {formWrapper && (
        <div className={css.stepInside}>
          <div>{children}</div>
          {!isMobile && <StepControllers {...stepControllersProps} />}
        </div>
      )}
    </div>
  );
}

export default StepWrapper;
