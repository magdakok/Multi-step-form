import React from "react";
import BillingPlanDescription from "../BillingPlanDescription/BillingPlanDescription";
import { StepChangeContext } from "../App/App";
import css from "./OrderSummary.module.scss";

function OrderSummary({
  regularityObj,
  planLabel,
  planDetails,
  addOnsState,
  addOnsDetails,
}) {
  const handleStepChange = React.useContext(StepChangeContext);

  const addons = [];
  let totalPrice = planDetails[regularityObj.value].value;
  for (const key in addOnsState) {
    if (addOnsState[key]) {
      addons.push(addOnsDetails[key]);
      totalPrice =
        totalPrice + addOnsDetails[key].price[regularityObj.value].value;
    }
  }

  return (
    <div>
      <div className={css.calculation}>
        <div className={css.plan}>
          <span>
            <span className={css.planLabel}>
              {planLabel} ({regularityObj.label})
            </span>
            <button
              type="button"
              className={css.planChange}
              onClick={() => handleStepChange(null, 2)}
            >
              Change
            </button>
          </span>
          <span className={css.planPrice}>
            <BillingPlanDescription
              description={planDetails}
              regularityObj={regularityObj}
              additionalMessage={false}
            />
          </span>
        </div>

        {addons.length > 0 && (
          <ul className={css.addonsList} role="list">
            {addons.map((addon) => (
              <li className={css.addonsItem} role="listitem" key={addon.id}>
                <span className={css.addonsLabel}>{addon.label}</span>
                <span className={css.addonsPrice}>
                  <BillingPlanDescription
                    description={addon.price}
                    regularityObj={regularityObj}
                    additionalMessage={false}
                    option={{ signDisplay: "always" }}
                  />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={css.total}>
        <span className={css.totalLabel}>
          Total (per {regularityObj.period})
        </span>
        <span className={css.totalPrice}>
          <BillingPlanDescription
            numberValue={totalPrice}
            description={planDetails}
            regularityObj={regularityObj}
            additionalMessage={false}
          />
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
