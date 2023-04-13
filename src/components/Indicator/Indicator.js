import React from "react";

const STEPS = [
  { index: 1, label: "Your Info" },
  { index: 2, label: "Select Plan" },
  { index: 3, label: "Add Ons" },
  { index: 4, label: "Summary" },
];
const LAST_INTERACTIVE_STEP = 4;

function Indicator({ currentStep, setCurrentStep }) {
  const hasActiveIndicators = currentStep <= LAST_INTERACTIVE_STEP; // when the final step is achieved all indicators become inactive

  return (
    <div className="c-indicator">
      <ol className="c-indicator__list" role="list">
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
                    className="c-indicator__button"
                    onClick={() => setCurrentStep(index)}
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
    <li
      className={`c-indicator__list-item c-indicator__list-item--${state}`}
      role="listitem"
    >
      {children}
    </li>
  );
}

function IndicatorVisual({ value }) {
  return (
    <span className="c-indicator__number-box" role="presentation">
      <span className="c-indicator__number">{value}</span>
    </span>
  );
}

function IndicatorLabel({ step, label, hiddenLabel }) {
  return (
    <>
      {hiddenLabel && <span className="visuallyhidden">{hiddenLabel}</span>}
      <span className="c-indicator__step-box">Step {step}</span>
      <span className="c-indicator__label">{label}</span>
    </>
  );
}

export default React.memo(Indicator);
