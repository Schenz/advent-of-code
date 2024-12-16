// Advent of Code - Day 15 - Part Two

export const part2 = (input: string): number => {
    const [a, b] = input.split('\n\n');
    const ll = a.split('\n');
    let moves = b;
    let moveTuples: [number, number][] = [];

    // Helper function to add two tuples
    const addt = (x: [number, number], y: [number, number]): [number, number] => {
        if (x.length === 2) {
            return [x[0] + y[0], x[1] + y[1]];
        }
        return x.map((v, i) => v + y[i]) as [number, number];
    }

    const DIRS: [number, number][] = [
        [0, 1],  // Right
        [0, -1], // Left
        [1, 0],  // Down
        [-1, 0]  // Up
    ];
    const D = ['>', '<', 'v', '^'];

    moveTuples = moves.replace(/\n/g, '').split('').map((m) => DIRS[D.indexOf(m)]);

    let walls = new Set<string>();
    let boxes = new Set<string>();
    let robot: [number, number] | undefined;

    // Helper functions
    const left = (pos: [number, number]): [number, number] => {
        return [pos[0], pos[1] - 1];
    }

    const right = (pos: [number, number]): [number, number] => {
        return [pos[0], pos[1] + 1];
    }

    // Parsing the grid and initializing walls, boxes, and robot position
    ll.forEach((line, i) => {
        for (let j = 0; j < line.length; j++) {
            const ch = line[j];
            const col = j * 2;

            if (ch === '#') {
                walls.add(`${i},${col}`);
                walls.add(`${i},${col + 1}`);
            }
            if (ch === 'O') {
                boxes.add(`${i},${col}`);
            }
            if (ch === '@') {
                robot = [i, col];
            }
        }
    });

    if (!robot) {
        throw new Error("Robot position not found in input.");
    }

    // Function to push a box in a given direction
    const push = (box: [number, number], d: [number, number]): boolean | null => {
        const boxKey = `${box[0]},${box[1]}`;
        if (!boxes.has(boxKey)) {
            throw new Error("Box not found in boxes set.");
        }

        const nxt = addt(box, d);
        const nxtKey = `${nxt[0]},${nxt[1]}`;

        if (walls.has(nxtKey) || walls.has(`${nxt[0]},${nxt[1] + 1}`)) {
            return null;
        }

        if (d[0] !== 0) { // Moving up or down
            if (boxes.has(nxtKey)) {
                if (push(nxt, d) === null) {
                    return null;
                }
            }
            if (boxes.has(`${nxt[0]},${nxt[1] - 1}`)) {
                if (push(left(nxt), d) === null) {
                    return null;
                }
            }
            if (boxes.has(`${nxt[0]},${nxt[1] + 1}`)) {
                if (push(right(nxt), d) === null) {
                    return null;
                }
            }
        } else if (d[1] === 1) { // Pushing right
            if (boxes.has(`${nxt[0]},${nxt[1] + 1}`)) {
                if (push(right(nxt), d) === null) {
                    return null;
                }
            }
        } else if (d[1] === -1) { // Pushing left
            if (boxes.has(`${nxt[0]},${nxt[1] - 1}`)) {
                if (push(left(nxt), d) === null) {
                    return null;
                }
            }
        }

        boxes.delete(boxKey);
        boxes.add(nxtKey);
        return true;
    }

    // Simulating the moves
    moveTuples.forEach((move) => {
        boxes.forEach((box) => {
            const [x, y] = box.split(',').map(Number);
            if (walls.has(`${x},${y + 1}`) || boxes.has(`${x},${y + 1}`)) {
                throw new Error("Invalid configuration: overlapping boxes or walls.");
            }
        });

        const nxt = addt(robot!, move);
        const nxtKey = `${nxt[0]},${nxt[1]}`;

        if (walls.has(nxtKey)) {
            return;
        }

        if (boxes.has(nxtKey)) {
            const copy = new Set(boxes);
            if (push(nxt, move) === null) {
                boxes = copy;
                return;
            }
        } else if (boxes.has(`${nxt[0]},${nxt[1] - 1}`)) {
            const copy = new Set(boxes);
            if (push(left(nxt), move) === null) {
                boxes = copy;
                return;
            }
        }

        if (!boxes.has(nxtKey) && !boxes.has(`${nxt[0]},${nxt[1] - 1}`)) {
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
