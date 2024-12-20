import { dirs } from './part1';

const getKey = (x: number, y: number): string => `${x},${y}`;

export const bfs = (bytes: number[][], count: number, size: number): number => {
    const grid = Array.from({ length: size }, () => Array(size).fill('.'));

    for (let i = 0; i < count && i < bytes.length; i++) {
        const [x, y] = bytes[i];

        grid[y][x] = '#';
    }

    const queue = [[0, 0, 0]];
    const visited = new Set<string>();

    visited.add(getKey(0, 0));

    while (queue.length > 0) {
        const current = queue.shift();

        if (!current) {
            continue;
        }
        const [x, y, dist] = current;

        if (x === size - 1 && y === size - 1) {
            return dist;
        }

        for (const [dx, dy] of dirs) {
            const newX = x + dx;
            const newY = y + dy;

            if (
                newX >= 0 &&
                newX < size &&
                newY >= 0 &&
                newY < size &&
                !visited.has(getKey(newX, newY)) &&
                grid[newY][newX] === '.'
            ) {
                visited.add(getKey(newX, newY));
                queue.push([newX, newY, dist + 1]);
            }
        }
    }

    return -1;
};
