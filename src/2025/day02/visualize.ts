// Advent of Code - Day 2 - Console Visualization

import * as fs from 'fs';
import * as readline from 'readline';
import { part1 } from './part1.js';
import { part2 } from './part2.js';

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const clearConsole = (): void => {
  // Use ANSI escape codes to move cursor to home position without clearing
  process.stdout.write('\x1b[H');
};

// TODO: Implement drawVisualization function for this day
// This function should return a string representation of the current state
const drawVisualization = (
  stepNumber: number,
  totalSteps: number,
  // Add state parameters as needed for this day
): string => {
  const lines: string[] = [];

  lines.push('');
  lines.push('╔══════════════════════════════════════════════════════╗');
  lines.push('║                   VISUALIZATION                      ║');
  lines.push('╠══════════════════════════════════════════════════════╣');
  lines.push('║ Add visualization content here                       ║');
  lines.push('╠══════════════════════════════════════════════════════╣');
  lines.push(
    `║ Step: ${stepNumber.toString().padEnd(5)}/${totalSteps.toString().padStart(5)}                              ║`
  );
  lines.push('╚══════════════════════════════════════════════════════╝');

  return lines.join('\n');
};

const visualizePart1 = async (instructions: string[]): Promise<number> => {
  // WARNING: The `visualizePart1` function below is a template placeholder.
  // It does not implement the actual puzzle logic and currently returns a
  // placeholder result (0). You must copy the logic from `part1.ts` and
  // add visualization/state updates for accurate visual results. Until
  // implemented, the visualization result will NOT match `part1()`.
  // TODO: Implement visualization for part1
  // Copy the logic from part1.ts and add visualization calls
  let result = 0;

  let stepNumber = 0;
  const totalSteps = instructions.filter((l) => l.trim()).length;

  for (const raw of instructions) {
    const line = raw.trim();
    if (!line) continue;

    stepNumber++;

    // Implement your logic here

    // Show current state
    clearConsole();
    console.log(drawVisualization(stepNumber, totalSteps));
    await sleep(5);
  }

  clearConsole();
  console.log(drawVisualization(totalSteps, totalSteps));

  return result;
};

const visualizePart2 = async (instructions: string[]): Promise<number> => {
  // WARNING: The `visualizePart2` function below is a template placeholder.
  // It does not implement the actual puzzle logic and currently returns a
  // placeholder result (0). You must copy the logic from `part2.ts` and
  // add visualization/state updates for accurate visual results. Until
  // implemented, the visualization result will NOT match `part2()`.
  // TODO: Implement visualization for part2
  // Copy the logic from part2.ts and add visualization calls
  let result = 0;

  let stepNumber = 0;
  const totalSteps = instructions.filter((l) => l.trim()).length;

  for (const raw of instructions) {
    const line = raw.trim();
    if (!line) continue;

    stepNumber++;

    // Implement your logic here

    // Show current state
    clearConsole();
    console.log(drawVisualization(stepNumber, totalSteps));
    await sleep(5);
  }

  clearConsole();
  console.log(drawVisualization(totalSteps, totalSteps));

  return result;
};

const promptUser = async (question: string): Promise<string> => {
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
    // Clear screen once at the start
    process.stdout.write('\x1b[2J\x1b[H');

    const input: string = fs.readFileSync(
      'src/2025/day02/resources/input.txt',
      'utf8'
    );

    const instructions = input.trim().split(/\r?\n/);

    console.log('\n🎄 Advent of Code - Day 2 Visualization\n');
    const partChoice = await promptUser('Which part to visualize? (1 or 2): ');

    console.log('\nStarting visualization...\n');
    await sleep(1000);

    // Clear screen before starting animation
    process.stdout.write('\x1b[2J\x1b[H');

    let visualResult: number;
    let actualResult: number;

    if (partChoice.trim() === '1') {
      visualResult = await visualizePart1(instructions);
      actualResult = part1(instructions);
      console.log(`\n  Visualization Result: ${visualResult}`);
      console.log(`  Actual Part 1 Result: ${actualResult}`);
      console.log(`  Match: ${visualResult === actualResult ? '✓' : '✗'}\n`);
    } else if (partChoice.trim() === '2') {
      visualResult = await visualizePart2(instructions);
      actualResult = part2(instructions);
      console.log(`\n  Visualization Result: ${visualResult}`);
      console.log(`  Actual Part 2 Result: ${actualResult}`);
      console.log(`  Match: ${visualResult === actualResult ? '✓' : '✗'}\n`);
    } else {
      console.log('Invalid part selected. Please choose 1 or 2.');
    }
  } catch (err) {
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
