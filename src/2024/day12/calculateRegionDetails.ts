
import { TOP, BOTTOM, RIGHT, LEFT } from './directions';
import { Perimeter } from './perimeter';

interface RegionDetails {
    cellCount: number;
    perimeter: { [key: string]: Perimeter[] };
}

export const calculateRegionDetails = (grid: string[], x: number, y: number, region: Set<string>): RegionDetails => {
    const details: RegionDetails = {
        cellCount: 0,
        perimeter: {
            [TOP]: [],
            [BOTTOM]: [],
            [LEFT]: [],
            [RIGHT]: [],
        },
    };

    const calculate = (x: number, y: number): void => {
        if (region.has(`${x},${y}`)) {
            return;
        }
        region.add(`${x},${y}`);

        const width = grid[0].length - 1;
        const height = grid.length - 1;
        const plant = grid[y][x];

        details.cellCount++;

        if (y === 0 || grid[y - 1][x] !== plant) {
            details.perimeter[TOP].push({ x, y, valid: true });
        }

        if (y === height || grid[y + 1][x] !== plant) {
            details.perimeter[BOTTOM].push({ x, y, valid: true });
        }

        if (x === 0 || grid[y][x - 1] !== plant) {
            details.perimeter[RIGHT].push({ x, y, valid: true });
        }

        if (x === width || grid[y][x + 1] !== plant) {
            details.perimeter[LEFT].push({ x, y, valid: true });
        }

        if (y !== 0 && grid[y - 1][x] === plant) {
            calculate(x, y - 1);
        }

        if (y !== height && grid[y + 1][x] === plant) {
            calculate(x, y + 1);
        }

        if (x !== 0 && grid[y][x - 1] === plant) {
            calculate(x - 1, y);
        }

        if (x !== width && grid[y][x + 1] === plant) {
            calculate(x + 1, y);
        }
    };

    calculate(x, y);
    return details;
};
