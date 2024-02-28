export type State = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

export const stateMachine = {
  IDLE: {
    retrieve: (): State => "LOADING",
    success: (): State => "IDLE",
    failure: (): State => "IDLE",
    reset: (): State => "IDLE",
  },
  LOADING: {
    retrieve: (): State => "LOADING",
    success: (): State => "SUCCESS",
    failure: (): State => "ERROR",
    reset: (): State => "IDLE",
  },
  ERROR: {
    retrieve: (): State => "ERROR",
    success: (): State => "ERROR",
    failure: (): State => "ERROR",
    reset: (): State => "IDLE",
  },
  SUCCESS: {
    retrieve: (): State => "SUCCESS",
    success: (): State => "SUCCESS",
    failure: (): State => "SUCCESS",
    reset: (): State => "IDLE",
  },
};
