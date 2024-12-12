// Advent of Code - Day 12 - Part Two

import { Perimeter } from './perimeter';
import { TOP, BOTTOM, LEFT, RIGHT } from './directions';
import { calculateRegionDetails } from './calculateRegionDetails';

export const part2 = (input: string[]): number => {
    const region = new Set<string>();

    return input.reduce((totalSum, row, y) => {
        row.split('').forEach((_, x) => {
            if (!region.has(`${x},${y}`)) {
                const details = calculateRegionDetails(input, x, y, region);

                for (const direction in details.perimeter) {
                    if (direction === TOP || direction === BOTTOM) {
                        details.perimeter[direction] = filterPerimeters(details.perimeter[direction], 'x', 'y');
                    } else if (direction === LEFT || direction === RIGHT) {
                        details.perimeter[direction] = filterPerimeters(details.perimeter[direction], 'y', 'x');
                    }
                }

                const validPerimeterLength = Object.values(details.perimeter).reduce(
                    (sum, array) => sum + array.filter((perimeter) => perimeter.valid).length,
                    0
                );
                totalSum += details.cellCount * validPerimeterLength;
            }
        });
        return totalSum;
    }, 0);
};

/**
 * Remove extra perimeter based on axis
 */
const filterPerimeters = (array: Perimeter[], primary: 'x' | 'y', secondary: 'x' | 'y'): Perimeter[] => {
    array.sort((a, b) => a[primary] - b[primary]);
    const result: Perimeter[] = [];

    for (let i = 0; i < array.length; i++) {
        let check = array[i][primary];
        let nextNode;

        while (
            (nextNode = array.find((node) => node[primary] === check + 1 && node[secondary] === array[i][secondary]))
        ) {
            check++;
            nextNode.valid = false;
        }

        if (array[i].valid) {
            result.push(array[i]);
        }
    }

    return result;
};