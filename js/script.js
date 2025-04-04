// Iring = inner ring (small), O = outer ring (large)
// let bluePeg,
//   blueIring,
//   blueORing,
//   greenPeg,
//   greenIring,
//   greenOring,
//   redPeg,
//   redIring,
//   redOring,
//   purplePeg,
//   purpleIring,
//   purpleOring;

let piecesStock = {
  blue: {
    peg: 3,
    "small-ring": 3,
    "large-ring": 3,
  },
  green: {
    peg: 3,
    "small-ring": 3,
    "large-ring": 3,
  },
  purple: {
    peg: 3,
    "small-ring": 3,
    "large-ring": 3,
  },
  red: {
    peg: 3,
    "small-ring": 3,
    "large-ring": 3,
  },
};

let teamColors = ["blue", "green", "purple", "red"];
let playersTurn = 0; //Start off with the blue player
let selectedCell; //Assigns the cell to select
//Query Selectors
const mainCells = document.querySelectorAll(".main-board .ring-cell");
const pickAPieceMessage = document.getElementById("pick-a-piece");
const winningMessageWindow = document.getElementById("win-message");
const winningHeadline = document.querySelector("#win-message h1");
const pieceCards = document.querySelectorAll(".piece-card");
const pieceSpot = document.querySelectorAll(".piece-spot");
const cancelBtn = document.getElementById("cancel");
const newGameBtn = document.getElementById("new-game");
const bluePieces = document.querySelectorAll(".blue-side .blue-piece");
const greenPieces = document.querySelectorAll(".green-side .green-piece");
const redPieces = document.querySelectorAll(".red-side .red-piece");
const purplePieces = document.querySelectorAll(".purple-side .purple-piece");

// const gameGrid = [
//   [
//     [["A 1 PEG"], ["A 1 IRING"], ["A 1 ORING"]],
//     [["B 1 PEG"], ["B 1 IRING"], ["B 1 ORING"]],
//     [["C 1 PEG"], ["C 1 IRING"], ["C 1 ORING"]],
//   ],
//   [
//     [["A 2 PEG"], ["A 2 IRING"], ["A 2 ORING"]],
//     [["B 2 PEG"], ["B 2 IRING"], ["B 2 ORING"]],
//     [["C 2 PEG"], ["C 2 IRING"], ["C 2 ORING"]],
//   ],
//   [
//     [["A 3 PEG"], ["A 3 IRING"], ["A 3 ORING"]],
//     [["B 3 PEG"], ["B 3 IRING"], ["B 3 ORING"]],
//     [["C 3 PEG"], ["C 3 IRING"], ["C 3 ORING"]],
//   ],
// ];

const winningPatterns = [
  //All 3 Pieces of the same color in 1 Square (Peg, Small ring, Large Ring)
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11],
  [12, 13, 14],
  [15, 16, 17],
  [18, 19, 20],
  [21, 22, 23],
  [24, 25, 26],
  //One Particular Piece in three spots vertically
  [0, 9, 18],
  [1, 10, 19],
  [2, 11, 20],
  [3, 12, 21],
  [4, 13, 22],
  [5, 14, 23],
  [6, 15, 24],
  [7, 16, 25],
  [8, 17, 26],
  //One Particular Piece in three spots horizontally
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [9, 12, 15],
  [10, 13, 16],
  [11, 14, 17],
  [18, 21, 24],
  [19, 22, 25],
  [20, 23, 26],
  //One Particular Piece in three spots diagonally
  [0, 12, 24],
  [1, 13, 25],
  [2, 14, 26],
  [6, 12, 18],
  [7, 13, 19],
  [8, 14, 20],
  //Smallest to Largest OR Largest to Smallest ONLY!
  //1 of each piece in Order of size Vertically
  [0, 10, 20],
  [18, 10, 2],
  [3, 13, 23],
  [21, 13, 5],
  [6, 16, 26],
  [24, 16, 8],
  //1 of each piece in order of size Horizontally
  [0, 4, 8],
  [2, 4, 6],
  [9, 13, 17],
  [11, 13, 15],
  [18, 22, 26],
  [20, 22, 24],
  //1 of each piece in order of size Diagonally
  [0, 13, 26],
  [2, 13, 24],
  [18, 13, 8],
  [20, 13, 6],
];

newGameBtn.addEventListener("click", () => startNewGame());

const startNewGame = () => {
  resetPiecesStock();
  clearBoard();
  enableRingCellSelection();
  resetStockStyles();
  playersTurn = 0;
  winningMessageWindow.classList.add("hidden");
};

const resetPiecesStock = (piecesStock) => {
  for (let color in piecesStock) {
    let pieces = piecesStock[color];
    for (let piece in pieces) {
      piecesStock[color][piece] = 3;
    }
  }
  return piecesStock;
};

function clearBoard() {
  for (let i = 0; i < pieceSpot.length; i++) {
    pieceSpot[i].dataset.piece = "open";
    pieceSpot[i].classList = `piece-spot ${
      (i + 3) % 3 === 0
        ? "peg"
        : (i + 3) % 3 === 1
        ? "small-ring"
        : "large-ring"
    } ${(i + 3) % 3 === 0 ? "inner-open" : "outer-open"}`;
  }
}

mainCells.forEach((cell, cellIndex) => {
  cell.addEventListener("click", () => {
    showPieceSelectScreen();
    selectedCell = cellIndex;
    color = teamColors[playersTurn];
    resetPieceSelection();
    disablePieceSelection(color);
  });
});

pieceCards.forEach((piece, pieceIndex) => {
  piece.addEventListener("click", () => {
    hidePieceSelectScreen();
    placePieceOnBoard(selectedCell, pieceIndex, color);
    checkForWins();
    disableRingCellsThatAreFull();
    startNextPlayersTurn();
  });
});

function disableRingCellsThatAreFull() {
  mainCells.forEach((cell, cellIndex) => {
    let currentCell = cellIndex * 3;
    if (
      pieceSpot[currentCell].dataset.piece !== "open" &&
      pieceSpot[currentCell + 1].dataset.piece !== "open" &&
      pieceSpot[currentCell + 2].dataset.piece !== "open"
    ) {
      console.log(cell, "disabled");
      cell.style.pointerEvents = "none";
    }
  });
}

function disableAllRingCells() {
  mainCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

function enableRingCellSelection() {
  mainCells.forEach((cell) => {
    cell.style.pointerEvents = "auto";
  });
}

function disablePieceSelection(color) {
  let currentCell = selectedCell * 3;
  console.log("disabled cell", currentCell);
  for (let i = 0; i < pieceCards.length; i++) {
    console.log(pieceSpot[currentCell + i].dataset.piece);
    console.log(pieceCards[i]);
    if (pieceSpot[currentCell + i].dataset.piece !== "open") {
      console.log("Spot is already occupied!");
      pieceCards[i].disabled = true;
    }
  }
  let pieceIndex = 0;
  for (let stock in piecesStock[color]) {
    console.log(piecesStock[color][stock]);
    if (piecesStock[color][stock] === 0) {
      pieceCards[pieceIndex].disabled = true;
    }
    pieceIndex++;
  }
}

function resetPieceSelection() {
  pieceCards.forEach((card) => {
    console.log(pieceCards);
    card.disabled = false;
  });
}

cancelBtn.addEventListener("click", () => hidePieceSelectScreen());

function showPieceSelectScreen() {
  pickAPieceMessage.classList.remove("hidden");
}

function hidePieceSelectScreen() {
  pickAPieceMessage.classList.add("hidden");
}

function placePieceOnBoard(cellIndex, pieceIndex, color) {
  let placeToPutPiece = 3 * cellIndex + pieceIndex;
  const pieceToLay = pieceSpot[placeToPutPiece];
  pieceToLay.dataset.piece = color;
  console.log(pieceCards[pieceIndex]);
  if (pieceCards[pieceIndex].dataset.chosenpiece === "peg") {
    pieceToLay.classList.remove("inner-open");
    pieceToLay.classList.add(`inner-${color}`);
  } else {
    pieceToLay.classList.remove("outer-open");
    pieceToLay.classList.add(`outer-${color}`);
  }
  pieceToLay.disabled = true;
  reduceStock(color, pieceCards[pieceIndex].dataset.chosenpiece, pieceIndex);
}

function startNextPlayersTurn() {
  playersTurn++;
  if (playersTurn === teamColors.length) {
    playersTurn = 0;
  }
}

function checkForWins() {
  winningPatterns.forEach((pattern) => {
    let [p1, p2, p3] = pattern;
    if (
      pieceSpot[p1].dataset.piece !== "open" &&
      pieceSpot[p1].dataset.piece === pieceSpot[p2].dataset.piece &&
      pieceSpot[p2].dataset.piece === pieceSpot[p3].dataset.piece
    ) {
      console.log(`${pieceSpot[p1].dataset.piece} wins!`);
      declareWinner(pieceSpot[p1].dataset.piece);
    }
  });
}

function declareWinner(winningColor) {
  winningMessageWindow.classList.remove("hidden");
  winningHeadline.innerHTML = `${
    winningColor[0].toUpperCase() + winningColor.slice(1, winningColor.length)
  } Wins!`;
  disableAllRingCells();
}

function reduceStock(color, piece, index) {
  let removed = index + 1 + 3 * piecesStock[color][piece] - 4;
  console.log("Removed", removed);
  piecesStock[color][piece]--;
  console.log(bluePieces[removed]);
  if (color === "blue") {
    bluePieces[removed].classList.remove(
      index === 0 ? "inner-blue" : "outer-blue"
    );
    bluePieces[removed].classList.add(
      index === 0 ? "inner-open" : "outer-open"
    );
  } else if (color === "green") {
    greenPieces[removed].classList.remove(
      index === 0 ? "inner-green" : "outer-green"
    );
    greenPieces[removed].classList.add(
      index === 0 ? "inner-open" : "outer-open"
    );
  } else if (color === "red") {
    redPieces[removed].classList.remove(
      index === 0 ? "inner-red" : "outer-red"
    );
    redPieces[removed].classList.add(index === 0 ? "inner-open" : "outer-open");
  } else if (color === "purple") {
    purplePieces[removed].classList.remove(
      index === 0 ? "inner-purple" : "outer-purple"
    );
    purplePieces[removed].classList.add(
      index === 0 ? "inner-open" : "outer-open"
    );
  }
}

function resetStockStyles() {
  bluePieces.forEach((piece) => {
    piece.classList.remove(
      piece.classList.contains("peg") ? "inner-open" : "outer-open"
    );
    piece.classList.add(
      piece.classList.contains("peg") ? "inner-blue" : "outer-blue"
    );
  });
  greenPieces.forEach((piece) => {
    piece.classList.remove(
      piece.classList.contains("peg") ? "inner-open" : "outer-open"
    );
    piece.classList.add(
      piece.classList.contains("peg") ? "inner-green" : "outer-green"
    );
  });
  purplePieces.forEach((piece) => {
    piece.classList.remove(
      piece.classList.contains("peg") ? "inner-open" : "outer-open"
    );
    piece.classList.add(
      piece.classList.contains("peg") ? "inner-purple" : "outer-purple"
    );
  });
  redPieces.forEach((piece) => {
    piece.classList.remove(
      piece.classList.contains("peg") ? "inner-open" : "outer-open"
    );
    piece.classList.add(
      piece.classList.contains("peg") ? "inner-red" : "outer-red"
    );
  });
}
