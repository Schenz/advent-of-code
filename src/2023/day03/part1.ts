// Advent of Code - Day 3 - Part One

export function getAdj(y: number, x: number): [number, number][] {
  return [
    [y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
    [y, x - 1], [y, x + 1],
    [y + 1, x - 1], [y + 1, x], [y + 1, x + 1],
  ]
}

export function part1(lines: string[]): number {
  const ok = (c: string) => (c >= '0' && c <= '9') || c === '.'

  const parts = []
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    let seq = ''
    let bad = false
    for (let x = 0; x < line.length; x++) {
      const char = line[x]
      if (char >= '0' && char <= '9') {
        if (!getAdj(y, x).map(([ay, ax]) => lines.at(ay)?.at(ax)).every(a => a === undefined || ok(a))) {
          bad = true
        }
        seq += char
      } else {
        if (bad && seq.length > 0) {
          parts.push(parseInt(seq))
        }
        seq = ''
        bad = false
      }
    }
    if (bad && seq.length > 0) {
      parts.push(parseInt(seq))
    }
  }
  return parts.reduce((a, b) => a + b, 0)
}
