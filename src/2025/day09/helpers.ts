// Shared helpers for Day 9 geometry logic

export type Point = [number, number];

export const parsePoints = (input: string[]): Point[] =>
  input
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [x, y] = line.split(',').map(Number);
      return [x, y] as Point;
    });

export const rectangleArea = (a: Point, b: Point): number => {
  const width = Math.abs(a[0] - b[0]) + 1;
  const height = Math.abs(a[1] - b[1]) + 1;
  return width * height;
};

// Coordinate compression for part2: map unique coords to indices
export const buildCoordinateMap = (
  points: Point[],
): {
  xCoords: number[];
  yCoords: number[];
  compressX: (x: number) => number;
  compressY: (y: number) => number;
} => {
  const xCoords = Array.from(new Set(points.map(([x]) => x))).sort((a, b) => a - b);
  const yCoords = Array.from(new Set(points.map(([, y]) => y))).sort((a, b) => a - b);

  return {
    xCoords,
    yCoords,
    compressX: (x: number): number => xCoords.indexOf(x) * 2,
    compressY: (y: number): number => yCoords.indexOf(y) * 2,
  };
};