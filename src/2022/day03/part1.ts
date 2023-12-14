/* eslint-disable @typescript-eslint/naming-convention */
// Advent of Code - Day 3 - Part One

export const part1 = (input: string[]): number => {
    let total = 0;

    input.forEach((value) => {
        // get two sacks
        const split = value.length / 2;
        const sack1 = value.substring(0, split);
        const sack2 = value.substring(split);

        //find common
        let found = false;

        sack1.split('').forEach((letter1) => {
            sack2.split('').forEach((letter2) => {
                if (!found) {
                    if (letter1 === letter2) {
                        found = true;

                        //get letter score
                        const score =
                            Object.keys(Letters)[
                                Object.values(Letters).indexOf(
                                    letter1 as unknown as Letters
                                )
                            ];

                        total += Number(score);
                    }
                }
            });
        });
    });

    return total;
};

export enum Letters {
    a = 1,
    b = 2,
    c = 3,
    d = 4,
    e = 5,
    f = 6,
    g = 7,
    h = 8,
    i = 9,
    j = 10,
    k = 11,
    l = 12,
    m = 13,
    n = 14,
    o = 15,
    p = 16,
    q = 17,
    r = 18,
    s = 19,
    t = 20,
    u = 21,
    v = 22,
    w = 23,
    x = 24,
    y = 25,
    z = 26,
    A = 27,
    B = 28,
    C = 29,
    D = 30,
    E = 31,
    F = 32,
    G = 33,
    H = 34,
    I = 35,
    J = 36,
    K = 37,
    L = 38,
    M = 39,
    N = 40,
    O = 41,
    P = 42,
    Q = 43,
    R = 44,
    S = 45,
    T = 46,
    U = 47,
    V = 48,
    W = 49,
    X = 50,
    Y = 51,
    Z = 52,
}
