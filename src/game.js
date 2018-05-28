// @format

const display = new ROT.Display({ width: 50, height: 25 })
document.body.appendChild(display.getContainer())

const freeCells = []
const map = new ROT.Map.Digger(50, 25)

const callback = (x, y, value) => {
  if (value) {
  } else {
    freeCells.push([x, y])
  }

  display.draw(x, y, value ? '#' : '.')
}

map.create(callback)

let coords = freeCells.random()
const guy = {
  act: () => {
    engine.lock()

    const passable = (x, y) => {
      return _.some(freeCells, cell => {
        if (x === cell[0] && y === cell[1]) {
          return true
        }
      })
    }

    const astar = new ROT.Path.AStar(toilet[0], toilet[1], passable, {
      topology: 4,
    })
    const path = []
    const pathCallback = (x, y) => {
      path.push([x, y])
    }
    astar.compute(coords[0], coords[1], pathCallback)

    display.draw(coords[0], coords[1], '.', 'yellow')
    path.shift()
    if (_.isEmpty(path)) {
      engine.lock()
    } else {
      x = path[0][0]
      y = path[0][1]
      coords[0] = x
      coords[1] = y

      setTimeout(() => engine.unlock(), 200)
      console.log('moving to ...', x, y)
    }
    display.draw(coords[0], coords[1], '@', '#ffffff')
  },
}

display.draw(coords[0], coords[1], '@', '#ffffff')

const toilet = freeCells.random()
display.draw(toilet[0], toilet[1], 'L', 'blue')

const fridge = freeCells.random()
display.draw(fridge[0], fridge[1], '0', 'white')

const tv = freeCells.random()
display.draw(tv[0], tv[1], 'T', 'red')

const scheduler = new ROT.Scheduler.Simple()
scheduler.add(guy, true)
const engine = new ROT.Engine(scheduler)
engine.start()
