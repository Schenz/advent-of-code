// Advent of Code - Day 1 - Part One

export const part1 = (input: string[]): number => {
    let pos = 50;
    let count = 0;

    for (const raw of input) {
        const line = raw.trim();
        if (!line) continue;

        const dir = line[0];
        const dist = Number(line.slice(1));

        if (Number.isNaN(dist)) continue;

        if (dir === 'R') {
            pos = (pos + dist) % 100;
        } else if (dir === 'L') {
            pos = ((pos - dist) % 100 + 100) % 100;
        } else {
            // unknown instruction, skip
            continue;
        }

        if (pos === 0) count++;
    }

    return count;
};
