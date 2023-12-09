export const predictNextValue = (values: number[]): number => {
    if (values.every((value) => !value)) return 0;

    const deltas: number[] = [];

    for (const [index, value] of values.entries()) {
        if (values.at(index + 1) == undefined) break;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        deltas.push(values.at(index + 1)! - value);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return values.at(-1)! + predictNextValue(deltas);
};
