import * as fs from 'fs';
import { Robot, parseRobots, moveRobots } from './robot';

export const part2 = (input: string[]): number => {
    const H = 103;
    const W = 101;
    const logFile = 'output.log';

    fs.writeFileSync(logFile, ''); // Clear the log file at the start

    const robots: Robot[] = parseRobots(input);

    const toGrid = (): string[] => {
        const g = Array.from({ length: H }, () => Array.from({ length: W }, () => '.'));

        for (const r of robots) {
            g[r.y][r.x] = '#';
        }
        return g.map((row) => row.join(''));
    };

    const boundaryBox = '#'.repeat(31);

    for (let round = 0; round < 100000; round++) {
        moveRobots(robots, H, W);

        const grid = toGrid();

        if (grid.some((row) => row.includes(boundaryBox))) {
            fs.appendFileSync(logFile, `Round: ${round + 1}\n`);
            fs.appendFileSync(logFile, `${grid.join('\n')}\n\n`);
            return round + 1;
        }
    }

    return 0;
};
