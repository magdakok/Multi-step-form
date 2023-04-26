import React from "react";

// Styles
import "../../styles/reset.scss";
import "../../styles/utilities.scss";
import "../../styles/global.scss";
import css from "./App.module.scss";

import { stepControllersProps } from "../../data";

//Components
import Indicator from "../Indicator/Indicator";
import StepControllers from "../StepControllers/StepControllers";
import UniqueSteps from "../UniqueSteps/UniqueSteps";

//Hooks
import { useCurrentStep } from "./useCurrentStep";
import { useFormData } from "./useFormData";
import { useMobile } from "../../hooks/useMobile";

// Context
export const IsMobileContext = React.createContext();
export const StepChangeContext = React.createContext();

function App() {
  const { currentStep, isCurrentStep, handleStepChange } = useCurrentStep();
  const { isMobile } = useMobile();
  const {
    register,
    handleSubmit,
    errors,
    firstStepFormData,
    billingPlan,
    regularityObj,
    handleMultipleInputs,
    handleSetBillingPlan,
    handleRegularity,
    regularity,
    handleAddOns,
    addOns,
  } = useFormData();

  const WrapperTag = currentStep < 5 ? "form" : "div";
  const bottomMobileNav = isMobile && !isCurrentStep(5);

  return (
    <StepChangeContext.Provider value={handleStepChange}>
      <div className={bottomMobileNav ? css.app : css.app}>
        <Indicator currentStep={currentStep} />
        <IsMobileContext.Provider value={isMobile}>
          <WrapperTag
            className={css.stepsWrapper}
            onSubmit={handleSubmit(() => handleStepChange(1))}
          >
            <UniqueSteps
              currentStep={currentStep}
              register={register}
              errors={errors}
              firstStepFormData={firstStepFormData}
              billingPlan={billingPlan}
              regularityObj={regularityObj}
              handleMultipleInputs={handleMultipleInputs}
              handleSetBillingPlan={handleSetBillingPlan}
              handleRegularity={handleRegularity}
              regularity={regularity}
              handleAddOns={handleAddOns}
              addOns={addOns}
            />
            {bottomMobileNav && (
              <div className={css.controllersMobileWrapper}>
                <StepControllers {...stepControllersProps[currentStep]} />
              </div>
            )}
          </WrapperTag>
        </IsMobileContext.Provider>
      </div>
    </StepChangeContext.Provider>
  );
}

export default App;
