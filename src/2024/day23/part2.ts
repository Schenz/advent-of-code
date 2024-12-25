// Advent of Code - Day 23 - Part Two

type GraphMap = Record<string, Record<string, boolean>>;
type NodeSet = Record<string, boolean>;

type GraphList = number[][];
type AdjacencyMatrix = boolean[][];

export const part2 = (input: string[]): string => {
    const edges: string[][] = input.map((line) => line.split('-'));
    const graphMap: GraphMap = {};
    const nodes: NodeSet = {};

    edges.forEach(([start, end]) => {
        if (!graphMap[start]) {
            graphMap[start] = {};
        }

        if (!graphMap[end]) {
            graphMap[end] = {};
        }
        graphMap[start][end] = true;
        graphMap[end][start] = true;
        nodes[start] = true;
        nodes[end] = true;
    });

    const nodeNames = Object.keys(nodes).sort();
    const nodeCount = nodeNames.length;

    const graphList: GraphList = Array.from({ length: nodeCount }, () => []);
    const adjacencyMatrix: AdjacencyMatrix = Array.from({ length: nodeCount }, () => Array(nodeCount).fill(false));

    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
            if (graphMap[nodeNames[j]]?.[nodeNames[i]]) {
                graphList[i].push(j);
                adjacencyMatrix[i][j] = true;
            }
        }
    }

    let largestClique: number[] = [];

    const findClique = (currentClique: number[]): void => {
        if (largestClique.length < currentClique.length) {
            largestClique = [...currentClique];
        }
        for (let i = currentClique[currentClique.length - 1] + 1; i < nodeCount; i++) {
            if (currentClique.every((j) => adjacencyMatrix[i][j])) {
                findClique([...currentClique, i]);
            }
        }
    };

    graphList.forEach((neighbors, i) => {
        neighbors.forEach((j) => {
            if (j > i) {
                findClique([i, j]);
            }
        });
    });

    return largestClique.map((i) => nodeNames[i]).join(',');
};
