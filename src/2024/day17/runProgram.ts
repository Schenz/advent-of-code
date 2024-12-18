import { memoryKeys, RegisterName } from './input';
import { Input } from './input';

export const runProgram = ({
    registers,
    instructions,
}: Input): { registers: Record<RegisterName, bigint>; output: bigint[] } => {
    const output: bigint[] = [];

    for (let i = 0; i < instructions.length; ) {
        const op = instructions[i];
        const literal = instructions[i + 1];
        const combo =
            instructions[i + 1] <= 3 ? instructions[i + 1] : registers[memoryKeys[Number(instructions[i + 1]) - 4]];

        switch (op) {
            case 0n:
                registers.a = registers.a / 2n ** combo;
                break;
            case 1n:
                registers.b ^= literal;
                break;
            case 2n:
                registers.b = combo % 8n;
                break;
            case 3n:
                if (registers.a !== 0n) {
                    i = Number(literal);
                    continue;
                }
                break;
            case 4n:
                registers.b ^= registers.c;
                break;
            case 5n:
                output.push(combo % 8n);
                break;
            case 6n:
                registers.b = registers.a / 2n ** combo;
                break;
            case 7n:
                registers.c = registers.a / 2n ** combo;
                break;
        }

        i += 2;
    }
    return { registers, output };
};
