// Advent of Code - Day 8 - Part Two
const calculateScenicScore = (col: number, row: number): number => {
    // scenic score for all trees on the outer edge is 0
    if (col === 0 || col === treeMaze[0].length - 1) {
        return 0;
    }

    if (row === 0 || row === treeMaze.length - 1) {
        return 0;
    }

    // we go from the tree to the outside and count how many trees have equal height or lower
    const ourTreeHeight = treeMaze[row][col];

    // check the line - to the right
    let rightTreeCount = 0;

    for (let i = col + 1; i < treeMaze[row].length; i++) {
        rightTreeCount++;

        if (treeMaze[row][i] >= ourTreeHeight) {
            break;
        }
    }

    // check the line - to the left
    let leftTreeCount = 0;

    for (let i = col - 1; i >= 0; i--) {
        leftTreeCount++;

        if (treeMaze[row][i] >= ourTreeHeight) {
            break;
        }
    }

    // check the row - to the bottom
    let downTreeCount = 0;

    for (let i = row + 1; i < treeMaze.length; i++) {
        downTreeCount++;

        if (treeMaze[i][col] >= ourTreeHeight) {
            break;
        }
    }

    // check the row - to the top
    let upTreeCount = 0;

    for (let i = row - 1; i >= 0; i--) {
        upTreeCount++;

        if (treeMaze[i][col] >= ourTreeHeight) {
            break;
        }
    }

    return rightTreeCount * leftTreeCount * upTreeCount * downTreeCount;
};

const treeMaze: number[][] = [];

export const part2 = (input: string[]): number => {
    let total = 0;

    input.forEach((line, last) => {
        if (line.length > 0) {
            const treeLine: number[] = [];

            line.split('').forEach((rawHeight) => treeLine.push(parseInt(rawHeight)));
            treeMaze.push(treeLine);
        }

        if (last) {
            let highestScenicScore = 0;

            for (let row = 0; row < treeMaze.length; row++) {
                for (let col = 0; col < treeMaze[0].length; col++) {
                    highestScenicScore = Math.max(highestScenicScore, calculateScenicScore(col, row));
                }
            }

            total = highestScenicScore;
        }
    });

    return total;
};
