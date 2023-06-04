export class Color {
	public r: number
	public g: number
	public b: number
	public a: number

	public constructor(
		r: number,
		g: number,
		b: number,
		a: number = 255
	) { 
		this.r = r
		this.g = g
		this.b = b
		this.a = a
	}

	public get cssString(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}

	public static get WHITE(): Color {
		return new Color(255, 255, 255)
	}
	public static get BLACK(): Color {
		return new Color(0, 0, 0)
	}
	public static get TRANSPARENT(): Color {
		return new Color(0, 0, 0, 0)
	}
}
