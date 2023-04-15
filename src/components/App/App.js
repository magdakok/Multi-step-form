import React from "react";
import "./App.scss";
import Indicator from "../Indicator/Indicator";
import FormStep from "../FormStep/FormStep";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

import BaseInput from "../BaseInput/BaseInput";

const firstStepForm = [
  {
    label: "Name",
    name: "name",
    type: "text", // TypeScript would help here to allow just text | email | tel
    rules: {
      required: {
        value: true,
        message: "Name is required",
      },
      minLength: {
        value: 12,
        message: "It makes no sense, but minimum length is 12 characters",
      },
      valueAsNumber: {
        value: true,
        message: "This input is number only.",
      },
    },
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    rules: {
      required: {
        value: true,
        message: "Email address is required",
      },
    },
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    rules: {
      required: {
        value: true,
        message: "Phone number is required",
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
                  register={register}
                  key={input.name}
                  error={
                    <ErrorMessage
                      errors={errors}
                      name={input.name}
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type}>{message}</p>
                        ))
                      }
                    />
                  }
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
