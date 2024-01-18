import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

import { Credits } from "../model/types";

/*
export async function retrieveA(): Promise<E.Either<Error, People[]>> {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    const { results } = await response.json();

    return E.right(data);
  } catch (e) {
    return E.left(Error("Cant not load data from server"));
  }
}
*/

/*
export async function retrievePeople(): Promise<E.Either<Error, People[]>> {
  return await pipe(
    TE.tryCatch(
      async () => {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();
        return data;
      },
      (reason) => new Error(`${reason}`)
    ),
    TE.map((data) => data.results as People[])
  )();
}
*/

export async function retrieveActor(): Promise<Credits> {
  return TE.tryCatch(async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    const { results } = await response.json();
    return results;
  }, E.toError)();
}
