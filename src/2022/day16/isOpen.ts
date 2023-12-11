export const isOpen = (
    current: number,
    node: string,
    flowNodeIndexes: Record<string, number>
): boolean => {
    const openMask = 1 << flowNodeIndexes[node];
    const isOpenNum = current & openMask;
    return isOpenNum > 0;
};
