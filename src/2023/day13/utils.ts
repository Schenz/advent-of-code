import { Matrix } from '../../utils/matrix';

export const parseInput = (s: string): Matrix[] => {
    return s.split('\n\n').map((group) => Matrix.parse(group));
};

export const findReflection = (grid: Matrix): [number[], number[]] => {
    const verts: number[] = [];

    for (let i = 1; i < grid.width; i++) {
        const left: string[] = [];
        const right: string[] = [];

        for (let j = i - 1; j >= 0; j--) {
            left.push(grid.col(j).join(''));
        }
        for (let j = i; j < grid.width; j++) {
            right.push(grid.col(j).join(''));
        }
        const n = Math.min(left.length, right.length);

        left.splice(n);
        right.splice(n);

        if (left.join('') === right.join('')) {
            verts.push(i);
        }
    }

    const horizontals: number[] = [];

    for (let i = 1; i < grid.height; i++) {
        const top: string[] = [];
        const bottom: string[] = [];

        for (let j = i - 1; j >= 0; j--) {
            top.push(grid.row(j).join(''));
        }
        for (let j = i; j < grid.height; j++) {
            bottom.push(grid.row(j).join(''));
        }
        const n = Math.min(top.length, bottom.length);

        top.splice(n);
        bottom.splice(n);

        if (top.join('') === bottom.join('')) {
            horizontals.push(i);
        }
    }

    return [verts, horizontals];
};
