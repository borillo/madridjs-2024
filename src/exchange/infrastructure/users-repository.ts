import { State, stateMachine } from "./request-state";

export interface ApiOptions {
  url: string;
}

export interface Api {
  retrieve<T>(options: ApiOptions): Promise<T>;
  reset(): void;
  currentState(): State;
}

export function create(): Api {
  let state: State = "IDLE";

  const abortController = new AbortController();
  const signal = abortController.signal;

  return {
    currentState() {
      return state;
    },

    async retrieve<T>(options: ApiOptions): Promise<T> {
      state = stateMachine[state].retrieve();

      try {
        if (options.url.includes("/fail")) throw new Error("💣");

        const response = await fetch(options.url, { signal });
        const { data } = await response.json();

        state = stateMachine[state].success();

        return data;
      } catch (e) {
        state = stateMachine[state].failure();

        throw new Error("Error retrieving data");
      }
    },

    reset() {
      abortController.abort();

      state = stateMachine[state].reset();
    },
  };
}
