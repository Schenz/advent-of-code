// Advent of Code - Day 17 - Part One

import { Position } from '../../utils/dijkstra/Position';
import { shapes } from './Shape';
import { validPos } from './validPos';

export const part1 = (input: string): number => {
    const wind = input.trim().split('');
    const map = new Map<string, boolean>();

    let top = 0;
    let droppedRocks = 0;
    let rockIdx = 0;
    let windIdx = 0;
    while (droppedRocks < 2022) {
        const currRock = shapes[rockIdx % shapes.length];
        rockIdx++;
        let currPos: Position = [2, top + 3];
        let stopped = false;
        while (!stopped) {
            const move = wind[windIdx % wind.length];
            windIdx++;
            if (move === '>') {
                if (validPos([currPos[0] + 1, currPos[1]], currRock, map)) {
                    // can go right
                    currPos = [currPos[0] + 1, currPos[1]];
                }
            } else {
                if (validPos([currPos[0] - 1, currPos[1]], currRock, map)) {
                    // can go left
                    currPos = [currPos[0] - 1, currPos[1]];
                }
            }
            if (validPos([currPos[0], currPos[1] - 1], currRock, map)) {
                // can go down
                currPos = [currPos[0], currPos[1] - 1];
            } else {
                // touched down
                stopped = true;
                top = Math.max(top, currRock.height + currPos[1]);
                for (let i = 0; i < currRock.form.length; i++) {
                    for (let j = 0; j < currRock.form[0].length; j++) {
                        if (currRock.form[i][j] === '#') {
                            map.set(
                                [currPos[0] + j, currPos[1] + i].toString(),
                                true
                            );
                        }
                    }
                }
            }
        }
        droppedRocks++;
    }

    return top;
};
