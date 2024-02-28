import { describe, expect, test } from "vitest";

import * as T from "../src/exchange/domain";
import * as SavingsRepository from "../src/exchange/infrastructure/savings-repository";

/**
 * 💡 Separación de responsabilidades: logging, caching, etc.
 * 💡 Permiten componerse.
 * 💡 Métodos factoría para generar las decoraciones.
 * 💡 Configurable en test para evitar por ejemplo el caching.
 */

describe("Decorator", () => {
  test("😃 Implementación de base de datos directamente", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.withSavingsDatabase();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
    expect(() => repository.retrieveTransactions()).toThrowError("🧨");
  });

  test("😃 Decoración del repositorio de base de datos para cacheo", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.savingsRepositoryFactory().buildCacheableRepository();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
    repository.retrieveTransactions(); // 🤞 Está en cache y no debe fallar
  });

  test("😃 Decoración del repositorio de base de datos para logging", () => {
    const repository: T.SavingsRepository =
      SavingsRepository.savingsRepositoryFactory().buildLoggableRepository();

    const result = repository.retrieveTransactions();

    expect(result.length).toBeGreaterThan(0);
  });
});
