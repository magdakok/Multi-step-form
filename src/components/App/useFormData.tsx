import { useCallback, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
//@ts-ignore
import { initialFirstStepState, radioToggle, initialAddOns } from "../../data.js";
import { AddOnsState, RegularityObj, RegularityRadio } from "../../types";

export function useFormData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const [firstStepFormData, setFirstStepFormData] = useState(
    initialFirstStepState
  );
  const [billingPlan, setBillingPlan] = useState(0);
  const [regularity, setRegularity] = useState(0);
  const [addOns, setAddOns] = useState<AddOnsState>(initialAddOns);

  const regularityObj = useMemo((): RegularityObj => {
    return (radioToggle as RegularityRadio).radios[regularity];
  }, [regularity]);

  const handleMultipleInputs = useCallback((value: string, index: number) => {
    setFirstStepFormData((currentValue: string[]): string[] => {
      const nextValue = currentValue;
      nextValue[index] = value;
      return [...nextValue];
    });
  }, []);

  const handleSetBillingPlan = useCallback((value: number): void => {
    setBillingPlan(value);
  }, []);

  const handleRegularity = useCallback((value: number): void => {
    setRegularity(value);
  }, []);

  const handleAddOns = (option: string): void => {
    const currentOptionValue = addOns[option];
    setAddOns((currentAddOns) => ({
      ...currentAddOns,
      [option]: !currentOptionValue,
    }));
  };

  return {
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
  };
}
