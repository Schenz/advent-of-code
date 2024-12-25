// Advent of Code - Day 11 - Part One

import { Monkey } from './Monkey';

export const part1 = (
    monkeys: Monkey[],
    rounds: number,
    manageFrustration: (frustration: number) => number
): number => {
    for (let r = 0; r < rounds; r++) {
        for (const monkey of monkeys) {
            while (monkey.items.length) {
                monkey.inspected++;

                const newWorry = manageFrustration(
                    eval(monkey.operation.replace(/old/g, (monkey.items.shift() ?? '').toString()))
                );
                const newMonkeyIndex = newWorry % monkey.test === 0 ? monkey.trueMonkey : monkey.falseMonkey;

                monkeys[newMonkeyIndex].items.push(newWorry);
            }
        }
    }
    return monkeys
        .sort((a, b) => b.inspected - a.inspected)
        .slice(0, 2)
        .reduce((a, b) => a * b.inspected, 1);
};
