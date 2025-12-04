// Advent of Code - Day 4 - Console Visualization

import * as fs from 'fs';
import * as readline from 'readline';
import { part1 } from './part1.js';
import { part2 } from './part2.js';

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

const clearConsole = (): void => {
    // Use ANSI escape codes to move cursor to home position and clear from cursor to end of screen
    process.stdout.write('\x1b[H\x1b[J');
};

// Render content in-place by returning cursor to home and clearing to end
const render = (content: string): void => {
    process.stdout.write('\x1b[H');
    process.stdout.write(content + '\n');
    process.stdout.write('\x1b[J');
};

const drawVisualization = (
    grid: string[][],
    toRemove: { x: number; y: number }[],
    passNumber: number,
    totalRemoved: number,
    removedThisPass: number,
    isPart1: boolean = false,
): string => {
    const toRemoveSet = new Set(toRemove.map(({ x, y }) => `${x},${y}`));

    // Helper to strip ANSI color codes for accurate visible length measurements
    const stripAnsi = (s: string): string => s.replace(/\x1b\[[0-9;]*m/g, '');

    // Build grid rows as arrays of colored cells so we can truncate by visible width
    const gridRowCells: string[][] = [];
    let maxGridVisibleWidth = 0;

    for (let y = 0; y < grid.length; y++) {
        const cells: string[] = [];
        // start with two-space indent (counts as visible width 2)
        cells.push('  ');
        for (let x = 0; x < grid[y].length; x++) {
            const key = `${x},${y}`;
            const cell = grid[y][x];
            if (toRemoveSet.has(key)) {
                cells.push(`\x1b[32m${cell}\x1b[0m `);
            } else if (cell === '@') {
                cells.push(`\x1b[33m${cell}\x1b[0m `);
            } else if (cell === '.') {
                cells.push(`\x1b[2m${cell}\x1b[0m `);
            } else {
                cells.push(`${cell} `);
            }
        }
        gridRowCells.push(cells);
        // compute visible length for this row
        const visLen = gridRowCells[gridRowCells.length - 1]
            .map((c) => stripAnsi(c).length)
            .reduce((a, b) => a + b, 0);
        if (visLen > maxGridVisibleWidth) maxGridVisibleWidth = visLen;
    }

    // Prepare the info lines (without borders) and compute their visible lengths
    const infoLines: string[] = [];
    if (isPart1) {
        infoLines.push(`  Accessible Rolls (< 4 neighbors): ${toRemove.length.toString().padStart(4)}`);
    } else {
        infoLines.push(`  Pass: ${passNumber.toString().padStart(3)}`);
        infoLines.push(`  Removing this pass: ${removedThisPass.toString().padStart(3)}`);
        infoLines.push(`  Total removed: ${totalRemoved.toString().padStart(4)}`);
    }
    infoLines.push('');
    infoLines.push('  Legend: @ = Roll  . = Empty  @ = Accessible');

    let maxInfoVisibleWidth = 0;
    for (const l of infoLines) {
        const vis = stripAnsi(l).length;
        if (vis > maxInfoVisibleWidth) maxInfoVisibleWidth = vis;
    }

    // Title width
    const title = '  FORKLIFT PAPER ROLL ACCESS';
    const titleWidth = stripAnsi(title).length;

    // Compute inner box width (visible chars)
    const minInner = 60;
    const termCols = (process && process.stdout && process.stdout.columns) ? process.stdout.columns : 80;
    const maxAllowedInner = Math.max(20, termCols - 2);
    let innerWidth = Math.max(minInner, maxGridVisibleWidth, maxInfoVisibleWidth, titleWidth);
    // Don't exceed terminal width to avoid line-wrapping which creates visual artifacts
    if (innerWidth > maxAllowedInner) innerWidth = maxAllowedInner;

    const borderTop = '╔' + '═'.repeat(innerWidth) + '╗';
    const borderSep = '╠' + '═'.repeat(innerWidth) + '╣';
    const borderBottom = '╚' + '═'.repeat(innerWidth) + '╝';

    const lines: string[] = [];
    lines.push('');
    lines.push(borderTop);
    // center title
    const titlePadding = Math.max(0, Math.floor((innerWidth - titleWidth) / 2));
    lines.push('║' + ' '.repeat(titlePadding) + title + ' '.repeat(innerWidth - titlePadding - titleWidth) + '║');
    lines.push(borderSep);
    lines.push('');

    // Add grid rows, padding/truncating to innerWidth while preserving ANSI cell colors
    for (const cells of gridRowCells) {
        let display = '';
        let visible = 0;
        for (const cell of cells) {
            const cellVis = stripAnsi(cell).length;
            if (visible + cellVis > innerWidth) {
                // can't fit this cell fully; stop to avoid partial-cell color issues
                break;
            }
            display += cell;
            visible += cellVis;
        }
        const pad = Math.max(0, innerWidth - visible);
        lines.push('║' + display + ' '.repeat(pad) + '║');
    }

    lines.push('');
    lines.push(borderSep);

    for (const l of infoLines.slice(0, infoLines.length - 1)) {
        const visLen = stripAnsi(l).length;
        const pad = Math.max(0, innerWidth - visLen);
        lines.push('║' + l + ' '.repeat(pad) + '║');
    }

    // separator before legend
    lines.push(borderSep);
    const legend = infoLines[infoLines.length - 1];
    const padLegend = Math.max(0, innerWidth - stripAnsi(legend).length);
    lines.push('║' + legend + ' '.repeat(padLegend) + '║');
    lines.push(borderBottom);

    return lines.join('\n');
};

const visualizePart1 = async (instructions: string[],): Promise<number> => {
    const grid = instructions
        .filter((line) => line.trim().length > 0)
        .map((line) => line.split(''));

    if (grid.length === 0) {
        return 0;
    }

    // Find all accessible rolls
    const toRemove: { x: number; y: number }[] = [];

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                // Count adjacent rolls
                let adjacentRolls = 0;
                const directions = [
                    [-1, -1],
                    [-1, 0],
                    [-1, 1],
                    [0, -1],
                    [0, 1],
                    [1, -1],
                    [1, 0],
                    [1, 1],
                ];

                for (const [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;

                    if (
                        newY >= 0 &&
                        newY < grid.length &&
                        newX >= 0 &&
                        newX < grid[newY].length &&
                        grid[newY][newX] === '@'
                    ) {
                        adjacentRolls++;
                    }
                }

                // Accessible if fewer than 4 adjacent rolls
                if (adjacentRolls < 4) {
                    toRemove.push({ x, y });
                }
            }
        }
    }

    // Show the result
    render(drawVisualization(grid, toRemove, 1, 0, toRemove.length, true));
    await sleep(2000);

    return toRemove.length;
};

const visualizePart2 = async (instructions: string[],): Promise<number> => {
    const grid = instructions
        .filter((line) => line.trim().length > 0)
        .map((line) => line.split(''));

    if (grid.length === 0) {
        return 0;
    }

    let totalRemoved = 0;
    let removedInPass = true;
    let passNumber = 0;

    // Show initial state
    render(drawVisualization(grid, [], 0, 0, 0));
    await sleep(1000);

    // Keep removing accessible rolls until no more can be removed
    while (removedInPass) {
        removedInPass = false;
        passNumber++;
        const toRemove: { x: number; y: number }[] = [];

        // Find all rolls that can be accessed (fewer than 4 adjacent rolls)
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === '@') {
                    // Count adjacent rolls
                    let adjacentRolls = 0;
                    const directions = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [0, -1],
                        [0, 1],
                        [1, -1],
                        [1, 0],
                        [1, 1],
                    ];

                    for (const [dx, dy] of directions) {
                        const newX = x + dx;
                        const newY = y + dy;

                        if (
                            newY >= 0 &&
                            newY < grid.length &&
                            newX >= 0 &&
                            newX < grid[newY].length &&
                            grid[newY][newX] === '@'
                        ) {
                            adjacentRolls++;
                        }
                    }

                    if (adjacentRolls < 4) {
                        toRemove.push({ x, y });
                    }
                }
            }
        }

        // Show what will be removed
        if (toRemove.length > 0) {
            render(drawVisualization(grid, toRemove, passNumber, totalRemoved, toRemove.length));
            await sleep(500);

            // Remove all accessible rolls
            removedInPass = true;
            totalRemoved += toRemove.length;

            for (const { x, y } of toRemove) {
                grid[y][x] = '.';
            }

            // Show after removal
            render(drawVisualization(grid, [], passNumber, totalRemoved, 0));
            await sleep(500);
        }
    }

    // Show final state
    render(drawVisualization(grid, [], passNumber, totalRemoved, 0));
    await sleep(2000);

    return totalRemoved;
};

const promptUser = async (question: string,): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

const main = async (): Promise<void> => {
    try {
        // Enable alternate screen buffer to prevent scrolling
        process.stdout.write('\x1b[?1049h');
        // Clear screen once at the start
        process.stdout.write('\x1b[2J\x1b[H');
        // Hide cursor to reduce flicker while animating
        process.stdout.write('\x1b[?25l');

        const input: string = fs.readFileSync(
            'src/2025/day04/resources/input.txt',
            'utf8',
        );

        const instructions = input.trim().split(/\r?\n/);

        console.log('\n🎄 Advent of Code - Day 4 Visualization\n');
        const partChoice = await promptUser('Which part to visualize? (1 or 2): ');

        console.log('\nStarting visualization...\n');
        await sleep(1000);

        // Clear screen before starting animation
        process.stdout.write('\x1b[2J\x1b[H');

        let visualResult: number;
        let actualResult: number;
        const resultLines: string[] = [];

        if (partChoice.trim() === '1') {
            visualResult = await visualizePart1(instructions);
            actualResult = part1(instructions);
            resultLines.push('');
            resultLines.push(`  Visualization Result: ${visualResult}`);
            resultLines.push(`  Actual Part 1 Result: ${actualResult}`);
            resultLines.push(`  Match: ${visualResult === actualResult ? '✓' : '✗'}`);
        } else if (partChoice.trim() === '2') {
            visualResult = await visualizePart2(instructions);
            actualResult = part2(instructions);
            resultLines.push('');
            resultLines.push(`  Visualization Result: ${visualResult}`);
            resultLines.push(`  Actual Part 2 Result: ${actualResult}`);
            resultLines.push(`  Match: ${visualResult === actualResult ? '✓' : '✗'}`);
        } else {
            resultLines.push('Invalid part selected. Please choose 1 or 2.');
        }

        // Restore normal screen buffer before printing final results
        // show cursor again
        process.stdout.write('\x1b[?25h');
        process.stdout.write('\x1b[?1049l');

        // Print the final results to the normal screen
        if (resultLines.length > 0) {
            console.log('\n' + resultLines.join('\n'));
            console.log('');
        }
    } catch (err) {
        // Restore normal screen buffer even on error and ensure cursor visible
        process.stdout.write('\x1b[?25h');
        process.stdout.write('\x1b[?1049l');
        console.error('Error running visualization:');
        if (err instanceof Error) {
            console.error(`  Message: ${err.message}`);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

main();
