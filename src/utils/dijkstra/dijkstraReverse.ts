import { CostMap } from './CostMap';
import { Point } from './Point';
import { Position } from './Position';
import { getNeightbors } from './getNeightbors';

export const dijkstraReverse = (
    start: Position,
    endPositions: Position[],
    map: Point[][]
): number => {
    const visited: string[] = [];
    const toVisit: Position[] = [start];
    const lowestCost: CostMap = {
        [start.toString()]: 0,
    };

    let curr;

    while ((curr = toVisit.shift())) {
        if (visited.includes(curr.toString())) {
            continue;
        }
        const currHeight = map[curr[0]][curr[1]].height;
        const neighbours = getNeightbors(curr, map).filter(
            (n: Position) => !visited.includes(n.toString())
        );
        const reachableNeighbours = neighbours.filter(
            (neighbour) =>
                map[neighbour[0]][neighbour[1]].height + 1 >= currHeight
        );

        toVisit.push(...reachableNeighbours);

        const costToCurr = lowestCost[curr.toString()];

        reachableNeighbours.forEach((neighbour) => {
            const newCostToNeighbour = costToCurr + 1;
            const costToNeighbour =
                lowestCost[neighbour.toString()] === undefined
                    ? newCostToNeighbour
                    : lowestCost[neighbour.toString()];

            if (newCostToNeighbour <= costToNeighbour) {
                lowestCost[neighbour.toString()] = newCostToNeighbour;
            }
        });

        visited.push(curr.toString());
    }

    const startingCosts = endPositions
        .map((startPos) => lowestCost[startPos.toString()])
        .filter((p) => p !== undefined);

    return Math.min(...startingCosts);
};
