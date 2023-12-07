export const process = (data: string[][]): number => {
    data.sort(([a], [b]) => {
        const typeA = getType(a);
        const typeB = getType(b);
        if (typeB > typeA) return 1;
        if (typeB < typeA) return -1;
        if (b > a) return 1;
        if (b < a) return -1;
        return 0;
    });

    data.reverse();
    return data.reduce((acc, cur, i) => acc + +cur[1] * (i + 1), 0);
};

const getType = (deck: string): number => {
    const map: { [key: string]: number } = {};
    let jokers = 0;

    deck.split('').forEach((e) => {
        if (e === '0') jokers++;
        else if (map[e]) map[e]++;
        else map[e] = 1;
    });

    if (jokers === 5) return 9;

    const values = Object.values(map).sort((a, b) => b - a);
    values[0] = values[0] + jokers;
    if (values[0] === 5) return 9;
    if (values[0] === 4) return 8;
    if (values[0] === 3 && values[1] === 2) return 7;
    if (values[0] === 3) return 6;
    if (values[0] === 2 && values[1] === 2) return 5;
    if (values[0] === 2) return 4;
    if (values[0] === 1) return 3;

    // Handle the case where no condition is met
    return 0;
};
