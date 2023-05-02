import React from "react";

export function useCurrentStep(index) {
  const [currentStep, setCurrentStep] = React.useState(1);

  function isCurrentStep(index) {
    return index === currentStep;
  }

  const handleStepChange = React.useCallback((stepChange, goToStep = false) => {
    goToStep
      ? setCurrentStep(goToStep)
      : setCurrentStep((currentStep) => currentStep + stepChange);
  }, []);

  return { currentStep, isCurrentStep, handleStepChange };
}
