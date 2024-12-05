export function getRulesAndUpdates(lines: string[]) {
  const rules = lines
    .filter((line) => line.includes('|'))
    .map((rawRule) => {
      const [a, b] = rawRule.split('|');
      return [parseInt(a, 10), parseInt(b, 10)] as const;
    });
  const updates = lines
    .filter((line) => line.includes(','))
    .map((update) => update.split(',').map((num) => parseInt(num, 10)));

  return { rules, updates } as const;
}
