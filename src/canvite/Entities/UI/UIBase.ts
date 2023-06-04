import { IUICanvasState } from './UICanvas'
import { IUINode } from './UINode'
import { UIRenderer } from './UIRenderer'

export abstract class UIBase implements IUINode {
	protected _children: IUINode[] = []

	public set children(children: IUINode[]) { this._children = children }
	public get children(): IUINode[] { return this.children }

	public render(
		g: UIRenderer,
		canv: IUICanvasState,
		parent?: IUINode
	) {
		for (const child of this._children) {
			child.render(g, canv, this)
		}
	}
}
