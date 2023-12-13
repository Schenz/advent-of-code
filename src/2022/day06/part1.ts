// Advent of Code - Day 6 - Part One

export const part1 = (input: string[]): number => {
    let position = 0;
    const reqLength = 4;
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

declare global {
    interface Array<T> {
        remove(elem: T): Array<T>; // example
        /**
         * returns duplicates as array
         * @HannesSchaletzky
         */
        duplicates(): T[];
    }
}

Array.prototype.duplicates = function () {
    return this.filter((item, i) => {
        if (this.indexOf(item) !== i) {
            return item;
        }
    });
};
