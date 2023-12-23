// Advent of Code - Day 23 - Part Two

import { DS, Position, addVect, key } from './utils';

interface Point {
    p: Position;
    steps: number;
    lastJunctionId: number;
    stepsToLastJunction: number;
}

interface Connection {
    id: number;
    distance: number;
}

interface Node {
    p: Position;
    connections: Connection[];
}

export const part2 = (input: string[]): number => {
    const map: string[][] = input.map((line) => line.split('').map((v) => v));
    const nodes = getGraph(map);

    const stack: { p: number; steps: number; seen: Record<string, number> }[] =
        [{ p: 0, steps: 0, seen: {} }];
    const endPos: number = nodes.length - 1;
    let maxSteps = 0;

    while (stack.length) {
        const cur = stack.pop();

        if (cur) {
            const k = cur.p;

            cur.seen[k] = 1;

            if (cur.p == endPos) {
                maxSteps = Math.max(cur.steps, maxSteps);
                continue;
            }

            nodes[k].connections
                .filter((n) => cur.seen[n.id] === undefined)
                .forEach((n) =>
                    stack.push({
                        p: n.id,
                        steps: cur.steps + n.distance,
                        seen: { ...cur.seen },
                    })
                );
        }
    }

    return maxSteps;
};

const getGraph = (map: string[][]): Node[] => {
    const stack: Point[] = [
        {
            p: [1, 0],
            steps: 0,
            lastJunctionId: 0,
            stepsToLastJunction: 0,
        },
    ];
    const seen: Record<string, number> = {};
    const endPos: Position = [map[0].length - 2, map.length - 1];
    const nodes: Node[] = [{ p: [1, 0], connections: [] }];

    while (stack.length) {
        const cur = stack.pop();

        if (cur) {
            const k = key(cur.p);

            const moves = getMoves(map, cur);

            if (moves.length > 2) {
                cur.lastJunctionId = addConnectNode(nodes, cur);
                cur.stepsToLastJunction = cur.steps;
            }

            if (seen[k] !== undefined) {
                continue;
            }
            seen[k] = 1;

            if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
                addConnectNode(nodes, cur);
                continue;
            }

            moves.forEach((np) =>
                stack.push({
                    p: np,
                    steps: cur.steps + 1,
                    lastJunctionId: cur.lastJunctionId,
                    stepsToLastJunction: cur.stepsToLastJunction,
                })
            );
        }
    }
    return nodes;
};

const getMoves = (map: string[][], cur: Point): Position[] =>
    DS.map((d) => addVect(cur.p, d)).filter((np) => {
        if (
            map[np[1]] === undefined ||
            map[np[1]][np[0]] === undefined ||
            map[np[1]][np[0]] === '#'
        ) {
            return false;
        }
        return true;
    });

const addConnectNode = (nodes: Node[], cur: Point): number => {
    // try to locate an existing one
    let newJunctionId = nodes.findIndex(
        (n) => n.p[0] == cur.p[0] && n.p[1] == cur.p[1]
    );

    if (newJunctionId === -1) {
        newJunctionId = nodes.length;
        nodes.push({
            p: cur.p.slice() as Position,
            connections: [],
        });
    }

    if (newJunctionId === cur.lastJunctionId) {
        return newJunctionId;
    }

    // we need to connect cur.lastJunctionId and newJunctionId
    if (
        nodes[cur.lastJunctionId].connections.findIndex(
            (conn) => conn.id === newJunctionId
        ) === -1
    ) {
        nodes[cur.lastJunctionId].connections.push({
            id: newJunctionId,
            distance: cur.steps - cur.stepsToLastJunction,
        });
    }

    if (
        nodes[newJunctionId].connections.findIndex(
            (conn) => conn.id === cur.lastJunctionId
        ) === -1
    ) {
        nodes[newJunctionId].connections.push({
            id: cur.lastJunctionId,
            distance: cur.steps - cur.stepsToLastJunction,
        });
    }
    return newJunctionId;
};
