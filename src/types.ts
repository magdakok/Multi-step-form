import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

// Props
export interface BaseCheckboxGroupProps {
  legend: string;
  name: string;
  checkboxes: CheckboxContent[];
  regularityObj: RegularityObj;
  checked: AddOnsState;
  handleCheckboxClick: (option: string) => void;
}

export interface BaseInputProps {
  index: number;
  label: string;
  name: string;
  rules: { [key: string]: any };
  type: string;
  register?: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  value: string;
  handleMultipleInputs: (value: string, index: number) => void;
  [key: string]: any;
}

export interface BaseRadioProps {
  legend: string;
  name: string;
  radios: any[];
  regularityObj?: RegularityObj;
  checked: number;
  customStyle?: "toggle";
  billingPlanDescription?: boolean;
  handleRadioClick: (a: number) => void;
}

export interface BillingPlanDescriptionProps {
  numberValue?: number;
  price: any;
  regularityObj: RegularityObj;
  additionalMessage?: boolean;
  option?: any;
}

export interface IndicatorProps {
  currentStep: number;
}

export interface IndicatorWrapperProps {
  state: "current" | "next" | "past";
}

export interface IndicatorVisualProps {
  value: number;
}

export interface IndicatorLabelProps {
  step: number;
  label: string;
  hiddenLabel: string | false;
}

export interface OrderSummaryProps {
  regularityObj: RegularityObj;
  planLabel: string;
  planDetails: NumRadioCheckboxDescRegularity;
  addOnsState: AddOnsState;
  addOnsDetails: CheckboxContent[];
}

export interface StepControllersProps {
  [key: string | number]: StepControllerProp;
}

export interface StepWrapperProps {
  heading: string;
  description: string;
  stepControllersProps: StepControllerProp;
  formWrapper?: boolean;
  finalImage?: boolean;
  isMobile: boolean;
}

export interface UniqueStepsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  firstStepFormData: string[];
  billingPlan: number;
  regularityObj: RegularityObj;
  handleMultipleInputs: (value: string, index: number) => void;
  handleSetBillingPlan: (value: number) => void;
  handleRegularity: (value: number) => void;
  regularity: number;
  handleAddOns: (option: string) => void;
  addOns: AddOnsState;
  currentStep: number;
  isMobile: boolean;
}

export type HandleStepChangeType = (
  a: number | null,
  b?: null | number
) => void;

export interface CheckboxContent extends BaseInputProps {
  description: string;
  price: NumRadioCheckboxDescRegularity;
}

export interface RegularityObj {
  id: string;
  value: "yearly" | "monthly";
  label: string;
  period: string;
}

export interface StepControllerProp {
  buttonLabel?: string;
  allowGoStepBack?: boolean;
  navigationButtons?: boolean;
}

export interface NumRadioCheckboxDesc {
  value: number;
  currency: string;
  period: string;
  periodShort: string;
  additionalInfo?: string;
}

export interface NumRadioCheckboxDescRegularity {
  yearly: NumRadioCheckboxDesc;
  monthly: NumRadioCheckboxDesc;
}

export interface NumRadio extends BaseInputProps {
  price: NumRadioCheckboxDesc;
}

export interface AddOnsState {
  [key: string]: boolean;
}

export interface RegularityRadio {
  name: string;
  legend: string;
  radios: RegularityObj[];
}

export interface Step {
  index: number;
  label: string;
}
