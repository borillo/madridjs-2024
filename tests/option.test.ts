import { describe, expect, test } from "vitest";

import * as F from "fp-ts/function";
import * as O from "fp-ts/Option";

import * as T from "../src/exchange/domain";
import * as SavingsRepository from "../src/exchange/infrastructure/savings-repository";
import * as SavingsRepositoryWithOption from "../src/exchange/infrastructure/savings-repository-with-option";

describe("💡 Manejo de la opcionalidad", () => {
  describe("Enfoque tradicional", () => {
    /** 💩 Defensa de null necesaria */

    function extractFullName(
      accountManager: T.AccountManager | null
    ): string | null {
      if (accountManager === null) return null;

      return accountManager.fullName;
    }

    function toCapitalLetters(input: string | null): string | null {
      if (input === null) return null;

      return input.toLocaleUpperCase();
    }

    function toGreetingMessage(input: string | null): string | null {
      if (input === null) return null;

      return `Hi!!! ${input}`;
    }

    test("😭 Nombre transformado del account manager con defensa de null", () => {
      const repository: T.SavingsRepository =
        SavingsRepository.withSavingsDatabase();

      const accountManager = repository.retrieveAccountManager();

      const result = toGreetingMessage(
        toCapitalLetters(extractFullName(accountManager))
      );

      expect(result).toEqual("Hi!!! RICARDO BORILLO");
    });
  });

  /**
   * Problema que intentamos resolver:
    - 🧠 Los patrones funcionales y su impacto en el código.
    - 🧠 Computación que puede fallar (menjo de la opcionalidad).
    - 💩 Programación defensiva (`Optional chaining` or `Nullish coalescing operator`).
    - 💡 NullObject pattern.
    - 🧠 Functional programming: `fp-ts`.
   */

  describe("Manejo de la opcionalidad con `Option`", () => {
    /**
     * 🧠 type Option<A> = None | Some<A>
     * 🧠 Option = Caja a la que puedo aplicar operaciones tenga o no valor dentro.
     */

    function extractFullName(
      accountManager: O.Option<T.AccountManager>
    ): O.Option<string> {
      return O.map((am: T.AccountManager) => am.fullName)(accountManager);
    }

    function toCapitalLetters(input: O.Option<string>): O.Option<string> {
      return O.map((v: string) => v.toUpperCase())(input);
    }

    function toGreetingMessage(input: O.Option<string>): O.Option<string> {
      return O.map((v: string) => `Hi!!! ${v}`)(input);
    }

    test("😃 Nombre transformado del account manager con `Option`", () => {
      const repository: T.SavingsRepositoryWithOption =
        SavingsRepositoryWithOption.withSavingsDatabase();

      const accountManager = repository.retrieveAccountManager();

      const result = F.pipe(
        extractFullName(accountManager),
        toCapitalLetters,
        toGreetingMessage
      );

      expect(result).toEqual(O.some("Hi!!! RICARDO BORILLO"));
    });
  });
});
