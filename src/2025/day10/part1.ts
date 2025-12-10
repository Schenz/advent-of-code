// Advent of Code - Day 10 - Part One

import { solveLinearSystemGF2 } from '../../utils/matrix';
import { parseMachine } from './parse';

const solveSystem = (target: number[], buttons: number[][]): number => {
    const n = target.length; // number of lights
    const m = buttons.length; // number of buttons

    // Build coefficient matrix: each row is one light, each column is one button
    const coefficients: number[][] = [];

    for (let i = 0; i < n; i++) {
        const row: number[] = [];

        for (let j = 0; j < m; j++) {
            // Check if button j toggles light i
            row.push(buttons[j].includes(i) ? 1 : 0);
        }
        coefficients.push(row);
    }

    // Solve using GF(2) linear system solver
    const solution = solveLinearSystemGF2(coefficients, target);

    if (!solution) {
        return -1; // No solution
    }

    // Count the number of button presses
    return solution.reduce((sum, x) => sum + x, 0);
};

export const part1 = (input: string[]): number => {
    let totalPresses = 0;

    for (const line of input) {
        const machine = parseMachine(line);

        if (!machine || !machine.lightsTarget) {
            continue;
        }

        const presses = solveSystem(machine.lightsTarget, machine.buttons);

        if (presses === -1) {
            // No solution possible (shouldn't happen in valid input)
            return -1;
        }
        totalPresses += presses;
    }

    return totalPresses;
};
