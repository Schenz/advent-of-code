// Advent of Code - Day 5 - Part One

import { getRulesAndUpdates } from './getRulesAndUpdates';

export const part1 = (input: string[]): number => {
    const { rules, updates } = getRulesAndUpdates(input);

    return updates.reduce((result, update) => {
        const relevantRules = rules.filter(([a, b]) => update.includes(a) && update.includes(b));

        const isUpdateValid = relevantRules.every(([bigger, smaller]) => {
            return update.indexOf(bigger) < update.indexOf(smaller);
        });

        return isUpdateValid ? result + update[Math.floor(update.length / 2)] : result;
    }, 0);
};
