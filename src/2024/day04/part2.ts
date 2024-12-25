// Advent of Code - Day 4 - Part Two

export const part2 = (input: string[]): number => {
    let count = 0;

    for (let y = 1; y < input.length - 1; y++) {
        for (let x = 1; x < input[y].length - 1; x++) {
            if (input[y][x] === 'A') {
                let matches = 0;

                if (input[y - 1][x - 1] === 'M' && input[y + 1][x + 1] === 'S') {
                    matches++;
                }

                if (input[y + 1][x + 1] === 'M' && input[y - 1][x - 1] === 'S') {
                    matches++;
                }

                if (input[y + 1][x - 1] === 'M' && input[y - 1][x + 1] === 'S') {
                    matches++;
                }

                if (input[y - 1][x + 1] === 'M' && input[y + 1][x - 1] === 'S') {
                    matches++;
                }

                if (matches === 2) {
                    count++;
                }
            }
        }
    }

    return count;
};
