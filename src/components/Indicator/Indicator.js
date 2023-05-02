import React, { useContext, memo } from "react";
import css from "./Indicator.module.scss";
import { StepChangeContext } from "../App/App";

const STEPS = [
  { index: 1, label: "Your Info" },
  { index: 2, label: "Select Plan" },
  { index: 3, label: "Add Ons" },
  { index: 4, label: "Summary" },
];
const LAST_INTERACTIVE_STEP = 4;

function Indicator({ currentStep }) {
  const handleStepChange = useContext(StepChangeContext);
  const hasActiveIndicators = currentStep <= LAST_INTERACTIVE_STEP; // when the final step is achieved all indicators become inactive

  return (
    <div className={css.container}>
      <ol className={css.list} role="list">
        {STEPS.map((step) => {
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
                    onClick={() => handleStepChange(null, index)}
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
    </div>
  );
}

function IndicatorWrapper({ state, children }) {
  // state accepts: current | next | past
  return (
    <li className={css[state]} role="listitem">
      {children}
    </li>
  );
}

function IndicatorVisual({ value }) {
  return (
    <span className={css.numberBox} role="presentation">
      <span className={css.number}>{value}</span>
    </span>
  );
}

function IndicatorLabel({ step, label, hiddenLabel }) {
  return (
    <>
      {hiddenLabel && <span className="visuallyhidden">{hiddenLabel}</span>}
      <span className={css.stepBox}>Step {step}</span>
      <span className={css.label}>{label}</span>
    </>
  );
}

export default memo(Indicator);
