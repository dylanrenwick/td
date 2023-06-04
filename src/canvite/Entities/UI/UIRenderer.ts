import { Renderer } from '../../Renderer'

export class UIRenderer {
	private renderer: Renderer

	public constructor(g: Renderer) {
		this.renderer = g
	}
}
