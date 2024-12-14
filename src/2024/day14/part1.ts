// Advent of Code - Day 14 - Part One

import { Robot, parseRobots, moveRobots } from './robot';

export const part1 = (input: string[], size: [number, number] = [103, 101]): number => {
    const H = size[0];
    const W = size[1];

    const robots: Robot[] = parseRobots(input);

    for (let round = 0; round < 100; round++) {
        moveRobots(robots, H, W);
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
