export const predictNextValue = (values: number[]): number => {
    if (values.every((value) => !value) || values.length === 0) {
        return 0;
    }

    const deltas: number[] = [];

    for (let index = 0; index < values.length - 1; index++) {
        deltas.push(values[index + 1] - values[index]);
    }

    // Check if values array is not empty before accessing the last element
    const lastValue = values[values.length - 1];

    return lastValue !== undefined ? lastValue + predictNextValue(deltas) : 0;
};
