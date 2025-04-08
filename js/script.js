const piecesStock = {
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

const teamColors = ["blue", "green", "purple", "red"];
let playersTurn = 3; //Start off with the blue player
let selectedCell; //Assigns the cell to select
let isThereAWin = false;
let isGameADraw = false;
let tutorialSlideIndex = 0;

const canThisColorMakeAMove = {
  blue: true,
  green: true,
  red: true,
  purple: true,
};

//Query Selectors
//Popup Windows
const pickAPieceMessage = document.getElementById("pick-a-piece");
const winningMessageWindow = document.getElementById("win-message");
const tutorialWindow = document.getElementById("tutorial-window");
const restartWarning = document.getElementById("restart-warning");
const turnSkippedWarning = document.getElementById("skip-alert");
//Headlines for Popups
const winningHeadline = document.querySelector("#win-message h1");
const skippedMessage = document.getElementById("skip-message");
//Slide for tutorial
const tutorialSlide = document.getElementById("tutorial-slide");
//Whose turn it is headline
const turn = document.getElementById("turn");
//Gameboard
const mainCells = document.querySelectorAll(".main-board .ring-cell");
const pieceCards = document.querySelectorAll(".piece-card");
const pieceSpot = document.querySelectorAll(".piece-spot");
const allPegs = document.querySelectorAll(".piece-spot.peg");
const allSmallRings = document.querySelectorAll(".piece-spot.small-ring");
const allLargeRings = document.querySelectorAll(".piece-spot.large-ring");
//Buttons
const cancelBtn = document.querySelectorAll(".cancel");
const newGameBtn = document.querySelectorAll(".new-game");
const tutorialBtn = document.getElementById("tutorial");
const restartBtn = document.getElementById("restart");
const returnToWinScreenBtn = document.getElementById("return-to-menu");
const showBoardBtn = document.getElementById("show-board");
const skipConfirmBtn = document.getElementById("skip-confirm");
const previousBtn = document.getElementById("previous-slide");
const nextBtn = document.getElementById("next-slide");
//Players Pieces
const bluePieces = document.querySelectorAll(".blue-side .blue-piece");
const greenPieces = document.querySelectorAll(".green-side .green-piece");
const redPieces = document.querySelectorAll(".red-side .red-piece");
const purplePieces = document.querySelectorAll(".purple-side .purple-piece");
//Players Side of the Board
const blueSide = document.querySelector(".blue-side");
const greenSide = document.querySelector(".green-side");
const purpleSide = document.querySelector(".purple-side");
const redSide = document.querySelector(".red-side");
const sideColors = [blueSide, greenSide, purpleSide, redSide];

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

//Button Event Listeners

newGameBtn.forEach((button) =>
  button.addEventListener("click", () => {
    startNewGame();
  })
);

restartBtn.addEventListener("click", () => showRestartWarningScreen());

returnToWinScreenBtn.addEventListener("click", () => {
  showWinningMessageScreen(), hideReturnToWinScreenBtn();
});

showBoardBtn.addEventListener("click", () => {
  hideWinningMessageScreen(), showReturnToWinScreenBtn();
});

skipConfirmBtn.addEventListener("click", () => {
  hideSkipAlert();
  startNextPlayersTurn();
});

tutorialBtn.addEventListener("click", () => {
  console.log("I got clicked here");
  showTutorialWindow();
  changeTutorialSlide("start");
});

previousBtn.addEventListener("click", () => changeTutorialSlide("previous"));

nextBtn.addEventListener("click", () => changeTutorialSlide("next"));

cancelBtn.forEach((button) => {
  button.addEventListener("click", () => {
    hidePieceSelectScreen();
    hideRestartWarningScreen();
    hideTutorialWindow();
  });
});

const startNewGame = () => {
  resetPiecesStock(piecesStock);
  clearBoard();
  enableRingCellSelection();
  enableMenuButtons();
  resetStockStyles();
  reactivateAllPlayers();
  resetTurnHighLights();
  playersTurn = 3;
  startNextPlayersTurn();
  winningMessageWindow.classList.add("hidden");
  hideRestartWarningScreen();
  hideSkipAlert();
  hideTutorialWindow();
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

function reactivateAllPlayers() {
  for (let color in canThisColorMakeAMove) {
    canThisColorMakeAMove[color] = true;
  }
}

function resetTurnHighLights() {
  sideColors.forEach((color, i) =>
    color.classList.remove(`${teamColors[i]}-turn`)
  );
}

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

function resetPieceSelection() {
  pieceCards.forEach((card) => {
    console.log(pieceCards);
    card.disabled = false;
  });
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
    if (!isThereAWin) {
      checkForADraw();
      if (!isGameADraw) {
        disableRingCellsThatAreFull();
        startNextPlayersTurn();
      }
    }
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

function disableMenuButtons() {
  tutorialBtn.disabled = true;
  restartBtn.disabled = true;
}

function enableMenuButtons() {
  tutorialBtn.disabled = false;
  restartBtn.disabled = false;
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

function showPieceSelectScreen() {
  pickAPieceMessage.classList.remove("hidden");
}

function hidePieceSelectScreen() {
  pickAPieceMessage.classList.add("hidden");
}

function showRestartWarningScreen() {
  restartWarning.classList.remove("hidden");
}

function hideRestartWarningScreen() {
  restartWarning.classList.add("hidden");
}

function showWinningMessageScreen() {
  winningMessageWindow.classList.remove("hidden");
}

function hideWinningMessageScreen() {
  winningMessageWindow.classList.add("hidden");
}

function showShowBoardButton() {
  showBoardBtn.classList.remove("hidden");
}

function hideShowBoardButton() {
  showBoardBtn.classList.add("hidden");
}

function showReturnToWinScreenBtn() {
  returnToWinScreenBtn.classList.remove("hidden");
}

function hideReturnToWinScreenBtn() {
  returnToWinScreenBtn.classList.add("hidden");
}

function showTutorialWindow() {
  tutorialWindow.classList.remove("hidden");
}

function hideTutorialWindow() {
  tutorialWindow.classList.add("hidden");
}
function showSkipAlert(color) {
  turnSkippedWarning.classList.remove("hidden");
  skippedMessage.innerHTML = `${
    color[0].toUpperCase() + color.slice(1, color.length)
  } is out of moves!`;
}

function hideSkipAlert() {
  turnSkippedWarning.classList.add("hidden");
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
  checkIfAnyMovesLeft(teamColors[playersTurn]);
  turn.innerHTML = `${teamColors[playersTurn].toUpperCase()}'S TURN`;
  turn.style.color = `${teamColors[playersTurn]}`;
  sideColors[playersTurn].classList.add(`${teamColors[playersTurn]}-turn`);
  playersTurn === 0
    ? sideColors[3].classList.remove(`${teamColors[3]}-turn`)
    : sideColors[playersTurn - 1].classList.remove(
        `${teamColors[playersTurn - 1]}-turn`
      );
  if (canThisColorMakeAMove[teamColors[playersTurn]] === false) {
    showSkipAlert(teamColors[playersTurn]);
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
      declareWinner(pieceSpot[p1].dataset.piece);
      return;
    }
  });
  checkForADraw();
}

function declareWinner(winningColor) {
  showWinningMessageScreen();
  winningHeadline.innerHTML = isGameADraw
    ? "It's a Draw!"
    : `${
        winningColor[0].toUpperCase() +
        winningColor.slice(1, winningColor.length)
      } Wins!`;
  showShowBoardButton();
  disableAllRingCells();
  disableMenuButtons();
  turn.innerHTML = "";
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

function checkForADraw() {
  if (
    [...pieceSpot].every((spot) => spot.dataset.piece !== "open") ||
    Object.values(canThisColorMakeAMove).every((color) => !color)
  ) {
    isGameADraw = true;
    declareWinner("none");
  }
}

function checkIfAnyMovesLeft(color) {
  if (piecesStock[color]["peg"] === 0) {
    if (
      [...allLargeRings].every((spot) => spot.dataset.piece !== "open") &&
      [...allSmallRings].every((spot) => spot.dataset.piece !== "open")
    ) {
      canThisColorMakeAMove[color] = false;
    }
  }
  if (piecesStock[color]["small-ring"] === 0) {
    if (
      [...allLargeRings].every((spot) => spot.dataset.piece !== "open") &&
      [...allPegs].every((spot) => spot.dataset.piece !== "open")
    ) {
      canThisColorMakeAMove[color] = false;
    }
  }
  if (piecesStock[color]["large-ring"] === 0) {
    if (
      [...allPegs].every((spot) => spot.dataset.piece !== "open") &&
      [...allSmallRings].every((spot) => spot.dataset.piece !== "open")
    ) {
      canThisColorMakeAMove[color] = false;
    }
  }
}

function changeTutorialSlide(direction) {
  console.log(direction, tutorialSlideIndex);
  if (direction === "start") {
    tutorialSlideIndex = 0;
  }
  if (direction === "previous") {
    tutorialSlideIndex -= 1;
  }
  if (direction === "next") {
    tutorialSlideIndex += 1;
  }
  if (tutorialSlideIndex === 0) {
    previousBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
  }

  if (tutorialSlideIndex === 8) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  tutorialSlide.innerHTML = `<img src="tutorial-images/OtrioTutorial${tutorialSlideIndex}.png" alt="Otrio-tutorial-slide-${tutorialSlideIndex}">`;
}
