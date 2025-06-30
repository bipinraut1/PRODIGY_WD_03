let gameMode = 'two-player';
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');

function setGameMode(mode) {
    gameMode = mode;
    document.querySelectorAll('.game-mode button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    startGame();
}

function startGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    updateStatus();
}

function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] !== '' || !gameActive) return;

    makeMove(index);

    if (gameMode === 'ai' && gameActive && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

function makeMove(index) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        statusDisplay.textContent = "Game ended in a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function makeAIMove() {
    // Simple AI: Find first empty cell
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        // Choose a random empty cell
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function updateStatus() {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Initialize the game
startGame();