import { Color } from './Color'

export class Renderer {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D

	public backgroundColor: Color = Color.BLACK

	public constructor(
		canvas: HTMLCanvasElement,
		ctx: CanvasRenderingContext2D
	) {
		this.canvas = canvas
		this.ctx = ctx
	}

	public set fillColor(color: Color) { this.ctx.fillStyle = color.cssString }

	public background(): void {
		this.ctx.fillStyle = this.backgroundColor.cssString
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}

	public fillRect(x: number, y: number, w: number, h: number): void {
		this.ctx.fillRect(x, y, w, h)
	}
}
