import { Point } from '../../2023/day18/Point';

export type Grid = {
    grid: string[][];
    width: number;
    height: number;
};

export const fromText = (text: string[]): Grid => createGrid(text.map((row) => row.split('')));

export const get = (grid: Grid, point: Point): string => {
    if (isValidPoint(grid, point)) {
        return grid.grid[point.y][point.x];
    }
    return '.';
};

export const points = (grid: Grid): Point[] =>
    Array.from({ length: grid.height }, (_, y) => Array.from({ length: grid.width }, (_, x) => ({ x, y }))).flat();

const createGrid = (textGrid: string[][]): Grid => ({
    grid: textGrid,
    height: textGrid.length,
    width: textGrid[0]?.length || 0,
});

const isValidPoint = (grid: Grid, point: Point): boolean =>
    point.x >= 0 && point.x < grid.width && point.y >= 0 && point.y < grid.height;

export const splitIntoGroups = (input: string[]): string[][] =>
    input
        .reduce(
            (groups, row) => {
                if (row.length === 0) {
                    groups.push([]);
                } else {
                    groups[groups.length - 1].push(row);
                }
                return groups;
            },
            [[]] as string[][]
        )
        .filter((group) => group.length > 0);
