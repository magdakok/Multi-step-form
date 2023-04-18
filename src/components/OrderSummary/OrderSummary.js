import React from "react";

function OrderSummary({
  regularity,
  planLabel,
  planValueAndCurrency,
  addOnsLabels,
}) {
  return (
    <div>
      {regularity} & {planLabel} & {planValueAndCurrency}
      {addOnsLabels}
    </div>
  );
}

export default OrderSummary;
