import {
  SavingsRepository,
  SavingsRepositoryFactory,
  Transactions,
} from "../domain";

export function withSavingsDatabase(): SavingsRepository {
  let count = 0;

  return {
    retrieveTransactions: () => {
      if (count > 0) throw Error("🧨");
      count++;

      return [
        { reason: "DB transaction", value: { amount: 100, currency: "EUR" } },
      ];
    },
  };
}

export function withSavingsLogging(
  repository: SavingsRepository
): SavingsRepository {
  return {
    retrieveTransactions: () => {
      console.log("Started repositority");

      const result = repository.retrieveTransactions();

      console.log("Ended  repositority");

      return result;
    },
  };
}

export function withSavingsCache(
  repository: SavingsRepository
): SavingsRepository {
  let cachedData: Transactions = [];

  return {
    retrieveTransactions: () => {
      if (cachedData.length === 0)
        cachedData = repository.retrieveTransactions();

      return cachedData;
    },
  };
}

export function savingsRepositoryFactory(): SavingsRepositoryFactory {
  return {
    buildLoggableRepository: () => withSavingsLogging(withSavingsDatabase()),
    buildCacheableRepository: () => withSavingsCache(withSavingsDatabase()),
    buildCacheableLoggingRepository: () =>
      withSavingsLogging(withSavingsCache(withSavingsDatabase())),
  };
}
