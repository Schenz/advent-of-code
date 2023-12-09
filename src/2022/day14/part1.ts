// Advent of Code - Day 14 - Part One

import { nextPos } from '../../utils/dijkstra/nextPos';
import { Position } from '../../utils/dijkstra/Position';

export const part1 = (file: string): number => {
    const spawnPos = [500, 0] as Position;
    const maxDist = 1000;

    const input = file.split('\n').filter((l) => l.length > 0);

    const paths = input.flatMap((inp) => {
        const lines = inp.split(' -> ');
        const points: Position[] = lines.map(
            (l) => l.split(',').map(Number) as Position
        );

        return points.reduce(
            (tally: Position[], curr: Position, idx: number): Position[] => {
                if (idx < 1) return tally;
                const prev = points[idx - 1];
                if (curr[0] === prev[0]) {
                    const howMany = Math.abs(curr[1] - prev[1]) + 1;
                    return [
                        ...tally,
                        ...(Array.from(
                            { length: howMany },
                            (_, i) => i + Math.min(curr[1], prev[1])
                        ).map((a) => [curr[0], a]) as Position[]),
                    ];
                } else {
                    const howMany = Math.abs(curr[0] - prev[0]) + 1;
                    return [
                        ...tally,
                        ...(Array.from(
                            { length: howMany },
                            (_, i) => i + Math.min(curr[0], prev[0])
                        ).map((a) => [a, curr[1]]) as Position[]),
                    ];
                }
            },
            []
        );
    });

    const blocked = new Set(paths.map((p) => p.toString()));
    const sand = new Set();

    let falling = true;
    do {
        let sandPos = spawnPos;
        let distanceFallen = 0;
        while (
            nextPos(sandPos, blocked) !== 'stop' &&
            distanceFallen < maxDist
        ) {
            sandPos = nextPos(sandPos, blocked) as Position;
            distanceFallen++;
        }
        blocked.add(sandPos.toString());
        sand.add(sandPos.toString());
        falling = distanceFallen !== maxDist;
    } while (falling);

    return sand.size - 1;
};
