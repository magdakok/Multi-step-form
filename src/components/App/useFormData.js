import React from "react";
import { useForm } from "react-hook-form";

import { initialFirstStepState, radioToggle, initialAddOns } from "../../data";

export function useFormData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const [firstStepFormData, setFirstStepFormData] = React.useState(
    initialFirstStepState
  );
  const [billingPlan, setBillingPlan] = React.useState(0);
  const [regularity, setRegularity] = React.useState(0);
  const [addOns, setAddOns] = React.useState(initialAddOns);

  const regularityObj = React.useMemo(() => {
    return radioToggle.radios[regularity];
  }, [regularity]);

  const handleMultipleInputs = React.useCallback((value, index) => {
    setFirstStepFormData((currentValue) => {
      const nextValue = currentValue;
      nextValue[index] = value;
      return [...nextValue];
    });
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
