// Advent of Code - Day 21 - Part Two

import { findPlots } from './findPlots';

/**
 * Alignment of the repeating gardens:
 *
 * O = Odd garden ( oddGardenPlots )
 * E = Even garden ( evenGardenPlots )
 * S = Small side garden ( NEPlotsSM, SWPlotsSM, NWPlotsSM, SEPlotsSM )
 * L = Large side garden ( NEPlotsLG, SWPlotsLG, NWPlotsLG, SEPlotsLG )
 * C = Center garden (Starting point)
 * North = North garden ( northPlots )
 * East = East garden ( eastPlots )
 * South = South garden ( southPlots )
 * West = West garden ( westPlots )
 *
 *                 North
 *                 S | S
 *               L - E - L
 *             S |   |   | S
 *           L - E - O - E - L
 *         S |   |   |   |   | S
 *    West - E - O - C - O - E - East
 *         S |   |   |   |   | S
 *           L - E - O - E - L
 *             S |   |   | S
 *               L - E - L
 *                 S | S
 *                 South
 */

export const part2 = (input: string, steps: number): number => {
    const map = input.split('\n').map((line) => line.split(''));

    const startY = map.findIndex((line) => line.includes('S'));
    const startX = map[startY].findIndex((char) => char === 'S');

    map[startY][startX] = '.';

    const mapWidth = map.length;

    const gardenGridDiameter = ~~(steps / mapWidth) - 1;

    const oddGardens = (~~(gardenGridDiameter / 2) * 2 + 1) ** 2;
    const evenGardens = (~~((gardenGridDiameter + 1) / 2) * 2) ** 2;

    const oddGardenPlots = findPlots(map, startX, startY, mapWidth * 2 + 1);
    const evenGardenPlots = findPlots(map, startX, startY, mapWidth * 2);

    const northPlots = findPlots(map, startX, mapWidth - 1, mapWidth - 1);
    const eastPlots = findPlots(map, 0, startY, mapWidth - 1);
    const southPlots = findPlots(map, startX, 0, mapWidth - 1);
    const westPlots = findPlots(map, mapWidth - 1, startY, mapWidth - 1);

    const smallSteps = ~~(mapWidth / 2) - 1;

    const nePlotsSm = findPlots(map, 0, mapWidth - 1, smallSteps);
    const nwPlotsSm = findPlots(map, mapWidth - 1, mapWidth - 1, smallSteps);
    const sePlotsSm = findPlots(map, 0, 0, smallSteps);
    const swPlotsSm = findPlots(map, mapWidth - 1, 0, smallSteps);

    const largeSteps = ~~((mapWidth * 3) / 2) - 1;

    const nePlotsLg = findPlots(map, 0, mapWidth - 1, largeSteps);
    const nwPlotsLg = findPlots(map, mapWidth - 1, mapWidth - 1, largeSteps);
    const sePlotsLg = findPlots(map, 0, 0, largeSteps);
    const swPlotsLg = findPlots(map, mapWidth - 1, 0, largeSteps);

    const mainGardenPlots =
        oddGardens * oddGardenPlots + evenGardens * evenGardenPlots;

    const smallSidePlots =
        (gardenGridDiameter + 1) *
        (sePlotsSm + swPlotsSm + nwPlotsSm + nePlotsSm);

    const largeSidePlots =
        gardenGridDiameter * (sePlotsLg + swPlotsLg + nwPlotsLg + nePlotsLg);

    return (
        mainGardenPlots +
        smallSidePlots +
        largeSidePlots +
        northPlots +
        eastPlots +
        southPlots +
        westPlots
    );
};
