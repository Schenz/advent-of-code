export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Add another vector to this vector
    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    // Subtract another vector from this vector
    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Check if two vectors are equal
    equals(other: Vector): boolean {
        return this.x === other.x && this.y === other.y;
    }

    // Returns the vector as a string for debugging
    toString(): string {
        return `Vector(${this.x}, ${this.y})`;
    }
}
