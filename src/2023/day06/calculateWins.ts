export const calculateWins = (
    times: number[],
    distances: number[]
): number[] => {
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

    return wins;
};
