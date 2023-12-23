export type Position = [number, number];

export const key = (p: Position): string => `${p[0]}_${p[1]}`;

export const addVect = (a: Position, b: Position): Position => [
    a[0] + b[0],
    a[1] + b[1],
];

export type Direction = '>' | 'v' | '<' | '^';

export const DS: Position[] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

export interface State {
    p: Position;
    steps: number;
    seen: Record<string, number>;
}
