/**
 * Generates all unique combinations of size 2 from the input array.
 * @param array The input array of items
 * @param size The size of the combination (2 in this case)
 * @returns An array of combinations
 */
export const combinations = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = [];
    const generate = (start: number, combo: T[]): void => {
        if (combo.length === size) {
            result.push([...combo]);
            return;
        }
        for (let i = start; i < array.length; i++) {
            combo.push(array[i]);
            generate(i + 1, combo);
            combo.pop();
        }
    };

    generate(0, []);
    return result;
};
