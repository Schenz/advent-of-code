/**
 * Union-Find (Disjoint Set Union) data structure
 *
 * Efficiently tracks and merges disjoint sets with near-constant time operations.
 * Uses path compression and union by size for optimization.
 *
 * Common use cases:
 * - Finding connected components in a graph
 * - Detecting cycles in undirected graphs
 * - Kruskal's minimum spanning tree algorithm
 * - Dynamic connectivity problems
 */
export class UnionFind {
    private parent: number[];
    private size: number[];

    /**
     * Creates a UnionFind structure with n elements (0 to n-1)
     * Initially, each element is in its own set
     */
    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    /**
     * Finds the root (representative) of the set containing x
     * Uses path compression for optimization
     */
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    /**
     * Merges the sets containing x and y
     * Uses union by size for optimization
     * Returns true if a merge happened, false if already in same set
     */
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already in the same set
        }

        // Union by size
        if (this.size[rootX] < this.size[rootY]) {
            this.parent[rootX] = rootY;
            this.size[rootY] += this.size[rootX];
        } else {
            this.parent[rootY] = rootX;
            this.size[rootX] += this.size[rootY];
        }

        return true;
    }

    /**
     * Checks if x and y are in the same set
     */
    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }

    /**
     * Returns the size of the set containing x
     */
    getSetSize(x: number): number {
        const root = this.find(x);

        return this.size[root];
    }

    /**
     * Returns an array of all set sizes
     */
    getSetSizes(): number[] {
        const rootCounts = new Map<number, number>();

        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);

            rootCounts.set(root, (rootCounts.get(root) || 0) + 1);
        }

        return Array.from(rootCounts.values());
    }

    /**
     * Returns the number of disjoint sets
     */
    getSetCount(): number {
        const roots = new Set<number>();

        for (let i = 0; i < this.parent.length; i++) {
            roots.add(this.find(i));
        }

        return roots.size;
    }

    /**
     * Returns a map of root -> array of elements in that set
     */
    getSets(): Map<number, number[]> {
        const sets = new Map<number, number[]>();

        for (let i = 0; i < this.parent.length; i++) {
            const root = this.find(i);

            if (!sets.has(root)) {
                sets.set(root, []);
            }
            sets.get(root)!.push(i);
        }

        return sets;
    }
}
