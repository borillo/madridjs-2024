import { Transaction } from ".";

import * as Money from "./money";

export function isIncome(transaction: Transaction): boolean {
  return transaction.value.amount > 0;
}

export function create(
  reason: string,
  amount: number,
  currency: string
): Transaction {
  let value = Money.from(amount, currency);

  return {
    reason,
    value,
  };
}
