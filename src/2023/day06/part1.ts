// Advent of Code - Day 6 - Part One

export function part1(input: string[]): number {
    const times: number[] = input[0]
        .split(' ')
        .filter((x) => !isNaN(+x) && x !== '')
        .map((x) => +x);
    const distances: number[] = input[1]
        .split(' ')
        .filter((x) => !isNaN(+x) && x !== '')
        .map((x) => +x);
    const wins: number[] = [];

    for (let i = 0; i < times.length; i++) {
        const [duration, record]: [number, number] = [times[i], distances[i]];
        let raceWins = 0;
        for (let j = 0; j < duration; j++) {
            if ((duration - j) * j > record) {
                raceWins++;
            }
        }
        wins.push(raceWins);
    }

    return wins.reduce((acc, win) => acc * win);
}
