// Advent of Code - Day 8 - Shared Utilities

export type Point3D = [number, number, number];

export interface Edge {
    dist: number;
    i: number;
    j: number;
}

export const euclideanDistance = (p1: Point3D, p2: Point3D): number => {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    const dz = p1[2] - p2[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const parsePoints = (input: string[]): Point3D[] => {
    return input
        .filter((line) => line.trim().length > 0)
        .map((line) => {
            const [x, y, z] = line.split(',').map(Number);
            return [x, y, z] as Point3D;
        });
};

export const calculateEdges = (points: Point3D[]): Edge[] => {
    const edges: Edge[] = [];
    const n = points.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = euclideanDistance(points[i], points[j]);
            edges.push({ dist, i, j });
        }
    }

    // Sort by distance (ascending)
    edges.sort((a, b) => a.dist - b.dist);

    return edges;
};
