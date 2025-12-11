// Advent of Code - Day 10 - Part Two
/*
Part 2: Find the minimum total button presses to reach exact joltage target values for each machine.

Approach:
  1. Parse button wiring schematics and target joltage levels from each machine.
  2. Build a coefficient matrix where entry (i,j) = 1 if button j affects counter i, else 0.
  3. For each machine, encode the system as an Integer Linear Program (ILP):
     - Variables: button press counts (non-negative integers)
     - Constraints: sum of button effects for each counter equals the target
     - Objective: minimize the total number of presses
  4. Use the z3 SMT solver to find the minimum solution via binary search.
  5. Sum the minimum presses across all machines.

This guarantees the true minimum for each machine, regardless of system complexity.
*/

import { parseMachine } from './parse';
import { init } from 'z3-solver';

const solveSystem = async (ctx: any, targets: number[], buttons: number[][]): Promise<number> => {
    const n = targets.length;
    const m = buttons.length;
    const { Int: z3Int, Solver: z3Solver } = ctx;

    // Build coefficient matrix
    const coefficients: number[][] = [];

    for (let i = 0; i < n; i++) {
        const row: number[] = [];

        for (let j = 0; j < m; j++) {
            row.push(buttons[j].includes(i) ? 1 : 0);
        }
        coefficients.push(row);
    }

    const solver = new z3Solver();
    const x = Array.from({ length: m }, (_, j) => z3Int.const(`x_${j}`));

    // x_j >= 0
    for (let j = 0; j < m; j++) {
        solver.add(x[j].ge(z3Int.val(0)));
    }

    // sum(button_effects * presses) == target for each counter
    for (let i = 0; i < n; i++) {
        let expr = z3Int.val(0);

        for (let j = 0; j < m; j++) {
            if (coefficients[i][j] !== 0) {
                expr = expr.add(x[j].mul(z3Int.val(coefficients[i][j])));
            }
        }
        solver.add(expr.eq(z3Int.val(targets[i])));
    }

    // Minimize total presses using binary search
    let totalPresses = z3Int.val(0);

    for (let j = 0; j < m; j++) {
        totalPresses = totalPresses.add(x[j]);
    }

    // Find an upper bound
    solver.push();
    solver.add(totalPresses.le(z3Int.val(1000000)));
    let result = await solver.check();

    if (result !== 'sat') {
        solver.pop();
        return -1;
    }
    let model = solver.model();
    let upper = Number(model.eval(totalPresses).value());

    solver.pop();

    // Binary search for the minimum
    let low = 0,
        best = upper;

    while (low <= upper) {
        const mid = Math.floor((low + upper) / 2);

        solver.push();
        solver.add(totalPresses.le(z3Int.val(mid)));
        result = await solver.check();

        if (result === 'sat') {
            best = mid;
            upper = mid - 1;
        } else {
            low = mid + 1;
        }
        solver.pop();
    }

    // Get the model for the best solution
    solver.add(totalPresses.eq(z3Int.val(best)));
    result = await solver.check();

    if (result !== 'sat') {
        return -1;
    }
    model = solver.model();
    let sumPresses = 0;

    for (let j = 0; j < m; j++) {
        sumPresses += Number(model.eval(x[j]).value());
    }
    return sumPresses;
};

export const part2 = async (input: string[]): Promise<number> => {
    const z3 = await init();
    let totalPresses = 0;

    for (const line of input) {
        const machine = parseMachine(line);

        if (!machine || !machine.joltageTarget) {
            continue;
        }

        const presses = await solveSystem(z3.Context('main'), machine.joltageTarget, machine.buttons);

        if (presses === -1) {
            continue;
        }
        totalPresses += presses;
    }
    return totalPresses;
};
