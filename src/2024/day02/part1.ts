// Advent of Code - Day 2 - Part One

export const part1 = (input: string[]): number => input.reduce((count, line) => {
    const report = line.trim().split(/\s+/).map(Number);
    const isAscending = report.every((val, i, arr) => i === 0 || (arr[i - 1] <= val && val - arr[i - 1] <= 3 && val - arr[i - 1] >= 1));
    const isDescending = report.every((val, i, arr) => i === 0 || (arr[i - 1] >= val && arr[i - 1] - val <= 3 && arr[i - 1] - val >= 1));
    if (isAscending || isDescending) {
        return count + 1;
    }
    return count;
}, 0);
