/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

        if (lowX !== lowY || lowX !== 0) {
            throw new Error('Invalid input format');
        }

        const grid: string[][] = [];
        for (let x = lowX; x <= highX!; x++) {
            const row: string[] = [];
            for (let y = lowY; y! <= highY!; y!++) {
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

    *neighbors(
        x: number,
        y: number,
        diagonals = false
    ): Generator<[number, number], void, unknown> {
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
                if (
                    0 <= nx &&
                    nx < this._width &&
                    0 <= ny &&
                    ny < this._height
                ) {
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

    print(lineSpacing = ' '): void {
        console.log(this.asStr(lineSpacing));
    }

    asStr(lineSpacing = ' '): string {
        return this._grid.map((row) => row.join(lineSpacing)).join('\n');
    }
}
