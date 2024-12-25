// Advent of Code - Day 10 - Part One

export const part1 = (input: string[]): number =>
    input
        .map((row) => row.split('').map(Number))
        .reduce(
            (totalScore, row, i, grid) =>
                totalScore +
                row.reduce(
                    (rowScore, cell, j) => rowScore + (cell === 0 ? depthFirstSearch(grid, i, j, 0, new Set()) : 0),
                    0
                ),
            0
        );

const depthFirstSearch = (grid: number[][], x: number, y: number, next: number, visited: Set<string>): number => {
    const key = `${x},${y}`;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== next || visited.has(key)) {
        return 0;
    }

    visited.add(key);

    if (grid[x][y] === 9) {
        return 1;
    }

    return (
        depthFirstSearch(grid, x + 1, y, next + 1, visited) +
        depthFirstSearch(grid, x - 1, y, next + 1, visited) +
        depthFirstSearch(grid, x, y + 1, next + 1, visited) +
        depthFirstSearch(grid, x, y - 1, next + 1, visited)
    );
};
