import "isomorphic-fetch";

import { pipe } from "fp-ts/function";

import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

//#region Tipos

type Credits = E.Either<Error, Cast>;
type Cast = Actor[];

type Currency = "EUR" | "USD";

interface Money {
  amount: number;
  currency: Currency;
}

interface Actor {
  url?: string;
  name: string;
  salary: Money;
}

interface Award {
  actor: Actor;
  lastOscarYear: number | null;
}

type Awards = Award[];

//#endregion

//#region Fixtures

const marion: Actor = {
  name: "Marion Cotillard",
  salary: {
    amount: 3_000_000,
    currency: "EUR",
  },
};

const dicaprio: Actor = {
  name: "Leonardo DiCaprio",
  salary: {
    amount: 7_000_000,
    currency: "EUR",
  },
};

const tom: Actor = {
  name: "Tom Hardy",
  salary: {
    amount: 1_300_000,
    currency: "EUR",
  },
};

const inceptionCast: Cast = [marion, dicaprio, tom];

//#endregion

describe("💡 Foco en los “value objects”", () => {
  test("Evitar la obsesión por las primitivas", () => {
    function convertAmountToCurrency(
      amount: number,
      source: string,
      target: string
    ) {
      // ... do some magic ...
      return { amount, currency: target };
    }

    function addMoney(
      amountA: number,
      currencyA: string,
      amountB: number,
      currencyB: string
    ): { amount: number; currency: string } {
      if (currencyA === currencyB)
        return { amount: amountA + amountB, currency: currencyA };

      return convertAmountToCurrency(amountB, currencyB, currencyA);
    }

    const result = addMoney(10, "EUR", 20, "EUR");

    expect(result).toEqual({
      amount: 30,
      currency: "EUR",
    });
  });

  test("🚀 Uso de value objects", () => {
    function convertAmountToCurrency(
      amount: number,
      source: Currency,
      target: Currency
    ) {
      // ... do some magic ...
      return { amount, currency: target };
    }

    function addMoney(valueA: Money, valueB: Money): Money {
      if (valueA.currency === valueB.currency)
        return {
          amount: valueA.amount + valueB.amount,
          currency: valueA.currency,
        };

      return convertAmountToCurrency(
        valueB.amount,
        valueB.currency,
        valueA.currency
      );
    }

    const valueA: Money = { amount: 10, currency: "EUR" };
    const valueB: Money = { amount: 20, currency: "EUR" };

    const result: Money = addMoney(valueA, valueB);

    expect(result).toEqual({
      amount: 30,
      currency: "EUR",
    });
  });

  test("🚀 Uso de value objects y composición", () => {
    /* ℹ️ Currying (Haskell Curry):

        const sum = (a,b) => a + b;
        const sumC = (a) => (b) => a + b;

        sum(1,2) === sumC(1)(2)
    */

    function convertAmountToCurrency(
      amount: number,
      source: Currency,
      target: Currency
    ) {
      return { amount, currency: target };
    }

    function addMoney({ amount, currency }: Money) {
      return (value: Money): Money => {
        if (value.currency === currency)
          return { amount: value.amount + amount, currency };

        return convertAmountToCurrency(amount, currency, value.currency);
      };
    }

    const valueA: Money = { amount: 10, currency: "EUR" };
    const valueB: Money = { amount: 20, currency: "EUR" };

    const result: Money = pipe(valueA, addMoney(valueB));

    expect(result).toEqual({
      amount: 30,
      currency: "EUR",
    });
  });
});

describe("💡 Encapsulación de colecciones", () => {
  test("Colecciones no encapsuladas", () => {
    const expenses: number = inceptionCast
      .map(({ salary }) => salary.amount)
      .reduce((acc, value) => acc + value);

    expect(expenses).toEqual(11_300_000);
  });

  test("🚀 Encapsulemos las colecciones", () => {
    function computePayroll(cast: Cast) {
      return cast
        .map((actor) => actor.salary.amount)
        .reduce((acc, value) => acc + value);
    }

    const expenses: number = computePayroll(inceptionCast);

    expect(expenses).toEqual(11_300_000);
  });
});

describe("💡 Manejo de la opcionalidad", () => {
  describe("🦖 Enfoque tradicional", () => {
    function decideBestActor(actors: Actor[]): Actor | undefined {
      if (actors.includes(dicaprio)) return dicaprio;

      return undefined;
    }

    function duplicateSalary(actor: Actor | undefined): number | undefined {
      if (typeof actor === "undefined") return undefined;

      return actor.salary.amount * 2;
    }

    test("Happy path siempre funciona 😅", () => {
      const bestActor: Actor | undefined = decideBestActor([
        marion,
        tom,
        dicaprio,
      ]);

      const bestActorNewSalary: number | undefined = duplicateSalary(bestActor);

      expect(bestActorNewSalary).toEqual(14_000_000);
    });

    test("Gestión de la ausencia de valor", () => {
      const bestActor: Actor | undefined = decideBestActor([marion, tom]);

      const bestActorNewSalary: number | undefined = duplicateSalary(bestActor);

      expect(bestActorNewSalary).toBeUndefined();
    });
  });

  describe("🚀 Manejo de la opcionalidad con `Option`", () => {
    // ℹ️ type Option<A> = None | Some<A>

    function decideBestActor(actors: Actor[]): O.Option<Actor> {
      if (actors.includes(dicaprio)) return O.some(dicaprio);

      return O.none;
    }

    function duplicateSalary(actor: O.Option<Actor>): O.Option<number> {
      return O.map((actor: Actor) => actor.salary.amount * 2)(actor);
    }

    test("Happy path siempre funciona 😅", () => {
      const newSalary: O.Option<number> = pipe(
        decideBestActor([marion, tom, dicaprio]),
        duplicateSalary
      );

      expect(newSalary).toEqual(O.some(14_000_000));
    });

    test("Gestión de la ausencia de valor con `Option`", () => {
      const newSalary: O.Option<number> = pipe(
        decideBestActor([marion, tom]),
        duplicateSalary
      );

      expect(newSalary).toEqual(O.none);
    });
  });
});

describe("💡 Manejo de excepciones", () => {
  describe("🦖 Enfoque tradicional", () => {
    function duplicateSalary(actor: Actor): Money {
      if (actor.salary.amount > 5_000_000)
        throw new Error("We can't afford it");

      return {
        ...actor.salary,
        amount: actor.salary.amount * 2,
      };
    }

    test("Happy path siempre funciona 😅", () => {
      const newSalary = duplicateSalary(tom);

      expect(newSalary).toEqual({ amount: 2_600_000, currency: "EUR" });
    });

    test("Manejo tradicional de excepciones", () => {
      expect(() => {
        duplicateSalary(dicaprio);
      }).toThrow("We can't afford it");
    });
  });

  describe("🚀 Manejo de excepciones con `Either`", () => {
    // ℹ️ type Either<E, A> = Left<E> | Right<A>

    function duplicateSalary(actor: Actor): E.Either<Error, Money> {
      if (actor.salary.amount > 5_000_000)
        return E.left(Error("We can't afford it"));

      return E.right({
        ...actor.salary,
        amount: actor.salary.amount * 2,
      });
    }

    test("Happy path siempre funciona 😅", () => {
      const newSalary = duplicateSalary(tom);

      expect(newSalary).toEqual(
        E.right({ amount: 2_600_000, currency: "EUR" })
      );
    });

    test("Excepciones sin try/catch o condicionales", () => {
      const result = duplicateSalary(dicaprio);

      expect(result).toEqual(E.left(Error("We can't afford it")));
    });

    test("Tratamiento del resultado correcto con `fold`", () => {
      const result: string = pipe(
        tom,
        duplicateSalary,
        E.fold(
          (error: Error) => error.toString(),
          (salary: Money) => `New salary: ${salary.amount} ${salary.currency}`
        )
      );

      expect(result).toMatch(/2600000 EUR/i);
    });

    test("Tratamiento del error con `fold`", () => {
      const result: string = pipe(
        dicaprio,
        duplicateSalary,
        E.fold(
          (error: Error) => error.toString(),
          (salary: Money) => `New salary: ${salary.amount} ${salary.currency}`
        )
      );

      expect(result).toMatch(/can't afford it/i);
    });
  });
});

describe("💡 Decoración", () => {
  describe("🚀 Ejemplo de aplicación: Cacheo", () => {
    async function retrieveCredits(): Promise<Credits> {
      return TE.tryCatch(async () => {
        const response = await fetch("https://swapi.dev/api/people/");
        const { results } = await response.json();
        return results;
      }, E.toError)();
    }

    async function retrieveError(): Promise<Credits> {
      throw new Error("💣");
    }

    async function withCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
      const existentValue = window.sessionStorage.getItem(key);
      if (existentValue) return Promise.resolve(JSON.parse(existentValue));

      const data = await fn.call(null);

      window.sessionStorage.setItem(key, JSON.stringify(data, null, 4));

      return data;
    }

    test("Cacheo de datos en el `sessionStorage`", async () => {
      await withCache<Credits>("credits", () => retrieveCredits());
      const notErrorData = await withCache<Credits>("credits", () =>
        retrieveError()
      );

      return expect(E.getOrElse((): Cast => [])(notErrorData)).not.toEqual([]);
    });
  });
});
