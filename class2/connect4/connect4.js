// global variables
var player1 = '<span class="player1"></span>';
var player2 = '<span class="player2"></span>';
var currentPlayer = player1;

var board;

function newGame() {
    // 2D array to hold game board
    board = [
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0,]
    ]

    var table = '<table>';

    // create table buttons
    table += '<thead><tr>'
    for (var col = 0; col < board[0].length; col++) {
        // add buttons to drop piece
        table += '<td><button class="dropBtn" col="' + col + '">&darr;</button></td>';
    }
    table += '</tr></thead>'

    // output body of table
    table += '<tbody>';
    for (var row = 0; row < board.length; row++) {
        table += '<tr>';
        for (var col = 0; col < board[row].length; col++) {
            // board[row][col] would be the value (of 0)
            table += '<td><span class="space"></span></td>';
        }
        table += '</tr>';
    }

    table += '</tbody></table>';

    // output table
    $('#board').html(table);

    $('.dropBtn').on('click', drop);
}

function drop() {
    // "this" refers to object/element that called the function
    var col = $(this).attr('col');

    // check for open spot
    for (var row = board.length - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            dropPiece(row, col);

            // exit loop
            break;
        }
    }

    // disable button if col is full
    if (row === 0) {
        $(this).prop('disabled', 'disabled');
    }

    check4Win();

    changePlayer();
}

function dropPiece(row, col) {
    for (var i = 0; i <= row; i++) {
        //$('#board table tbody tr:eq(' + i + ') td:eq(' + col + ') .space').html(currentPlayer).find('span').fadeOut(0).delay(delay * i).fadeIn(0).delay(delay).fadeOut();

        var delay = 50; //ms

        $('#board table tbody tr:eq(' + i + ') td:eq(' + col + ') .space')
            .html(currentPlayer)
            .find('span')
            .fadeOut(0)
            .delay(delay * i)
            .fadeIn(0)
            .delay(delay)
            .fadeOut();

        // if last row
        if (row === i) {
            $('#board table tbody tr:eq(' + i + ') td:eq(' + col + ') .space span').fadeIn(0);
        }
    }

    //$('#board table tbody tr:eq(' + row + ') td:eq(' + col + ') .space').html(currentPlayer);
}

function check4Win() {
    // check for horizontal win
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[0].length - 3; col++) {
            if (board[row][col] === currentPlayer &&
                board[row][col + 1] === currentPlayer &&
                board[row][col + 2] === currentPlayer &&
                board[row][col + 3] === currentPlayer) {
                // winner!
                endGame();
                return;
            }
        }
    }

    // check for vertical win
    for (var row = 0; row < board.length - 3; row++) {
        for (var col = 0; col < board[0].length; col++) {
            if (board[row][col] === currentPlayer &&
                board[row + 1][col] === currentPlayer &&
                board[row + 2][col] === currentPlayer &&
                board[row + 3][col] === currentPlayer) {
                // winner!
                endGame();
                return;
            }
        }
    }

    // check for downward diagnol win
    for (var row = 0; row < board.length - 3; row++) {
        for (var col = 0; col < board[0].length - 3; col++) {
            if (board[row][col] === currentPlayer &&
                board[row + 1][col + 1] === currentPlayer &&
                board[row + 2][col + 2] === currentPlayer &&
                board[row + 3][col + 3] === currentPlayer) {
                // winner!
                endGame();
                return;
            }
        }
    }

    // check for upward diagnol win
    for (var row = 3; row < board.length; row++) {
        for (var col = 0; col < board[0].length - 3; col++) {
            if (board[row][col] === currentPlayer &&
                board[row - 1][col + 1] === currentPlayer &&
                board[row - 2][col + 2] === currentPlayer &&
                board[row - 3][col + 3] === currentPlayer) {
                // winner!
                endGame();
                return;
            }
        }
    }

}

function changePlayer() {
    // ternary statement
    // result     = (condition)               ? true value  : false value;
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    $('#currentPlayer').html(currentPlayer);
}

function endGame() {
    // disable buttons
    $('.dropBtn').prop('disabled', 'disabled');

    // output winner
    $('#winner').html(currentPlayer + ' wins!');
}

$(document).ready(function () {
    // start a new game
    newGame();

    // set event handlers
    $('#newGame').on('click', newGame);


});