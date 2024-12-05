// Advent of Code - Day 5 - Part Two

import { getRulesAndUpdates } from "./getRulesAndUpdates";

export const part2 = (input: string[]): number => {
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

        if (!updateValid) {
            update.sort((a, b) => {
                const aScore = relevantRules
                    .filter((rule) => rule.includes(a))
                    .map((rule) => rule.indexOf(a))
                    .reduce((score, value) => score + value, 0);
                const bScore = relevantRules
                    .filter((rule) => rule.includes(b))
                    .map((rule) => rule.indexOf(b))
                    .reduce((score, value) => score + value, 0);

                return aScore > bScore ? 1 : -1;
            });

            result += update[Math.floor(update.length / 2)];
        }
    }

    return result;
};
