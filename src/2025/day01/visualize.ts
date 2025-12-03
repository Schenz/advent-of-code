// Advent of Code - Day 1 - Console Visualization

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

const drawCircularDial = (
  currentPos: number,
  instruction: string,
  stepNumber: number,
  totalSteps: number,
  count: number
): string => {
  const lines: string[] = [];
  const radius = 10;
  const centerX = 27;
  const centerY = 12;

  // Create empty canvas - taller to show full circle (25x54)
  const canvas: string[][] = Array(25)
    .fill(null)
    .map(() => Array(54).fill(' '));

  // Draw 16 numbers around the circle (every 6.25 positions for even spacing)
  const numPositions = 16;
  for (let i = 0; i < numPositions; i++) {
    const pos = Math.round((i * 100) / numPositions) % 100;
    // Start at top (0), go clockwise
    const angle = (i / numPositions) * 2 * Math.PI - Math.PI / 2;

    // No aspect ratio correction - canvas is nearly square
    const x = Math.round(centerX + radius * Math.cos(angle));
    const y = Math.round(centerY + radius * Math.sin(angle));

    const numStr = pos.toString().padStart(2, '0');

    if (y >= 0 && y < canvas.length && x >= 1 && x < canvas[0].length - 1) {
      canvas[y][x - 1] = numStr[0];
      canvas[y][x] = numStr[1];
    }
  }

  // Draw the pointer/indicator for current position
  const currentAngle = (currentPos / 100) * 2 * Math.PI - Math.PI / 2;
  const pointerRadius = radius - 2;

  // Draw line from center to current position (no aspect ratio correction)
  for (let r = 1; r <= pointerRadius; r++) {
    const x = Math.round(centerX + r * Math.cos(currentAngle));
    const y = Math.round(centerY + r * Math.sin(currentAngle));

    if (y >= 0 && y < canvas.length && x >= 0 && x < canvas[0].length) {
      canvas[y][x] = '│';
    }
  }

  // Draw pointer tip
  const tipX = Math.round(centerX + pointerRadius * Math.cos(currentAngle));
  const tipY = Math.round(centerY + pointerRadius * Math.sin(currentAngle));
  if (tipY >= 0 && tipY < canvas.length && tipX >= 0 && tipX < canvas[0].length) {
    canvas[tipY][tipX] = '►';
  }

  // Draw center point
  canvas[centerY][centerX] = '●';

  // Draw the current position prominently outside the circle
  const currX = Math.round(centerX + (radius + 2) * Math.cos(currentAngle));
  const currY = Math.round(centerY + (radius + 2) * Math.sin(currentAngle));
  const currStr = `>${currentPos.toString().padStart(2, '0')}<`;

  if (currY >= 0 && currY < canvas.length) {
    for (let i = 0; i < currStr.length && currX - 2 + i < canvas[0].length; i++) {
      if (currX - 2 + i >= 0) {
        canvas[currY][currX - 2 + i] = currStr[i];
      }
    }
  }

  // Convert canvas to string
  lines.push('');
  lines.push('╔══════════════════════════════════════════════════════╗');
  lines.push('║               LOCK DIAL VISUALIZATION                ║');
  lines.push('╠══════════════════════════════════════════════════════╣');

  for (const row of canvas) {
    lines.push('║' + row.join('') + '║');
  }

  lines.push('╠══════════════════════════════════════════════════════╣');
  lines.push(
    `║ Step: ${stepNumber.toString().padEnd(5)}/${totalSteps.toString().padStart(5)} │ Instr: ${instruction.padEnd(8)} │ Crosses: ${count.toString().padStart(4)}  ║`
  );
  lines.push('╚══════════════════════════════════════════════════════╝');

  return lines.join('\n');
};

const visualizePart1 = async (instructions: string[]): Promise<number> => {
  // EXACT COPY of part1.ts logic with visualization added
  let pos = 50;
  let count = 0;

  let stepNumber = 0;
  const totalSteps = instructions.filter((l) => l.trim()).length;

  for (const raw of instructions) {
    const line = raw.trim();
    if (!line) continue;

    stepNumber++;
    const dir = line[0];
    const dist = Number(line.slice(1));

    if (Number.isNaN(dist)) continue;

    // Store old position for animation
    const oldPos = pos;

    // EXACT logic from part1.ts - do the movement
    if (dir === 'R') {
      pos = (pos + dist) % 100;
    } else if (dir === 'L') {
      pos = ((pos - dist) % 100 + 100) % 100;
    } else {
      continue;
    }

    // EXACT logic from part1.ts - check if we landed on 0
    if (pos === 0) count++;

    // Now animate the movement step by step (animate EVERY position change)
    const animationFrames = Math.min(dist, 100); // Animate up to 100 clicks, otherwise every click
    const increment = dist / animationFrames;
    let animPos = oldPos;

    for (let frame = 0; frame < animationFrames; frame++) {
      if (dir === 'R') {
        animPos = (animPos + increment) % 100;
      } else if (dir === 'L') {
        animPos = ((animPos - increment) % 100 + 100) % 100;
      }

      clearConsole();
      console.log(
        drawCircularDial(
          Math.round(animPos),
          line,
          stepNumber,
          totalSteps,
          count
        )
      );
      await sleep(5);
    }

    // Show final position
    clearConsole();
    console.log(drawCircularDial(pos, pos === 0 ? `${line} ✓` : line, stepNumber, totalSteps, count));
    await sleep(pos === 0 ? 100 : 5);
  }

  clearConsole();
  console.log(
    drawCircularDial(pos, 'COMPLETE!', stepNumber, totalSteps, count)
  );

  return count;
};

const visualizePart2 = async (instructions: string[]): Promise<number> => {
  // EXACT COPY of part2.ts logic with visualization added
  let pos = 50;
  let count = 0;

  let stepNumber = 0;
  const totalSteps = instructions.filter((l) => l.trim()).length;

  for (const raw of instructions) {
    const line = raw.trim();
    if (!line) continue;

    stepNumber++;
    const dir = line[0];
    const dist = Number(line.slice(1));

    if (Number.isNaN(dist)) continue;

    // Store old position for animation
    const oldPos = pos;

    // EXACT logic from part2.ts
    const s = ((pos % 100) + 100) % 100;

    // For right rotations, we hit 0 when k ≡ (100 - s) mod 100
    // For left rotations, we hit 0 when k ≡ s mod 100
    let firstK = 0;
    if (dir === 'R') {
      firstK = (100 - s) % 100;
      if (firstK === 0) firstK = 100;
    } else if (dir === 'L') {
      firstK = s % 100;
      if (firstK === 0) firstK = 100;
    } else {
      continue;
    }

    if (dist >= firstK) {
      count += 1 + Math.floor((dist - firstK) / 100);
    }

    // advance to final position
    if (dir === 'R') {
      pos = (pos + dist) % 100;
    } else {
      pos = ((pos - dist) % 100 + 100) % 100;
    }

    // Now animate the movement step by step (animate EVERY position change)
    const animationFrames = Math.min(dist, 100); // Animate up to 100 clicks, otherwise every click
    const increment = dist / animationFrames;
    let animPos = oldPos;

    for (let frame = 0; frame < animationFrames; frame++) {
      if (dir === 'R') {
        animPos = (animPos + increment) % 100;
      } else if (dir === 'L') {
        animPos = ((animPos - increment) % 100 + 100) % 100;
      }

      clearConsole();
      console.log(
        drawCircularDial(
          Math.round(animPos),
          line,
          stepNumber,
          totalSteps,
          count
        )
      );
      await sleep(5);
    }

    // Show final position
    clearConsole();
    console.log(drawCircularDial(pos, line, stepNumber, totalSteps, count));
    await sleep(5);
  }

  clearConsole();
  console.log(
    drawCircularDial(pos, 'COMPLETE!', stepNumber, totalSteps, count)
  );

  return count;
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
      'src/2025/day01/resources/input.txt',
      'utf8'
    );

    const instructions = input.trim().split(/\r?\n/);

    console.log('\n🔒 Lock Dial Visualization\n');
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