export const getRulesAndUpdates = (
    lines: string[]
): { readonly rules: [number, number][]; readonly updates: number[][] } => {
    const rules: [number, number][] = [];
    const updates: number[][] = [];

    for (const line of lines) {
        if (line.includes('|')) {
            const [a, b] = line.split('|').map(Number);

            rules.push([a, b]);
        } else if (line.includes(',')) {
            updates.push(line.split(',').map(Number));
        }
    }

    return { rules, updates } as const;
};
