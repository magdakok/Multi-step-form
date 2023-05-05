import { getPrice, getValueAndCurrency } from "../../helpers/helpers";
import css from "./BillingPlanDescription.module.scss";
import { BillingPlanDescriptionProps } from "../../types";

function BillingPlanDescription({
  numberValue,
  price,
  regularityObj,
  additionalMessage = true,
  option,
}: BillingPlanDescriptionProps) {
  const data = price[regularityObj.value];

  return (
    <>
      {numberValue
        ? getPrice(numberValue, price[regularityObj.value].currency)
        : getPrice(...getValueAndCurrency(price, regularityObj), option)}
      <abbr title="per">/</abbr>
      <abbr title={`${data.period}`}>{data.periodShort}</abbr>
      {data.additionalInfo && additionalMessage && (
        <span className={css.detail}>{data.additionalInfo}</span>
      )}
    </>
  );
}

export default BillingPlanDescription;
