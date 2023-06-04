import {IArchetype} from './Archetype'
import { Renderer } from './Renderer'
import { IState } from './State'

export type Component
  = ((state: IState) => void)
  | ((state: IState, g: Renderer) => void)

export class Entity {
	public state: IState = {}
	public components: Component[] = []

	public update(g: Renderer): void {
		for (const component of this.components) {
			component(this.state, g)
		}
	}

	public withState(state: IState): Entity {
		for (const key in state) {
			this.state[key] = state[key]
		}

		return this
	}

	public withComponent(component: Component): Entity {
		this.components.push(component)
		return this
	}
	public withComponents(components: Component[]): Entity {
		this.components = this.components.concat(components)
		return this
	}

	public withArchetype(archetype: IArchetype): Entity {
		return this
			.withState(archetype.state)
			.withComponents(archetype.components)
	}
}
