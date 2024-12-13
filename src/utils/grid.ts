// src/utils/grid.ts
export type GridCoordinate = {
    x: number;
    y: number;
};

export type Grid<T> = T[][];

export const isInBounds = (grid: Grid<any>, x: number, y: number): boolean => {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
};

export const getNeighbors = (grid: Grid<any>, x: number, y: number, includeDiagonal = false): GridCoordinate[] => {
    const neighbors: GridCoordinate[] = [];
    const directions = includeDiagonal
        ? [
              [-1, -1],
              [-1, 0],
              [-1, 1],
              [0, -1],
              [0, 1],
              [1, -1],
              [1, 0],
              [1, 1],
          ]
        : [
              [-1, 0],
              [0, -1],
              [0, 1],
              [1, 0],
          ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (isInBounds(grid, newX, newY)) {
            neighbors.push({ x: newX, y: newY });
        }
    }
    return neighbors;
};
