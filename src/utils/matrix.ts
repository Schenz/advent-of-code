export class Matrix {
    private _grid: string[][];
    private _width: number;
    private _height: number;

    constructor(grid: string[][]) {
        this._grid = grid;
        this._width = this._grid.length;
        this._height = this._grid[0].length;
    }

    static parse(
        s: string,
        linesplitFn?: (line: string) => string[],
        lineSeparator = '\n',
        valueFn?: (value: string) => string
    ): Matrix {
        const grid: string[][] = [];

        s.split(lineSeparator).forEach((line) => {
            if (linesplitFn) {
                line = linesplitFn(line).join('');
            }
            grid.push(valueFn ? line.split('').map(valueFn) : line.split(''));
        });
        return new Matrix(grid).transpose();
    }

    static fromDict(d: { [key: string]: string }, missing?: string): Matrix {
        let lowX: number | null = null;
        let highX: number | null = null;
        let lowY: number | null = null;
        let highY: number | null = null;

        Object.keys(d).forEach((key) => {
            const [x, y] = key.split(',').map(Number);

            lowX = lowX === null ? x : Math.min(lowX, x);
            highX = highX === null ? x : Math.max(highX, x);
            lowY = lowY === null ? y : Math.min(lowY, y);
            highY = highY === null ? y : Math.max(highY, y);
        });

        if (lowX !== 0 || lowY !== 0 || lowX !== highX || lowY !== highY || highX !== 0 || highY !== 0) {
            throw new Error('Invalid input format');
        }

        const grid: string[][] = [];

        for (let x = lowX; x <= highX; x++) {
            const row: string[] = [];

            for (let y = lowY; y <= highY; y++) {
                row.push(d[`${x},${y}`] || missing || '');
            }
            grid.push(row);
        }

        return new Matrix(grid);
    }

    toDict(): { [key: string]: string } {
        const dict: { [key: string]: string } = {};

        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                dict[`${x},${y}`] = this._grid[x][y];
            }
        }
        return dict;
    }

    transpose(): Matrix {
        const transposedGrid: string[][] = [];

        for (let y = 0; y < this._height; y++) {
            transposedGrid.push([]);
            for (let x = 0; x < this._width; x++) {
                transposedGrid[y].push(this._grid[x][y]);
            }
        }
        return new Matrix(transposedGrid);
    }

    get width(): number {
        return this._width;
    }

    get xRange(): number[] {
        return Array.from({ length: this.width }, (_, i) => i);
    }

    get height(): number {
        return this._height;
    }

    get yRange(): number[] {
        return Array.from({ length: this.height }, (_, i) => i);
    }

    get area(): number {
        return this._width * this._height;
    }

    contains(c: [number, number]): boolean {
        const [x, y] = c;

        return 0 <= x && x < this._width && 0 <= y && y < this._height;
    }

    getItem(c: [number, number]): string {
        const [x, y] = c;

        if (!(0 <= x && x < this._width && 0 <= y && y < this._height)) {
            throw new Error('Index out of bounds');
        }
        return this._grid[x][y];
    }

    setItem(c: [number, number], val: string): void {
        const [x, y] = c;

        if (!(0 <= x && x < this._width && 0 <= y && y < this._height)) {
            throw new Error('Index out of bounds');
        }
        this._grid[x][y] = val;
    }

    row(y: number): string[] {
        return this.xRange.map((x) => this._grid[x][y]);
    }

    col(x: number): string[] {
        return this._grid[x].slice();
    }

    *items(columnFirst = false): Generator<[number, number], void, unknown> {
        if (columnFirst) {
            for (let y = 0; y < this._height; y++) {
                for (let x = 0; x < this._width; x++) {
                    yield [x, y];
                }
            }
        } else {
            for (let x = 0; x < this._width; x++) {
                for (let y = 0; y < this._height; y++) {
                    yield [x, y];
                }
            }
        }
    }

    *neighbors(x: number, y: number, diagonals = false): Generator<[number, number], void, unknown> {
        if (diagonals) {
            for (const [dx, dy] of [
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ]) {
                const nx = x + dx;
                const ny = y + dy;

                if (0 <= nx && nx < this._width && 0 <= ny && ny < this._height) {
                    yield [nx, ny];
                }
            }
        } else {
            if (0 < x) {
                yield [x - 1, y];
            }

            if (x + 1 < this._width) {
                yield [x + 1, y];
            }

            if (0 < y) {
                yield [x, y - 1];
            }

            if (y + 1 < this._height) {
                yield [x, y + 1];
            }
        }
    }

    asStr(lineSpacing = ' '): string {
        return this._grid.map((row) => row.join(lineSpacing)).join('\n');
    }
}

/**
 * Solves a system of linear equations over GF(2) (binary field)
 * using Gaussian elimination, and returns the minimum solution.
 *
 * The system is represented as an augmented matrix where each row
 * is one equation. All arithmetic is mod 2 (XOR operations).
 *
 * @param coefficients - n×m matrix of coefficients (0 or 1)
 * @param targets - n×1 vector of target values (0 or 1)
 * @returns The minimum solution vector (minimize number of 1s), or null if no solution exists
 */
export const solveLinearSystemGF2 = (coefficients: number[][], targets: number[]): number[] | null => {
    const n = coefficients.length; // number of equations
    const m = coefficients[0]?.length ?? 0; // number of variables

    if (n === 0 || m === 0) {
        return null;
    }

    // Build augmented matrix [coefficients | targets]
    const matrix: number[][] = coefficients.map((row, i) => [...row, targets[i]]);

    // Gaussian elimination in GF(2)
    const pivotCols: number[] = [];
    let pivotRow = 0;

    for (let col = 0; col < m && pivotRow < n; col++) {
        // Find pivot
        let found = false;

        for (let row = pivotRow; row < n; row++) {
            if (matrix[row][col] === 1) {
                // Swap rows
                [matrix[pivotRow], matrix[row]] = [matrix[row], matrix[pivotRow]];
                found = true;
                break;
            }
        }

        if (!found) {
            continue;
        }

        pivotCols.push(col);

        // Eliminate all other rows
        for (let row = 0; row < n; row++) {
            if (row !== pivotRow && matrix[row][col] === 1) {
                for (let c = 0; c <= m; c++) {
                    matrix[row][c] ^= matrix[pivotRow][c];
                }
            }
        }

        pivotRow++;
    }

    // Check for inconsistency (0 = 1)
    for (let row = pivotRow; row < n; row++) {
        if (matrix[row][m] === 1) {
            return null; // No solution
        }
    }

    // Find free variables (columns without pivots)
    const freeVars: number[] = [];

    for (let col = 0; col < m; col++) {
        if (!pivotCols.includes(col)) {
            freeVars.push(col);
        }
    }

    // Try all combinations of free variables to find minimum solution
    let minPresses = Infinity;
    let bestSolution: number[] = new Array(m).fill(0);

    const numFree = freeVars.length;
    const maxCombinations = 1 << numFree;

    for (let combo = 0; combo < maxCombinations; combo++) {
        const solution: number[] = new Array(m).fill(0);

        // Set free variables based on combination
        for (let i = 0; i < numFree; i++) {
            solution[freeVars[i]] = (combo >> i) & 1;
        }

        // Back-substitution for pivot variables
        for (let i = pivotCols.length - 1; i >= 0; i--) {
            const col = pivotCols[i];
            const row = i;

            let val = matrix[row][m];

            for (let c = col + 1; c < m; c++) {
                val ^= matrix[row][c] * solution[c];
            }
            solution[col] = val;
        }

        // Count 1s and track minimum
        const presses = solution.reduce((sum, x) => sum + x, 0);

        if (presses < minPresses) {
            minPresses = presses;
            bestSolution = solution;
        }
    }

    return bestSolution;
};
