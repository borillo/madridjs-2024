import { beforeEach, describe, expect, test } from "vitest";

import * as UsersApiClient from "../src/exchange/infrastructure/users-repository";
import { User } from "../src/exchange/domain/user";

const URL = "https://reqres.in";

describe.only("State", () => {
  let client: UsersApiClient.Api;

  beforeEach(() => {
    client = UsersApiClient.create();
  });

  test("😃 El estado inicial debe ser IDLE", () => {
    expect(client.currentState()).toEqual("IDLE");
  });

  test("😃 Recuperar información con éxito nos deja en estado SUCCESS", async () => {
    await client.retrieve<User[]>({
      url: `${URL}/api/users`,
    });

    expect(client.currentState()).toEqual("SUCCESS");
  });

  test("😃 Un error al recuperar nos deja en estado ERROR", async () => {
    expect(() =>
      client.retrieve<User[]>({
        url: `${URL}/fail`,
      })
    ).rejects.toThrowError();

    expect(client.currentState()).toEqual("ERROR");
  });

  test("😃 Podemos resetear el estado para quedarnos en el punto inicial", async () => {
    try {
      await client.retrieve<User[]>({
        url: `${URL}/fail`,
      });
    } catch (e) {}

    expect(client.currentState()).toEqual("ERROR");

    client.reset();

    expect(client.currentState()).toEqual("IDLE");
  });
});
