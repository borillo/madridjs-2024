// Domain

export interface User {
  login: string;
  fullName: string;
}

export interface UserRepository {
  findUsers: () => User[];
}

// Infra

export class UserRepositoryMysql implements UserRepository {
  private count;

  constructor() {
    this.count = 0;
  }

  findUsers(): User[] {
    const data = [{ login: "ricardo", fullName: "Ricardo Borillo" }];

    this.count += 1;

    if (this.count === 1) {
      return data;
    } else {
      throw Error("🧨");
    }
  }
}

export class UserCache implements UserRepository {
  private decorated: UserRepository;
  private cachedData: User[];

  constructor(decorated: UserRepository) {
    this.decorated = decorated;
    this.cachedData = [];
  }

  findUsers(): User[] {
    if (this.cachedData.length === 0)
      this.cachedData = this.decorated.findUsers();

    return this.cachedData;
  }
}

export class Logging implements UserRepository {
  private decorated: UserRepository;

  constructor(decorated: UserRepository) {
    this.decorated = decorated;
  }

  findUsers(): User[] {
    const data = this.decorated.findUsers();
    return data;
  }
}

export class RepositoryFactory {
  static buildLoggableRepository(): UserRepository {
    return new Logging(new UserRepositoryMysql());
  }

  static buildRepository(): UserRepository {
    return new Logging(new UserRepositoryMysql());
  }
}
