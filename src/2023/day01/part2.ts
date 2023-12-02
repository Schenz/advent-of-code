// Advent of Code - Day 1 - Part Two

export function part2(input: string[]): number {
  return input.reduce((acc, line) => {
    const digits = line.split('').map((char, index) => {
      const nxt = line.slice(index)
      if (nxt.startsWith('one')) return 1
      if (nxt.startsWith('two')) return 2
      if (nxt.startsWith('three')) return 3
      if (nxt.startsWith('four')) return 4
      if (nxt.startsWith('five')) return 5
      if (nxt.startsWith('six')) return 6
      if (nxt.startsWith('seven')) return 7
      if (nxt.startsWith('eight')) return 8
      if (nxt.startsWith('nine')) return 9
      return parseInt(char)
    }).filter(n => !!n)
    return acc + Number('' + digits[0] + digits.at(-1))
  }, 0)
}
