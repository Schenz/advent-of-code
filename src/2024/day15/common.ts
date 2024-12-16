export const addTuples = (tuple1: [number, number], tuple2: [number, number]): [number, number] =>
    tuple1.length === 2
        ? [tuple1[0] + tuple2[0], tuple1[1] + tuple2[1]]
        : (tuple1.map((value, index) => value + tuple2[index]) as [number, number]);

export const DIRECTIONS: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
];

export const DIRECTION_SYMBOLS = ['>', '<', 'v', '^'];

export const moveLeft = (position: [number, number]): [number, number] => [position[0], position[1] - 1];

export const moveRight = (position: [number, number]): [number, number] => [position[0], position[1] + 1];
