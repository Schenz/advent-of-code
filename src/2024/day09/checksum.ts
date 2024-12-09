import { Block } from './Block';

export const checksum = (blocks: Block[]): number => {
    let checksum = 0,
        i = 0;

    for (const block of blocks) {
        for (let x = 0; x < block[0]; x++) {
            checksum += i++ * (block[1] === -1 ? 0 : block[1]);
        }
    }

    return checksum;
};
