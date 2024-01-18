import React, { useState, useEffect } from "react";

import { retrieveActor } from "../repositories/CastRepository";
import { Actor, Cast, Credits } from "../model/types";

import * as E from "fp-ts/Either";

function useActor() {
  const [actor, setActor] = useState<Credits>(E.right([]));

  useEffect(() => {
    retrieveActor().then(setActor);
  }, []);

  return { actor };
}

function CreditsPanel() {
  const { actor } = useActor();

  return (
    <div className="books">
      <h1>Actor</h1>

      <ul>
        {E.fold(
          (e: Error) => <span className="message-error">{e.toString()}</span>,
          (values: Cast) => (
            <>
              {values.map(({ url, name }) => (
                <li key={url}>{name}</li>
              ))}
            </>
          )
        )(actor)}
      </ul>
    </div>
  );
}

export default CreditsPanel;

/*
      {E.isLeft(people) ? (
        <span className="message-error">Error retrieving data</span>
      ) : (
        <ul>
          {E.getOrElse(() => [] as People[])(people).map(({ url, name }) => (
            <li key={url}>{name}</li>
          ))}
        </ul>
      )}
*/

/*
  const ui = E.bimap(
    (error: Error) => <span className="message-error">{error.toString()}</span>,
    (values: People[]) => (
      <>
        {values.map(({ url, name }) => (
          <li key={url}>{name}</li>
        ))}
      </>
    )
  )(people);

  return (
    <div className="books">
      <h1>People</h1>

      <ul>{E.getOrElse<JSX.Element, JSX.Element>((error) => error)(ui)}</ul>
    </div>
  );
*/
