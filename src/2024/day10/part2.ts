// Advent of Code - Day 10 - Part Two

export const part2 = (input: string[]): number =>
    input
        .map((row) => row.split('').map(Number))
        .reduce(
            (totalScore, row, i, grid) =>
                totalScore +
                row.reduce(
                    (rowScore, cell, j) =>
                        rowScore +
                        (cell === 0 ? depthFirstSearch(grid, i, j, 0) : 0),
                    0
                ),
            0
        );

const depthFirstSearch = (
    grid: number[][],
    i: number,
    j: number,
    next: number
): number => {
    if (
        i < 0 ||
        i >= grid.length ||
        j < 0 ||
        j >= grid[0].length ||
        grid[i][j] !== next
    ) {
        return 0;
    }

    if (grid[i][j] === 9) {
        return 1;
    }

    return (
        depthFirstSearch(grid, i + 1, j, next + 1) +
        depthFirstSearch(grid, i - 1, j, next + 1) +
        depthFirstSearch(grid, i, j + 1, next + 1) +
        depthFirstSearch(grid, i, j - 1, next + 1)
    );
};
