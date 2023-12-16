import { Matrix } from '../../utils/matrix';

export const energize = (
    grid: Matrix,
    x: number,
    y: number,
    dx: number,
    dy: number
): number => {
    const seen = new Set<string>();
    const handled = new Set<string>();
    const todo = [`${x},${y},${dx},${dy}`];

    while (todo.length) {
        const key = todo.pop();

        if (key) {
            if (handled.has(key)) {
                continue;
            }
            handled.add(key);
            [x, y, dx, dy] = key.split(',').map(Number);

            if (x < 0 || x >= grid.width) {
                continue;
            }

            if (y < 0 || y >= grid.height) {
                continue;
            }
            seen.add(`${x},${y}`);

            const c = grid.getItem([x, y]);

            if (c === '.') {
                todo.push(`${x + dx},${y + dy},${dx},${dy}`);
                continue;
            } else if (c === '/' || c === '\\') {
                // Mirror
                if (c === '/') {
                    if (dx !== 0) {
                        // Left turn
                        [dx, dy] = [0, -dx];
                    } else {
                        // Right turn
                        [dx, dy] = [-dy, 0];
                    }
                } else if (c === '\\') {
                    if (dy !== 0) {
                        // Left turn
                        [dx, dy] = [dy, 0];
                    } else {
                        // Right turn
                        [dx, dy] = [0, dx];
                    }
                }
                todo.push(`${x + dx},${y + dy},${dx},${dy}`);
                continue;
            } else if (c === '|' || c === '-') {
                // Splitter
                if (c === '|') {
                    if (dy !== 0) {
                        todo.push(`${x + dx},${y + dy},${dx},${dy}`);
                        continue;
                    } else {
                        todo.push(`${x},${y - 1},0,-1`);
                        todo.push(`${x},${y + 1},0,1`);
                        continue;
                    }
                } else if (c === '-') {
                    if (dx !== 0) {
                        todo.push(`${x + dx},${y + dy},${dx},${dy}`);
                        continue;
                    } else {
                        todo.push(`${x - 1},${y},-1,0`);
                        todo.push(`${x + 1},${y},1,0`);
                        continue;
                    }
                } else {
                    throw new Error('Invalid character in grid.');
                }
            } else {
                throw new Error('Invalid character in grid.');
            }
        }
    }

    return seen.size;
};
