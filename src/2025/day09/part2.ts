// Advent of Code - Day 9 - Part Two

import { buildCoordinateMap, parsePoints, Point } from './helpers';

export const part2 = (input: string[]): number => {
    const points: Point[] = parsePoints(input);
    if (points.length === 0) return 0;

    const { xCoords, yCoords, compressX, compressY } = buildCoordinateMap(points);

    // Build compressed grid: mark red (O) and green (X) tiles
    const grid = new Set<string>();

    // Mark red points and connecting green segments
    for (let i = 0; i < points.length; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];

        const cx1 = compressX(x1);
        const cy1 = compressY(y1);
        const cx2 = compressX(x2);
        const cy2 = compressY(y2);

        // Mark red point
        grid.add(`${cx1},${cy1}`);

        // Mark green segments connecting consecutive points
        if (cx1 === cx2) {
            // vertical segment
            const minY = Math.min(cy1, cy2);
            const maxY = Math.max(cy1, cy2);
            for (let y = minY; y <= maxY; y++) {
                grid.add(`${cx1},${y}`);
            }
        } else {
            // horizontal segment
            const minX = Math.min(cx1, cx2);
            const maxX = Math.max(cx1, cx2);
            for (let x = minX; x <= maxX; x++) {
                grid.add(`${x},${cy1}`);
            }
        }
    }

    // Flood fill from outside to mark non-red/green regions
    // Direct calculation: xCoords/yCoords are sorted, compressX/Y map index*2
    const min = -1;
    const maxX = (xCoords.length - 1) * 2 + 1;
    const maxY = (yCoords.length - 1) * 2 + 1;

    const outside = new Set<string>();
    const queue: [number, number][] = [[min, min]];
    let queueIndex = 0;
    outside.add(`${min},${min}`);

    while (queueIndex < queue.length) {
        const [x, y] = queue[queueIndex++];

        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < min || nx > maxX || ny < min || ny > maxY) continue;
            if (outside.has(`${nx},${ny}`)) continue;
            if (grid.has(`${nx},${ny}`)) continue;

            outside.add(`${nx},${ny}`);
            queue.push([nx, ny]);
        }
    }

    // Fill interior that's not marked as outside
    for (let x = min; x <= maxX; x++) {
        for (let y = min; y <= maxY; y++) {
            const key = `${x},${y}`;
            if (!grid.has(key) && !outside.has(key)) {
                grid.add(key);
            }
        }
    }

    // Pre-compute compressed coordinates for all points
    const compressedPoints = points.map(([x, y]) => [compressX(x), compressY(y)] as const);

    let maxArea = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;

            const p1 = points[i];
            const p2 = points[j];

            if (p1[0] === p2[0] || p1[1] === p2[1]) continue; // zero-area or degenerate

            const [cx1, cy1] = compressedPoints[i];
            const [cx2, cy2] = compressedPoints[j];

            const minCX = Math.min(cx1, cx2);
            const maxCX = Math.max(cx1, cx2);
            const minCY = Math.min(cy1, cy2);
            const maxCY = Math.max(cy1, cy2);

            // Inline perimeter check for better performance
            let valid = true;
            for (let x = minCX; x <= maxCX && valid; x++) {
                if (!grid.has(`${x},${minCY}`) || !grid.has(`${x},${maxCY}`)) {
                    valid = false;
                }
            }
            for (let y = minCY; y <= maxCY && valid; y++) {
                if (!grid.has(`${minCX},${y}`) || !grid.has(`${maxCX},${y}`)) {
                    valid = false;
                }
            }

            if (!valid) continue;

            const area = (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
};
