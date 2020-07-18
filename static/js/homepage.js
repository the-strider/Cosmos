"use strict";

window.onload = init();

function init() {
    startGame();
}


function startGame() {
    var board = null;
    var game = new Chess();

    function onDragStart (source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (game.game_over()) return false
      
        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false
        }
    }

    function onDrop (source, target) {

        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });
      
        // illegal move
        if (move === null) return 'snapback'
    }

    function onSnapEnd () {
        board.position(game.fen())
    }

    function makeRandomMove () {
        var possibleMoves = game.moves()
      
        // exit if the game is over
        if (game.game_over()) return
      
        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIdx])
        board.position(game.fen())
      
        window.setTimeout(makeRandomMove, 500)
    }
 
    var config = {
        pieceTheme: "/static/images/chesspieces/wikipedia/{piece}.png",
        dropOffBoard: 'snapback',
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    board = Chessboard('board1', config);
    // window.setTimeout(makeRandomMove, 500);
}