import React, { useEffect } from "react";
import "./App.scss";
import Indicator from "../Indicator/Indicator";
import Step from "../Step/Step";
import { useForm } from "react-hook-form";
import {
  initialFirstStepState,
  firstStepForm,
  billingPlanRadios,
  radioToggle,
  addOnsCheckboxes,
  initialAddOns,
} from "../../data";
import BaseInput from "../BaseInput/BaseInput";
import BaseRadio from "../BaseRadio/BaseRadio";
import BaseCheckboxGroup from "../BaseCheckboxGroup/BaseCheckboxGroup";
import OrderSummary from "../OrderSummary/OrderSummary";
import StepControllers from "../StepControllers/StepControllers";

export const IsMobileContext = React.createContext();
const mobileQuery = "(max-width: 767px)";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [currentStep, setCurrentStep] = React.useState(1);
  const [firstStepFormData, setFirstStepFormData] = React.useState(
    initialFirstStepState
  );
  const [billingPlan, setBillingPlan] = React.useState(0);
  const [regularity, setRegularity] = React.useState(0);
  const [addOns, setAddOns] = React.useState(initialAddOns);
  const [isMobile, setIsMobile] = React.useState(false);

  const WrapperTag = currentStep < 5 ? "form" : "div";

  useEffect(() => {
    const mql = window.matchMedia(mobileQuery);
    setIsMobile(mql.matches);
    mql.addEventListener("change", () => {
      setIsMobile(mql.matches);
    });

    return () => {
      mql.removeEventListener("change", setIsMobile(mql.matches));
    };
  }, []);

  const regularityObj = React.useMemo(() => {
    return radioToggle.radios[regularity];
  }, [regularity]);

  function isCurrentStep(index) {
    return index === currentStep;
  }

  const handleMultipleInputs = React.useCallback((value, index) => {
    setFirstStepFormData((currentValue) => {
      const nextValue = currentValue;
      nextValue[index] = value;
      return [...nextValue];
    });
  }, []);

  const handleStepChange = React.useCallback((stepChange, goToStep = false) => {
    console.log("clicked");
    goToStep
      ? setCurrentStep(goToStep)
      : setCurrentStep((currentStep) => currentStep + stepChange);
  }, []);

  const handleSetBillingPlan = React.useCallback((value) => {
    setBillingPlan(value);
  }, []);

  const handleRegularity = React.useCallback((value) => {
    setRegularity(value);
  }, []);

  const handleAddOns = React.useCallback(
    (option) => {
      const currentOptionValue = addOns[option];
      setAddOns((currentAddOns) => ({
        ...currentAddOns,
        [option]: !currentOptionValue,
      }));
    },
    [addOns]
  );

  const bottomMobileNav = isMobile && !isCurrentStep(5);

  const stepControllersProps = {
    1: {
      buttonLabel: "Next step",
    },
    2: {
      buttonLabel: "Next step",
      allowGoStepBack: true,
    },
    3: {
      buttonLabel: "Next step",
      allowGoStepBack: true,
    },
    4: {
      buttonLabel: "Confirm",
      allowGoStepBack: true,
    },
    5: {
      navigationButtons: false,
    },
  };

  return (
    <div className={bottomMobileNav ? "c-app c-app--bottom-nav" : "c-app"}>
      <Indicator currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <IsMobileContext.Provider value={isMobile}>
        <WrapperTag
          className="c-app__main-wrapper"
          handleStepChange={handleStepChange}
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
                planLabel={billingPlanRadios.radios[Number(billingPlan)].label}
                planDetails={
                  billingPlanRadios.radios[Number(billingPlan)].description
                }
                addOnsState={addOns}
                addOnsDetails={addOnsCheckboxes.checkboxes}
                handleStepChange={handleStepChange}
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
            <div className="c-step-controllers__mobile-wrapper">
              <StepControllers
                {...stepControllersProps[currentStep]}
                handleStepChange={handleStepChange}
              />
            </div>
          )}
        </WrapperTag>
      </IsMobileContext.Provider>
    </div>
  );
}

export default App;
