// Advent of Code - Day 10 - Shared Parsing

export interface RawMachine {
    lightsTarget: number[] | null;
    joltageTarget: number[] | null;
    buttons: number[][];
}

/**
 * Parses a single machine line from the input.
 * Format: [target] (button1) (button2) ... (buttonN) {joltage}
 *
 * @param line Input line to parse
 * @returns Parsed machine or null if invalid
 */
export const parseMachine = (line: string): RawMachine | null => {
    const lineTrimmed = line.trim();

    if (!lineTrimmed) {
        return null;
    }

    // Parse lights target: [.##.]
    const lightsMatch = lineTrimmed.match(/\[(.*?)\]/);
    const lightsTarget = lightsMatch ? lightsMatch[1].split('').map((c) => (c === '#' ? 1 : 0)) : null;

    // Parse joltage target: {3,5,4,7}
    const joltageMatch = lineTrimmed.match(/\{(.*?)\}/);
    const joltageTarget = joltageMatch ? joltageMatch[1].split(',').map((x) => parseInt(x, 10)) : null;

    // Parse buttons: (0,2,3) etc.
    const buttonMatches = lineTrimmed.match(/\((.*?)\)/g);

    if (!buttonMatches) {
        return null;
    }

    const buttons = buttonMatches.map((btnStr) => {
        const btnContent = btnStr.slice(1, -1); // Remove parentheses

        if (!btnContent) {
            return [];
        }
        return btnContent.split(',').map((x) => parseInt(x, 10));
    });

    return { lightsTarget, joltageTarget, buttons };
};
