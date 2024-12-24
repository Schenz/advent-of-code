// Advent of Code - Day 24 - Part One

import { parseCircuit } from './parseCircuit';
import { Circuit, gateOperations } from './types';

export const part1 = (input: string): number => {
    const circuit = parseCircuit(input);
    const result = simulateCircuit(circuit);

    return result;
};

const simulateCircuit = (circuit: Circuit): number => {
    const { wires, gates } = circuit;

    let changed = true;

    while (changed) {
        changed = false;

        for (const gate of gates) {
            const input1 = wires.get(gate.input1)?.value;
            const input2 = wires.get(gate.input2)?.value;
            const output = wires.get(gate.output);

            // Skip if we don't have both inputs yet or output is undefined
            if (
                input1 === undefined ||
                input1 === null ||
                input2 === undefined ||
                input2 === null ||
                output === undefined
            ) {
                continue;
            }

            // Calculate new output
            const newValue = gateOperations[gate.type](input1, input2);

            // Update if changed
            if (output.value !== newValue) {
                output.value = newValue;
                changed = true;
            }
        }
    }

    // Collect z-wires in order and convert to decimal
    const zWires = Array.from(wires.entries())
        .filter(([name]) => name.startsWith('z'))
        .sort(([a], [b]) => {
            // Extract the number from the wire name (z00 -> 0, z01 -> 1, etc.)
            const numA = parseInt(a.slice(1));
            const numB = parseInt(b.slice(1));
            // Sort in descending order (most significant bit first)

            return numB - numA;
        })
        .map(([, wire]) => wire.value);

    // Convert binary array to decimal
    return parseInt(zWires.join(''), 2);
};
