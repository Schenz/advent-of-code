export const polyArea = (x: number[], y: number[]): number => {
    return (
        0.5 *
        Math.abs(
            x.reduce((sum, val, index) => sum + val * y[(index + 1) % y.length], 0) -
                y.reduce((sum, val, index) => sum + val * x[(index + 1) % x.length], 0)
        )
    );
};
