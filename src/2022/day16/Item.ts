export type Item = {
    /** Valves that are open */
    openMask: number;
    /** How many minutes left */
    remaining: number;
    /** Current node */
    current: string;
    /** How much gas will flow out. */
    total: number;
};
