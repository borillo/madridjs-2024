import * as Savings from "../domain/savings";
import { Money, Transactions } from "../domain";

export function compute(transactions: Transactions): Money {
  const savings = Savings.add(Savings.create(), transactions);

  return Savings.compute(savings);
}
