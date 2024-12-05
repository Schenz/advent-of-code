// Advent of Code - Day 5 - Part One

import { getRulesAndUpdates } from "./getRulesAndUpdates";

export const part1 = (input: string[]): number => {
    const { rules, updates } = getRulesAndUpdates(input);
    let result = 0;

    for (const update of updates) {
        let updateValid = true;
        const relevantRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

        for (const [bigger, smaller] of relevantRules) {
            if (update.indexOf(bigger) > update.indexOf(smaller)) {
                updateValid = false;
                break;
            }
        }

        if (updateValid) {
            result += update[Math.floor(update.length / 2)];
        }
    }

    return result;
};

