import { describe, expect, test } from "vitest";

import { pipe, flow } from "fp-ts/function";

import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";

describe("Function composition", () => {
  function plusTwo(a: number) {
    return a + 2;
  }

  function minusTwo(a: number) {
    return a - 2;
  }

  test("pipe", () => {
    const value = pipe(4, plusTwo, plusTwo, minusTwo);

    expect(value).toEqual(6);
  });

  test("flow", () => {
    const value = flow(plusTwo, plusTwo, minusTwo)(4);

    expect(value).toEqual(6);
  });
});

describe("Computations that can fail", () => {
  describe("`Option`", () => {
    function plusTwo(value: number) {
      return value + 2;
    }

    interface Profile {
      name: string;
    }

    interface User {
      login: string;
      profile?: Profile | undefined;
    }

    test("Can handle optional values", () => {
      expect(pipe(O.some(4), O.map(plusTwo))).toEqual(O.some(6));
      expect(pipe(O.none, O.map(plusTwo))).toEqual(O.none);
    });

    test("Can apply operations over optional values", () => {
      const user: User | undefined = {
        login: "borillo",
      };

      let result = pipe(
        user,
        O.fromNullable,
        O.map(({ login }) => login.toUpperCase())
      );

      expect(result).toEqual(O.some("BORILLO"));
    });

    test("Structure can be flatten when nested optional values", () => {
      const user: User = {
        login: "borillo",
        profile: {
          name: "ADMIN",
        },
      };

      let result = pipe(
        user,
        O.fromNullable,
        O.map(({ profile }) =>
          pipe(
            profile,
            O.fromNullable,
            O.map(({ name }) => name)
          )
        ),
        O.flatten
      );

      expect(result).toEqual(O.some("ADMIN"));
    });

    test("Structure can be flatten with chain for more readability", () => {
      const user: User = {
        login: "borillo",
        profile: {
          name: "ADMIN",
        },
      };

      const result = pipe(
        user,
        O.fromNullable,
        O.map(({ profile }) => profile),
        O.chain(
          flow(
            O.fromNullable,
            O.map(({ name }) => name)
          )
        )
      );

      expect(result).toEqual(O.some("ADMIN"));
    });
  });

  describe("`Either`", () => {
    function compute(a: number, b: number): E.Either<Error, number[]> {
      if (a + b < 5) return E.left(Error("Not enough"));

      return E.right([a, b]);
    }

    const plusTwo = A.map((value: number) => value + 2);
    const plusTwoE = E.map(plusTwo);

    const sum = A.reduce(0, (a: number, b: number) => a + b);

    test("Check `left`and `right` for an `Either` value", () => {
      expect(compute(2, 3)).toEqual(E.right([2, 3]));
      expect(compute(2, 2)).toEqual(E.left(Error("Not enough")));
    });

    test("Apply functions for values in `Either`", () => {
      expect(pipe(compute(2, 3), E.map(sum))).toEqual(E.right(5));
      expect(pipe(compute(2, 2), E.map(sum))).toEqual(
        E.left(Error("Not enough"))
      );
    });

    test("Apply multiple functions for `left`/`right` values in `Either`", () => {
      expect(pipe(compute(2, 3), plusTwoE, E.map(sum))).toEqual(E.right(9));
      expect(pipe(compute(2, 2), plusTwoE, E.map(sum))).toEqual(
        E.left(Error("Not enough"))
      );
    });

    test("Processing valid output with `bimap` mantaining context in output", () => {
      const value = compute(2, 3);

      const result = E.bimap(
        (error: Error) => -1,
        (values: number[]) => sum(values)
      )(value);

      expect(result).toEqual(E.right(5));
    });

    test("Processing valid output with `fold` extracting the final value", () => {
      const value = compute(2, 3);

      const result = E.fold(
        (error: Error) => -1,
        (values: number[]) => sum(values)
      )(value);

      expect(result).toEqual(5);
    });
  });
});
