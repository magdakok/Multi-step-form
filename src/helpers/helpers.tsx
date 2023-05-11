import { RegularityObj, NumRadioCheckboxDescRegularity } from "../types";

export function getPrice(value: number, currency: string, options?: Intl.NumberFormatOptions): string {
  const userLocale =
    (navigator?.languages?.length &&
      navigator.languages[0]) ||
    navigator.language || "en";


  // TODO: Try with https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  return value.toLocaleString(userLocale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    ...options,
  });
}

export function getValueAndCurrency(object: NumRadioCheckboxDescRegularity, regularityObj: RegularityObj): [number, string] {
  const regularity = regularityObj.value;
  return [
    object[regularity].value,
    object[regularity].currency,
  ];
}
