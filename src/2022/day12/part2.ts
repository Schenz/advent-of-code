// Advent of Code - Day 12 - Part Two

import { dijkstraReverse } from '../../utils/dijkstra/dijkstraReverse';
import { getHeightOfChar } from '../../utils/dijkstra/getHeightOfChar';
import { Point } from '../../utils/dijkstra/Point';
import { Position } from '../../utils/dijkstra/Position';

export const part2 = (data: string[]): number => {
    const input = data.filter((l) => l.length > 0).map((l) => l.split(''));

    const starting: Position[] = input
        .map((row, i) => {
            return row
                .map((point, j) => {
                    if (point === 'a' || point === 'S') return [i, j];
                })
                .filter((a) => a != undefined);
        })
        .flat() as Position[];

    const endPosx = input.findIndex((l) => l.includes('E'));
    const endPosy = input[endPosx].findIndex((l) => l === 'E');
    const end: Position = [endPosx, endPosy];

    const map = input.map((row) =>
        row.map((point) => {
            if (point === 'S')
                return {
                    height: getHeightOfChar('a'),
                    isEnd: false,
                } as Point;
            else if (point === 'E')
                return {
                    height: getHeightOfChar('z'),
                    isEnd: true,
                } as Point;
            return {
                height: getHeightOfChar(point),
                isEnd: false,
            } as Point;
        })
    );

    return dijkstraReverse(end, starting, map);
};
