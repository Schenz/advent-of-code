import { checksum } from './checksum';
import { parseBlocks } from './parseBlocks';

export const part1 = (input: string[]): number => {
    const blocks = parseBlocks(input[0]);

    let n = 0;

    do {
        const block = blocks[n];

        if (block[0] > 0 && block[1] < 0) {
            const fileIx = blocks.findLastIndex((b) => b[0] > 0 && b[1] >= 0);

            if (fileIx > n) {
                const fileBlock = blocks[fileIx];

                if (block[0] >= fileBlock[0]) {
                    // Need more than have
                    block[0] -= fileBlock[0];
                    blocks.splice(n, 0, [...fileBlock]);
                    fileBlock[0] = 0;
                } else {
                    // Have more than need
                    fileBlock[0] -= block[0];
                    blocks.splice(n, 0, [block[0], fileBlock[1]]);
                    block[0] = 0;
                }
            }
        }

        n++;
    } while (n < blocks.length);

    return checksum(blocks);
};
