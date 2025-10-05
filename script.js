const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => cellClicked(index));
});

restartBtn.addEventListener("click", restartGame);

function cellClicked(index) {
  if (board[index] !== "" || !running) return;
  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer;
  checkWinner();
}

function checkWinner() {
  let winner = null;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  if (winner) {
    statusText.innerText = `Player ${winner} Wins! 🎉`;
    running = false;
  } else if (!board.includes("")) {
    statusText.innerText = "It's a Draw! 🤝";
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.innerText = `Player X's Turn`;
  cells.forEach(cell => (cell.innerText = ""));
}
