// all game logic here

// Gameplay
// One or two playerys join the game
// Each player has to set it's board
// When both boards are set game starts
// Random select player to start
// All moves in turns has to be saved


const SHIP_TYPES = [
  { 
    type: 'shipType1',
    count: 5,
    fieldLength: 1
  },
  {
    type: 'shipType2',
    count: 4,
    fieldLength: 2
  },
  {
    type: 'shipType3',
    count: 3,
    fieldLength: 3
  },
  { type: 'shipType4',
    count: 2,
    fieldLength: 4
  },
  {
    type: 'shipType5',
    count: 1,
    fieldLength: 5
  },
]

const invokeError = (message: string) => {
  console.log(`Error: ${message}`)
}

export class Player {
  name: string
  board = new PlayerBoard()
  constructor(name: string) {
    this.name = name
  }
  handleShot(field: TField) {
    // logic here
  }
}

class PlayerBoard {
  board: TShipOnBoard[] = []

  addShip(ship: TShipOnBoard) {
   if(!this._isShipValid(ship)) return
    this.board.push(ship)
    const availableShipIndex = this._availableShips.findIndex(as => as.type === ship.type)
    this._availableShips[availableShipIndex].count--
  }
  getAvailableShips() {
    return this._availableShips
  }
  isBoardReady() {
    return !this._availableShips.some(shipType => shipType.count)
  }
  private _availableShips: TShipType[] = SHIP_TYPES

  private _isShipValid(ship: TShipOnBoard) {
    const shipType = this._availableShips.find(as => as.type === ship.type)
    if(!shipType || shipType.count === 0) {
      invokeError(`Ship ${ship.type} not available`)
      return false
    }
    if(!this._isVerticalOrHorizontal(ship)) {
      invokeError(`Ship alignment is not vertical or horizontal`)
      return false
    }
    if(ship.fields?.length !== shipType.fieldLength) {
      invokeError(`Incorrect ship length`)
      return false
    }
    if(this._isPlaceTaken(ship)) {
      invokeError(`Ship can not be placed on taken field`)
      return false
    }
    return true
  }
  private _isPlaceTaken(ship: TShipOnBoard) {
    return ship.fields.some(field => this._getTakenFields().includes(field))
  }
  private _isVerticalOrHorizontal(ship: TShipOnBoard) {
    const x = ship.fields[0][0]
    const y = ship.fields[0][1]
    for (let i = 1; i < ship.fields.length; i++) {
      if(!(x === ship.fields[i][0] || y === ship.fields[i][1])) {
        return false
      }
    }
    return true
  }
  private _getTakenFields() {
    const fields: TField[] = []
    this.board.forEach(s => {
      fields.push(...s.fields)
    })
    return fields
  }
}

export class Game {
  private _state: TState = 'WAITING'

  turns:[TPlayerTurn, TPlayerTurn][] = [] // maybe useless
  
  private _broadcastState() {
    console.log(this._state)
  }
}

// TYPES

type TState = 'WAITING' | 'IN_PROGRESS'

type TPlayerTurn = {
  shotCords: TField,
  hit: false,
  sink: false,
}

type TField = [number, number]

type TShipOnBoard = { type: string; fields: TField[] }

type TShipType = { type: string; count: number; fieldLength: number }