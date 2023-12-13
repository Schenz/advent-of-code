// Advent of Code - Day 6 - Part Two

export const part2 = (input: string[]): number => {
    let position = 0;
    const reqLength = 14;
    const msg: string[] = [];

    input.forEach((value) => {
        const characters = value.split('');

        for (let index = 0; index < characters.length; index++) {
            if (msg.length == reqLength) {
                if (msg.duplicates().length == 0) {
                    position = index;
                    break;
                }
                msg.shift();
            }
            msg.push(characters[index]);
        }
    });

    return position;
};
