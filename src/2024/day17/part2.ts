import { Input } from './input';
import { runProgram } from './runProgram';

export const part2 = (input: Input): bigint => {
    const { registers, instructions } = input;
    const possibilities: bigint[] = [];

    // Find all 10-bit numbers that produce the first output
    for (let aCandidate = 0n; aCandidate < 1n << 10n; aCandidate++) {
        registers.a = aCandidate;
        registers.b = 0n;
        registers.c = 0n;

        const result = runProgram({
            registers: { ...registers },
            instructions,
        }).output;

        if (result[0] === instructions[0]) {
            possibilities.push(aCandidate);
        }
    }

    // Iteratively find longer possible numbers that produce the first offset+1 numbers of the program
    for (let offset = 1; offset < instructions.length; offset++) {
        const newPossibilities: bigint[] = [];

        for (const initial of possibilities) {
            for (let firstThree = 0n; firstThree < 8n; firstThree++) {
                const leftShift = 10n + 3n * BigInt(offset - 1);
                const aCandidate = initial + (firstThree << leftShift);

                registers.a = aCandidate;
                registers.b = 0n;
                registers.c = 0n;

                const result = runProgram({
                    registers: { ...registers },
                    instructions,
                }).output;

                let isPossible: boolean;

                if (offset < instructions.length - 1) {
                    isPossible = result.length > offset && result[offset] === instructions[offset];
                } else {
                    isPossible = result.length === instructions.length && result[offset] === instructions[offset];
                }

                if (isPossible) {
                    newPossibilities.push(aCandidate);
                }
            }
        }

        possibilities.length = 0;
        possibilities.push(...newPossibilities);
    }

    possibilities.sort((a, b) => (a < b ? -1 : 1));
    return possibilities.length > 0 ? possibilities[0] : 0n;
};
