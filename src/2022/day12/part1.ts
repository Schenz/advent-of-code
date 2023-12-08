// Advent of Code - Day 12 - Part One

import { Point, Position, dijkstra, getHeightOfChar } from './dijkstra';

export const part1 = (data: string[]): number => {
    const input = data.filter((l) => l.length > 0).map((l) => l.split(''));

    const startPosx = input.findIndex((l) => l.includes('S'));
    const startPosy = input[startPosx].findIndex((l) => l === 'S');
    const start: Position = [startPosx, startPosy];

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

    return dijkstra(start, end, map);
};
