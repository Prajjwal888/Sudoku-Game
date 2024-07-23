let numSelected = null;
let tileSelected = null;
let errors = 0;
let correctTiles = 0;
let totalTilesToFill = 0;
let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];
let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    setGame();
    document.getElementById("reset-button").addEventListener("click", resetGame);
};

function setGame() {
    totalTilesToFill = 0;
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            } else {
                totalTilesToFill++;
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            correctTiles++;
            if (correctTiles === totalTilesToFill) {
                let winnerMessage = document.getElementById("winner-message");
                winnerMessage.innerText = "Congratulations! You have solved the puzzle!";
                winnerMessage.style.display = "block";
            }
        } else {
            errors += 1;
            let errorMessage = document.getElementById("error-message");
            errorMessage.innerText = `You have made ${errors} incorrect attempts!`;
            errorMessage.style.display = "block";
            if (errors >= 3) {
                alert("Game Over! You have made 3 incorrect attempts.");
            }
        }
    }
}

function resetGame() {
    numSelected = null;
    tileSelected = null;
    errors = 0;
    correctTiles = 0;

    document.getElementById("error-message").innerText = "";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("winner-message").innerText = "";
    document.getElementById("winner-message").style.display = "none";

    let digits = document.getElementById("digits");
    while (digits.firstChild) {
        digits.removeChild(digits.firstChild);
    }

    let boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    setGame();
}
