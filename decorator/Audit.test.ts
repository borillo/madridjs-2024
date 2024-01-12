import { expect, test } from "vitest";

import {
  UserRepository,
  RepositoryFactory,
  UserRepositoryMysql,
  UserCache,
} from "./Audit";

test("should retrieve user", () => {
  const repository: UserRepository = new UserRepositoryMysql();

  const result = repository.findUsers();

  expect(result.length).toBeGreaterThan(0);
});

test("should allow to cache data", () => {
  const repository: UserRepository = new UserCache(new UserRepositoryMysql());

  let result = repository.findUsers();
  result = repository.findUsers();
  result = repository.findUsers();

  expect(result.length).toBeGreaterThan(0);
});

test("should log decorations", () => {
  const repository: UserRepository =
    RepositoryFactory.buildLoggableRepository();

  const result = repository.findUsers();

  expect(result.length).toBeGreaterThan(0);
});
