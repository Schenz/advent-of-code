// Advent of Code - Day 1 - Part Two

export const part2 = (input: string[]): number => {
    const list1: number[] = [];
    const countMap = new Map<number, number>();

    input.forEach((line) => {
        const [num1, num2] = line.trim().split(/\s+/).map(Number);

        list1.push(num1);
        countMap.set(num2, (countMap.get(num2) || 0) + 1);
    });

    return list1.reduce((similarityScore, num) => {
        const count = countMap.get(num);

        if (count !== undefined) {
            similarityScore += num * count;
        }
        return similarityScore;
    }, 0);
};
