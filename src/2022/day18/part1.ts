// Advent of Code - Day 18 - Part One

export const part1 = (input: string[]): number => {
    const cubes = input
        .filter((l) => l.length > 0)
        .map((l) => l.split(',').map(Number));

    const cubeSet = new Set(cubes.map((cube) => cube.toString()));

    const answer = cubes
        .map((cube) => {
            return [
                cubeSet.has([cube[0] + 1, cube[1], cube[2]].toString()) ? 0 : 1,
                cubeSet.has([cube[0] - 1, cube[1], cube[2]].toString()) ? 0 : 1,
                cubeSet.has([cube[0], cube[1] + 1, cube[2]].toString()) ? 0 : 1,
                cubeSet.has([cube[0], cube[1] - 1, cube[2]].toString()) ? 0 : 1,
                cubeSet.has([cube[0], cube[1], cube[2] + 1].toString()) ? 0 : 1,
                cubeSet.has([cube[0], cube[1], cube[2] - 1].toString()) ? 0 : 1,
            ].reduce(sum);
        })
        .reduce(sum);

    return answer;
};

const sum = (a: number, b: number): number => a + b;
