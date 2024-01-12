import { useState } from "react";

/*import * as E from "fp-ts/Either";
import { BookShelf } from "../../books/model/types";

function useEitherState<T, K>(defaultValue: K): [K, (value: T) => void] {
  const [eitherValue, setEitherValue] = useState<T>(E.right(defaultValue));
  const extractedValue = E.getOrElse(() => defaultValue)(eitherValue);

  function setValue(value: T) {
    setEitherValue(
      typeof value === "undefined"
        ? E.left(Error("Can not retrieve data"))
        : E.right(value)
    );
  }

  return [extractedValue, setValue];
}
*/

export default useEitherState;
