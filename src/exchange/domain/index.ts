import * as O from "fp-ts/Option";

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

export interface AccountManager {
  code: number;
  fullName: string;
}

export interface SavingsRepository {
  retrieveTransactions(): Transactions;
  retrieveAccountManager(): AccountManager | null;
}

export interface SavingsRepositoryWithOption {
  retrieveTransactions(): Transactions;
  retrieveAccountManager(): O.Option<AccountManager>;
}

export interface SavingsRepositoryFactory {
  buildLoggableRepository: () => SavingsRepository;
  buildCacheableRepository: () => SavingsRepository;
  buildCacheableLoggingRepository: () => SavingsRepository;
}
