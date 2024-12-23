// Advent of Code - Day 23 - Part One

type Graph = Record<string, Record<string, boolean>>;
type NodeSet = Record<string, boolean>;

export const part1 = (input: string[]): number => {
    const edges: string[][] = input.map(line => line.split('-'));

    const graph: Graph = {};
    const nodes: NodeSet = {};

    edges.forEach(([start, end]) => {
        if (!graph[start]) graph[start] = {};
        if (!graph[end]) graph[end] = {};
        graph[start][end] = true;
        graph[end][start] = true;
        nodes[start] = true;
        nodes[end] = true;
    });

    const nodeNames = Object.keys(nodes).sort();

    const triangleCount = nodeNames.reduce((count, nodeA) => {
        return count + nodeNames.reduce((innerCount, nodeB) => {
            if (graph[nodeA]?.[nodeB]) {
                return innerCount + nodeNames.reduce((innermostCount, nodeC) => {
                    if (graph[nodeA]?.[nodeC] && graph[nodeB]?.[nodeC]) {
                        if (nodeA.startsWith('t') || nodeB.startsWith('t') || nodeC.startsWith('t')) {
                            return innermostCount + 1;
                        }
                    }
                    return innermostCount;
                }, 0);
            }
            return innerCount;
        }, 0);
    }, 0);

    return triangleCount / 6;
};
