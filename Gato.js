let gamenotification = document.getElementById('gamenotification')
const statusDisplay =document.querySelector('gamenotification');
gameState = ['','','','','','','','',''];

winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
winMessage = () => 'El jugador ${currentPlayer} ha ganado';
drawMessage = () => 'Empate';
currentPlayerTurn = () => 'Turno del jugador ${currentPlayer}';

let gameActive = true
    currentPlayer = "X"

function main() {
    HStatDisplay (currentPlayerTurn())
    listener()
}

main()
function HStatDisplay(messsage) {
    statusDisplay.innerHTML = message
}

function listener () {
    document.querySelector('container'.addEventListener ('click', handleCellClick))
}

function handleCellClick (clickEvent) {
    const clickedCell = clickEvent.target
    if ( clickedCell.classList.contains ('bloque')){
        const clickedCellIndex = Array.from(clickedCell.parentMode.children).indexOf(clickedCell)
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return
    }
    HandleCellPlayed (clickedCell, clickedCellIndex)
    handleResultValidation ()
}
