// all game logic here

// Gameplay
// One or two playerys join the game
// Each player has to set it's board
// When both boards are set game starts
// Random select player to start
// All moves in turns has to be saved


const shipTypes = [
  { 
    type: 'shipType1',
    count: 5,
    areas: 1
  },
  {
    type: 'shipType2',
    count: 4,
    areas: 2
  },
  {
    type: 'shipType3',
    count: 3,
    areas: 3
  },
  { type: 'shipType4',
    count: 2,
    areas: 4
  },
  {
    type: 'shipType5',
    count: 1,
    areas: 5
  },
]

class Player {
  name: string
  playerBoard: PlayerBoard
  constructor(name: string) {
    this.name = name
    this.playerBoard = new PlayerBoard()
  }
}

class PlayerBoard {
  board: TShipOnBoard[] = []

  addShip(ship: TShipOnBoard) {
   if(!this._isShipValid(ship)) return
    this.board.push(ship)
  }

  private _availableShips = shipTypes

  private _isShipValid(ship: TShipOnBoard) {
    const shipType = this._availableShips.find(as => as.type === ship.type)
    if(!shipType) {
      this._invokeError(`Ship ${ship.type} not available`)
      return false
    }
    if(!(ship.from[0] === ship.to[0] || ship.from[1] === ship.to[1])) {
      this._invokeError(`Ship coords are not straights`)
      return false
    }
    if(this._countLength(ship.from, ship.to) === shipType.areas) {
      this._invokeError(`Incorrect ship length`)
      return false
    }
    if(this._isPlaceTaken(ship.from, ship.to) === shipType.areas) {
      this._invokeError(`Ship can not be placed on taken field`)
      return false
    }
    return true
  }
  private _countLength(from: TCoords, to: TCoords) {
    const x = to[0] - from[0] 
    const y = to[1] - from[1]
    return x ? y : x 
  }
  private _isPlaceTaken(from: TCoords, to: TCoords) {
    const x = to[0] - from[0]
    const y = to[1] - from[1]
    return x ? y : x 
  }
  private _invokeError(message: string) {
    console.log(`Error: ${message}`)
  }
}

// TURNS
const turns:[TPlayerTurn, TPlayerTurn][] = []

// TYPES

type TPlayerTurn = {
  shotCords: TCoords,
  hit: false,
  sink: false,
}
// TODO: rename to TField
type TCoords = [number, number]

// TODO: from and to has to be changed to list of fields to simplify validation
type TShipOnBoard = { type: string; from: TCoords; to: TCoords }

type TShip = { type: string; count: number; areas: number }