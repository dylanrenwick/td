import { Entity } from './Entity'
import { Renderer } from './Renderer'

export class App {
	private entities: Entity[] = []

	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	private renderer: Renderer

	private intervalId: number = -1

	public constructor(canvas_id: string) {
		const canvas = document.querySelector<HTMLCanvasElement>(`#${canvas_id}`)
		if (!canvas)
			throw new Error(`Could not get canvas with id '#${canvas_id}'`)
		this.canvas = canvas

		const ctx = canvas.getContext('2d')
		if (!ctx)
			throw new Error('Could not get render context')
		this.ctx = ctx
		this.renderer = new Renderer(this.canvas, this.ctx)
	}

	public update(): void {
		this.renderer.background()

		for (const entity of this.entities)
			entity.update(this.renderer)
	}

	public start(): void {
		this.intervalId = setInterval(
			() => this.update(),
			16
		)
	}
	public stop(): void {
		clearInterval(this.intervalId)
	}

	public addEntity(entity: Entity): void {
		this.entities.push(entity)
	}
}
