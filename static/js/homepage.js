"use strict";

window.onload = init();

function init() {
    startGame('board1');
    startGame('board2');
    updateLeaderBoardTable();
}


function startGame(chess_board_id) {
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
    board = Chessboard(chess_board_id, config);
    
    // window.setTimeout(makeRandomMove, 500);
}


// ########################################################################################


function updateLeaderBoardTable() {
    let table_data = [
        {
            name: 'lowjack',
            total_games: 10,
            game_won: 10
        },
        {
            name: 'fastboot',
            total_games: 10,
            game_won: 9
        },
        {
            name: 'starboy_jb',
            total_games: 10,
            game_won: 8
        },
        {
            name: 'masterbios',
            total_games: 10,
            game_won: 7
        },
        {
            name: 'ikusab',
            total_games: 10,
            game_won: 6
        },
        {
            name: 'unam',
            total_games: 10,
            game_won: 5
        },
    ];

    let html = "";
    $.each(table_data, function(idx, data) {
        html += `
            <tr>
                <td>${idx + 1}</td>
                <td>${data['name']}</td>
                <td>${data['game_won']} / ${data['total_games']}</td>
            </tr>`;
    });

    html = `
        <table class="table table-borderless">
            <thead class="thead-light">
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Games</th>
                </tr>
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>`;

    $('#leaderboard_card .leaderboard_table').html(html);
}