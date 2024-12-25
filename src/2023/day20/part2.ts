// Advent of Code - Day 20 - Part Two

/*
  Part 2 can be solved analytically by observing that there are four 12-bit counters realized by the flip-flips.
  The connections from the flip-flops to the subblock's NAND determine at which number this counter will send a
  low signal. So to solve this, we can start with a flip-flop connected to the broadcast and then continue as long
  as there is another flip-flop connected. If there is also a connection to a NAND, this flip-flop's bit counts.
  The cycle lengths are all prime, so we can just multiply them together for the final result.
*/
export const part2 = (input: string[]): number => {
    const labels: Record<string, string> = {};

    input.forEach((line) => {
        const [label] = line.split(' -> ');

        labels[label.slice(1)] = label;
    });

    const graph: Record<string, string[]> = {};

    input.forEach((line) => {
        const [src, dsts] = line.split(' -> ');
        const destinations = dsts.split(', ');

        graph[src] = destinations.map((dst) => (labels[dst] ? labels[dst] : dst));
    });

    let p2 = 1;

    for (let ff of graph['broadcaster']) {
        let b = '';

        // eslint-disable-next-line no-constant-condition
        while (true) {
            b += graph[ff].some((dst) => dst.startsWith('&')) ? '1' : '0';
            const nextFf = graph[ff].filter((dst) => dst.startsWith('%'));

            if (nextFf.length === 0) {
                break;
            }
            ff = nextFf[0];
        }
        p2 *= parseInt(b.split('').reverse().join(''), 2);
    }

    return p2;
};
