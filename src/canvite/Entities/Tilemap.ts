import { IArchetype } from '../Archetype'
import { Color } from '../Color'
import { Renderer } from '../Renderer'
import { IState } from '../State'
import { Vector2 } from '../Vector'

export function buildArchetype(
	opts: {
		mapWidth: number,
		mapHeight: number,
		tileSize: number
	}
): IArchetype {
	return {
		state: {
			'map': buildMap(opts.mapWidth, opts.mapHeight),
			'palette': [
				{ color: new Color(0, 100, 255) },
				{ color: new Color(60, 160, 255) }
			] as Tile[]
		},
		components: [
			(state: IState, renderer: Renderer) => {
				const map = state['map'] as number[][]
				const palette = state['palette'] as Tile[]

				for (let y = 0; y < opts.mapHeight; y++) {
					for (let x = 0; x < opts.mapWidth; x++) {
						const screenX = x * opts.tileSize
						const screenY = y * opts.tileSize

						const tileIndex = map[y][x]
						const tile = palette[tileIndex]

						renderer.fillColor = tile.color
						renderer.fillRect(
							screenX,
							screenY,
							opts.tileSize,
							opts.tileSize
						)
					}
				}
			}
		]
	}
}

export interface Tile {
	color: Color
	img?: HTMLImageElement
}

function buildMap(w: number, h: number): number[][] {
	const map: number[][] = []

	for (let y = 0; y < h; y++) {
		map[y] = []
		for (let x = 0; x < w; x++) {
			map[y][x] = 0
		}
	}

	const startingY = Math.floor(Math.random() * (h - 2)) + 1
	let head = new Vector2(0, startingY)

	const dirs = [
		new Vector2(1, 0),
		new Vector2(0, 1),
		new Vector2(-1, 0),
		new Vector2(0, -1)
	]
	let dir = 0
	let stepsSinceTurn = 0

	function tryTurn(): void {
		const turnDir = Math.floor(Math.random() * 3 - 1)
		dir = (dir + turnDir) % dirs.length
		if (dir < 0) dir += dirs.length
		if (turnDir !== 0)
			stepsSinceTurn = 0
	}
	function canGo(): boolean {
		const pos = head.add(dirs[dir])
		if (pos.y <= 0 || pos.y >= (h - 1)) {
			console.log(`Could not travel to ${pos.toString()} as it is outside of vertical bounds
Head is at ${head.toString()} heading ${dirs[dir].toString()}`)
			return false
		}

		const blindSpot = new Vector2(dirs[dir].x * -1, dirs[dir].y * -1)

		for (let x = -1; x < 2; x++) {
			if (blindSpot.x && x === blindSpot.x)
				continue
			const nX = pos.x + x
			if (nX < 0 || nX >= w)
				continue
			for (let y = -1; y < 2; y++) {
				if (blindSpot.y && y === blindSpot.y)
					continue
				const nY = pos.y + y
				if (nY < 0 || nY >= h)
					continue
				if (map[nY][nX]) {
					console.log(`Blocking neighbour at { x: ${nX}, y: ${nY} } from ${pos.toString()}
Head is at ${head.toString()} heading ${dirs[dir].toString()}
Blind spot is ${blindSpot.toString()}`)
					return false
				}
			}
		}

		return true
	}
	function step(): void {
		map[head.y][head.x] = 1
		head = head.add(dirs[dir])
		stepsSinceTurn++
	}
	function isAtEnd() { return head.x < 0 || head.x >= w || head.y < 0 || head.y >= h }

	while (!isAtEnd()) {
		step()
		if (stepsSinceTurn >= 2)
			tryTurn()
		if (!canGo())
			break
	}

	return map
}
