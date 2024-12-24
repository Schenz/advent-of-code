export type GateType = 'AND' | 'OR' | 'XOR';

export interface Circuit {
    wires: Map<string, Wire>;
    gates: Gate[];
}

export interface Gate {
    type: GateType;
    input1: string;
    input2: string;
    output: string;
}

export interface Wire {
    name: string;
    value: WireValue | null;
}

export type WireValue = 0 | 1;

export const gateOperations = {
    /* eslint-disable @typescript-eslint/naming-convention */
    AND: (a: WireValue, b: WireValue): WireValue => (a && b ? 1 : 0),
    OR: (a: WireValue, b: WireValue): WireValue => (a || b ? 1 : 0),
    XOR: (a: WireValue, b: WireValue): WireValue => (a !== b ? 1 : 0),
    /* eslint-enable @typescript-eslint/naming-convention */
};
