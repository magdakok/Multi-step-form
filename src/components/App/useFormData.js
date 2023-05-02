import { useCallback, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { initialFirstStepState, radioToggle, initialAddOns } from "../../data";

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
  const [addOns, setAddOns] = useState(initialAddOns);

  const regularityObj = useMemo(() => {
    return radioToggle.radios[regularity];
  }, [regularity]);

  const handleMultipleInputs = useCallback((value, index) => {
    setFirstStepFormData((currentValue) => {
      const nextValue = currentValue;
      nextValue[index] = value;
      return [...nextValue];
    });
  }, []);

  const handleSetBillingPlan = useCallback((value) => {
    setBillingPlan(value);
  }, []);

  const handleRegularity = useCallback((value) => {
    setRegularity(value);
  }, []);

  const handleAddOns = (option) => {
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
