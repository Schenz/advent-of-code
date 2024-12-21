import { Vector } from './vector';

export const calculateMinLength = (input: string, limit = 2, currentDepth = 0): number => {
    const memoKey = `${input}-${currentDepth}-${limit}`;

    if (cache.has(memoKey)) {
        return cache.get(memoKey) as number;
    }

    const avoidVector = currentDepth === 0 ? new Vector(3, 0) : new Vector(0, 0);
    let currentPosition = currentDepth === 0 ? keyPositions['A'] : keyPositions['a'];
    let totalLength = 0;

    for (const character of input) {
        const nextPosition = keyPositions[character];
        const moveSet = calculateMoveSet(currentPosition, nextPosition, avoidVector);

        if (currentDepth === limit) {
            totalLength += (moveSet[0] || 'a').length;
        } else {
            totalLength += Math.min(...moveSet.map((move) => calculateMinLength(move, limit, currentDepth + 1)));
        }

        currentPosition = nextPosition;
    }

    cache.set(memoKey, totalLength);
    return totalLength;
};

/* eslint-disable @typescript-eslint/naming-convention */
const keyPositions: { [key: string]: Vector } = {
    '7': new Vector(0, 0),
    '8': new Vector(0, 1),
    '9': new Vector(0, 2),
    '4': new Vector(1, 0),
    '5': new Vector(1, 1),
    '6': new Vector(1, 2),
    '1': new Vector(2, 0),
    '2': new Vector(2, 1),
    '3': new Vector(2, 2),
    '0': new Vector(3, 1),
    A: new Vector(3, 2),
    '^': new Vector(0, 1),
    a: new Vector(0, 2),
    '<': new Vector(1, 0),
    v: new Vector(1, 1),
    '>': new Vector(1, 2),
};

const directionVectors: { [key: string]: Vector } = {
    '^': new Vector(-1, 0),
    v: new Vector(1, 0),
    '<': new Vector(0, -1),
    '>': new Vector(0, 1),
};
/* eslint-enable @typescript-eslint/naming-convention */

const cache: Map<string, number> = new Map();

const calculateMoveSet = (start: Vector, end: Vector, avoid: Vector = new Vector(0, 0)): string[] => {
    const delta = end.subtract(start);
    let moveString = '';
    const dx = delta.x;
    const dy = delta.y;

    if (dx < 0) {
        moveString += '^'.repeat(Math.abs(dx));
    } else {
        moveString += 'v'.repeat(dx);
    }

    if (dy < 0) {
        moveString += '<'.repeat(Math.abs(dy));
    } else {
        moveString += '>'.repeat(dy);
    }

    const permutations = generatePermutations(moveString.split(''));
    const validPermutations = permutations
        .filter((perm) => {
            const path = perm.map((dir) => directionVectors[dir]);
            const positions = path.reduce((acc, move) => [...acc, acc[acc.length - 1].add(move)], [start]);

            return !positions.some((pos) => pos.equals(avoid));
        })
        .map((perm) => perm.join('') + 'a');

    return validPermutations.length > 0 ? validPermutations : ['a'];
};

const generatePermutations = (array: string[]): string[][] => {
    if (array.length <= 1) {
        return [array];
    }
    const result: string[][] = [];

    for (let i = 0; i < array.length; i++) {
        const rest = array.slice(0, i).concat(array.slice(i + 1));

        for (const perm of generatePermutations(rest)) {
            result.push([array[i]].concat(perm));
        }
    }
    return result;
};
