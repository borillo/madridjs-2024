import { describe, expect, test } from "vitest";

import * as SavingsCalculator from "../src/exchange/application/savings-calculator";
import { Transactions } from "../src/exchange/domain";

const transactions: Transactions = [
  {
    reason: "Income 1",
    value: {
      amount: 10,
      currency: "EUR",
    },
  },
  {
    reason: "Expense 1",
    value: {
      amount: -10,
      currency: "EUR",
    },
  },
  {
    reason: "Income 2",
    value: {
      amount: 30,
      currency: "EUR",
    },
  },
];

describe("Encapsulación de colecciones", () => {
  /**
   * 💩 Código duplicado.
   * 💩 Acoplamiento.
   * 💩 Falta de niveles de abstracción.
   * */

  test("😭 Colecciones no encapsuladas", () => {
    function convert(amount: number, source: string, target: string) {
      // ... do some magic ...
      return { amount, currency: target };
    }

    function addMoney(
      amountA: number,
      currencyA: string,
      amountB: number,
      currencyB: string
    ) {
      if (currencyA === currencyB)
        return { amount: amountA + amountB, currency: currencyA };

      return convert(amountB, currencyB, currencyA);
    }

    const savings = transactions
      .filter(({ value: { amount } }) => amount > 0)
      .reduce(
        (acc, value) =>
          addMoney(
            acc.amount,
            acc.currency,
            value.value.amount,
            value.value.currency
          ),
        { amount: 0, currency: "EUR" }
      );

    expect(savings.amount).toEqual(40);
  });

  test("😃 Colecciones encapsuladas", () => {
    const savings = SavingsCalculator.compute(transactions);

    expect(savings.amount).toEqual(40);
  });
});
