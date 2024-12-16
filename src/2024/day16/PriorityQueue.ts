export type MetricFunction<T> = (a: T, b: T) => number;
export type HeapElement<T> = T[];

export class PriorityQueue<T> {
    private metr: MetricFunction<T>;
    private heap: HeapElement<T>;

    constructor(metr?: MetricFunction<T>) {
        this.metr = metr || ((a: T, b: T): number => (a as any) - (b as any)); // Default to max heap for numeric values
        this.heap = [];
    }

    private swap(a: number, b: number): number {
        const temp = this.heap[a];

        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
        return b;
    }

    private parent(pos: number): number {
        return Math.floor((pos - 1) / 2);
    }

    private higherChild(pos: number): number | null {
        const left = pos * 2 + 1;
        const right = pos * 2 + 2;

        if (left >= this.heap.length) {
            return null;
        }

        if (right >= this.heap.length || this.cmp(left, right) >= 0) {
            return left;
        }
        return right;
    }

    private cmp(p1: number, p2: number): number {
        return this.metr(this.heap[p1], this.heap[p2]);
    }

    push(item: T): void {
        let itemPos = this.heap.length;

        this.heap.push(item);

        while (itemPos > 0 && this.cmp(itemPos, this.parent(itemPos)) > 0) {
            itemPos = this.swap(itemPos, this.parent(itemPos));
        }
    }

    pop(): T | undefined {
        if (this.heap.length === 0) {
            return undefined;
        }

        this.swap(0, this.heap.length - 1);
        const item = this.heap.pop();
        let pos = 0;

        while (pos < this.heap.length) {
            const child = this.higherChild(pos);

            if (child === null || this.cmp(pos, child) >= 0) {
                break;
            }

            pos = this.swap(pos, child);
        }

        return item;
    }

    top(): T | undefined {
        return this.heap[0];
    }
}
