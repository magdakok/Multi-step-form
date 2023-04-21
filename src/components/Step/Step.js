import React from "react";
import StepControllers from "../StepControllers/StepControllers";
import ThankYouSvg from "../../images/icon-thank-you.svg";
import { IsMobileContext } from "../App/App";

function Step({
  heading,
  description,
  stepControllersProps,
  formWrapper = true,
  finalImage = false,
  children,
}) {
  const isMobile = React.useContext(IsMobileContext);
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
        <div className="c-form-step">
          <div className="c-form-step__content">{children}</div>
          {!isMobile && <StepControllers {...stepControllersProps} />}
        </div>
      )}
    </div>
  );
}

export default Step;
