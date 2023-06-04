import { IArchetype } from '../../Archetype'
import { Renderer } from '../../Renderer'
import { IState } from '../../State'
import { IUINode } from './UINode'
import {UIRenderer} from './UIRenderer'
import { UIRoot } from './UIRoot'

export interface IUICanvasState {
	root: IUINode
}

export function buildArchetype(): IArchetype {
	return {
		state: {
			canvas: {
				root: new UIRoot()
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
