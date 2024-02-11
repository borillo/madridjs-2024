export const VALID_CURRENCIES = ["EUR", "USD"] as const;

export type Amount = number;
export type Currency = (typeof VALID_CURRENCIES)[number];

export interface Money {
  amount: Amount;
  currency: Currency;
}

export interface Transaction {
  reason: string;
  value: Money;
}

export type Transactions = Transaction[];
export type Savings = Money;

export interface SavingsRepository {
  retrieveTransactions(): Transactions;
}

export interface SavingsRepositoryFactory {
  buildLoggableRepository: () => SavingsRepository;
  buildCacheableRepository: () => SavingsRepository;
  buildCacheableLoggingRepository: () => SavingsRepository;
}
