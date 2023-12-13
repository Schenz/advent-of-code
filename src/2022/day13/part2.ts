// Advent of Code - Day 13 - Part Two

import { compare } from './compare';

const calculateDecoderKey = (data: string, ...extraPackets: any): number => {
    const packets = [
        ...extraPackets,
        ...data
            .trim()
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean)
            .map((raw) => JSON.parse(raw)),
    ].sort((a, b) => {
        const result = compare(a, b);

        return result === undefined ? 0 : result ? -1 : 1;
    });

    return extraPackets.reduce(
        (product: number, packet: any) =>
            product *
            (1 +
                packets.findIndex(
                    (p) => JSON.stringify(p) === JSON.stringify(packet)
                )),
        1
    );
};

export const part2 = (input: string): number =>
    calculateDecoderKey(input, [[2]], [[6]]);
