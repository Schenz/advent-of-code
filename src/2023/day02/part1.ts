// Advent of Code - Day 2 - Part One
import { CubeConfig } from './CubeConfig';

const bagConfig: CubeConfig = { red: 12, green: 13, blue: 14 };

export function part1(input: string[]): number {
  return input.reduce((sum, gameInput) => {
    const [gameIdString, subsetsString] = gameInput.split(":");
    const gameId = parseInt(gameIdString.trim().replace("Game", ""), 10);
    const subsets = subsetsString.split(";").map((subset) => subset.trim());

    return isGamePossible(subsets, bagConfig) ? sum + gameId : sum;
  }, 0);
}

function isGamePossible(subsets: string[], bagConfig: CubeConfig): boolean {
  return subsets.every((subset) =>
    subset.split(",").every((cube) => {
      const [quantity, color] = cube.trim().split(" ");
      return bagConfig[color] >= parseInt(quantity, 10);
    })
  );
}
