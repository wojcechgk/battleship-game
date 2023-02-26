import express from 'express'
import ws from 'ws'
import dotenv from 'dotenv'
import { Game, Player } from './services/gameLogic'

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

// Connection and 
wsServer.on('connection', socket => {

  socket.on('message', message => handlePlayerAction(message))
});

const player1 = new Player('John')
const player2 = new Player('Tom')
const game = new Game()


const handlePlayerAction = (message: ws.RawData) => {
  // Turn raw data message to object
  // Get action type from object
  // Invoke proper action
  console.log(message)
}
// Player action methods


// // game play
// player1.board.addShip({ type: 'shipType1', fields: [[0, 1]] })
// // ...
// // check after every board update
// if(player1.board.isBoardReady() && player2.board.isBoardReady()) {
//   // start game
// }
