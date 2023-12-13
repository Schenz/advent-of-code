// Advent of Code - Day 13 - Part One

export const compare = (a: any, b: any): boolean | undefined => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a > b ? false : a < b ? true : undefined;
    } else if (Array.isArray(a) !== Array.isArray(b)) {
        return compare(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b]);
    }

    for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
        if (a[i] === undefined) {
            return true;
        }

        if (b[i] === undefined) {
            return false;
        }
        const result = compare(a[i], b[i]);

        if (result !== undefined) {
            return result;
        }
    }
    return undefined;
};
