// Advent of Code - Day 2 - Utilities

export interface Range {
  start: number;
  end: number;
}

export const parseRanges = (input: string[]): Range[] => {
  const line = input.join('');
  return line.split(',').map(range => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
  });
};

export const sumInvalidIds = (
  ranges: Range[],
  isInvalid: (id: number) => boolean
): number => {
  let sum = 0;

  for (const { start, end } of ranges) {
    for (let id = start; id <= end; id++) {
      if (isInvalid(id)) {
        sum += id;
      }
    }
  }

  return sum;
};

export const isRepeatedPattern = (str: string, times: number): boolean => {
  const len = str.length;

  // Must be divisible by the number of repetitions
  if (len % times !== 0) {
    return false;
  }

  const patternLen = len / times;
  const pattern = str.substring(0, patternLen);

  // Check if the entire string is made of this pattern repeated
  for (let i = patternLen; i < len; i += patternLen) {
    if (str.substring(i, i + patternLen) !== pattern) {
      return false;
    }
  }

  return true;
};