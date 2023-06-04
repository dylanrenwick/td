export class Vector2 {
	public x: number
	public y: number

	public constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	public toString(): string {
		return `{ x: ${this.x}, y: ${this.y} }`
	}

	public add(other: Vector2): Vector2 {
		return new Vector2(
			this.x + other.x,
			this.y + other.y
		)
	}

	public sub(other: Vector2): Vector2 {
		return new Vector2(
			this.x - other.x,
			this.y - other.y
		)
	}
}
