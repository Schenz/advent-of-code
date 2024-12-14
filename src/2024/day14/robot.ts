// Advent of Code - Day 14 - Part Two
export interface Robot {
    x: number;
    y: number;
    vX: number;
    vY: number;
}

export const parseRobots = (input: string[]): Robot[] => {
    return input.map((i) => {
        const r = /p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/.exec(i);

        if (!r) {
            throw new Error(`Invalid input format: ${i}`);
        }
        return { x: Number(r[1]), y: Number(r[2]), vX: Number(r[3]), vY: Number(r[4]) };
    });
};

export const moveRobots = (robots: Robot[], height: number, width: number, rounds = 1): void => {
    for (const r of robots) {
        r.x = (r.x + r.vX * rounds) % width;
        r.y = (r.y + r.vY * rounds) % height;
        while (r.x < 0) {
            r.x += width;
        }
        while (r.y < 0) {
            r.y += height;
        }
    }
};
