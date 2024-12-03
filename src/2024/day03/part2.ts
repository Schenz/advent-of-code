// Advent of Code - Day 3 - Part Two

export const part2 = (input: string[]): number => {
    let mulEnabled = true;

    return input.reduce((sum, line) => {
        const parts = line.split(/(do\(\)|don't\(\))/);
        
        return parts.reduce((partSum, part) => {
            if (part === "do()") {
                mulEnabled = true;
                return partSum;
            } else if (part === "don't()") {
                mulEnabled = false;
                return partSum;
            }

            if (!mulEnabled) return partSum;

            const matches = part.match(/mul\(\d+,\d+\)/g);
            if (!matches) return partSum;

            return partSum + matches.reduce((acc, match) => {
                const [a, b] = match.slice(4, -1).split(',').map(Number);
                return acc + (a * b);
            }, 0);;
        }, sum);
    }, 0);
};
