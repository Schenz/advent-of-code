// Shared helpers for Day 03

export const selectLargestSubsequence = (line: string, k: number): string => {
  const n = line.length;
  if (k <= 0) return '';

  let start = 0;
  const res: string[] = [];

  for (let pos = 0; pos < k; pos++) {
    const remaining = k - pos;
    const maxIndex = n - remaining;

    let bestIdx = start;
    let bestDigit = line[start];

    for (let i = start; i <= maxIndex; i++) {
      const d = line[i];
      if (d > bestDigit) {
        bestDigit = d;
        bestIdx = i;
        if (bestDigit === '9') break;
      }
    }

    res.push(bestDigit);
    start = bestIdx + 1;
  }

  return res.join('');
};

export const digitsStringToBigInt = (s: string): bigint => {
  if (!s) return 0n;
  return BigInt(s);
};
