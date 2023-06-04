import { IUICanvasState } from './UICanvas'
import { UIRenderer } from './UIRenderer'

export interface IUINode {
	children: IUINode[]
	render(
		g: UIRenderer,
		canvas: IUICanvasState,
		parent?: IUINode
	): void
}
