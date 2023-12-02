// Advent of Code - Day 2 - Part Two

export function part2(input: string[]): number {
  let score = 0;

  input.forEach(value => {
    const choices = value.split(" ");
    const elf = getElfChoiceName(choices[0]);
    const me = getMyChoiceName(choices[1], elf);

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

function getElfChoiceName(value: string): string {
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

function getMyChoiceName(outcome: string, elfChoice: string): string {
  if (outcome == "X") {
    if (elfChoice == "rock") {
      return "scissors"
    } else if (elfChoice == "paper") {
      return "rock";
    } else {
      return "paper";
    }
  } else if (outcome == "Y") {
    return elfChoice;
  } else if (outcome == "Z") {
    // win
    if (elfChoice == "rock") {
      return "paper"
    } else if (elfChoice == "paper") {
      return "scissors";
    } else {
      return "rock";
    }
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