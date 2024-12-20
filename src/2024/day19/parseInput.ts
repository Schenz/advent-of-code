import { TowelsData } from './TowelsData';

export const parseInput = (inputLines: string[]): TowelsData => {
    const possibleTowels = inputLines[0].split(',').map((s) => s.trim());
    const designs = inputLines.slice(2);

    return {
        possibleTowels,
        designs,
    };
};
