import {
  AccountManager,
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

    retrieveAccountManager: () => {
      return {
        code: 934589749,
        fullName: "Ricardo Borillo",
      };
    },
  };
}

export function withSavingsLogging(
  repository: SavingsRepository
): SavingsRepository {
  return {
    retrieveTransactions: () => {
      console.log("Started retrieveTransactions");
      const result = repository.retrieveTransactions();
      console.log("Ended retrieveTransactions");

      return result;
    },
    retrieveAccountManager: () => {
      console.log("Started retrieveAccountManager");
      const result = repository.retrieveAccountManager();
      console.log("Ended retrieveAccountManager");

      return result;
    },
  };
}

export function withSavingsCache(
  repository: SavingsRepository
): SavingsRepository {
  let cachedTransactions: Transactions = [];
  let cachedAccountManager: AccountManager | null;

  return {
    retrieveTransactions: () => {
      if (cachedTransactions.length === 0)
        cachedTransactions = repository.retrieveTransactions();

      return cachedTransactions;
    },
    retrieveAccountManager: () => {
      if (typeof cachedAccountManager === null)
        cachedAccountManager = repository.retrieveAccountManager();

      return cachedAccountManager;
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
