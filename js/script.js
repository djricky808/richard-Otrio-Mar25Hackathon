// Iring = inner ring (small), O = outer ring (large)
let bluePeg,
  blueIring,
  blueORing,
  greenPeg,
  greenIring,
  greenOring,
  redPeg,
  redIring,
  redOring,
  purplePeg,
  purpleIring,
  purpleOring;

let playersTurn = ["blue", "green", "purple", "red"];

//Query Selectors
const mainCells = document.querySelectorAll(".main-board .ring-cell");
const pickAPieceMessage = document.getElementById("pick-a-piece");
let pieceCards = document.querySelectorAll(".piece-card");

const gameGrid = [
  [
    [["A 1 PEG"], ["A 1 IRING"], ["A 1 ORING"]],
    [["B 1 PEG"], ["B 1 IRING"], ["B 1 ORING"]],
    [["C 1 PEG"], ["C 1 IRING"], ["C 1 ORING"]],
  ],
  [
    [["A 2 PEG"], ["A 2 IRING"], ["A 2 ORING"]],
    [["B 2 PEG"], ["B 2 IRING"], ["B 2 ORING"]],
    [["C 2 PEG"], ["C 2 IRING"], ["C 2 ORING"]],
  ],
  [
    [["A 3 PEG"], ["A 3 IRING"], ["A 3 ORING"]],
    [["B 3 PEG"], ["B 3 IRING"], ["B 3 ORING"]],
    [["C 3 PEG"], ["C 3 IRING"], ["C 3 ORING"]],
  ],
];

const resetPiecesStock = () => {
  bluePeg =
    blueIring =
    blueORing =
    greenPeg =
    greenIring =
    greenOring =
    redPeg =
    redIring =
    redOring =
    purplePeg =
    purpleIring =
    purpleOring =
      3;
};

mainCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    selectionScreen(cell);
  });
});

function selectionScreen(cell) {
  showPieceSelectScreen();
  pieceCards.forEach((piece) => {
    piece.addEventListener("click", () => {
      hidePieceSelectScreen();
    });
  });
}

function showPieceSelectScreen() {
  pickAPieceMessage.classList.remove("hidden");
}

function hidePieceSelectScreen() {
  pickAPieceMessage.classList.add("hidden");
}
