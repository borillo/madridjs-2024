import * as T from ".";
import * as Transaction from "./transaction";
import * as Money from "./money";

export interface TransactionDTO {
  reason: string;
  value: {
    amount: number;
    currency: string;
  };
}

export function isIncome(transaction: T.Transaction): boolean {
  return transaction.value.amount > 0;
}

export function add(
  savings: T.Transactions,
  transactions: T.Transactions
): T.Transactions {
  const incomes = transactions
    .map(({ reason, value: { amount, currency } }) =>
      Transaction.create(reason, amount, currency)
    )
    .filter(Transaction.isIncome);

  return [...savings, ...incomes];
}

export function compute(savings: T.Transactions) {
  return savings.map((transaction) => transaction.value).reduce(Money.add);
}

export function create(): T.Transaction[] {
  return [];
}
