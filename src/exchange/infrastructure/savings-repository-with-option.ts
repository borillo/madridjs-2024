import * as O from "fp-ts/Option";

import { SavingsRepositoryWithOption } from "../domain";

export function withSavingsDatabase(): SavingsRepositoryWithOption {
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
      return O.some({
        code: 934589749,
        fullName: "Ricardo Borillo",
      });
    },
  };
}
