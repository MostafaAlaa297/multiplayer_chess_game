let board;
let game;

window.onload = function () {
    initGame();
};

const initGame = function() {
   const cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

// called when a player makes a move on the board UI
const handleMove = function(source, target ) {
    const move = game.move({from: source, to: target});
    
    if (move === null)  return 'snapback';
    else socket.emit("move", move);
};

 // setup my socket client
 const socket = io();
 
  window.onclick = function(e) {
      socket.emit('message', 'hello world!');
  };

// called when the server calls socket.broadcast("move")
socket.on("move", function(msg){
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});