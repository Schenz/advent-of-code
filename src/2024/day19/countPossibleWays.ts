export const countPossibleWays = (design: string, possibleTowels: string[], cache: Map<string, number>): number => {
    const cacheKey = JSON.stringify(design);

    if (cache.has(cacheKey)) {
        return cache.get(cacheKey) ?? 0;
    }

    if (design.length === 0) {
        return 1;
    }

    const count = possibleTowels
        .filter((towel) => design.startsWith(towel))
        .reduce((count, towel) => count + countPossibleWays(design.slice(towel.length), possibleTowels, cache), 0);

    cache.set(cacheKey, count);

    return count;
};
