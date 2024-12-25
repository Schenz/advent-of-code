export const direction = {
    n: 1,
    s: 2,
    e: 3,
    w: 4,
} as const;

type Direction = (typeof direction)[keyof typeof direction];
type Position = [number, number, Direction];
type HeatLoss = number;
type StepsInDirection = number;
type Heuristic = number;
export type Step = [Heuristic, Position, HeatLoss, StepsInDirection];

export const getNextPositions: Record<Direction, (x: number, y: number) => Position[]> = {
    [direction.n]: (x, y) => [
        [x, y - 1, direction.n],
        [x + 1, y, direction.e],
        [x - 1, y, direction.w],
    ],
    [direction.s]: (x, y) => [
        [x, y + 1, direction.s],
        [x + 1, y, direction.e],
        [x - 1, y, direction.w],
    ],
    [direction.e]: (x, y) => [
        [x, y + 1, direction.s],
        [x, y - 1, direction.n],
        [x + 1, y, direction.e],
    ],
    [direction.w]: (x, y) => [
        [x, y + 1, direction.s],
        [x, y - 1, direction.n],
        [x - 1, y, direction.w],
    ],
};

export const cacheKey = ([, [x, y, direction], , steps]: Step): number =>
    (y << 16) | (x << 8) | (direction << 4) | steps;
