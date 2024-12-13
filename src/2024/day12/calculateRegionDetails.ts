import { TOP, BOTTOM, RIGHT, LEFT } from './directions';
import { Perimeter } from './perimeter';

export const calculateRegionDetails = (
    grid: string[],
    details: { area: number; perimeter: { [key: string]: Perimeter[] } },
    x: number,
    y: number,
    area: Set<string>
): void => {
    if (area.has(`${x},${y}`)) {
        return;
    }
    area.add(`${x},${y}`);

    const width = grid[0].length;
    const height = grid.length;
    const plant = grid[y][x];

    details.area++;

    if (y === 0 || grid[y - 1][x] !== plant) {
        details.perimeter[TOP].push({ x, y, valid: true });
    }

    if (y === height - 1 || grid[y + 1][x] !== plant) {
        details.perimeter[BOTTOM].push({ x, y, valid: true });
    }

    if (x === 0 || grid[y][x - 1] !== plant) {
        details.perimeter[RIGHT].push({ x, y, valid: true });
    }

    if (x === width - 1 || grid[y][x + 1] !== plant) {
        details.perimeter[LEFT].push({ x, y, valid: true });
    }

    if (y !== 0 && grid[y - 1][x] === plant) {
        calculateRegionDetails(grid, details, x, y - 1, area);
    }

    if (y !== height - 1 && grid[y + 1][x] === plant) {
        calculateRegionDetails(grid, details, x, y + 1, area);
    }

    if (x !== 0 && grid[y][x - 1] === plant) {
        calculateRegionDetails(grid, details, x - 1, y, area);
    }

    if (x !== width - 1 && grid[y][x + 1] === plant) {
        calculateRegionDetails(grid, details, x + 1, y, area);
    }
};
