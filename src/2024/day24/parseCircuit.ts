import { Circuit, Gate, GateType, Wire, WireValue } from './types';

// Parse the circuit definition
export const parseCircuit = (input: string): Circuit => {
    const lines = input.trim().split('\n');
    const wires = new Map<string, Wire>();
    const gates: Gate[] = [];

    // Parse initial wire values
    let i = 0;

    while (i < lines.length && lines[i].includes(':')) {
        const [name, valueStr] = lines[i].split(':').map((s) => s.trim());

        wires.set(name, { name, value: parseInt(valueStr) as WireValue });
        i++;
    }

    // Skip empty lines
    while (i < lines.length && lines[i].trim() === '') {
        i++;
    }

    // Parse gates
    while (i < lines.length) {
        const line = lines[i].trim();

        if (line === '') {
            i++;
            continue;
        }

        const [gateStr, output] = line.split('->').map((s) => s.trim());
        const [input1, type, input2] = gateStr.split(' ');

        // Ensure output wire exists
        if (!wires.has(output)) {
            wires.set(output, { name: output, value: null });
        }

        gates.push({
            type: type as GateType,
            input1,
            input2,
            output,
        });

        i++;
    }

    return { wires, gates };
};
