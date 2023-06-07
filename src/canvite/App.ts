import { Entity, EntityBuilder } from './Entity'
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
			for (const component of entity.components)
				component(entity.state, this.renderer)
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

	public addEntity(entity: Entity | EntityBuilder): void {
		if (entity instanceof EntityBuilder)
			entity = entity.build()

		this.entities.push(entity)
	}
}
