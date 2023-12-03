// Advent of Code - Day 10 - Part Two

export function part2(input: string[]): [number, string] {
  let cycle = 0;
	let x = 1;

	let output = '';
	const strengths: number[] = [];

	incrementCycle()

	function incrementCycle() {
		const horizontalPosition = cycle % 40;
		if (cycle && horizontalPosition === 0) output += '\n';
		output += Math.abs(x - horizontalPosition) < 2 ? '█' : ' ';

		cycle++;

		for (let attempt = 20; attempt <= cycle; attempt += 40){
			if (cycle === attempt) {
				strengths.push(cycle * x);
				break;
			}
		}
	}

	for (const inst of input) {
		const [command, arg] = inst.split(' ');
		if (command === 'noop') incrementCycle();
		else if (command === 'addx') {
			incrementCycle();
			x += +arg;
			incrementCycle();
		}
	}

	return [
		strengths.reduce((a, b) => a + b, 0),
		output.slice(0, -2)
	];
}
