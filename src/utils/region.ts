// src/utils/region.ts
import { Grid, GridCoordinate, getNeighbors } from './grid';

export const floodFill = <T>(
    grid: Grid<T>,
    startX: number,
    startY: number,
    matchCondition: (value: T) => boolean,
    onVisit?: (x: number, y: number) => void
): Set<string> => {
    const visited = new Set<string>();
    const queue: GridCoordinate[] = [{ x: startX, y: startY }];

    while (queue.length > 0) {
        const current = queue.shift();

        if (!current) {
            continue;
        }
        const { x, y } = current;
        const key = `${x},${y}`;

        if (visited.has(key)) {
            continue;
        }

        if (!matchCondition(grid[y][x])) {
            continue;
        }

        visited.add(key);

        if (onVisit) {
            onVisit(x, y);
        }

        const neighbors = getNeighbors(grid, x, y);

        queue.push(...neighbors);
    }

    return visited;
};

export const calculatePerimeter = (
    region: Set<string>,
    grid: Grid<any>,
    matchCondition: (value: any) => boolean
): GridCoordinate[] => {
    const perimeter: GridCoordinate[] = [];

    for (const pos of region) {
        const [x, y] = pos.split(',').map(Number);
        const neighbors = getNeighbors(grid, x, y);

        for (const neighbor of neighbors) {
            if (!matchCondition(grid[neighbor.y][neighbor.x])) {
                perimeter.push({ x, y });
                break;
            }
        }
    }

    return perimeter;
};
