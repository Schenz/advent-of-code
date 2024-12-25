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

/*
This code is using the Z3 solver to find a solution to a system of linear equations. The problem involves modeling the motion of hailstones in 3D space over time.

Here's a breakdown of the code:

Parsing Input:
The input is an array of strings, where each string represents information about a hailstone's initial position and velocity. The format seems to be x,y,z@vx,vy,vz.
The code extracts this information and creates an array of objects called hailStones, each containing the initial position (x, y, z), velocity (vx, vy, vz), and a computed value m (the ratio of vy to vx).

Initializing Z3:
The code initializes the Z3 solver by importing the init function from the 'z3-solver' library. It then creates a Z3 context named 'main'.

Creating Z3 Variables:
Z3 Real constants (x, y, z, vx, vy, vz) are created to represent variables in the system of equations. These variables will be used to express the positions and velocities of the hailstones over time.

Setting Up Equations:
The code creates a Z3 solver object and sets up a system of equations using a loop over the hailstones.
For each hailstone, a time variable t is introduced, and equations are added to the solver to model the position of the hailstone at any given time.
The equations are linear equations representing the motion of the hailstone in 3D space over time.

  Position Equations:
  The position of a hailstone in 3D space at any given time t is modeled using the equations of motion:
    x(t)=x0+vx0*t
    y(t)=y0+vy0*t
    z(t)=z0+vz0*t
  Where:
    x0, y0, z0 are the initial coordinates of the hailstone.
    vx0, vy0, vz0 are the initial velocities of the hailstone along the x, y, and z axes.

  Z3 Variable Definitions:
  Z3 variables are introduced to represent the time variable t and the coordinates x,y,z at any given time.

  Adding Equations to the Solver:
  The code adds equations to the Z3 solver to express the motion of each hailstone over time.
  The first equation ensures that time t is non-negative.
  The next three equations represent the motion equations in 3D space for each hailstone. They state that the position at time t is equal to the initial position plus the product of the initial velocity and time.

Checking Satisfiability:
The code then checks if there is a solution (sat for satisfiable) to the system of equations using the solver.check() method.

Getting the Result:
If a solution exists, the code retrieves the model using solver.model(). The model contains the values assigned to the variables that satisfy the equations.
The code extracts the values of x, y, and z from the model and returns their sum.
*/
