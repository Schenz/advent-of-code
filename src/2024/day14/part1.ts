// Advent of Code - Day 14 - Part One

import { Robot } from './robot';

export const part1 = (input: string[], size: [number, number] = [103, 101]): number => {
    const H = size[0];
    const W = size[1];

    const robots: Robot[] = input.map((i) => {
        const r = /p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/.exec(i);

        if (!r) {
            throw new Error(`Invalid input format: ${i}`);
        }
        return { x: Number(r[1]), y: Number(r[2]), vX: Number(r[3]), vY: Number(r[4]) };
    });

    for (let round = 0; round < 100; round++) {
        for (const r of robots) {
            r.x = (r.x + r.vX) % W;
            r.y = (r.y + r.vY) % H;
            while (r.x < 0) {
                r.x += W;
            }
            while (r.y < 0) {
                r.y += H;
            }
        }
    }
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;
    const cW = Math.floor(W / 2);
    const cH = Math.floor(H / 2);

    for (const r of robots) {
        if (r.x < cW && r.y < cH) {
            q1++;
        }

        if (r.x > cW && r.y < cH) {
            q2++;
        }

        if (r.x < cW && r.y > cH) {
            q3++;
        }

        if (r.x > cW && r.y > cH) {
            q4++;
        }
    }
    return q1 * q2 * q3 * q4;
};
