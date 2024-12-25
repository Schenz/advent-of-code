// Advent of Code - Day 25 - Part One
import 'regenerator-runtime/runtime';
import { mincut } from '@graph-algorithm/minimum-cut';

export const part1 = (input: string[]): number => {
    const connections: [string, string][] = [];
    const connectionsMap: Map<string, string[]> = new Map();

    input.forEach((line) => {
        const [component, connectedComponentsString] = line.split(': ');
        const connectedComponents = connectedComponentsString.split(' ');

        if (!connectionsMap.has(component)) {
            connectionsMap.set(component, connectedComponents);
        } else {
            const comp = connectionsMap.get(component);

            if (comp) {
                comp.push(...connectedComponents);
            }
        }

        for (const connectedComponent of connectedComponents) {
            connections.push([component, connectedComponent]);

            if (!connectionsMap.has(connectedComponent)) {
                connectionsMap.set(connectedComponent, []);
            }

            const alreadyConnectedComponents = connectionsMap.get(connectedComponent);

            if (alreadyConnectedComponents) {
                alreadyConnectedComponents.push(component);
            }
        }
    });

    for (const [componentA, componentB] of mincut(connections)) {
        cutConnection(connectionsMap, componentA, componentB);
    }

    const groups = getComponentGroups(connectionsMap);

    return groups[0].length * groups[1].length;
};

const cutConnection = (
    connections: Map<string, string[]>,
    componentA: string,
    componentB: string
): Map<string, string[]> => {
    const nodesA = connections.get(componentA);
    const nodesB = connections.get(componentB);

    if (nodesA) {
        connections.set(componentA, nodesA.filter((c) => c !== componentB) ?? []);
    }

    if (nodesB) {
        connections.set(componentB, nodesB.filter((c) => c !== componentA) ?? []);
    }

    return connections;
};

const getComponentGroups = (connections: Map<string, string[]>): string[][] => {
    const groups: string[][] = [];
    const visited = new Set<string>();

    for (const component of connections.keys()) {
        if (visited.has(component)) {
            continue;
        }

        const group: string[] = [];
        const queue = [component];

        while (queue.length > 0) {
            const connectedComponent = queue.pop();

            if (connectedComponent) {
                if (visited.has(connectedComponent)) {
                    continue;
                }
                visited.add(connectedComponent);

                group.push(connectedComponent);
                const conns = connections.get(connectedComponent);

                if (conns) {
                    queue.push(...conns);
                }
            }
        }

        groups.push(group);
    }

    return groups;
};
