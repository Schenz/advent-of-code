// Advent of Code - Day 2 - Part Two

import { CubeConfig } from './CubeConfig';

export const part2 = (input: string[]): number => {
    return input.reduce((sum, gameInput) => {
        const [, subsetsString] = gameInput.split(':');
        const minCubes = getMinimumCubes(subsetsString.split(';').map((subset) => subset.trim()));

        return sum + minCubes.red * minCubes.green * minCubes.blue;
    }, 0);
};

const getMinimumCubes = (subsets: string[]): CubeConfig => {
    const minCubes: CubeConfig = { red: 0, green: 0, blue: 0 };

    subsets.forEach((subset) => {
        subset.split(',').forEach((cube) => {
            const [quantity, color] = cube.trim().split(' ');

            minCubes[color] = Math.max(minCubes[color], parseInt(quantity, 10));
        });
    });

    return minCubes;
};
