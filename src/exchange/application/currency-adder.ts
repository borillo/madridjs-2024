import * as T from "../domain/";
import * as Money from "../domain/money";

export function add(values: T.Money[]) {
  return values.reduce(Money.add);
}
