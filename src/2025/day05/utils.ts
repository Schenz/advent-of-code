// Helpers for parsing ranges and merging intervals for Day 5

export type Interval = [number, number];

export const normalizeLines = (input: string[]): string[] => input.map((l) => l.replace(/\r/g, ''));

export const trimEdges = (lines: string[]): string[] => {
    const trimmed = [...lines];

    while (trimmed.length > 0 && trimmed[0].trim() === '') {
        trimmed.shift();
    }
    while (trimmed.length > 0 && trimmed[trimmed.length - 1].trim() === '') {
        trimmed.pop();
    }
    return trimmed;
};

export const splitSections = (lines: string[]): { rangesLines: string[]; availLines: string[] } => {
    const sep = lines.findIndex((l) => l.trim() === '');
    const rangesLines = (sep === -1 ? lines : lines.slice(0, sep)).filter((l) => l.trim() !== '');
    const availLines = (sep === -1 ? [] : lines.slice(sep + 1)).filter((l) => l.trim() !== '');

    return { rangesLines, availLines };
};

export const parseIntervals = (rangesLines: string[]): Interval[] => {
    const intervals: Interval[] = [];

    for (const line of rangesLines) {
        const parts = line.split('-').map((s) => s.trim());

        if (parts.length !== 2) {
            continue;
        }
        const a = parseInt(parts[0], 10);
        const b = parseInt(parts[1], 10);

        if (Number.isNaN(a) || Number.isNaN(b)) {
            continue;
        }
        intervals.push([a, b]);
    }
    return intervals;
};

export const mergeIntervals = (intervals: Interval[]): Interval[] => {
    if (intervals.length === 0) {
        return [];
    }
    const copy = [...intervals];

    copy.sort((x, y) => x[0] - y[0]);
    const merged: Interval[] = [];

    for (const [s, e] of copy) {
        if (merged.length === 0) {
            merged.push([s, e]);
            continue;
        }
        const last = merged[merged.length - 1];

        if (s <= last[1] + 1) {
            last[1] = Math.max(last[1], e);
        } else {
            merged.push([s, e]);
        }
    }
    return merged;
};

export const countAvailableInMerged = (availLines: string[], merged: Interval[]): number => {
    let count = 0;

    for (const line of availLines) {
        const v = parseInt(line.trim(), 10);

        if (Number.isNaN(v)) {
            continue;
        }

        let lo = 0;
        let hi = merged.length - 1;
        let found = false;

        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            const [rs, re] = merged[mid];

            if (v < rs) {
                hi = mid - 1;
            } else if (v > re) {
                lo = mid + 1;
            } else {
                found = true;
                break;
            }
        }

        if (found) {
            count++;
        }
    }
    return count;
};

export const mergedUnionSize = (merged: Interval[]): number => {
    let total = 0;

    for (const [s, e] of merged) {
        total += e - s + 1;
    }
    return total;
};
