// Advent of Code - Day 19 - Part Two

// had to start over since I no longer cared about the parts in input and just need the rules to figure out all the combinations
export const part2 = (input: string): number => {
    const [left] = input.split('\n\n');

    const d: Record<string, [string | null, string][]> = {};

    for (const l of left.split('\n')) {
        const [name, constraints] = l.split('{');
        const constraintsArr = constraints.slice(0, -1).split(',');

        d[name] = constraintsArr.map((cons) => {
            if (cons.includes(':')) {
                const [ll, rr] = cons.split(':');

                return [ll, rr];
            } else {
                return [null, cons];
            }
        });
    }

    const total = (ins: string, ranges: number[][]): number => {
        let ans = 0;

        if (ins === 'R') {
            return 0;
        }

        if (ins === 'A') {
            ans = 1;
            for (const a of ranges) {
                ans *= a.length;
            }
            return ans;
        }

        const entry = d[ins];

        for (const [l, r] of entry) {
            if (l === null) {
                ans += total(r, ranges);
            } else {
                const newRanges = ranges.map((arr) => [...arr]);
                const index = 'xmas'.indexOf(l[0]);

                // Decide lambda to use
                let lambda: (x: number) => boolean;

                if (l[1] === '>') {
                    lambda = (x: number): boolean => x > parseInt(l.slice(2));
                } else {
                    lambda = (x: number): boolean => x < parseInt(l.slice(2));
                }

                // Essentially split into two sets of constraints. Ranges used in following iterations
                newRanges[index] = newRanges[index].filter(lambda);
                ranges[index] = ranges[index].filter((x) => !lambda(x));

                ans += total(r, newRanges);
            }
        }

        return ans;
    };

    return total(
        'in',
        Array.from({ length: 4 }, () => Array.from({ length: 4000 }, (_, i) => i + 1))
    );
};
