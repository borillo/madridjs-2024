import { Currency, VALID_CURRENCIES } from ".";

export function isValidCurrency(value: string): boolean {
  return VALID_CURRENCIES.includes(value as Currency);
}

export function from(currency: string): Currency {
  if (!isValidCurrency(currency))
    throw Error(`Currency ${currency} not supported`);

  return currency as Currency;
}
