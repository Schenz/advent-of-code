/* eslint-disable @typescript-eslint/naming-convention */
// Advent of Code - Day 24 - Part Two
import { init } from 'z3-solver';

export const part2 = async (input: string[]): Promise<number> => {
    const hailStones = input.slice(0, 3).map((line) => {
        const [x, y, z] = line.split('@')[0].split(',').map(Number);
        const [vx, vy, vz] = line.split('@')[1].split(',').map(Number);

        return { x, y, z, vx, vy, vz, m: vy / vx };
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Context } = await init();
    const Z3 = Context('main');

    const x = Z3.Real.const('x');
    const y = Z3.Real.const('y');
    const z = Z3.Real.const('z');

    const vx = Z3.Real.const('vx');
    const vy = Z3.Real.const('vy');
    const vz = Z3.Real.const('vz');

    const solver = new Z3.Solver();

    for (let i = 0; i < hailStones.length; i++) {
        const stone = hailStones[i];
        const t = Z3.Real.const(`t${i}`);

        solver.add(t.ge(0));
        solver.add(x.add(vx.mul(t)).eq(t.mul(stone.vx).add(stone.x)));
        solver.add(y.add(vy.mul(t)).eq(t.mul(stone.vy).add(stone.y)));
        solver.add(z.add(vz.mul(t)).eq(t.mul(stone.vz).add(stone.z)));
    }

    const isSat = await solver.check();

    if (isSat !== 'sat') {
        return -1;
    }

    const model = solver.model();
    const rx = Number(model.eval(x));
    const ry = Number(model.eval(y));
    const rz = Number(model.eval(z));

    return rx + ry + rz;
};
