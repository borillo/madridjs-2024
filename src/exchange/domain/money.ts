import * as T from ".";
import { Money } from ".";

import * as Currency from "./currency";

export function convert(value: Money, target: T.Currency): Money {
  const convertedAmount = /* ... do some magic ... */ value.amount;

  return {
    amount: convertedAmount,
    currency: target,
  };
}

export function add(value1: Money, value2: Money): Money {
  let convertedValue = value2;

  if (value1.currency !== value2.currency)
    convertedValue = convert(value2, value1.currency);

  return {
    amount: value1.amount + convertedValue.amount,
    currency: value1.currency,
  };
}

export function from(amount: number, currency: string): Money {
  return {
    amount,
    currency: Currency.from(currency),
  };
}
