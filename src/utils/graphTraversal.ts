// Graph traversal utilities

// Flexible DFS state for tracking paths and required nodes
interface DFSState {
    paths?: string[][];
    pathCount?: number;
    requiredRemaining?: Set<string>;
}

/**
 * Core DFS implementation for graph traversal.
 * Handles counting paths, collecting paths, or counting paths with required nodes.
 */
const dfsTraverse = (
    graph: Map<string, string[]>,
    current: string,
    target: string,
    state: DFSState,
    path: string[] = [],
    memo?: Map<string, number>,
    getMemoKey?: (current: string, remaining: Set<string>) => string
): number => {
    // Check if we've reached the target
    if (current === target) {
        if (state.paths) {
            // Mode: collect all paths
            state.paths.push([...path, current]);
            return 1;
        } else if (state.requiredRemaining !== undefined) {
            // Mode: count paths with required nodes
            return state.requiredRemaining.size === 0 ? 1 : 0;
        } else {
            // Mode: simple count
            return 1;
        }
    }

    // Dead end if node doesn't exist in graph
    if (!graph.has(current)) {
        return 0;
    }

    // Check memoization for constrained mode
    if (memo && getMemoKey && state.requiredRemaining !== undefined) {
        const memoKey = getMemoKey(current, state.requiredRemaining);

        if (memo.has(memoKey)) {
            return memo.get(memoKey) || 0;
        }
    }

    let totalPaths = 0;
    const destinations = graph.get(current) || [];

    for (const next of destinations) {
        // Handle required nodes tracking
        let newRemaining = state.requiredRemaining;

        if (state.requiredRemaining) {
            newRemaining = new Set(state.requiredRemaining);

            if (newRemaining.has(next)) {
                newRemaining.delete(next);
            }
        }

        const nextState: DFSState = {
            paths: state.paths,
            pathCount: state.pathCount,
            requiredRemaining: newRemaining,
        };

        totalPaths += dfsTraverse(graph, next, target, nextState, [...path, current], memo, getMemoKey);
    }

    // Store in memo if we have memoization
    if (memo && getMemoKey && state.requiredRemaining !== undefined) {
        const memoKey = getMemoKey(current, state.requiredRemaining);

        memo.set(memoKey, totalPaths);
    }

    return totalPaths;
};

/**
 * Counts all paths from a source node to a target node in a directed acyclic graph (DAG).
 *
 * @param graph - Adjacency map where keys are nodes and values are arrays of destination nodes
 * @param source - Starting node
 * @param target - Goal node
 * @returns Total count of unique paths from source to target
 *
 * @example
 * const graph = new Map([
 *   ['a', ['b', 'c']],
 *   ['b', ['d']],
 *   ['c', ['d']],
 *   ['d', []]
 * ]);
 * countAllPaths(graph, 'a', 'd'); // Returns 2 (a->b->d and a->c->d)
 */
export const countAllPaths = (graph: Map<string, string[]>, source: string, target: string): number => {
    return dfsTraverse(graph, source, target, {});
};

/**
 * Finds all paths from a source node to a target node in a directed acyclic graph (DAG).
 * Returns the actual paths, not just the count.
 *
 * @param graph - Adjacency map where keys are nodes and values are arrays of destination nodes
 * @param source - Starting node
 * @param target - Goal node
 * @returns Array of paths, where each path is an array of nodes
 *
 * @example
 * const graph = new Map([
 *   ['a', ['b', 'c']],
 *   ['b', ['d']],
 *   ['c', ['d']],
 *   ['d', []]
 * ]);
 * findAllPaths(graph, 'a', 'd');
 * // Returns [['a', 'b', 'd'], ['a', 'c', 'd']]
 */
export const findAllPaths = (graph: Map<string, string[]>, source: string, target: string): string[][] => {
    const state: DFSState = { paths: [] };

    dfsTraverse(graph, source, target, state);
    return state.paths || [];
};

/**
 * Counts paths from a source node to a target node that visit all required nodes.
 * Uses memoization to avoid recomputing the same states.
 *
 * @param graph - Adjacency map where keys are nodes and values are arrays of destination nodes
 * @param source - Starting node
 * @param target - Goal node
 * @param requiredNodes - Array of nodes that must appear in every counted path
 * @returns Count of paths that visit all required nodes
 */
export const countPathsWithRequiredNodes = (
    graph: Map<string, string[]>,
    source: string,
    target: string,
    requiredNodes: string[]
): number => {
    const requiredSet = new Set(requiredNodes);

    requiredSet.delete(source);

    const memo = new Map<string, number>();
    const getMemoKey = (current: string, remaining: Set<string>): string => {
        const remainingArray = Array.from(remaining).sort().join(',');

        return `${current}|${remainingArray}`;
    };

    const state: DFSState = { requiredRemaining: requiredSet };

    return dfsTraverse(graph, source, target, state, [], memo, getMemoKey);
};
