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

let teamColors = ["blue", "green", "purple", "red"];
let playersTurn = 0; //Start off with the blue player
//Query Selectors
const mainCells = document.querySelectorAll(".main-board .ring-cell");
const pickAPieceMessage = document.getElementById("pick-a-piece");
let pieceCards = document.querySelectorAll(".piece-card");
const pieceSpot = document.querySelectorAll(".piece-spot");

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
