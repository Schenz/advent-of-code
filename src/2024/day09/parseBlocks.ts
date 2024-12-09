import { Block } from './Block';

export const parseBlocks = (input: string): Block[] => {
    const blocks = [] as Block[];

    let isFile = true;
    let fileId = 0;

    for (const char of input) {
        blocks.push([Number(char), isFile ? fileId++ : -1]);
        isFile = !isFile;
    }

    return blocks;
};
