const myFunc = (() => {
  const createPlayer = (message, marker, name) => {
    return { message, marker, name };
  };

  const checkWinner = (board, marker) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let resultArr = [];
    winConditions.forEach((combination) => {
      let row = [
        board[combination[0]],
        board[combination[1]],
        board[combination[2]],
      ];
      let results = row.every((currentValue) => currentValue === marker);
      resultArr.push(results);
    });
    return resultArr;
  };

  const gameState = () => {
    const clickBoard = document.querySelector(".board");
    const turnMessage = document.querySelector(".message");

    let board = Array(9).fill("");
    let spots = 9;
    let gameOver = false;

    let playerOne = createPlayer("Player O's Turn", "X", "Player 1");
    let playerTwo = createPlayer("Player X's Turn", "O", "Player 2");

    let activePlayer = playerTwo;
    turnMessage.textContent = activePlayer.message;

    clickBoard.addEventListener("click", function (event) {
      let boardIndex = event.target.classList[0];

      if (gameOver) return;
      if (board[boardIndex] !== "") return;

      spots--;

      if (spots % 2 === 0) activePlayer = playerOne;
      if (spots % 2 === 1) activePlayer = playerTwo;

      turnMessage.textContent = activePlayer.message;
      event.target.textContent = activePlayer.marker;
      board[boardIndex] = activePlayer.marker;
      let check = checkWinner(board, activePlayer.marker);
      if (check.includes(true)) gameOver = true;

      if (gameOver) {
        turnMessage.textContent = activePlayer.name + " Wins";
      }
      if (spots === 0 && !gameOver) turnMessage.textContent = "Tie";
    });
  };

  gameState();

  let restart = document.querySelector(".restart");
  restart.addEventListener("click", function (e) {
    gameState();
    document.querySelectorAll(".square").forEach((e) => (e.textContent = ""));
  });
})();
