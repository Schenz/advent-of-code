// Advent of Code - Day 2 - Part One

export function part1(input: string[]): number {
  let score = 0;

  input.forEach(value => {
    const choices = value.split(" ");
    const elf = getChoiceName(choices[0]);
    const me = getChoiceName(choices[1]);
    
    if (elf === me) {
      score += 3;
      score += scoreShape(me);
    } else if (me == 'rock') {
      if (elf == 'paper') {
        score += scoreShape(me);
      } else {
        score += 6;
        score += scoreShape(me);
      }
    } else if (me == 'scissors') {
      if (elf == 'rock') {
        score += scoreShape(me);
      } else {
        score += 6;
        score += scoreShape(me);
      }
    } else if (me == 'paper') {
      if (elf == 'scissors') {
        score += scoreShape(me);
      } else {
        score += 6;
        score += scoreShape(me);
      }
    }
  });

  return score;
}

function getChoiceName(value: string): string {
  if (value === "A" || value == "X") {
    return "rock";
  } else if (value === "B" || value == "Y") {
    return "paper";
  } else if (value === "C" || value == "Z") {
    return "scissors";
  } else {
    return "";
  }
}

function scoreShape(value: string): number {
  if (value === "rock") {
    return 1;
  } else if (value === "paper") {
    return 2;
  } else if (value === "scissors") {
    return 3;
  } else {
    return 0;
  }
}