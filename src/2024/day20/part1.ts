// Advent of Code - Day 20 - Part One

import { findStartAndEndPositions, calculateSkips, findPathPositions } from './utils';

type Position = { x: number; y: number };

export const part1 = (input: string[]): number => {
    const grid: string[][] = input.map((line) => line.split(''));
    const { startPos, endPos } = findStartAndEndPositions(grid);

    const pathPositions: Position[] = findPathPositions(startPos, endPos, grid);

    return calculateSkips(pathPositions, 2, 100);
};
