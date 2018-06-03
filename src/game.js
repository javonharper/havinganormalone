// @format

import ROT from 'rot-js'
import _ from 'lodash'
import { createStore } from 'redux'
import { create2dArray } from './utils'

const GRID_WIDTH = 50
const GRID_HEIGHT = 25

const initialState = {
  map: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        map: action.map,
      }

    case SET_TILE:
    // return {
    //   ...state,
    // }

    default:
      return state
  }
}

let store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

const SET_TILE = 'SET_TILE'
const SET_MAP = 'SET_MAP'

const setTile = (x, y, tile) => ({
  type: SET_TILE,
  x,
  y,
  tile,
})

const setMap = map => ({
  type: SET_MAP,
  map,
})

const initDisplay = () => {
  const display = new ROT.Display({ width: GRID_WIDTH, height: GRID_HEIGHT })
  document.getElementById('game').appendChild(display.getContainer())
  return display
  // display.draw(x, y, wall ? TILES.WALL : TILES.FLOOR)
}

const TILES = {
  WALL: '#',
  FLOOR: '.',
}

const initMap = display => {
  const multiarray = create2dArray(GRID_WIDTH, GRID_HEIGHT)
  store.dispatch(setMap(multiarray))

  const digger = new ROT.Map.Digger(GRID_WIDTH, GRID_HEIGHT)

  const callback = (x, y, wall) => {
    const tile = wall ? TILES.WALL : TILES.FLOOR
    // store.dispatch(setTile(x, y, tile))
  }

  const map = digger.create(callback)
}

// let coords = freeCells.random()
// const guy = {
//   act: () => {
//     engine.lock()
//
//     const passable = (x, y) => {
//       return _.some(freeCells, cell => {
//         if (x === cell[0] && y === cell[1]) {
//           return true
//         }
//       })
//     }
//
//     const astar = new ROT.Path.AStar(toilet[0], toilet[1], passable, {
//       topology: 4,
//     })
//     const path = []
//     const pathCallback = (x, y) => {
//       path.push([x, y])
//     }
//     astar.compute(coords[0], coords[1], pathCallback)
//
//     display.draw(coords[0], coords[1], '.', 'yellow')
//     path.shift()
//     if (_.isEmpty(path)) {
//       engine.lock()
//     } else {
//       const x = path[0][0]
//       const y = path[0][1]
//       coords[0] = x
//       coords[1] = y
//
//       setTimeout(() => engine.unlock(), 200)
//       console.log('moving to ...', x, y)
//     }
//     display.draw(coords[0], coords[1], '@', '#ffffff')
//   },
// }
//
// display.draw(coords[0], coords[1], '@', '#ffffff')
//
// const toilet = freeCells.random()
// display.draw(toilet[0], toilet[1], 'L', 'blue')
//
// const fridge = freeCells.random()
// display.draw(fridge[0], fridge[1], '0', 'white')
//
// const tv = freeCells.random()
// display.draw(tv[0], tv[1], 'T', 'red')
//
// const scheduler = new ROT.Scheduler.Simple()
// scheduler.add(guy, true)
// const engine = new ROT.Engine(scheduler)
// engine.start()

const display = initDisplay()
initMap(display)
