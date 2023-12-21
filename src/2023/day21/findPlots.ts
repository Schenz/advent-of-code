const getKey = (x: number, y: number, z: number): number =>
    (z * 1000 + x) * 1000 + y;

export const findPlots = (
    map: string[][],
    x: number,
    y: number,
    maxSteps: number,
    visited = new Set<number>(),
    distance = 0
): number => {
    const key = getKey(x, y, distance);

    if (visited.has(key)) {
        return 0;
    }
    visited.add(key);

    if (distance === maxSteps) {
        return 1;
    }

    let plots = 0;

    const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ];

    neighbors.forEach(([nx, ny]) => {
        if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) {
            return;
        }

        if (map[ny][nx] === '.') {
            plots += findPlots(map, nx, ny, maxSteps, visited, distance + 1);
        }
    });

    return plots;
};
