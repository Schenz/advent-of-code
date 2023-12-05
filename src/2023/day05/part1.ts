// Advent of Code - Day 5 - Part One

import { readFileSync } from 'fs';

class GardenMap {
    destination: number;
    source: number;
    range: number;

    constructor(mapStr: string) {
        const [destination, source, range] = mapStr
            .split(' ')
            .filter((str) => str !== '')
            .map(Number);

        this.destination = destination;
        this.source = source;
        this.range = range;
    }

    public isInRange(input: number) {
        return input >= this.source && input < this.source + this.range;
    }

    public output(input: number) {
        return input + this.destination - this.source;
    }
}

const parseSeeds = (line: string) => {
    return line
        .split(':')[1]
        .split(' ')
        .filter((number) => number !== '')
        .map(Number);
};

const parseGardenMapGroups = (lines: string[]) => {
    const gardenMapGroups: GardenMap[][] = [];
    lines.forEach((line) => {
        if (line === '') {
            gardenMapGroups.push([]);
            return;
        }
        if (line.endsWith(':')) return;
        gardenMapGroups[gardenMapGroups.length - 1].push(new GardenMap(line));
    });
    return gardenMapGroups;
};

const calculateOutput = (input: number, gardenMapGroup: GardenMap[]) => {
    let output = input;
    for (const gardenMap of gardenMapGroup) {
        if (gardenMap.isInRange(output)) {
            output = gardenMap.output(output);
            if (input !== output) break;
        }
    }
    return output;
};

const calculateSeedLocation = (
    input: number,
    gardenMapGroups: GardenMap[][]
) => {
    let output = input;
    for (const gardenMapGroup of gardenMapGroups) {
        output = calculateOutput(output, gardenMapGroup);
    }
    return output;
};

export function part1(path: string): number {
    const lines = readFileSync(path, 'utf8')
        .split('\n')
        .map((line) => line.trim());
    return parseSeeds(lines[0])
        .map((seed) =>
            calculateSeedLocation(seed, parseGardenMapGroups(lines.slice(1)))
        )
        .reduce((acc, location) => Math.min(acc, location), Infinity);
}
