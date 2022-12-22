let WIDTH    = 7;
let HEIGHT = 6;

let currPlayer = 1; //active player 1 or 2
let board = []; //array of rows, each row is array of cells (board[x,y])
/** makeBoard; create in-Js board structure
 * board = array of rows, each row is array of cells (board[x,y])
 */
//restarts game
const playAgainBtn = document.getElementById("playAgain");
playAgainBtn.addEventListener('click', function () {
    location.reload();
});


function makeBoard() {
    //TODO: set "board" to empty height x width matrix array
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));
    }
}

// makeHtmlBoard: make HTML table and row of column tops


function makeHtmlBoard() {
    const board = document.getElementById('board');
    const top = document.createElement("tr");
        top.setAttribute("id", "column-top");
        top.addEventListener("click", handleClick);
    
        for (let x = 0; x < WIDTH; x++) {
            let headCell = document.createElement("td");
            headCell.setAttribute("id", x);
            top.append(headCell);
        }
    board.append(top);
   

    //This makes the main part of "board"
    for (let y = 0; y < HEIGHT; y++){
        const row = document.createElement("tr");
        
        for (let x = 0; x < WIDTH; x++){
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        board.append(row);
    }
}

// findSpotForCol: given column x, return top empty y (null if filled)
function findSpotForCol(x) {
    //creates for loop at the global variable height to go down by one cell
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

// placeInTable: update DOM to place piece into HTML table of board
function placeInTable(y, x) {
    //TODO: make a div and insert into correct table cell
    console.log("y", y);
    console.log("x", x);
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

// endGame: announce game end
function endGame(msg) {
    alert(msg);
    //TODO: pop up alert message
}

// handleClick: handle click of column top to play piece
function handleClick(evt) {
    //get x from ID of clicked cell
    let x = +evt.target.id;
  
    //get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }
    // place piece in board and add to HTML table
    //TODO: add line to update in-memory board
    board[y][x] = currPlayer;
    placeInTable(y, x);

    //check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }
    // check for tie
    //TODO: Check if all cells in board are filled; if so call, call endGame
    if (board.every(row => row.every(cell => cell))) {
        return endGame("Tied!");
    }

    //switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
}
    // checkForWin: check board cell-by-cell for "does a win start here?"

function checkForWin() {
            
        //TODO: read and understand this code. Add comments to help you
        //checks for any possible win horizontally, vertically or diagonally
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                console.log(vert);
                console.log(_win(vert));
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true;
                }                
            }
        }
    function _win(cells) {

        //check four cells to see if they're all color of current player
        // - cells: list of four (y,x) cells
        // - returns true if all are legal coordinates and all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }
  
}

    makeBoard();
    makeHtmlBoard();

