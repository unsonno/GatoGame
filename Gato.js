// Winning combinations
const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
];
// Initialize game 
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameStatusDisplay = document.getElementById('status');
//Player's move Function
function playerMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = 'X';
        render();
        if (!checkWinner()) {
            gameStatusDisplay.textContent = "Computer's Turn";
            setTimeout(computerMove, 300);
        }
    }
}
// Computer's move Function
function computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    board[move] = 'O';
    render();
    let winner = checkWinner();
    if (winner) {
        displayWinner(winner);
    } else {
        gameStatusDisplay.textContent = "Player X's Turn";
    }
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
    // Base cases
    let result = checkWinner();
    if (result !== null) {
        return result === 'X' ? -10 + depth : result === 'O' ? 10 - depth : 0;
    }
    if (!board.includes('')) return 0;

    // Recursive case
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

//Check for a winner Function
function checkWinner() {
    for (let combo of WINNING_COMBOS) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes('')) return 'tie';
    return null;
}

// Display game state Function
function render() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < board.length; i++) {
        cells[i].textContent = board[i];
    }
}

//  Display winner or draw Function
function displayWinner(winner) {
    if (winner === 'tie') {
        gameStatusDisplay.textContent = `It's a Draw!`;
    } else {
        gameStatusDisplay.textContent = `Player ${winner} Wins!`;
    }
}
//Restart Button Function
