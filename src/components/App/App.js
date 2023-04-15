import React from "react";
import "./App.scss";
import Indicator from "../Indicator/Indicator";
import FormStep from "../FormStep/FormStep";
import { useForm } from "react-hook-form";

import BaseInput from "../BaseInput/BaseInput";

const firstStepForm = [
  {
    label: "Name",
    name: "name",
    type: "text", // TypeScript would help here to allow just text | email | tel
    placeholder: "e.g. Arthur Conan Doyle",
    rules: {
      required: {
        value: true,
        message: "Name is required",
      },
      minLength: {
        value: 2,
        message: "The minimum length is 2 characters",
      },
    },
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "e.g. acdoyle@bakerstreet.com",
    rules: {
      required: {
        value: true,
        message: "Email address is required",
      },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format",
      },
    },
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "e.g. 07534 000 122",
    rules: {
      required: {
        value: true,
        message: "Phone number is required",
      },
      pattern: {
        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        message: "Entered value does not match phone format",
      },
    },
  },
];

export const ButtonClickContext = React.createContext();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [currentStep, setCurrentStep] = React.useState(1);

  function isCurrentStep(index) {
    return index === currentStep;
  }

  const handleStepChange = React.useCallback((stepChange) => {
    setCurrentStep((currentStep) => currentStep + stepChange);
  }, []);

  return (
    <div className="c-app">
      <Indicator currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <ButtonClickContext.Provider value={handleStepChange}>
        <div className="c-form">
          {isCurrentStep(1) && (
            <FormStep
              handleSubmit={handleSubmit}
              heading="Personal info"
              description="Please provide your name, email address, and phone number."
              buttonLabel="Next step"
            >
              {firstStepForm.map((input) => (
                <BaseInput
                  label={input.label}
                  name={input.name}
                  type={input.type}
                  rules={input.rules}
                  placeholder={input.placeholder}
                  register={register}
                  key={input.name}
                  errors={errors}
                />
              ))}
            </FormStep>
          )}
          {isCurrentStep(2) && (
            <FormStep
              handleSubmit={handleSubmit}
              heading="Select your plan"
              description="You have the option of monthly or yearly billing."
              buttonLabel="Next step"
              allowGoStepBack={true}
            >
              here radio and checkbox
            </FormStep>
          )}
          {isCurrentStep(3) && (
            <FormStep
              handleSubmit={handleSubmit}
              heading="Pick add-ons"
              description="Add-ons help enhance your gaming experience."
              buttonLabel="Next step"
              allowGoStepBack={true}
            >
              here checkboxes
            </FormStep>
          )}
          {isCurrentStep(4) && (
            <FormStep
              handleSubmit={handleSubmit}
              heading="Finishing up"
              description="Double-check everything looks OK before confirming."
              buttonLabel="Confirm"
              allowGoStepBack={true}
            >
              here confirmation with option to go back
            </FormStep>
          )}
          {isCurrentStep(5) && (
            <FormStep
              heading="Thank you!"
              description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
              navigationButtons={false}
            >
              finish screen
            </FormStep>
          )}
        </div>
      </ButtonClickContext.Provider>
    </div>
  );
}

export default App;
