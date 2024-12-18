export type Input = ReturnType<typeof parse>;

export type RegisterName = 'a' | 'b' | 'c';

export const memoryKeys: RegisterName[] = ['a', 'b', 'c'];

export const parse = (input: string): { registers: Record<RegisterName, bigint>; instructions: bigint[] } => {
    const [registers, program] = input.split('\n\n');
    const [a, b, c] = registers.split('\n').map((line) => BigInt(line.substring(12)));

    return {
        registers: { a, b, c } as Record<RegisterName, bigint>,
        instructions: program
            .substring(9)
            .split(',')
            .map((n) => BigInt(n)),
    };
};
