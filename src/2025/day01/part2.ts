// Advent of Code - Day 1 - Part Two

export const part2 = (input: string[]): number => {
    let pos = 50;
    let count = 0;

    for (const raw of input) {
        const line = raw.trim();
        if (!line) continue;

        const dir = line[0];
        const dist = Number(line.slice(1));
        if (Number.isNaN(dist)) continue;

        const s = ((pos % 100) + 100) % 100;

        // For right rotations, we hit 0 when k ≡ (100 - s) mod 100
        // For left rotations, we hit 0 when k ≡ s mod 100
        let firstK = 0;
        if (dir === 'R') {
            firstK = (100 - s) % 100;
            if (firstK === 0) firstK = 100;
        } else if (dir === 'L') {
            firstK = s % 100;
            if (firstK === 0) firstK = 100;
        } else {
            continue;
        }

        if (dist >= firstK) {
            count += 1 + Math.floor((dist - firstK) / 100);
        }

        // advance to final position
        if (dir === 'R') {
            pos = (pos + dist) % 100;
        } else {
            pos = ((pos - dist) % 100 + 100) % 100;
        }
    }

    return count;
};
