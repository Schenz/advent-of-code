// Advent of Code - Day 6 - Part One

type Direction = '^' | 'v' | '<' | '>';

const directions: Record<Direction, [number, number]> = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1],
};

const turnRight = (direction: Direction): Direction => {
    const order: Direction[] = ['^', '>', 'v', '<'];
    const idx = order.indexOf(direction);
    return order[(idx + 1) % 4];
};

export const part1 = (input: string[]): number => {
    const rows = input.length;
    const cols = input[0].length;
    let guardPos: [number, number] | null = null;
    let guardDir: Direction | null = null;

    // Find the guard's initial position and direction
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (['^', 'v', '<', '>'].includes(input[r][c])) {
                guardPos = [r, c];
                guardDir = input[r][c] as Direction;
                break;
            }
        }
        if (guardPos) break;
    }

    if (!guardPos || !guardDir) throw new Error('Guard not found in input');

    const visited = new Set<string>();
    visited.add(`${guardPos[0]},${guardPos[1]}`); // Record the starting position

    while (true) {
        const [dr, dc] = directions[guardDir];
        const nextPos: [number, number] = [guardPos[0] + dr, guardPos[1] + dc];

        // Check if the guard has left the grid
        if (
            nextPos[0] < 0 ||
            nextPos[0] >= rows ||
            nextPos[1] < 0 ||
            nextPos[1] >= cols
        ) {
            break; // Exit the loop if the guard leaves the grid
        }

        // Check if the next position is blocked
        if (input[nextPos[0]][nextPos[1]] === '#') {
            guardDir = turnRight(guardDir); // Turn right if blocked
        } else {
            // Move forward
            guardPos = nextPos;
            visited.add(`${guardPos[0]},${guardPos[1]}`); // Record the position
        }
    }

    return visited.size; // Return the count of distinct visited positions
};
