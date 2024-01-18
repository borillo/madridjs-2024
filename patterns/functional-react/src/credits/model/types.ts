import * as E from "fp-ts/Either";

export const marion = {
  name: "Marion Cotillard",
  salary: {
    amount: 3_000_000,
    currency: { code: "EUR", fractionDigits: 2 },
  },
};

export const dicaprio = {
  name: "Leonardo DiCaprio",
  salary: {
    amount: 7_000_000,
    currency: { code: "EUR", fractionDigits: 2 },
  },
};

export const tom = {
  name: "Tom Hardy",
  salary: {
    amount: 1_300_000,
    currency: { code: "EUR", fractionDigits: 2 },
  },
};

export const data = [marion, dicaprio, tom];

export type Credits = E.Either<Error, Cast>;

export type Cast = Actor[];

type CurrencyCode = "EUR" | "USD";

interface Currency {
  code: CurrencyCode;
  fractionDigits: number;
}

interface Money {
  amount: number;
  currency: Currency;
}

export interface Actor {
  url?: string;
  name: string;
  salary: Money;
}

export function computePayroll(cast: Cast) {
  return cast
    .map((actor) => actor.salary.amount)
    .reduce((acc, value) => acc + value);
}

export function from(cast: Cast) {
  return {
    computePayroll: () => computePayroll(cast),
  };
}

export interface Award {
  actor: Actor;
  lastOscarYear: number | null;
}

export type Awards = Award[];
