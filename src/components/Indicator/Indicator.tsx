import React, { useContext, memo, PropsWithChildren } from "react";
import css from "./Indicator.module.scss";
import { StepChangeContext } from "../App/App";
//@ts-ignore
import { steps } from "../../data";
import { IndicatorProps, IndicatorWrapperProps, IndicatorVisualProps, IndicatorLabelProps, Step } from "../../types";

const LAST_INTERACTIVE_STEP = 4;

function Indicator({ currentStep }: IndicatorProps) {
  const handleStepChange = useContext(StepChangeContext);
  const hasActiveIndicators = currentStep <= LAST_INTERACTIVE_STEP; // when the final step is achieved all indicators become inactive

  return (
    <div className={css.container}>
      {
        // eslint-disable-next-line
        <ol className={css.list} role="list">
          {steps.map((step: Step) => {
            const index = step.index;
            const label = step.label;
            const isCurrent = hasActiveIndicators && index === currentStep;
            const isNext = hasActiveIndicators && index > currentStep;
            const state = isCurrent ? "current" : isNext ? "next" : "past";
            const isInteractive = hasActiveIndicators && index < currentStep; // steps are interactive when before current one AND when the final step is achieved

            return (
              <React.Fragment key={index}>
                <IndicatorWrapper state={state}>
                  {isInteractive ? (
                    <button
                      className={css.button}
                      onClick={() => handleStepChange && handleStepChange(null, index)}
                    >
                      <IndicatorVisual value={index} />
                      <IndicatorLabel
                        step={index}
                        label={label}
                        hiddenLabel="Completed: "
                      />
                    </button>
                  ) : (
                    <>
                      <IndicatorVisual value={index} />
                      <IndicatorLabel
                        step={index}
                        label={label}
                        hiddenLabel={isCurrent && "Current: "}
                      />
                    </>
                  )}
                </IndicatorWrapper>
              </React.Fragment>
            );
          })}
        </ol>
      }
    </div>
  );
}

function IndicatorWrapper({ state, children }: PropsWithChildren<IndicatorWrapperProps>) {
  return (
    // eslint-disable-next-line
    <li className={css[state]} role="listitem">
      {children}
    </li>
  );
}

function IndicatorVisual({ value }: IndicatorVisualProps) {
  return (
    <span className={css.numberBox} role="presentation">
      <span className={css.number}>{value}</span>
    </span>
  );
}

function IndicatorLabel({ step, label, hiddenLabel }: IndicatorLabelProps) {
  return (
    <>
      {hiddenLabel && <span className="visuallyhidden">{hiddenLabel}</span>}
      <span className={css.stepBox}>Step {step}</span>
      <span className={css.label}>{label}</span>
    </>
  );
}

export default memo(Indicator);
