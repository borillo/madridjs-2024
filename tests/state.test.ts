import { expect, test } from "vitest";

interface State {
  pause: () => void;
  play: () => void;
  next: () => void;
  previous: () => void;
}

class PausedState implements State {
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {}

  play() {
    this.player.changeState(new PlayingState(this.player));
  }

  next() {
    this.player.changeState(new PlayingState(this.player));
  }

  previous() {
    this.player.changeState(new PlayingState(this.player));
  }
}

class ReadyState implements State {
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {}

  play() {
    this.player.changeState(new PlayingState(this.player));
  }

  next() {
    this.player.changeState(new PlayingState(this.player));
  }

  previous() {
    this.player.changeState(new PlayingState(this.player));
  }
}

class PlayingState implements State {
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {
    this.player.changeState(new PausedState(this.player));
  }

  play() {}

  next() {}

  previous() {}
}

export default class AudioPlayer {
  private state: State;

  constructor() {
    this.state = new ReadyState(this);
  }

  changeState(state: State) {
    this.state = state;
  }

  isPlaying() {
    return this.state instanceof PlayingState;
  }

  pause() {
    this.state.pause();
  }

  play() {
    this.state.play();
  }

  next() {
    this.state.next();
  }

  previous() {
    this.state.previous();
  }
}

test("when created player should be stopped", () => {
  const player = new AudioPlayer();

  expect(player.isPlaying()).toEqual(false);
});

test("when play button is pressed player should play", () => {
  const player = new AudioPlayer();
  player.play();

  expect(player.isPlaying()).toEqual(true);
});

test("when pause button is pressed player should stop", () => {
  const player = new AudioPlayer();
  player.play();
  player.pause();

  expect(player.isPlaying()).toEqual(false);
});
