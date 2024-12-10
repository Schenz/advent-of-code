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
    x: number,
    y: number,
    next: number
): number => {
    if (
        x < 0 ||
        x >= grid.length ||
        y < 0 ||
        y >= grid[0].length ||
        grid[x][y] !== next
    ) {
        return 0;
    }

    if (grid[x][y] === 9) {
        return 1;
    }

    return (
        depthFirstSearch(grid, x + 1, y, next + 1) +
        depthFirstSearch(grid, x - 1, y, next + 1) +
        depthFirstSearch(grid, x, y + 1, next + 1) +
        depthFirstSearch(grid, x, y - 1, next + 1)
    );
};
