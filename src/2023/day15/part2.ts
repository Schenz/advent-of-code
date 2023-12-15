// Advent of Code - Day 15 - Part Two

import { hash } from './hash';

type Lens = {
    label: string;
    focalLength: number;
};

export const part2 = (input: string): number => {
    const commands: string[] = input.replace(/(\r\n|\n|\r)/gm, '').split(',');
    const boxes: Lens[][] = Array(256)
        .fill(null)
        .map(() => []);

    for (const command of commands) {
        if (command.endsWith('-')) {
            const label = command.slice(0, -1);
            const box = hash(label);

            boxes[box] = boxes[box].filter((lens) => lens.label !== label);
        } else {
            const [label, focalString] = command.split('=');
            const focalLength = Number(focalString);
            const box = hash(label);
            const index = boxes[box].findIndex((lens) => lens.label === label);

            if (index === -1) {
                boxes[box].push({ label, focalLength });
            } else {
                boxes[box][index].focalLength = focalLength;
            }
        }
    }

    const focusingPowers: number[] = boxes.flatMap((box, hash) =>
        box.map(
            ({ focalLength }, index) => (1 + hash) * (1 + index) * focalLength
        )
    );

    return focusingPowers.reduce((acc, val) => acc + val, 0);
};
