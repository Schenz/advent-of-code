// Advent of Code - Day 10 - Part One

import { Position } from '../../utils/dijkstra/Position';

export const part1 = (input: string[]): number => {
    let start: Position = [0, 0];

    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 'S') {
                start = [x, y];
            }
        }
    }

    let x = start[0];
    let y = start[1];
    let dir: 'N' | 'S' | 'E' | 'W' | undefined;
    const below = input[y + 1][x];

    if (below === '|' || below === 'L' || below === 'J') {
        dir = 'S';
        y++;
    }

    if (!dir) {
        const above = input[y - 1][x];
        if (above === '|' || above === 'F' || above === '7') {
            dir = 'N';
            y--;
        }
    }

    if (!dir) {
        dir = 'E';
        x++;
    }

    const path: Position[] = [start, [x, y]];
    let steps = 1;

    while (x !== start[0] || y !== start[1]) {
        let deltaX = 0;
        let deltaY = 0;

        switch (input[y][x] + dir) {
            case '|S':
                deltaY = 1;
                break;
            case '|N':
                deltaY = -1;
                break;
            case '-E':
                deltaX = 1;
                break;
            case '-W':
                deltaX = -1;
                break;
            case 'LS':
                deltaX = 1;
                break;
            case 'LW':
                deltaY = -1;
                break;
            case 'JS':
                deltaX = -1;
                break;
            case 'JE':
                deltaY = -1;
                break;
            case '7N':
                deltaX = -1;
                break;
            case '7E':
                deltaY = 1;
                break;
            case 'FN':
                deltaX = 1;
                break;
            case 'FW':
                deltaY = 1;
                break;
            default:
                throw new Error('unrecognized ' + input[y][x] + dir);
        }

        if (deltaY === 1) {
            dir = 'S';
        } else if (deltaY === -1) {
            dir = 'N';
        } else if (deltaX === -1) {
            dir = 'W';
        } else {
            dir = 'E';
        }

        x += deltaX;
        y += deltaY;
        steps++;
        path.push([x, y]);
    }

    return steps / 2;
};
