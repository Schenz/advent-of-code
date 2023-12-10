// Advent of Code - Day 10

import { part1, part2 } from '../../src/2023/day10';

const testData1 = ['.....', '.S-7.', '.|.|.', '.L-J.', '.....'];
const testData2 = ['..F7.', '.FJ|.', 'SJ.L7', '|F--J', 'LJ...'];
const testData3 = [
    '...........',
    '.S-------7.',
    '.|F-----7|.',
    '.||.....||.',
    '.||.....||.',
    '.|L-7.F-J|.',
    '.|..|.|..|.',
    '.L--J.L--J.',
    '...........',
];
const testData4 = [
    '.F----7F7F7F7F-7....',
    '.|F--7||||||||FJ....',
    '.||.FJ||||||||L7....',
    'FJL7L7LJLJ||LJ.L-7..',
    'L--J.L7...LJS7F-7L7.',
    '....F-J..F7FJ|L7L7L7',
    '....L7.F7||L7|.L7L7|',
    '.....|FJLJ|FJ|F7|.LJ',
    '....FJL-7.||.||||...',
    '....L---J.LJ.LJLJ...',
];
const testData5 = [
    'FF7FSF7F7F7F7F7F---7',
    'L|LJ||||||||||||F--J',
    'FL-7LJLJ||||||LJL-77',
    'F--JF--7||LJLJ7F7FJ-',
    'L---JF-JLJ.||-FJLJJ7',
    '|F|F-JF---7F7-L7L|7|',
    '|FFJF7L7F-JF7|JL---7',
    '7-L-JL7||F7|L7F-7F7|',
    'L.L7LFJ|||||FJL7||LJ',
    'L7JLJL-JLJLJL--JLJ.L',
];
describe('part one tests', () => {
    it('part one test', () => {
        expect(part1(testData1)).toBe(4);
    });
    it('part one test', () => {
        expect(part1(testData2)).toBe(8);
    });
});

describe('part two tests', () => {
    it('part two test', () => {
        expect(part2(testData3)).toBe(4);
    });
    it('part two test', () => {
        expect(part2(testData4)).toBe(8);
    });
    it('part two test', () => {
        expect(part2(testData5)).toBe(10);
    });
});
