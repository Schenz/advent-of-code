export const parseAndArrangeBlocks = (
    input: string[]
): {
    bricks: number[][];
    kSupportsV: Record<number, Set<number>>;
    vSupportsK: Record<number, Set<number>>;
} => {
    const bricks = parseBricks(input);
    const { kSupportsV, vSupportsK } = arrangeBricks(bricks);

    return { bricks, kSupportsV, vSupportsK };
};

const parseBricks = (input: string[]): number[][] => input.map((line) => line.replace('~', ',').split(',').map(Number));

const arrangeBricks = (
    bricks: number[][]
): {
    kSupportsV: Record<number, Set<number>>;
    vSupportsK: Record<number, Set<number>>;
} => {
    bricks.sort((a, b) => a[2] - b[2]);
    for (let index = 0; index < bricks.length; index++) {
        let maxZ = 1;

        for (let i = 0; i < index; i++) {
            if (overlaps(bricks[index], bricks[i])) {
                maxZ = max(maxZ, bricks[i][5] + 1);
            }
        }
        bricks[index][5] -= bricks[index][2] - maxZ;
        bricks[index][2] = maxZ;
    }

    bricks.sort((a, b) => a[2] - b[2]);

    const kSupportsV: Record<number, Set<number>> = {};
    const vSupportsK: Record<number, Set<number>> = {};

    for (let i = 0; i < bricks.length; i++) {
        kSupportsV[i] = new Set();
        vSupportsK[i] = new Set();
    }

    for (let j = 0; j < bricks.length; j++) {
        for (let i = 0; i < j; i++) {
            if (overlaps(bricks[i], bricks[j]) && bricks[j][2] === bricks[i][5] + 1) {
                kSupportsV[i].add(j);
                vSupportsK[j].add(i);
            }
        }
    }

    return { kSupportsV, vSupportsK };
};

const overlaps = (a: number[], b: number[]): boolean =>
    max(a[0], b[0]) <= min(a[3], b[3]) && max(a[1], b[1]) <= min(a[4], b[4]);

const max = (a: number, b: number): number => (a > b ? a : b);

const min = (a: number, b: number): number => (a < b ? a : b);
