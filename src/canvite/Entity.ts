import { Renderer } from './Renderer'
import { IState } from './State'

export type Component
  = ((state: IState) => void)
  | ((state: IState, g: Renderer) => void)

export class Entity {
	public state: IState = {}
	public components: Component[] = []

	public static build(): EntityBuilder {
		return new EntityBuilder(new Entity())
	}
}

export class EntityBuilder {
	private entity: Entity

	public constructor(entity: Entity) {
		this.entity = entity
	}

	public withState(state: IState): EntityBuilder {
		for (const key in state) {
			this.entity.state[key] = state[key]
		}

		return this
	}

	public withComponent(component: Component): EntityBuilder {
		this.entity.components.push(component)
		return this
	}
	public withComponents(components: Component[]): EntityBuilder {
		this.entity.components = this.entity.components.concat(components)
		return this
	}

	public withPrefab(prefab: Entity): EntityBuilder {
		return this
			.withState(prefab.state)
			.withComponents(prefab.components)
	}

	public build(): Entity {
		return this.entity
	}
}
