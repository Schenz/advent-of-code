// Advent of Code - Day 20 - Part One

interface NodeInfo {
    type: string | null;
    destinations: string[];
}

type PulseState = boolean | Record<string, boolean>;

type PulseTodo = [string | null, string, boolean][];

export const part1 = (input: string): number => {
    const data = parseInput(input);

    let numLow = 0;
    let numHigh = 0;
    const memory: Record<string, PulseState> = {};

    const inputMap: Map<string, string[]> = new Map<string, string[]>();

    for (const [node, { destinations }] of Object.entries(data)) {
        for (const d of destinations) {
            if (inputMap.has(d)) {
                // If the key exists, get the array and push the node
                const nodes = inputMap.get(d) as string[];

                nodes.push(node);
            } else {
                // If the key doesn't exist, create a new array with the node and set it in the map
                inputMap.set(d, [node]);
            }
        }
    }

    for (const [node, { type }] of Object.entries(data)) {
        if (!type) {
            continue;
        }

        if (type === '%') {
            memory[node] = false;
        }

        if (type === '&') {
            const destArray = inputMap.get(node);

            if (destArray) {
                // If the node is in the inputMap, create an object with destinations set to false
                const destinationObject = Object.fromEntries(
                    destArray.map((d) => [d, false])
                );

                // Set the created object in the memory
                memory[node] = destinationObject;
            }
        }
    }

    for (let _ = 0; _ < 1000; _++) {
        let todo: PulseTodo = [[null, 'broadcaster', false]];

        while (todo.length > 0) {
            const newTodo: PulseTodo = [];

            for (const [src, node, isHighPulse] of todo) {
                if (isHighPulse) {
                    numHigh++;
                } else {
                    numLow++;
                }

                const info = data[node];

                if (!info) {
                    continue;
                }

                const { type, destinations } = info;

                if (type === '%') {
                    if (isHighPulse) {
                        continue;
                    }

                    const state = memory[node] as boolean;

                    memory[node] = !state;

                    for (const d of destinations) {
                        newTodo.push([node, d, !state]);
                    }

                    continue;
                }

                if (type === '&') {
                    const state = memory[node] as Record<string, boolean>;

                    state[src as string] = isHighPulse;

                    const allHigh = Object.values(state).every((val) => val);
                    const toSend = allHigh ? false : true;

                    for (const d of destinations) {
                        newTodo.push([node, d, toSend]);
                    }

                    continue;
                }

                if (!type) {
                    for (const d of destinations) {
                        newTodo.push([node, d, isHighPulse]);
                    }

                    continue;
                }

                throw new Error('Invalid type.');
            }

            todo = newTodo;
        }
    }

    const answer = numLow * numHigh;

    return answer;
};

const parseInput = (s: string): Record<string, NodeInfo> => {
    const m: Record<string, NodeInfo> = {};

    for (const line of s.split('\n')) {
        const [a, b] = line.split(' -> ');
        const dests = b.split(', ');

        let t: string | null;
        let nodeName: string;

        if (a === 'broadcaster') {
            t = null;
            nodeName = a;
        } else {
            t = a[0];
            nodeName = a.slice(1);
        }

        if (m[nodeName]) {
            throw new Error(`${nodeName} already exists in the map.`);
        }

        m[nodeName] = { type: t, destinations: dests };
    }

    return m;
};
