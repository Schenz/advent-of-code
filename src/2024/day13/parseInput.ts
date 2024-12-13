export const parseInput = (input: string): number[][][] => {
    return input.split('\n\n').map((block) => {
        const lines = block.split('\n');
        const buttonA = multisplit(lines[0], ' +,')
            .filter((x) => x !== '')
            .map(Number)
            .filter((x) => x);
        const buttonB = multisplit(lines[1], ' +,')
            .filter((x) => x !== '')
            .map(Number)
            .filter((x) => x);
        const target = multisplit(lines[2], ' =,')
            .filter((x) => x !== '')
            .map(Number)
            .filter((x) => x);

        return [buttonA, buttonB, target];
    });
};

export const multisplit = (text: string, splits: string): string[] => {
    let retval = [text];

    [...splits].forEach((split) => {
        retval = retval.flatMap((x) => x.split(split));
    });
    return retval;
};
