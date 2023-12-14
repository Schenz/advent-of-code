import { getUniverse } from './getUniverse';

export const fillUniverseWithEmptySpace = (input: string): any => {
    const universe = getUniverse(input);
    const emptyRows = Array(universe.height).fill(true);
    const emptyCols = Array(universe.width).fill(true);

    for (const p of universe.galaxies) {
        emptyRows[p[0]] = false;
        emptyCols[p[1]] = false;
    }
    return { universe, emptyRows, emptyCols };
};
