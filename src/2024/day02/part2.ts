// Advent of Code - Day 2 - Part Two

const isValidReport = (report: number[]): boolean => {
    const isValid = (arr: number[]): boolean =>
        arr.every(
            (val, i) =>
                i === 0 ||
                (arr[i - 1] <= val &&
                    val - arr[i - 1] <= 3 &&
                    val - arr[i - 1] >= 1)
        ) ||
        arr.every(
            (val, i) =>
                i === 0 ||
                (arr[i - 1] >= val &&
                    arr[i - 1] - val <= 3 &&
                    arr[i - 1] - val >= 1)
        );

    if (isValid(report)) {
        return true;
    }

    for (let i = 0; i < report.length; i++) {
        if (isValid(report.slice(0, i).concat(report.slice(i + 1)))) {
            return true;
        }
    }

    return false;
};

export const part2 = (input: string[]): number =>
    input.reduce((count, line) => {
        if (isValidReport(line.trim().split(/\s+/).map(Number))) {
            return count + 1;
        }
        return count;
    }, 0);
