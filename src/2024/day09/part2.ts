// Advent of Code - Day 9 - Part Two

import { checksum } from './checksum';
import { parseBlocks } from './parseBlocks';

export const part2 = (input: string[]): number => {
    const blocks = parseBlocks(input[0]);

    const sortedFiles = blocks
        .filter((b) => b[1] >= 0)
        .sort((a, b) => {
            return b[1] - a[1];
        });

    while (sortedFiles.length > 0) {
        const fileBlock = sortedFiles.splice(0, 1)[0];
        const freeIx = blocks.findIndex((b) => b[1] < 0 && b[0] >= fileBlock[0]);

        if (freeIx > 0) {
            const fileIx = blocks.findIndex((b) => b[1] === fileBlock[1]);

            if (fileIx < freeIx) {
                continue;
            }

            blocks.splice(fileIx, 1, [fileBlock[0], -1]);

            const freeBlock = blocks.splice(freeIx, 1, [...fileBlock])[0];

            if (freeBlock[0] - fileBlock[0] > 0) {
                blocks.splice(freeIx + 1, 0, [freeBlock[0] - fileBlock[0], -1]);
            }
        }
    }

    return checksum(blocks);
};
