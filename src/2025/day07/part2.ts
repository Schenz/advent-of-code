// Advent of Code - Day 7 - Part Two

export const part2 = (input: string[]): number => {
    const rows = input.filter((line) => line.length > 0);

    if (rows.length === 0) {
        return 0;
    }

    const start = rows[0].indexOf('S');

    if (start === -1) {
        return 0;
    }

    // Map of column -> number of timelines occupying that column in the current row.
    let beams = new Map<number, number>([[start, 1]]);

    for (let r = 1; r < rows.length && beams.size > 0; r++) {
        const row = rows[r];
        const width = row.length;

        const splitters = new Set<number>();

        for (let c = 0; c < width; c++) {
            if (row[c] === '^') {
                splitters.add(c);
            }
        }

        // If there are no splitters, beams just continue downward unchanged (dropping those out of bounds).
        if (splitters.size === 0) {
            const next = new Map<number, number>();

            for (const [col, count] of beams) {
                if (col >= 0 && col < width) {
                    next.set(col, (next.get(col) ?? 0) + count);
                }
            }

            beams = next;
            continue;
        }

        const nextBeams = new Map<number, number>();

        for (const [col, count] of beams) {
            if (col < 0 || col >= width) {
                continue; // Beam has exited the manifold.
            }

            if (splitters.has(col)) {
                const left = col - 1;
                const right = col + 1;

                if (left >= 0) {
                    nextBeams.set(left, (nextBeams.get(left) ?? 0) + count);
                }

                if (right < width) {
                    nextBeams.set(right, (nextBeams.get(right) ?? 0) + count);
                }
            } else {
                nextBeams.set(col, (nextBeams.get(col) ?? 0) + count);
            }
        }

        beams = nextBeams;
    }

    let timelines = 0;

    for (const count of beams.values()) {
        timelines += count;
    }

    return timelines;
};
