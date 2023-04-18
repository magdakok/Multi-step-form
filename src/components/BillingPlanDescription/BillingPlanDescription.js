import React from "react";
import { getPrice, getValueAndCurrency } from "../../helpers/helpers";

function BillingPlanDescription({ description, regularity }) {
  const regularityKey = regularity === "0" ? "monthly" : "yearly";
  const data = description[regularityKey];

  return (
    <span className="c-base-radio__description">
      {getPrice(...getValueAndCurrency(description, regularity))}
      <abbr title="per">/</abbr>
      {data.period}
      {data.additionalInfo && (
        <span className="c-base-radio__description-detail">
          {data.additionalInfo}
        </span>
      )}
    </span>
  );
}

export default BillingPlanDescription;
