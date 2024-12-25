// Advent of Code - Day 24 - Part One

type Vec = {
    x: number;
    y: number;
    z: number;
};

type Hail = {
    pos: Vec;
    vel: Vec;
};

type Vec2d = {
    x: number;
    y: number;
};

export const part1 = (input: string[], min: number, max: number): number => {
    const hailStones = input.map((line) => {
        const [pos, vel] = line.split(' @ ').map((vec) => vec.split(', ').map(Number));

        return {
            pos: { x: pos[0], y: pos[1], z: pos[2] },
            vel: { x: vel[0], y: vel[1], z: vel[2] },
        };
    });

    let count = 0;

    for (let i = 0; i < hailStones.length - 1; i++) {
        for (let j = i + 1; j < hailStones.length; j++) {
            const intersection = getIntersection2d(hailStones[i], hailStones[j]);

            // parallel
            if (!intersection) {
                continue;
            }

            // past
            if (intersection.u < 0 || intersection.v < 0) {
                continue;
            }

            if (
                intersection.pos.x >= min &&
                intersection.pos.x <= max &&
                intersection.pos.y >= min &&
                intersection.pos.y <= max
            ) {
                count += 1;
            }
        }
    }
    return count;
};

const getIntersection2d = (a: Hail, b: Hail): { pos: Vec2d; u: number; v: number } | null => {
    // https://stackoverflow.com/questions/2931573/determining-if-two-rays-intersect

    const det = b.vel.x * a.vel.y - b.vel.y * a.vel.x;

    if (det === 0) {
        return null;
    }

    const dx = b.pos.x - a.pos.x;
    const dy = b.pos.y - a.pos.y;

    const u = (dy * b.vel.x - dx * b.vel.y) / det;
    const v = (dy * a.vel.x - dx * a.vel.y) / det;

    const intersection1 = sum2d(a.pos, multiply2d(a.vel, u));

    return {
        pos: intersection1,
        u,
        v,
    };
};

const sum2d = (a: Required<Vec2d>, b: Required<Vec2d>): Vec2d => ({
    x: a.x + b.x,
    y: a.y + b.y,
});

const multiply2d = (a: Required<Vec2d>, times: number): Vec2d => ({
    x: a.x * times,
    y: a.y * times,
});
