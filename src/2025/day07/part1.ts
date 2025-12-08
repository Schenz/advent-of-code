// Advent of Code - Day 7 - Part One

export const part1 = (input: string[]): number => {
    const rows = input.filter((line) => line.length > 0);

    if (rows.length === 0) {
        return 0;
    }

    const start = rows[0].indexOf('S');

    if (start === -1) {
        return 0;
    }

    let splits = 0;
    let beams = new Set<number>([start]);

    for (let r = 1; r < rows.length && beams.size > 0; r++) {
        const row = rows[r];

        // Collect splitter positions for this row.
        const splitters = new Set<number>();

        for (let c = 0; c < row.length; c++) {
            if (row[c] === '^') {
                splitters.add(c);
            }
        }

        // If no splitters, beams just continue downward unchanged (but still drop any that exit the grid).
        if (splitters.size === 0) {
            beams = new Set(Array.from(beams).filter((c) => c >= 0 && c < row.length));
            continue;
        }

        const nextBeams = new Set<number>();

        for (const beam of beams) {
            if (beam < 0 || beam >= row.length) {
                continue; // Beam has already exited the manifold.
            }

            if (splitters.has(beam)) {
                splits++;

                const left = beam - 1;
                const right = beam + 1;

                if (left >= 0) {
                    nextBeams.add(left);
                }

                if (right < row.length) {
                    nextBeams.add(right);
                }
            } else {
                nextBeams.add(beam);
            }
        }

        beams = nextBeams;
    }

    return splits;
};
