import { createContext } from "react";

// Styles
import "../../styles/reset.scss";
import "../../styles/utilities.scss";
import "../../styles/global.scss";
import css from "./App.module.scss";

//@ts-ignore
import { stepControllersProps } from "../../data";

//Components
import Indicator from "../Indicator/Indicator";
import StepControllers from "../StepControllers/StepControllers";
import UniqueSteps from "../UniqueSteps/UniqueSteps";

//Hooks
import { useCurrentStep } from "./useCurrentStep";
import { useFormData } from "./useFormData";
import { useMobile } from "../../hooks/useMobile";

//Types
import { HandleStepChangeType } from "../../types";

// Context
export const StepChangeContext = createContext<HandleStepChangeType | null>(null);

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
      <main className={css.app}>
        <Indicator currentStep={currentStep} />
        <WrapperTag
          className={css.stepsWrapper}
          onSubmit={handleSubmit(() => handleStepChange(1))}
          aria-live="polite"
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
            isMobile={isMobile}
          />
          {bottomMobileNav && (
            <div className={css.controllersMobileWrapper}>
              {currentStep}
              <StepControllers {...stepControllersProps[(currentStep)]} />
            </div>
          )}
        </WrapperTag>
      </main>
    </StepChangeContext.Provider>
  );
}

export default App;
