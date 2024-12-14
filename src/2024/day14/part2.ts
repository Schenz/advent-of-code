import * as fs from 'fs';
import { Robot } from './robot';

export const part2 = (input: string[]): number => {
    const H = 103;
    const W = 101;
    const logFile = 'output.log';

    fs.writeFileSync(logFile, ''); // Clear the log file at the start

    const robots: Robot[] = input.map((i) => {
        const r = /p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/.exec(i);

        if (!r) {
            throw new Error(`Invalid input format: ${i}`);
        }
        return { x: Number(r[1]), y: Number(r[2]), vX: Number(r[3]), vY: Number(r[4]) };
    });

    const toGrid = (): void => {
        const g = Array.from({ length: H }, () => Array.from({ length: W }, () => '.'));

        for (const r of robots) {
            g[r.y][r.x] = '#';
        }
        const gridString = g.map((row) => row.join('')).join('\n');

        fs.appendFileSync(logFile, `${gridString}\n\n`);
    };

    for (let round = 0; round < 100000; round++) {
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

        fs.appendFileSync(logFile, `Round: ${round + 1}\n`);
        toGrid();
    }

    return 0;
};
