export function getPrice(value, currency, option) {
  const userLocale =
    navigator.userLanguage ||
    (navigator.languages &&
      navigator.languages.length &&
      navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage ||
    "en";

  return value.toLocaleString(userLocale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
    ...option,
  });
}

export function getValueAndCurrency(object, regularityObj) {
  return [
    object[regularityObj.value].value,
    object[regularityObj.value].currency,
  ];
}
