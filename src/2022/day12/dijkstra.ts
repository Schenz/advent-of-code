export type Position = [number, number];

export type Point = {
    height: number;
    isEnd: boolean;
};

export const getHeightOfChar = (char: string): number =>
    char.charCodeAt(0) - 97;
const getNeightbors = (from: Position, map: Point[][]): Position[] => {
    return [
        from[0] > 0 ? [from[0] - 1, from[1]] : [-1, -1],
        from[1] > 0 ? [from[0], from[1] - 1] : [-1, -1],
        from[0] < map.length - 1 ? [from[0] + 1, from[1]] : [-1, -1], // Maybe bug
        from[1] < map[0].length - 1 ? [from[0], from[1] + 1] : [-1, -1], // Maybe bug
    ].filter((a) => a[0] !== -1) as Position[];
};

export const dijkstra = (
    start: Position,
    end: Position,
    map: Point[][]
): number => {
    const visited: string[] = [];
    const toVisit: Position[] = [start];
    const lowestCost = {
        [start.toString()]: 0,
    };

    let curr;
    while ((curr = toVisit.shift())) {
        if (visited.includes(curr.toString())) continue;
        const currHeight = map[curr[0]][curr[1]].height;
        const neighbours = getNeightbors(curr, map).filter(
            (n: Position) => !visited.includes(n.toString())
        );
        const reachableNeighbours = neighbours.filter(
            (neighbour) =>
                map[neighbour[0]][neighbour[1]].height <= currHeight + 1
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

    return lowestCost[end.toString()];
};

type CostMap = {
    [name: string]: number;
};

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
        if (visited.includes(curr.toString())) continue;
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
