import express from 'express'
import ws from 'ws'
import dotenv from 'dotenv'
import { Game, Player } from './services/gameLogic'
import { randomUUID } from 'crypto';

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

let game: Game
const players: Player[] = []

// Connection and player handling
wsServer.on('connection', socket => {
  handlePlayerConnection(socket)
  socket.on('message', message => {
    handlePlayerAction(message)
  })
})

const handlePlayerConnection = (socket: ws.WebSocket) => {
  if(players.length > 2) {
    socket.close(403, '2 players already')
    return
  }
  const playerId = randomUUID()
  const player = new Player(playerId)
  players.push(player)
  if(!game) {
    game = new Game()
  }
  socket.send(playerId)
  // send game state
}

const handlePlayerAction = (message: ws.RawData) => {
  // Turn raw data message to object
  // Get action type from object
  // Invoke proper action
  console.log(message)
}

// // game play
// player1.board.addShip({ type: 'shipType1', fields: [[0, 1]] })
// // ...
// // check after every board update
// if(player1.board.isBoardReady() && player2.board.isBoardReady()) {
//   // start game
// }
