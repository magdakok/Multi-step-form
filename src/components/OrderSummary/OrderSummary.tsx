import { useContext } from "react";
import BillingPlanDescription from "../BillingPlanDescription/BillingPlanDescription";
import { StepChangeContext } from "../App/App";
import css from "./OrderSummary.module.scss";
import { OrderSummaryProps } from "../../types";

function OrderSummary({
  regularityObj,
  planLabel,
  planDetails,
  addOnsState,
  addOnsDetails,
}: OrderSummaryProps) {
  const handleStepChange = useContext(StepChangeContext);

  const addons = [];
  let totalPrice: number = planDetails[regularityObj.value].value;
  for (const key in addOnsState) {
    const numericKey = parseInt(key);
    if (addOnsState[numericKey]) {
      addons.push(addOnsDetails[numericKey]);
      const regularity = regularityObj.value;
      const priceForPickedPeriod = addOnsDetails[numericKey].price[regularity].value;
      totalPrice =
        totalPrice + priceForPickedPeriod;
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
              onClick={() => handleStepChange && handleStepChange(null, 2)}
            >
              Change
            </button>
          </span>
          <span className={css.planPrice}>
            <BillingPlanDescription
              price={planDetails}
              regularityObj={regularityObj}
              additionalMessage={false}
            />
          </span>
        </div>

        {addons.length > 0 && (
          // eslint-disable-next-line
          <ul className={css.addonsList} role="list">
            {addons.map((addon) => (
              // eslint-disable-next-line
              <li className={css.addonsItem} role="listitem" key={addon.id}>
                <span className={css.addonsLabel}>{addon.label}</span>
                <span className={css.addonsPrice}>
                  <BillingPlanDescription
                    price={addon.price}
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
            price={planDetails}
            regularityObj={regularityObj}
            additionalMessage={false}
          />
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;
