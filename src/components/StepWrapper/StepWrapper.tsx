import { PropsWithChildren } from "react";
import StepControllers from "../StepControllers/StepControllers";
// @ts-ignore
import ThankYouSvg from "../../images/icon-thank-you.svg";
import css from "./StepWrapper.module.scss";
import { StepWrapperProps } from "../../types";

function StepWrapper({
  heading,
  description,
  stepControllersProps,
  formWrapper = true,
  finalImage = false,
  isMobile,
  children,
}: PropsWithChildren<StepWrapperProps>) {
  return (
    <div className={finalImage ? css.stepFinal : css.step}>
      <div>
        {finalImage && <img className={css.image} src={ThankYouSvg} alt="" />}
        <h1 className={css.heading}>{heading}</h1>
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
