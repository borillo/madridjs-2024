import { describe, expect, test } from "vitest";

import * as T from "../src/exchange/domain";
import * as SavingsRepository from "../src/exchange/infrastructure/savings-repository";

/**
 * 💡 Separación de responsabilidades: logging, caching, etc.
 * 💡 Métodos factoría para generar las decoraciones.
 * 💡 Permiten componerse.
 * 💡 Configurable en test para evitar por ejemplo el caching.
 */

describe("Decorator", () => {
  test("should retrieve the cast", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.withSavingsDatabase();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
    expect(() => repository.retrieveTransactions()).toThrowError("🧨");
  });

  test("🚀 should retrieve the cast (cache applied)", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.savingsRepositoryFactory().buildCacheableRepository();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
    repository.retrieveTransactions(); // 🤞 Está en cache y no debe fallar
  });

  test("🚀 should retrieve the cast (logging applied)", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.savingsRepositoryFactory().buildLoggableRepository();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
  });
});
