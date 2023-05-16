import express from 'express'
import ws from 'ws'
import dotenv from 'dotenv'
// import { Game, Player } from './services/gameLogic'
import { randomUUID } from 'crypto';

const players: {
  socket: ws.WebSocket,
  playerId: string,
  board?: number[][],
} [] = [];
const state: {
  gameStarted: boolean,
  winner: string | null,
  turn: string | null,
  hits: number[][],
  mishits: number[][],
} = {
  gameStarted: false,
  winner: null,
  turn: null,
  hits: [],
  mishits: [],
};

dotenv.config();
const app = express();
const port = process.env.PORT;
const server = app.listen(port);
const wsServer = new ws.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});


wsServer.on('connection', socket => {
  handlePlayerConnection(socket)
  socket.on('message', message => {
    handlePlayerMessage(socket, message)
  })
})

const broadcastState = () => { 
  wsServer.clients.forEach(client => {
    client.send(state.toString())
  })
}

const handlePlayerConnection = (socket: ws.WebSocket) => {
  if(players.length > 2) {
    socket.close(403, '2 players already')
    return
  }
  const playerId = randomUUID()
  players.push({socket, playerId})
  if(players.length === 2) {
    state.gameStarted = true
    state.turn = players[0].playerId
  }
  broadcastState()
}

const handlePlayerMessage = (socket: ws.WebSocket, message: ws.RawData) => {
  const actionType = EActionType.board // TODO get action type from message
  const playerIndex = players.findIndex(p => p.socket === socket)
  if(!playerIndex) { 
    console.log('No player found! Executing action: ', actionType )
    return
  }
  if(actionType === EActionType.board) {
    setPlayerBoard(playerIndex, message)
  }
  else if(actionType === EActionType.hit) {
    handlePlayerHit(playerIndex, message)
  }
  broadcastState()
}

const setPlayerBoard = (playerIndex: number, message: ws.RawData) => {
  const board = [[1,2],[4,2]] // TODO get board from message
  players[playerIndex].board = board
}

const handlePlayerHit = (playerIndex: number, message: ws.RawData) => {
  // set player board
}

enum EActionType {
  board = "BOARD",
  hit = "HIT"  
}