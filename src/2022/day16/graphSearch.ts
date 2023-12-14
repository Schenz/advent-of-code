import { Item } from './Item';
import { addOpen } from './addOpen';
import { isOpen } from './isOpen';

export const graphSearch = (
    minutes: number,
    nodesWithFlow = new Array<string>(),
    flowNodeIndexes: Record<string, number> = {},
    shortestPaths: Record<string, number> = {},
    flowRates: Record<string, number> = {},
    onVisit: (item: Item) => void
): void => {
    const fringe: Item[] = [];

    fringe.push({
        current: 'AA',
        remaining: minutes,
        openMask: 0,
        total: 0,
    });
    const visited = new Set<string>();

    while (fringe.length > 0) {
        const item = fringe.pop() as Item;
        const { openMask, remaining, current, total } = item;
        const visitedKey = `${current}:${remaining}:${openMask}:${total}`;

        if (visited.has(visitedKey)) {
            continue;
        }
        visited.add(visitedKey);

        onVisit(item);

        if (remaining === 0) {
            continue;
        }

        for (const next of nodesWithFlow) {
            if (isOpen(openMask, next, flowNodeIndexes)) {
                continue;
            }
            const nextRemaining =
                remaining - shortestPaths[`${current}:${next}`] - 1;

            if (nextRemaining <= 0) {
                continue;
            }
            fringe.push({
                current: next,
                openMask: addOpen(openMask, next, flowNodeIndexes),
                remaining: nextRemaining,
                total: total + nextRemaining * flowRates[next],
            });
        }
    }
};
