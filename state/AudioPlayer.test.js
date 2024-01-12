import { expect, test } from "vitest";

import AudioPlayer from "./AudioPlayer";

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
