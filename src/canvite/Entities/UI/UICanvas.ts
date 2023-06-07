import { Entity } from '../../Entity'
import { Renderer } from '../../Renderer'
import { IState } from '../../State'
import { UIBase } from './UIBase'
import { IUINode } from './UINode'
import { UIRenderer } from './UIRenderer'

export interface IUICanvasState {
	root: IUINode
}

export function buildArchetype(): Entity {
	return {
		state: {
			canvas: {
				root: new UIBase()
			} as IUICanvasState
		},
		components: [
			renderCanvas
		]
	}
}

function renderCanvas(
	state: IState,
	g: Renderer
): void {
	const canvas = state['canvas'] as IUICanvasState
	const root = canvas.root

	const uiRenderer = new UIRenderer(g)

	root.render(
		uiRenderer,
		canvas
	)
}
