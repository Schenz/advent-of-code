/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const checkSpringsMemo = (
    s: string,
    withinRun: number | null,
    remain: number[],
    memo: Map<string, number>
): number => {
    const memoKey = `${s}-${withinRun}-${remain.join(',')}`;

    if (memo.has(memoKey)) {
        return memo.get(memoKey)!;
    }

    const result = checkSprings(s, withinRun, remain, memo);
    memo.set(memoKey, result);

    return result;
};

const checkSprings = (
    s: string,
    withinRun: number | null,
    remain: number[],
    memo: Map<string, number>
): number => {
    if (!s) {
        if (isValidState(withinRun, remain)) {
            return 1;
        }
        return 0;
    }

    const possibleMore = countSpecialChars(s);

    if (shouldSkip(s, withinRun, possibleMore, remain)) {
        return 0;
    }

    let poss = 0;
    poss += explorePossibilitiesMemo(s, withinRun, remain, memo);
    return poss;
};

const explorePossibilitiesMemo = (
    s: string,
    withinRun: number | null,
    remain: number[],
    memo: Map<string, number>
): number => {
    const memoKey = `${s}-${withinRun}-${remain.join(',')}`;

    if (memo.has(memoKey)) {
        return memo.get(memoKey)!;
    }

    let poss = 0;

    if (s[0] === '.' && withinRun !== null) {
        poss += checkSpringsMemo(s.slice(1), null, remain.slice(1), memo);
    }

    if (s[0] === '?' && withinRun !== null && withinRun === remain[0]) {
        poss += checkSpringsMemo(s.slice(1), null, remain.slice(1), memo);
    }

    if ((s[0] === '#' || s[0] === '?') && withinRun !== null) {
        poss += checkSpringsMemo(s.slice(1), withinRun + 1, remain, memo);
    }

    if ((s[0] === '?' || s[0] === '#') && withinRun === null) {
        poss += checkSpringsMemo(s.slice(1), 1, remain, memo);
    }

    if ((s[0] === '?' || s[0] === '.') && withinRun === null) {
        poss += checkSpringsMemo(s.slice(1), null, remain, memo);
    }

    memo.set(memoKey, poss);

    return poss;
};

const isValidState = (withinRun: number | null, remain: number[]): boolean =>
    (withinRun === null && remain.length === 0) ||
    (remain.length === 1 && withinRun !== null && withinRun === remain[0]);

const countSpecialChars = (s: string): number =>
    s.split('').filter((ch) => ch === '#' || ch === '?').length;

const shouldSkip = (
    s: string,
    withinRun: number | null,
    possibleMore: number,
    remain: number[]
): boolean => {
    if (
        (withinRun !== null &&
            possibleMore + withinRun <
                remain.reduce((acc, val) => acc + val, 0)) ||
        (withinRun === null &&
            possibleMore < remain.reduce((acc, val) => acc + val, 0)) ||
        (withinRun !== null && remain.length === 0) ||
        (s[0] === '.' && withinRun !== null && withinRun !== remain[0])
    ) {
        return true;
    }
    return false;
};
