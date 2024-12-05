// Advent of Code - Day 5 - Part Two

import { getRulesAndUpdates } from "./getRulesAndUpdates";

export const part2 = (input: string[]): number => {
    const { rules, updates } = getRulesAndUpdates(input);

    return updates.reduce((result, update) => {
        const relevantRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

        const isUpdateValid = relevantRules.every(([bigger, smaller]) => {
            return update.indexOf(bigger) < update.indexOf(smaller);
        });

        if (!isUpdateValid) {
            update.sort((a, b) => {
                const calculateScore = (num: number) =>
                    relevantRules
                        .filter((rule) => rule.includes(num))
                        .map((rule) => rule.indexOf(num))
                        .reduce((score, value) => score + value, 0);

                return calculateScore(a) - calculateScore(b);
            });

            return result + update[Math.floor(update.length / 2)];
        }

        return result;
    }, 0);
};
