// Advent of Code - Day 1 - Part Two

export const part2 = (input: string[]): number => {
    const list1: number[] = [];
    const list2: number[] = [];

    input.forEach(line => {
        const [num1, num2] = line.trim().split(/\s+/).map(Number);
        list1.push(num1);
        list2.push(num2);
    });

    const countMap = new Map<number, number>();
    list2.forEach(num => {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    });

    let similarityScore = 0;
    list1.forEach(num => {
        if (countMap.has(num)) {
            similarityScore += num * countMap.get(num)!;
        }
    });

    return similarityScore;
};
