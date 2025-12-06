// Advent of Code - Day 6 - Helpers

export type Mode = 'horizontal' | 'vertical';

export const parseBlocks = (input: string[]): string[][] => {
    if (!input || input.length === 0) {
        return [];
    }

    const lines = input.slice();

    while (lines.length && lines[0].trim() === '') {
        lines.shift();
    }
    while (lines.length && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length === 0) {
        return [];
    }

    const maxLen = Math.max(...lines.map((l) => l.length));
    const padded = lines.map((l) => l.padEnd(maxLen, ' '));

    const isBlankCol = (ci: number): boolean => {
        for (let r = 0; r < padded.length; r++) {
            if (padded[r][ci] !== ' ') {
                return false;
            }
        }
        return true;
    };

    const blocks: [number, number][] = [];
    let inBlock = false;
    let start = 0;

    for (let c = 0; c < maxLen; c++) {
        const blank = isBlankCol(c);

        if (!blank && !inBlock) {
            inBlock = true;
            start = c;
        }

        if (blank && inBlock) {
            inBlock = false;
            blocks.push([start, c - 1]);
        }
    }

    if (inBlock) {
        blocks.push([start, maxLen - 1]);
    }

    const result: string[][] = [];

    for (const [s, e] of blocks) {
        const blockRows = padded.map((l) => l.slice(s, e + 1));

        result.push(blockRows);
    }

    return result;
};

export const evaluateBlock = (blockRows: string[], mode: Mode): number => {
    if (!blockRows || blockRows.length === 0) {
        return 0;
    }
    const opRow = blockRows[blockRows.length - 1].trim();

    if (opRow.length === 0) {
        return 0;
    }
    const op = opRow[0];

    const nums: number[] = [];

    if (mode === 'horizontal') {
        for (let r = 0; r < blockRows.length - 1; r++) {
            const txt = blockRows[r].trim();

            if (txt.length === 0) {
                continue;
            }
            const n = parseInt(txt, 10);

            if (!Number.isNaN(n)) {
                nums.push(n);
            }
        }
    } else {
        const width = blockRows[0].length;
        const rowsOfDigits = blockRows.length - 1;

        for (let c = width - 1; c >= 0; c--) {
            let digits = '';

            for (let r = 0; r < rowsOfDigits; r++) {
                digits += blockRows[r][c] ?? ' ';
            }
            const trimmed = digits.replace(/\s+/g, '');

            if (trimmed.length === 0) {
                continue;
            }
            const n = parseInt(trimmed, 10);

            if (!Number.isNaN(n)) {
                nums.push(n);
            }
        }
    }

    if (nums.length === 0) {
        return 0;
    }

    if (op === '+') {
        return nums.reduce((a, b) => a + b, 0);
    }

    if (op === '*') {
        return nums.reduce((a, b) => a * b, 1);
    }
    return 0;
};

export default { parseBlocks, evaluateBlock };
