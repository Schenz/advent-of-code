/* eslint-disable @typescript-eslint/naming-convention */
// Advent of Code - Day 23 - Part One

import { DS, Direction, Position, State, addVect, key } from './utils';

const D: Record<Direction, number> = { '>': 0, v: 1, '<': 2, '^': 3 };

export const part1 = (input: string[]): number => {
    const map: string[][] = input.map((line) => line.split('').map((v) => v));
    const stack: State[] = [{ p: [1, 0], steps: 0, seen: {} }];
    const endPos: Position = [map[0].length - 2, map.length - 1];
    let maxSteps = 0;

    while (stack.length) {
        const cur = stack.pop();

        if (cur) {
            const k = key(cur.p);

            cur.seen[k] = 1;

            let moves = getMoves(map, cur);

            while (moves.length == 1) {
                cur.seen[key(moves[0])] = 1;
                cur.steps++;
                cur.p = moves[0];
                moves = getMoves(map, cur);
            }

            if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
                maxSteps = Math.max(maxSteps, cur.steps);
                continue;
            }

            moves.forEach((np) =>
                stack.push({
                    p: np,
                    steps: cur.steps + 1,
                    seen: { ...cur.seen },
                })
            );
        }
    }
    return maxSteps;
};

const getMoves = (map: string[][], cur: State): Position[] => {
    const moves: Position[] = [];

    const v = map[cur.p[1]][cur.p[0]];

    if (D[v as Direction] !== undefined) {
        moves.push(addVect(cur.p, DS[D[v as Direction]]));
    } else {
        DS.forEach((d) => moves.push(addVect(cur.p, d)));
    }

    return moves.filter((np) => {
        if (
            map[np[1]] === undefined ||
            map[np[1]][np[0]] === undefined ||
            map[np[1]][np[0]] === '#'
        ) {
            return false;
        }

        if (cur.seen[key(np)] !== undefined) {
            return false;
        }
        return true;
    });
};
