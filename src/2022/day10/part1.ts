// Advent of Code - Day 10 - Part One

export const part1 = (input: string[]): number => {
    let x = 1; // Initial value of register X
    let cycle = 0; // Initial cycle count
    let signal = 0;

    input.forEach((line) => {
        const [instr, value] = line.split(' ');

        // Increment cycle for every instruction
        cycle++;
        signal = signal + calculateSignal(x, cycle);

        if (instr !== 'noop') {
            cycle++;
            signal = signal + calculateSignal(x, cycle);
            x += Number(value);
        }
    });

    return signal;
};

const calculateSignal = (x: number, cycle: number): number => {
    if (
        cycle === 20 ||
        (cycle > 20 && (cycle - 20) % 40 === 0 && cycle <= 220)
    ) {
        return x * cycle;
    }
    return 0;
};
