import React from "react";
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
import { getValueAndCurrency } from "../../helpers/helpers";

import BaseInput from "../BaseInput/BaseInput";
import BaseRadio from "../BaseRadio/BaseRadio";
import BaseCheckboxGroup from "../BaseCheckboxGroup/BaseCheckboxGroup";
import OrderSummary from "../OrderSummary/OrderSummary";

export const ButtonClickContext = React.createContext();

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

  return (
    <div className="c-app">
      <Indicator currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <ButtonClickContext.Provider value={handleStepChange}>
        {isCurrentStep(1) && (
          <Step
            handleSubmit={handleSubmit}
            heading="Personal info"
            description="Please provide your name, email address, and phone number."
            buttonLabel="Next step"
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
            handleSubmit={handleSubmit}
            heading="Select your plan"
            description="You have the option of monthly or yearly billing."
            buttonLabel="Next step"
            allowGoStepBack={true}
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
            handleSubmit={handleSubmit}
            heading="Pick add-ons"
            description="Add-ons help enhance your gaming experience."
            buttonLabel="Next step"
            allowGoStepBack={true}
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
            handleSubmit={handleSubmit}
            heading="Finishing up"
            description="Double-check everything looks OK before confirming."
            buttonLabel="Confirm"
            allowGoStepBack={true}
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
            navigationButtons={false}
          ></Step>
        )}
      </ButtonClickContext.Provider>
    </div>
  );
}

export default App;
