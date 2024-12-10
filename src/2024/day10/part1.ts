// Advent of Code - Day 10 - Part One

export const part1 = (input: string[]): number =>
    input
        .map((row) => row.split('').map(Number))
        .reduce(
            (totalScore, row, i, grid) =>
                totalScore +
                row.reduce(
                    (rowScore, cell, j) =>
                        rowScore +
                        (cell === 0
                            ? depthFirstSearch(grid, i, j, 0, new Set())
                            : 0),
                    0
                ),
            0
        );

const depthFirstSearch = (
    grid: number[][],
    i: number,
    j: number,
    next: number,
    visited: Set<string>
): number => {
    const key = `${i},${j}`;

    if (
        i < 0 ||
        i >= grid.length ||
        j < 0 ||
        j >= grid[0].length ||
        grid[i][j] !== next ||
        visited.has(key)
    ) {
        return 0;
    }

    visited.add(key);

    if (grid[i][j] === 9) {
        return 1;
    }

    return (
        depthFirstSearch(grid, i + 1, j, next + 1, visited) +
        depthFirstSearch(grid, i - 1, j, next + 1, visited) +
        depthFirstSearch(grid, i, j + 1, next + 1, visited) +
        depthFirstSearch(grid, i, j - 1, next + 1, visited)
    );
};
