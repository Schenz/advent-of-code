// Advent of Code - Day 24 - Part Two

import { parseCircuit } from './parseCircuit';
import { Circuit, GateType } from './types';

export const part2 = (input: string): string => {
    const circuit = parseCircuit(input);
    const swappedWires = identifySwappedWires(circuit);

    return swappedWires.sort().join(',');
};

const identifySwappedWires = (circuit: Circuit): string[] => {
    const swappedWires: string[] = [];
    let cin = findGateOutput(circuit, 'x00', 'AND', 'y00');

    if (!cin) {
        throw new Error('Unable to find initial input');
    }

    for (let i = 1; i < 45; i++) {
        const x = `x${i.toString().padStart(2, '0')}`;
        const y = `y${i.toString().padStart(2, '0')}`;
        const z = `z${i.toString().padStart(2, '0')}`;

        const xor1 = findGateOutput(circuit, x, 'XOR', y);
        const and1 = findGateOutput(circuit, x, 'AND', y);

        if (!xor1 || !and1) {
            throw new Error(`Circuit does not implement a full adder - missing XOR or AND gate for ${x} and ${y}`);
        }

        const xor2 = findGateOutput(circuit, cin, 'XOR', xor1);
        const and2 = findGateOutput(circuit, cin, 'AND', xor1);

        if (!xor2 && !and2) {
            return swapAndIdentify(circuit, xor1, and1);
        }

        if (xor2 && xor2 !== z) {
            return swapAndIdentify(circuit, z, xor2);
        } else {
            if (!and2) {
                throw new Error(`Circuit does not implement a full adder - missing AND gate for ${cin} and ${xor1}`);
            }
            cin = findGateOutput(circuit, and1, 'OR', and2);

            if (!cin) {
                throw new Error(`Circuit does not implement a full adder - missing OR gate for ${and1} and ${and2}`);
            }
        }
    }
    return swappedWires;
};

const findGateOutput = (circuit: Circuit, x: string, operation: GateType, y: string): string | undefined => {
    for (const gate of circuit.gates) {
        if (
            (gate.input1 === x && gate.type === operation && gate.input2 === y) ||
            (gate.input1 === y && gate.type === operation && gate.input2 === x)
        ) {
            return gate.output;
        }
    }
    return undefined;
};

const swapAndIdentify = (circuit: Circuit, out1: string, out2: string): string[] => {
    const temp = circuit.gates.find((g) => g.output === out1);
    const gate2 = circuit.gates.find((g) => g.output === out2);

    if (temp && gate2) {
        temp.output = out2;
        gate2.output = out1;
    }
    return identifySwappedWires(circuit).concat([out1, out2]);
};
