export const readData = (data: string): any => {
    const parsed = data.split(`\n`).filter((line) => line.length > 0);
    const flowRates: Record<string, number> = {};
    const allNodes = new Array<string>();
    const nodesWithFlow = new Array<string>();
    const flowNodeIndexes: Record<string, number> = {};
    const shortestPaths: Record<string, number> = {};

    for (const row of parsed) {
        const [, from, rate, toArray] =
            /Valve ([^)]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/.exec(row) ?? [];
        const flowRate = Number(rate);

        flowRates[from] = flowRate;
        allNodes.push(from);

        if (flowRate > 0) {
            nodesWithFlow.push(from);
            flowNodeIndexes[from] = nodesWithFlow.length;
        }
        shortestPaths[`${from}:${from}`] = 0;
        for (const to of toArray.split(', ')) {
            shortestPaths[`${from}:${to}`] = 1;
        }
    }
    // FLOYD WARSHALL to fill in remaining shortest paths.
    for (const hopNode of allNodes) {
        for (const node1 of allNodes) {
            for (const node2 of allNodes) {
                shortestPaths[`${node1}:${node2}`] = Math.min(
                    shortestPaths[`${node1}:${node2}`] ?? 1000000,
                    (shortestPaths[`${node1}:${hopNode}`] ?? 1000000) +
                        (shortestPaths[`${hopNode}:${node2}`] ?? 1000000)
                );
            }
        }
    }
    return { nodesWithFlow, flowNodeIndexes, shortestPaths, flowRates };
};
