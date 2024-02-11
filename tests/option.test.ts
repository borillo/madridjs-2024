import { describe, expect, test } from "vitest";

import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

import { Actor, dicaprio, marion, tom } from "../src/exchange/domain";

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
