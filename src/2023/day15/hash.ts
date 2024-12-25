export const hash = (input: string): number =>
    input.split('').reduce((acc, curr): number => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);
