import { Component } from './Entity'
import { IState } from './State'

export interface IArchetype {
	state: IState,
	components: Component[]
}
