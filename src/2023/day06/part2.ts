// Advent of Code - Day 6 - Part Two

export function part2(input: string[]): number {
    const times: number[] =
        input[0].replace(/\s+/g, '').match(/\d+/g)?.map(Number) || [];
    const distances: number[] =
        input[1].replace(/\s+/g, '').match(/\d+/g)?.map(Number) || [];
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
