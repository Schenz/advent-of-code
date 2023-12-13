// Advent of Code - Day 13 - Part Two

import { Matrix } from '../../utils/matrix';
import { findReflection, parseInput } from './utils';

export const part2 = (input: string): number => {
    const data = parseInput(input);

    let answer = 0;

    for (let idx = 0; idx < data.length; idx++) {
        const [vert, horiz] = fixSmudge(data[idx]);

        if (vert.length === 1) {
            if (horiz.length === 0) {
                answer += vert[0];
            } else {
                throw new Error('Assertion Error');
            }
        } else {
            if (vert.length === 0 && horiz.length === 1) {
                answer += horiz[0] * 100;
            } else {
                throw new Error('Assertion Error');
            }
        }
    }

    return answer;
};

const fixSmudge = (g: Matrix): [number[], number[]] => {
    const [origVert, origHoriz] = findReflection(g);

    for (const [x, y] of g.items()) {
        const c = g.getItem([x, y]);

        if (c === '.') {
            g.setItem([x, y], '#');
        } else {
            g.setItem([x, y], '.');
        }

        const [vert, horiz] = findReflection(g);
        const newVert = vert.filter((v) => !origVert.includes(v));
        const newHoriz = horiz.filter((h) => !origHoriz.includes(h));

        g.setItem([x, y], c);

        if (newVert.length + newHoriz.length === 1) {
            return [newVert, newHoriz];
        }
    }

    return [[], []];
};
