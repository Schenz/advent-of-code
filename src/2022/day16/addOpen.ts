export const addOpen = (current: number, node: string, flowNodeIndexes: Record<string, number>): number => {
    const openMask = 1 << flowNodeIndexes[node];

    return current | openMask;
};
