/*----- constants -----*/
const symbols = {
    "1": "\u263C",
    "-1": "\u26C6",
    "0": "", 
};


/*----- state variables -----*/

const state = {
    player: "", // this will be either 1 (sun) or -1 (rain)
    board: "", // this will be a position on board, board is an array of arrays with 9 options
    //winner: "", // outcomes: null/emply (no winner), 1 (player 1), -1 (player 2) or "T" (tie)
};



/*----- cached elements  -----*/
const elements = {
    message: document.querySelector(".messageboard"),
    resetGame: document.getElementById("resetbutton"),
    gameGrid: document.querySelector(".game-grid"),
    cellContents: [...document.querySelectorAll(".game-cell")], // makes it into an array
}


/*----- event listeners -----*/
elements.gameGrid.addEventListener("click", playGame);
elements.resetGame.addEventListener("click", function() {
    init();
});




/*----- functions -----*/
function init () {
    state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    state.player = 1;
    //state.winner = null;
    render();
};

function render () {
    renderBoard();
    renderMessage();
};

function renderBoard () {
    state.board.forEach(function (cell, cellIndex) {
        const cellId = `${cellIndex}`;
        const cellDiv = document.getElementById(cellId);
        if (cell) {
            cellDiv.innerHTML = cell;
        } else {
            cellDiv.innerHTML = "";
        }
    });    
};

function renderMessage() {
    if (state.winner === "T") {
        elements.message.innerText = "It's a tie (you both lose or you both win, depends on your attitude to life)";
    } else if (state.winner) {
        elements.message.innerHTML = `${symbols[state.winner]} wins!`;
    } else {
        elements.message.innerHTML = `${symbols[state.player]}'s turn`;
    };
};

function playGame (event) {
    const cellPosition = elements.cellContents.indexOf(event.target);
    if (cellPosition === -1 || state.winner) return;
    if (state.board[cellPosition]) return; // exit the function early if the square is already occupied
    const cellReference = state.board[cellPosition];
    state.board[cellPosition] = symbols[state.player];
    cellReference[cellPosition] = state.player;
    state.player *= -1;
    //state.winner = getWinner();
    render();
};

// function getWinner() {
//     if (Math.abs(state.board[0] + state.board[1] + state.board[2]) === 3) return state.player;
//     if (Math.abs(state.board[3] + state.board[4] + state.board[5]) === 3) return state.player;
//     if (Math.abs(state.board[6] + state.board[7] + state.board[8]) === 3) return state.player;
//     if (Math.abs(state.board[0] + state.board[3] + state.board[6]) === 3) return state.player;
//     if (Math.abs(state.board[1] + state.board[4] + state.board[7]) === 3) return state.player;
//     if (Math.abs(state.board[2] + state.board[5] + state.board[8]) === 3) return state.player;
//     if (Math.abs(state.board[0] + state.board[4] + state.board[8]) === 3) return state.player;
//     if (Math.abs(state.board[2] + state.board[4] + state.board[6]) === 3) return state.player;
//     if (state.board. includes(null)) return null;
//     return "T";
// };

init();