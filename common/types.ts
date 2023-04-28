type TState = 'WAITING' | 'IN_PROGRESS'

type TPlayerTurn = {
  shotCords: TField,
  hit: false,
  sink: false,
}

type TField = [number, number]

type TShipOnBoard = { type: string; fields: TField[] }

type TShipType = { type: string; count: number; fieldLength: number }