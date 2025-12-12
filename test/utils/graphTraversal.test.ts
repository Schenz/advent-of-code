import { countAllPaths, findAllPaths, countPathsWithRequiredNodes } from '../../src/utils/graphTraversal';

describe('Graph Traversal - Cycle Detection', () => {
    it('should handle cyclic graphs without infinite loops', () => {
        // Graph with cycle: a -> b -> c -> a
        const cyclicGraph = new Map([
            ['a', ['b']],
            ['b', ['c']],
            ['c', ['a', 'd']],
            ['d', []]
        ]);

        const count = countAllPaths(cyclicGraph, 'a', 'd');
        expect(count).toBe(1); // Only path: a -> b -> c -> d (cycle ignored)
        
        const paths = findAllPaths(cyclicGraph, 'a', 'd');
        expect(paths).toEqual([['a', 'b', 'c', 'd']]);
    });

    it('should handle self-loops', () => {
        // Graph with self-loop on 'a'
        const selfLoopGraph = new Map([
            ['a', ['a', 'b']],
            ['b', ['c']],
            ['c', []]
        ]);

        const count = countAllPaths(selfLoopGraph, 'a', 'c');
        expect(count).toBe(1); // Only path: a -> b -> c (self-loop ignored)
        
        const paths = findAllPaths(selfLoopGraph, 'a', 'c');
        expect(paths).toEqual([['a', 'b', 'c']]);
    });

    it('should work correctly on DAGs (original behavior)', () => {
        const dagGraph = new Map([
            ['a', ['b', 'c']],
            ['b', ['d']],
            ['c', ['d']],
            ['d', []]
        ]);

        const count = countAllPaths(dagGraph, 'a', 'd');
        expect(count).toBe(2);
        
        const paths = findAllPaths(dagGraph, 'a', 'd');
        expect(paths.length).toBe(2);
        expect(paths).toContainEqual(['a', 'b', 'd']);
        expect(paths).toContainEqual(['a', 'c', 'd']);
    });

    it('should handle complex cycles', () => {
        // Graph with multiple cycles
        const complexGraph = new Map([
            ['a', ['b', 'c']],
            ['b', ['d']],
            ['c', ['d', 'a']], // c -> a creates cycle
            ['d', ['e', 'b']], // d -> b creates another cycle
            ['e', []]
        ]);

        const count = countAllPaths(complexGraph, 'a', 'e');
        expect(count).toBeGreaterThan(0); // Should find at least one path
        
        const paths = findAllPaths(complexGraph, 'a', 'e');
        expect(paths.length).toBeGreaterThan(0);
        
        // Verify no path contains repeated nodes (cycles)
        paths.forEach(path => {
            const uniqueNodes = new Set(path);
            expect(uniqueNodes.size).toBe(path.length);
        });
    });

    it('should handle required nodes with cycle detection', () => {
        const graph = new Map([
            ['a', ['b', 'c']],
            ['b', ['d', 'a']], // cycle
            ['c', ['d']],
            ['d', ['e']],
            ['e', []]
        ]);

        const count = countPathsWithRequiredNodes(graph, 'a', 'e', ['d']);
        expect(count).toBeGreaterThan(0);
    });
});
