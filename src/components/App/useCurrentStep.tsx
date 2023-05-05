import { useCallback, useState } from "react";
import { HandleStepChangeType } from "../../types";

export function useCurrentStep() {
  const [currentStep, setCurrentStep] = useState(1);

  function isCurrentStep(index: number): boolean {
    return index === currentStep;
  }

  const handleStepChange = useCallback<HandleStepChangeType>((stepChange, goToStep = null) => {
    typeof goToStep === 'number'
      ? setCurrentStep(goToStep)
      : typeof stepChange === 'number' && setCurrentStep((currentStep) => currentStep + stepChange);
  }, []);

  return { currentStep, isCurrentStep, handleStepChange };
}
