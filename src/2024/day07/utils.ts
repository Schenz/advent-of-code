// Advent of Code - Day 7 - Utilities

export const isPossibleCombination = (
    target: number,
    numbers: number[],
    operators: string[]
): boolean => {
    const n = numbers.length;

    const evaluate = (ops: string[]): number => {
        let result = numbers[0];

        for (let i = 1; i < n; i++) {
            if (ops[i - 1] === '+') {
                result += numbers[i];
            } else if (ops[i - 1] === '*') {
                result *= numbers[i];
            } else if (ops[i - 1] === '||') {
                result = parseInt(result.toString() + numbers[i].toString());
            }
        }
        return result;
    };

    const generateCombinations = (index: number, ops: string[]): boolean => {
        if (index === n - 1) {
            return evaluate(ops) === target;
        }

        for (const op of operators) {
            ops[index] = op;

            if (generateCombinations(index + 1, ops)) {
                return true;
            }
        }

        return false;
    };

    return generateCombinations(0, new Array(n - 1).fill(''));
};
