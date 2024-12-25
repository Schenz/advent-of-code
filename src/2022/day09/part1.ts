// Advent of Code - Day 9 - Part One

type Direction = 'L' | 'U' | 'R' | 'D';
type Movement = [Direction, number];
type Vector2D = [x: number, y: number];
type Rope = Vector2D[];

const ROPE_LENGTH = 2;
const rope: Rope = Array.from(Array(ROPE_LENGTH), () => [0, 0]);
const head = rope[0];
const tail = rope.at(-1) as Vector2D;
const tailPositions = new Set<string>(['0,0']);

const areTouching = (distance: Vector2D): boolean => distance.every((coordinate) => Math.abs(coordinate) <= 1);

export const part1 = (input: string[]): number => {
    input.forEach((movement) => {
        const [direction, amount] = movement.split(' ') as Movement;

        for (let i = 0; i < +amount; i++) {
            if (direction === 'L') {
                head[0]--;
            }

            if (direction === 'U') {
                head[1]++;
            }

            if (direction === 'R') {
                head[0]++;
            }

            if (direction === 'D') {
                head[1]--;
            }

            for (let j = 1; j < ROPE_LENGTH; j++) {
                const knot = rope[j];
                const prev = rope[rope.indexOf(knot) - 1];
                const distance: Vector2D = [knot[0] - prev[0], knot[1] - prev[1]];

                if (areTouching(distance)) {
                    continue;
                }

                knot[0] -= Math.sign(distance[0]);
                knot[1] -= Math.sign(distance[1]);

                if (knot === tail) {
                    tailPositions.add(knot.join(','));
                }
            }
        }
    });

    return tailPositions.size;
};
