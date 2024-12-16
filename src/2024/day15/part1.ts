// Advent of Code - Day 15 - Part One

export const part1 = (input: string): number => {
    const [a, b] = input.split('\n\n');
    const ll = a.split('\n');
    const moves = b;
    let moveTuples: [number, number][] = [];

    // Helper function to add two tuples
    const addt = (x: [number, number], y: [number, number]): [number, number] => {
        if (x.length === 2) {
            return [x[0] + y[0], x[1] + y[1]];
        }
        return x.map((v, i) => v + y[i]) as [number, number];
    };

    const DIRS: [number, number][] = [
        [0, 1], // Right
        [0, -1], // Left
        [1, 0], // Down
        [-1, 0], // Up
    ];
    const D = ['>', '<', 'v', '^'];

    moveTuples = moves
        .replace(/\n/g, '')
        .split('')
        .map((m) => DIRS[D.indexOf(m)]);

    const walls = new Set<string>();
    const boxes = new Set<string>();
    let robot: [number, number] | undefined;

    // Parsing the grid and initializing walls, boxes, and robot position
    ll.forEach((line, i) => {
        for (let j = 0; j < line.length; j++) {
            const ch = line[j];

            if (ch === '#') {
                walls.add(`${i},${j}`);
            }

            if (ch === 'O') {
                boxes.add(`${i},${j}`);
            }

            if (ch === '@') {
                robot = [i, j];
            }
        }
    });

    if (!robot) {
        throw new Error('Robot position not found in input.');
    }

    // Function to push a box in a given direction
    const push = (box: [number, number], d: [number, number]): boolean => {
        const nxt = addt(box, d);
        const nxtKey = `${nxt[0]},${nxt[1]}`;
        const boxKey = `${box[0]},${box[1]}`;

        if (walls.has(nxtKey)) {
            return false;
        }

        if (boxes.has(nxtKey)) {
            if (!push(nxt, d)) {
                return false;
            }
        }
        boxes.delete(boxKey);
        boxes.add(nxtKey);
        return true;
    };

    moveTuples.forEach((move) => {
        if (!robot) {
            return;
        }
        const nxt = addt(robot, move);
        const nxtKey = `${nxt[0]},${nxt[1]}`;

        if (walls.has(nxtKey)) {
            return;
        }

        if (boxes.has(nxtKey)) {
            if (!push(nxt, move)) {
                return;
            }
        }

        if (!boxes.has(nxtKey)) {
            robot = nxt;
        }
    });

    // Calculating the final result
    let c = 0;

    boxes.forEach((box) => {
        const [x, y] = box.split(',').map(Number);

        c += 100 * x + y;
    });

    return c;
};
