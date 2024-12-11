const parse = (input: string): Map<bigint, number> => {
    const stones = input
        .split(/\s+/g)
        .map((i) => i.trim())
        .filter((i) => i.length > 0)
        .map((i) => BigInt(i));

    const result = new Map<bigint, number>();

    for (const stone of stones) {
        result.set(stone, (result.get(stone) ?? 0) + 1);
    }
    return result;
};

const blink = (stones: Map<bigint, number>): Map<bigint, number> => {
    const next = new Map<bigint, number>();

    for (const [stone, count] of stones) {
        if (stone === 0n) {
            add(next, 1n, count);
            continue;
        }
        const asStr = stone.toString();

        if (asStr.length % 2 === 0) {
            const left = BigInt(asStr.substring(0, asStr.length / 2));
            const right = BigInt(asStr.substring(asStr.length / 2));

            add(next, left, count);
            add(next, right, count);
            continue;
        }
        add(next, stone * 2024n, count);
    }
    return next;
};

const add = (
    stones: Map<bigint, number>,
    stone: bigint,
    count: number
): void => {
    stones.set(stone, (stones.get(stone) ?? 0) + count);
};

export const getStoneCount = (
    input: string[],
    numberOfBlinks: number
): number => {
    let stones = parse(input[0]);

    for (let i = 0; i < numberOfBlinks; ++i) {
        stones = blink(stones);
    }

    return [...stones].reduce((acc, [, count]) => acc + count, 0);
};
