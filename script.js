

document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard"); // It is the reference to the game board container where the grid for the Tic Tac Toe game is dynamically created
    const gameStatus = document.getElementById("gameStatus"); // It is the reference to the element displaying the game's current status, such as whose turn it is or the result of the game

    const scoreX = document.getElementById("scoreX"); // It is the reference to the element displaying Player X's current score
    const scoreO = document.getElementById("scoreO"); // It is the reference to the element displaying Player O's current score
    const resetGame = document.getElementById("resetGame"); // It is the eference to the button that resets the game board and state when clicked
    const winnerOverlay = document.getElementById("winnerOverlay"); // It is the reference to the overlay element that displays the winning message or celebration when a player wins

    const winnerMessage = document.getElementById("winnerMessage"); // It is the reference to the element inside the overlay that shows the specific win message, such as "Player X Wins!" 
    const playAgain = document.getElementById("playAgain"); // It is the eference to the button within the overlay that allows the players to start a new game after a win

    let board = Array(9).fill(null);// It initialises a 3*3 matric with 9 cells having null values
    let currentPlayer = "X";// Tracks the current player playing the game
    let scores = { X: 0, O: 0 };// Tracks scores of both the players
    let gameActive = true; // It is used to track whether the game is active or not

    // These are the winning combination for the tic tac toe game
    const winningCombinations = [
        [0, 1, 2], //first row
        [3, 4, 5], //second row
        [6, 7, 8], //third row
        [0, 3, 6], //first column
        [1, 4, 7], //second column
        [2, 5, 8], //third column
        [0, 4, 8], //diagonal from top left corner to bottom right corner and vice versa
        [2, 4, 6], //diagonal from top right corner to bottom left corner and vice versa
    ];

    // Function to get player names from localStorage
    const player1Name = localStorage.getItem('player1') || 'Player 1';
    const player2Name = localStorage.getItem('player2') || 'Player 2';

    // Function to update scoreboard with player names
    document.getElementById('player1Display').textContent = player1Name;
    document.getElementById('player2Display').textContent = player2Name;

    // Function to create the game board
    function createBoard() {
        gameBoard.innerHTML = ""; // clear the board
        board.forEach((cell, index) => {
            const cellElement = document.createElement("div"); // div element for each cell
            cellElement.classList.add("cell"); // Add the cell class for styling
            cellElement.setAttribute("data-index", index); // this is the unique index for each cell
            cellElement.addEventListener("click", handleCellClick); // this is to add click event to the cell
            gameBoard.appendChild(cellElement); // this is to add the cell to the game board
        });
    }

    // Function to handle cell clicks
    function handleCellClick(e) {
        const index = e.target.getAttribute("data-index"); // It gets the index of each cell
        if (!gameActive || board[index]) return; // it prevents the player from filling the cell incase if the game is over or that particular cell is already filled

        board[index] = currentPlayer; // It marks the current player's symbol
        e.target.textContent = currentPlayer; // It displays the player's symbol in the cell
        e.target.classList.add("taken"); // It is class to mark the cell already filled

        if (checkWinner(currentPlayer)) {
            handleWin(currentPlayer); // It handles the win if the current player wins the game  
        } else if (board.every((cell) => cell)) {
            gameStatus.textContent = "It's a Draw!"; // It displays draw message if all the cells are filled and none of the player either wins the game
            gameActive = false; // It ends the after draw mwssage
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // If the cells are not filled and each player has equal chance it switches between the players
            updateGameStatus(); // function to update game status
        }
    }

    // Function to check for a winner
    function checkWinner(player) {
        return winningCombinations.some((combination) =>
            combination.every((index) => board[index] === player) // It checks if the cells in the winning combination if filled with the same player's symbol
        );
    }

    // Function to handle a win svenerio
    function handleWin(player) {
        gameStatus.textContent = `${player === "X" ? player1Name : player2Name} Wins!`; // It displays the winning player's name
        scores[player]++; // It is used to increment the winning player's score
        updateScores(); // It updates the scoreboard
        showCelebration(player); // It diplays the celebration overlay page
        gameActive = false; // It ends the game after any of the one player wins
    }

    // Function to display celebration overlay
    function showCelebration(player) {
        winnerMessage.textContent = `🎉 Congrats!! ${player === "X" ? player1Name : player2Name} Wins! 🎉`; // It displays the winning player's name
        winnerOverlay.classList.add("active"); //  It shows the overlay with active class
    }

    // Function to  update the scores displayed on the scoreboard
    function updateScores() {
        scoreX.textContent = scores.X; // It updates player X's score
        scoreO.textContent = scores.O; // It updates player O's score
    }

    // Function to update game status
    function updateGameStatus() {
        gameStatus.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s Turn`; // It displays who's turn with their name
    }

    // Function to reset the game
    function resetGameState() {
        board = Array(9).fill(null); // It resets the board
        currentPlayer = "X"; // It resets the current player to x
        gameActive = true; // It reactivates the game
        gameStatus.textContent = `${player1Name}'s Turn`; // It resets the game status
        createBoard(); // It creates the game board again
        winnerOverlay.classList.remove("active"); // It hides the celebration overlay
    }

    // Function to add event listeners buttons for reset and replay option
    resetGame.addEventListener("click", resetGameState);
    playAgain.addEventListener("click", resetGameState);

    // Function to initialize the game
    updateGameStatus(); // Calls the updateGameStatus function
    createBoard(); // Calls the createBoard function to create the boared
});
