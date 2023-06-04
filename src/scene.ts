import { App } from './canvite/App'
import { Color } from './canvite/Color'
import { Entity } from './canvite/Entity'
import { Renderer } from './canvite/Renderer'
import { IState } from './canvite/State'
import { Vector2 } from './canvite/Vector'
import { buildArchetype as buildTilemap } from './canvite/Entities/Tilemap'

export function buildScene(app: App): void {
	app.addEntity(new Entity()
		.withArchetype(
			buildTilemap({
				mapWidth: 16,
				mapHeight: 9,
				tileSize: 80
			})
		)
	)
	/*
	app.addEntity(new Entity()
		.withState({
			'pos': new Vector2(50, 50),
			'size': new Vector2(50, 50),
			'color': new Color(0, 100, 255),
		})
		.withComponent(
			(state: IState, g: Renderer) => {
				const pos  = state['pos']  as Vector2
				const size = state['size'] as Vector2
				if (!pos || !size)
					throw new Error('No pos/size??')

				let color = state['color'] as Color
				if (!color)
					color = Color.WHITE

				g.fillColor = color
				g.fillRect(
					pos.x - (size.x / 2),
					pos.y - (size.y / 2),
					size.x,
					size.y
				)
			}
		)
	)
	*/
}
