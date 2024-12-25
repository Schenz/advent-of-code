// Advent of Code - Day 4 - Part One

const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1], // right, down, diagonal down-right, diagonal down-left
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1], // left, up, diagonal up-left, diagonal up-right
];

const countXMAS = (grid: string[][], x: number, y: number, dx: number, dy: number): number => {
    const word = 'XMAS';

    for (let i = 0; i < word.length; i++) {
        const nx = x + i * dx;
        const ny = y + i * dy;

        if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length || grid[nx][ny] !== word[i]) {
            return 0;
        }
    }
    return 1;
};

export const part1 = (input: string[]): number => {
    const grid = input.map((line) => line.split(''));
    let count = 0;

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            for (const [dx, dy] of directions) {
                count += countXMAS(grid, x, y, dx, dy);
            }
        }
    }

    return count;
};
