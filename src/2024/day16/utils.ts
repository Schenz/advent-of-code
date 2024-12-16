import { PriorityQueue } from './PriorityQueue';

export type ProcessInputResult = {
    optimalScore: number;
    stops: Record<string, boolean>;
};

export const createKey = (y: number, x: number, dy: number, dx: number): string => `${y},${x},${dy},${dx}`;

export const enqueue = (
    pq: PriorityQueue<[number, number, number, number, number]>,
    queued: Record<string, [number, [number, number, number, number, number][]]>,
    steps: number,
    y: number,
    x: number,
    dy: number,
    dx: number,
    history: [number, number, number, number, number]
): void => {
    const k = createKey(y, x, dy, dx);

    if (!queued[k] || steps < queued[k][0]) {
        queued[k] = [steps, [history]];
        pq.push([steps, y, x, dy, dx]);
    } else if (steps === queued[k][0]) {
        queued[k][1].push(history);
    }
};

export const navigate = (
    queued: Record<string, [number, [number, number, number, number, number][]]>,
    visited: Record<string, boolean>,
    stops: Record<string, boolean>,
    y: number,
    x: number,
    dy: number,
    dx: number
): void => {
    const k = createKey(y, x, dy, dx);

    if (visited[k]) {
        return;
    }
    visited[k] = true;
    stops[`${y},${x}`] = true;

    for (const L of queued[k][1]) {
        navigate(queued, visited, stops, L[1], L[2], L[3], L[4]);
    }
};

export const processInput = (input: string[]): ProcessInputResult => {
    let ret1 = Infinity;
    const pq = new PriorityQueue<[number, number, number, number, number]>((a: number[], b: number[]) => b[0] - a[0]);

    pq.push([0, input.length - 2, 1, 0, 1]);

    const queued: Record<string, [number, [number, number, number, number, number][]]> = {};
    const key = createKey;

    queued[key(input.length - 2, 1, 0, 1)] = [0, []];

    while (pq.top()) {
        const current = pq.pop();

        if (!current) {
            break;
        }

        const [steps, y, x, dy, dx] = current;

        if (steps > ret1) {
            break;
        }

        if (input[y][x] === 'E') {
            ret1 = steps;
        }

        const k = key(y, x, dy, dx);

        if (queued[k] && steps > queued[k][0]) {
            continue;
        }

        if (input[y + dy][x + dx] !== '#') {
            enqueue(pq, queued, steps + 1, y + dy, x + dx, dy, dx, [steps, y, x, dy, dx]);
        }
        enqueue(pq, queued, steps + 1000, y, x, -dx, dy, [steps, y, x, dy, dx]);
        enqueue(pq, queued, steps + 1000, y, x, dx, -dy, [steps, y, x, dy, dx]);
    }

    const stops: Record<string, boolean> = {};
    const visited: Record<string, boolean> = {};

    navigate(queued, visited, stops, 1, input[0].length - 2, 0, -1);

    return { optimalScore: ret1, stops };
};
