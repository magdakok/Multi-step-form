import { getPrice, getValueAndCurrency } from "../../helpers/helpers";
import css from "./BillingPlanDescription.module.scss";

function BillingPlanDescription({
  numberValue,
  description,
  regularityObj,
  additionalMessage = true,
  option,
}) {
  const data = description[regularityObj.value];

  return (
    <>
      {numberValue
        ? getPrice(numberValue, description[regularityObj.value].currency)
        : getPrice(...getValueAndCurrency(description, regularityObj), option)}
      <abbr title="per">/</abbr>
      <abbr title={`${data.period}`}>{data.periodShort}</abbr>
      {data.additionalInfo && additionalMessage && (
        <span className={css.detail}>{data.additionalInfo}</span>
      )}
    </>
  );
}

export default BillingPlanDescription;
