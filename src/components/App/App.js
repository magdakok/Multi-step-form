import React from "react";

// Styles
import "../../styles/reset.scss";
import "../../styles/utilities.scss";
import "../../styles/global.scss";
import css from "./App.module.scss";

import {
  stepControllersProps,
  firstStepForm,
  billingPlanRadios,
  radioToggle,
  addOnsCheckboxes,
} from "../../data";

//Components
import Indicator from "../Indicator/Indicator";
import Step from "../Step/Step";
import BaseInput from "../BaseInput/BaseInput";
import BaseRadio from "../BaseRadio/BaseRadio";
import BaseCheckboxGroup from "../BaseCheckboxGroup/BaseCheckboxGroup";
import OrderSummary from "../OrderSummary/OrderSummary";
import StepControllers from "../StepControllers/StepControllers";

//Hooks
import { useCurrentStep } from "../../hooks/useCurrentStep";
import { useMobile } from "../../hooks/useMobile";
import { useFormData } from "../../hooks/useFormData";

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
            className="c-app__main-wrapper"
            onSubmit={handleSubmit(() => handleStepChange(1))}
          >
            {isCurrentStep(1) && (
              <Step
                heading="Personal info"
                description="Please provide your name, email address, and phone number."
                stepControllersProps={stepControllersProps[1]}
              >
                {firstStepForm.map((input, i) => (
                  <BaseInput
                    index={i}
                    label={input.label}
                    name={input.name}
                    type={input.type}
                    rules={input.rules}
                    value={firstStepFormData[i]}
                    placeholder={input.placeholder}
                    register={register}
                    key={input.name}
                    errors={errors}
                    handleMultipleInputs={handleMultipleInputs}
                  />
                ))}
              </Step>
            )}
            {isCurrentStep(2) && (
              <Step
                heading="Select your plan"
                description="You have the option of monthly or yearly billing."
                stepControllersProps={stepControllersProps[2]}
              >
                <BaseRadio
                  legend={billingPlanRadios.legend}
                  name={billingPlanRadios.name}
                  radios={billingPlanRadios.radios}
                  billingPlanDescription={true}
                  checked={billingPlan}
                  regularityObj={regularityObj}
                  handleRadioClick={handleSetBillingPlan}
                />
                <BaseRadio
                  legend={radioToggle.legend}
                  name={radioToggle.name}
                  radios={radioToggle.radios}
                  checked={regularity}
                  customStyle="toggle"
                  handleRadioClick={handleRegularity}
                />
              </Step>
            )}
            {isCurrentStep(3) && (
              <Step
                heading="Pick add-ons"
                description="Add-ons help enhance your gaming experience."
                stepControllersProps={stepControllersProps[3]}
              >
                <BaseCheckboxGroup
                  legend={addOnsCheckboxes.legend}
                  name={addOnsCheckboxes.name}
                  checkboxes={addOnsCheckboxes.checkboxes}
                  regularityObj={regularityObj}
                  checked={addOns}
                  handleCheckboxClick={handleAddOns}
                />
              </Step>
            )}
            {isCurrentStep(4) && (
              <Step
                heading="Finishing up"
                description="Double-check everything looks OK before confirming."
                stepControllersProps={stepControllersProps[4]}
              >
                <OrderSummary
                  regularityObj={regularityObj}
                  planLabel={
                    billingPlanRadios.radios[Number(billingPlan)].label
                  }
                  planDetails={
                    billingPlanRadios.radios[Number(billingPlan)].description
                  }
                  addOnsState={addOns}
                  addOnsDetails={addOnsCheckboxes.checkboxes}
                />
              </Step>
            )}
            {isCurrentStep(5) && (
              <Step
                formWrapper={false}
                finalImage={true}
                heading="Thank you!"
                description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
                stepControllersProps={stepControllersProps[5]}
              ></Step>
            )}

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
