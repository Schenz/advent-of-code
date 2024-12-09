// Advent of Code - Day 1 - Part One

export const part1 = (input: string[]): number => {
    const list1: number[] = [];
    const list2: number[] = [];

    input.forEach((line) => {
        const [num1, num2] = line.trim().split(/\s+/).map(Number);

        list1.push(num1);
        list2.push(num2);
    });

    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    return list1.reduce(
        (sum, num, index) => sum + Math.abs(num - list2[index]),
        0
    );
};
