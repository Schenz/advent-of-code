// Advent of Code - Day 15

import { part1, part2 } from '../../src/2024/day15';
import { readFile } from 'fs/promises';

const testDataSmall = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;
const testDataLarge = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

describe('part one tests', () => {
    it.each`
        input            | expected
        ${testDataSmall} | ${2028}
        ${testDataLarge} | ${10092}
    `('expected result: $expected for input: $input', ({ input, expected }) => {
        expect(part1(input)).toBe(expected);
    });

    it('part one test - real data', async () => {
        const input = await getData();

        expect(part1(input)).toBe(1516281);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testDataLarge)).toBe(9021);
    });

    it('part two test - real data', async () => {
        const input = await getData();

        expect(part2(input)).toBe(1527969);
    });
});

const getData = async (): Promise<string> => {
    try {
        const input: string = await readFile('src/2024/day15/resources/input.txt', 'utf8');

        return input.trim();
    } catch (err) {
        return '';
    }
};
