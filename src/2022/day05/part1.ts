// Advent of Code - Day 5 - Part One

export function part1(input: string[]): string {
  let stacks: { [key: number]: string[] } = {}
  let stackLines: string[] = [];
  let instructions: string[] = [];
  let instructionSwitch: boolean = false;

  input.forEach(value => {
    if (value === "" || value === undefined) {
      instructionSwitch = true;
    }

    if (instructionSwitch) {
      if (value.length > 0) {
        instructions.push(value);
      }
    }
    else {
      stackLines.push(value);
    }
  });

  for (let i = 0; i <= stackLines[0].length; i += 4) {
    let arr: string[] = []
    // from top to bottom
    for (let j = 0; j < stackLines.length - 1; j++) {
      const c = stackLines[j][i + 1] // c always at 2nd position in block
      if (c.trim().length > 0) {
        arr.push(c)
      }
    }
    stacks[Object.entries(stacks).length + 1] = arr
  }
  
  // SORT
  instructions.forEach((line) => {
    const split = line.split(' ')
    const amount = Number(split[1])
    const from = Number(split[3])
    const to = Number(split[5])

    let items = stacks[from].splice(0, amount)
    items.reverse()
    stacks[to].unshift(...items)
  });
  
  let answer = ''
  Object.entries(stacks).forEach(([_, value]) => {
    answer = answer.concat(value.shift()!)
  })
  
  return answer;
}
