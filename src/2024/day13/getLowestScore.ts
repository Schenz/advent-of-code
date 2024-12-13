export const getLowestScore = (sum: number, machine: number[][]): number => {
    // machine represents the parsed input data:
    // [
    //   [X1, Y1],  // Button A coordinates
    //   [X2, Y2],  // Button B coordinates
    //   [X3, Y3]   // Prize coordinates
    // ]

    // Calculate the value of b using the determinant of the matrix
    // b = (X1 * Y3 - Y1 * X3) / (X1 * Y2 - Y1 * X2)
    const b =
        (machine[0][0] * machine[2][1] - machine[0][1] * machine[2][0]) /
        (machine[0][0] * machine[1][1] - machine[0][1] * machine[1][0]);

    // Calculate the value of a using the value of b
    // a = (X3 - X2 * b) / X1
    const a = (machine[2][0] - machine[1][0] * b) / machine[0][0];

    // Return the sum plus the calculated score if a and b are integers, otherwise return sum
    return sum + (Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0);
};
