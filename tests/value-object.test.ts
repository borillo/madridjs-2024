import { describe, expect, test } from "vitest";

import * as Money from "../src/exchange/domain/money";
import * as CurrencyAdder from "../src/exchange/application/currency-adder";

describe("Value Objects", () => {
  test("😭 sumar dos importes: sin value objects", () => {
    /**
     * 💩 Obsesión por las primitivas.
     * 💩 Código que debería estar en el dominio.
     */

    function convert(amount: number, source: string, target: string) {
      // ... do some magic ...
      return { amount, currency: target };
    }

    /**
     * 💩 Falta de niveles de abstracción.
     */

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

    /**
     * 💩 Eliminación de los utils & helpers.
     */

    const result = addMoney(10, "EUR", 20, "EUR");

    expect(result).toEqual({
      amount: 30,
      currency: "EUR",
    });
  });

  test("😃 sumar dos importes: con value objects", () => {
    /**
     * 🧠 Tell, don't ask. Ley de Demeter.
     * 💡 Previo al refactoring de diseño. Primero semántica y naming.
     * 💡 Foco atractor de código.
     */

    const result = CurrencyAdder.add(
      Money.from(10, "EUR"),
      Money.from(20, "EUR")
    );

    /**
     * 💡 Mejora de la semántica y reutilización de los tipos definidos.
     */

    expect(result).toEqual(Money.from(30, "EUR"));
  });
});
