import React from "react";
import BillingPlanDescription from "../BillingPlanDescription/BillingPlanDescription";

function OrderSummary({
  regularityObj,
  planLabel,
  planDetails,
  addOnsState,
  addOnsDetails,
  handleStepChange,
}) {
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
    <div className="c-order-summary">
      <div className="c-order-summary__calculation">
        <div className="c-order-summary__plan">
          <span>
            <span className="c-order-summary__plan-label">
              {planLabel} ({regularityObj.label})
            </span>
            <button
              type="button"
              className="c-order-summary__plan-change"
              onClick={() => handleStepChange(null, 2)}
            >
              Change
            </button>
          </span>
          <span className="c-order-summary__plan-price">
            <BillingPlanDescription
              description={planDetails}
              regularityObj={regularityObj}
              additionalMessage={false}
            />
          </span>
        </div>

        {addons.length > 0 && (
          <ul className="c-order-summary__addons-list" role="list">
            {addons.map((addon) => (
              <li
                className="c-order-summary__addons-item"
                role="listitem"
                key={addon.id}
              >
                <span className="c-order-summary__addons-label">
                  {addon.label}
                </span>
                <span className="c-order-summary__addons-price">
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
      <div className="c-order-summary__total">
        <span className="c-order-summary__total-label">
          Total (per {regularityObj.label})
        </span>
        <span className="c-order-summary__total-price">
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
