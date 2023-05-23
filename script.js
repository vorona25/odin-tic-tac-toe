// Create javascript variables to access elements from DOM
let game_squares = document.querySelectorAll(".boardSquare")
let reset_button = document.querySelector(".reset_button")
let x_button = document.querySelector(".x_button")
let o_button = document.querySelector(".o_button")
let vsPlayer_button = document.querySelector(".vsPlayer_button")
let vsAI_button = document.querySelector(".vsAI_button")
let game_text = document.querySelector(".game_text")


// Global variables accessed in various functions. 
// gameTun helps decide which player should play. X if even, O if odd. +1 with each move
let gameTurn = 0;
// gameWin helps decide when have a winner (Use it to activate winning code/message)
let gameWin = 0;
// Store "x" or "o" or "tie" upon end of game
let winningPlayer = ""


// Module for gameboard
const gameBoard = (() => {
    
    // store the gameboard as array (["", . . .,""] for 9 squares) in Gameboard object
    let board = ["", "", "", "", "", "", "", "", ""]
    
    // All possible winning combinations in tic-tac-toe
    let winCon = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"], ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"], ["0", "4", "8"], ["2", "4", "6"]]
    
    return {
        board,
        winCon
    };
})();
    
// Factory function for player. Takes in parameters of name and piece ("x" or "o")
const Player = (name, piece) => {

    // Define variables from parameters input
    let playerName = name;
    let playerPiece = piece;

    // Array variable to track which squares player has played on
    let playerSquares = [];

    // Function that takes in number (Square where player has played) and stores value into 
        // playerSquares array to avoid playing same move twice
    const updateSquares = number => {
        playerSquares.append(number);
    }

    // Function that updates various variables upon player selecting a square on game board
    const updatePlayer = (e) => {

        // Only work if square not taken already
        if (gameBoard.board[e.target.id] == "") {

            // update board array with x and o
            gameBoard.board[e.target.id] = piece;

            // display on webpage that player has marked that square
            e.target.textContent = piece;

            // update player's array to keep track of which squares they have
            playerSquares.push(e.target.id)

            // Add to game turn so other player gets turn to play now
            gameTurn += 1;

            // Call checkWin() function upon playing to check if player has won. 
                // Avoids letting other player play if have win / tie
            checkWin()
        }
    }

    // Add "click" event listener to game board squares, calling updatePlayer upon player selecting a square
    const playerTurn = () => {
        game_squares.forEach((square) => {
            square.addEventListener("click", updatePlayer);
        })
    }

    // Remove "click" event listener from game board squares. 
        // Freezes squares so player cannot keep clicking after playing their move
    const pauseTurn = () => {
        game_squares.forEach((square) => {
            square.removeEventListener("click", updatePlayer);
        });
    }

    // Function that uses player's playerSquares variables and winCon array to see if player has won or have tie
    const checkWin = () => {

        // Logic to check if have player has won
        for (let i = 0; i < gameBoard.winCon.length; i++) {
            if (playerSquares.includes(gameBoard.winCon[i][0]) &&
                playerSquares.includes(gameBoard.winCon[i][1]) &&
                playerSquares.includes(gameBoard.winCon[i][2])) 
            {
                gameWin += 1;
                winningPlayer = playerPiece

                // Remove console logs later?
                console.log("Game win: " + gameWin)
                console.log("Player wins: " + winningPlayer)
            }
        }

        // Logic to check for tie. 
        // Check for it after check for win so if board filled up and there is a winner, then that is decleared first.
        let tie_counter = 0
        for (i = 0; i < gameBoard.board.length; i++) {
            if (gameBoard.board[i] != "") {
                tie_counter += 1;
            }
            if (tie_counter == 9 && gameWin == 0) {
                gameWin += 2;

                // Remove console logs later?
                winningPlayer = 'tie'
                console.log("No Winner, result is: " + winningPlayer)
            }
        }
    }

    return {
        playerName, 
        playerPiece,
        playerSquares,
        updateSquares, 
        playerTurn, 
        pauseTurn,
        updatePlayer, 
        checkWin
    }; 
};


// Factory function for computer / AI. Takes in parameters of piece ("x" or "o")
const Computer = (piece) => {

    // Define variables from parameters input
    let computerPiece = piece;

    // Array variable to track which squares computer has played on
    let computerSquares = []

    // Function that takes in number (Square where computer has played) and stores value into 
        // computerSquares array to avoid playing same move twice
    const updateSquares = number => {
        computerSquares.append(number);
    }

    // Function that updates various variables upon computer selecting a square on game board
    const updateComputer = (e) => {

        // Only work if square not taken already
        if (gameBoard.board[e.target.id] == "") {

            // update board array with x and o
            gameBoard.board[e.target.id] = piece;

            // display on webpage that computer has marked that square
            e.target.textContent = piece;

            // update computer's array to keep track of which squares they have
            computerSquares.push(e.target.id)

            // Add to game turn so other player gets turn to play now
            gameTurn += 1;

            // Call checkWin() function upon playing to check if computer has won. 
                // Avoids letting other player play if have win / tie
            checkWin()
        }
    }

    // Remove "click" event listener from game board squares. 
        // Freezes squares so computer cannot keep clicking after playing their move
    const pauseTurn = () => {
        game_squares.forEach((square) => {
            square.removeEventListener("click", updateComputer);
        });
    }

    // Function that uses computer's computerSquares variables and winCon array to see if computer has won or have tie
    const checkWin = () => {

        // Logic to check if have winning pattern 
        for (let i = 0; i < gameBoard.winCon.length; i++) {
            if (computerSquares.includes(gameBoard.winCon[i][0]) &&
                computerSquares.includes(gameBoard.winCon[i][1]) &&
                computerSquares.includes(gameBoard.winCon[i][2])) 
            {
                gameWin += 1;
                winningPlayer = computerPiece

                // Remove console logs later?
                console.log("Game win: " + gameWin)
                console.log("Computer wins: " + winningPlayer)
            }
        }

        // Logic to check for tie. 
        // Check for it after check for win so if board filled up and there is a winner, then that is decleared first.
        let tie_counter = 0
        for (i = 0; i < gameBoard.board.length; i++) {
            if (gameBoard.board[i] != "") {
                tie_counter += 1;
            }
            if (tie_counter == 9 && gameWin == 0) {
                gameWin += 2;
                winningPlayer = 'tie'

                // Remove console log later?
                console.log("No Winner, result is: " + winningPlayer)
            }
        }
    }
    
    // Add "click" event listener to game board squares, calling updateComputer 
        // after Computer uses minimax algorithm to decide which square to select
    const computerTurn = (player, computer1) => {

        // Use counter to limit computer to playing on only one square per turn
        counter = 0

        game_squares.forEach((square) => {
            square.addEventListener("click", updateComputer);

            // If Computer is playing "x" (maximizing), Player is playing "o" (minimizing)
            if (computer1.computerPiece == "x") {
                
                while (counter < 1) {

                    let bestScore = -Infinity
                    let bestMove;
                    let current_board = ["", "", "", "", "", "", "", "", ""]
                
                    // Copy game board onto current board
                    for (r = 0; r < gameBoard.board.length; r++) {
                        current_board[r] = gameBoard.board[r]
                    }
               
                    // loop through board to see all possible open spaces where can play
                    for (k = 0; k < 9; k++) {

                        // If index k is an empty space on the board
                        if (current_board[k] == "") {

                            // Have computer play on square k, using computerPiece = "x"
                            current_board[k] = computer1.computerPiece
                            // Put index k into computerSquares upon playing on that square
                            computer1.computerSquares.push(k.toString())

                            // Call minimax function. 
                                // Put false since computer maximizing, player is NOT maximizing
                            let score = computerMiniMax(current_board, 0, player, computer1, false)
                    
                            // Reset board and remove index k from computerSquares array to reset to initial position
                            current_board[k] = ""
                            computer1.computerSquares.pop(k.toString())
                            // Since maximizing, want higher score     
                                // Update bestScore with score if score from playing on square k gives higher value                 
                            if (score > bestScore) {

                                bestScore = score
                                // If square k returns higher score, update bestMove so computer plays on square k
                                bestMove = k
                            }   
                        }
                    }

                    // After going through all possible open spaces on board and finding highest score and corresponding best square to play on
                        // click the square corresponding to bestMove to call updateComputer() function
                    document.getElementById(bestMove).click()
                    
                    // Update counter to end turn and exit loop. 
                        // Could use return statement instead of counter?
                    counter += 1
                }
            }

            // If Computer is playing "o" (minimizing), Player is playing "x" (maximizing)
            else {
      

                while (counter < 1) {

                    let bestScore = Infinity
                    let bestMove;
                    let current_board = ["", "", "", "", "", "", "", "", ""]

                    // Copy game board onto current board
                    for (r = 0; r < gameBoard.board.length; r++) {
                        current_board[r] = gameBoard.board[r]
                    }

                    // loop through board to see all possible open spaces where can play
                    for (k = 0; k < 9; k++) {

                        // If index k is an empty space on the board
                        if (current_board[k] == "") {

                            // Have computer play on square k, using computerPiece = "o"
                            current_board[k] = computer1.computerPiece
                            // Put index k into computerSquares upon playing on that square
                            computer1.computerSquares.push(k.toString())

                            // Call minimax function. 
                                // Put true since computer NOT maximizing, player is maximizing
                            let score = computerMiniMax(current_board, 0, player, computer1, true)
                        
                            // Reset board and remove index k from computerSquares array to reset to initial position
                            current_board[k] = ""
                            computer1.computerSquares.pop(k.toString())
   
                            // Since minimizing, want lower score     
                                // Update bestScore with score if score from playing on square k gives lower value                     
                            if (score < bestScore) {

                                bestScore = score
                                // If square k returns lower score, update bestMove so computer plays on square k
                                bestMove = k
                            }   
                        }
                    }

                    // After going through all possible open spaces on board and finding lowest score and corresponding best square to play on
                        // click the square corresponding to bestMove to call updateComputer() function
                    document.getElementById(bestMove).click()                    
                    // Update counter to end turn and exit loop. 
                        // Could use return statement instead of counter?
                    counter += 1
                }
            }
        })
    }
    
    // Stores values for possible scores upon reaching winner / tie in minimax algorith. 
    let minimaxScores = {
        x: 100,
        o: -100,
        tie: 0
    }
 
    // Minimax algorithm that is recursive and will return the score from playing on a specific square
        // Takes in inputs of current board to play out on and find the final score, depth to see how many turns have been played
        // player and computer variables to access their playerSquares / computerSquares 
        // and true/false for isMaximizing to decide whose turn it is to play
    const computerMiniMax = (current_board, depth, player, computer1, isMaximizing) => {

        // First thing to do upon calling minimax algorithm is to check if have a winner.
        computer1.checkWin();
        player.checkWin();

        // Secondly check for a potential tie. Using current board since do not want to change game board until exiting all the loops
        let minimax_tie_counter = 0
        for (i = 0; i < current_board.length; i++) {
            if (current_board[i] != "") {
                    minimax_tie_counter += 1;
            }
            if (minimax_tie_counter == 9 && gameWin == 0) {
                gameWin += 2;
                winningPlayer = 'tie'
                console.log("No Winner, result is: " + winningPlayer)
            }
        }

        // If have a winner or tie then return the corresponding score based upon who won
        if (gameWin != 0) {
            // If player "x" won, then return score where score is 100 - depth (so higher score when win faster)
            if (winningPlayer == "x") {
                // Reset gameWin variable 
                gameWin = 0 

                let score = minimaxScores[winningPlayer] - depth
                return score;
            }
            // If player "x" won, then return score where score is 100 + depth (so lower score when win faster)
            else if (winningPlayer == "o") {
                // Reset gameWin variable 
                gameWin = 0 

                let score = minimaxScores[winningPlayer] + depth
                return score;
            }
            // If have a tie, return score of 0
            else {
                // Reset gameWin variable 
                gameWin = 0 

                score = minimaxScores[winningPlayer]
                return score;
            }
        }

        // If do not have a winner and parameter isMaximizing set to true
        if (isMaximizing) {

            // If computer is maximizing
            if (computer1.computerPiece == "x") {

                let bestScore = -Infinity

                // loop through all possible squares
                for (j = 0; j < 9; j++) {
                 
                    // if index j is an empty space where can play
                    if (current_board[j] == "") {

                        // Have computer play on square j, using computerPiece = "x"
                        current_board[j] = computer1.computerPiece
                        // Put index j into computerSquares upon playing on that square
                        computer1.computerSquares.push(j.toString())

                        // Call minimax function. Add to depth since playing another turn
                            // Put false since player is not maximizing
                        let score = computerMiniMax(current_board, depth + 1, player, computer1, false)

                        // Reset board and remove index j from computerSquares array to reset to previous position
                        max_lastVal = computer1.computerSquares.slice(-1)
                        current_board[max_lastVal] = ""
                        computer1.computerSquares.pop(max_lastVal.toString())

                        // Since minimizing, want higher score     
                            // Update bestScore with score if score from playing on square j gives higher value                     
                        if (score > bestScore) {

                            bestScore = score
                        }
                    }
                }
                // Return bestScore, best score from playing on all possible empty squres back to computerTurn()
                return bestScore;
            }

            // If player is maximizing
            else {

                let bestScore = -Infinity

                // loop through all possible squares
                for (j = 0; j < 9; j++) {
                    console.log("Current j (Maximizing): " + j)

                    // if index j is an empty space where can play
                    if (current_board[j] == "") {

                        // Have player play on square j, using computerPiece = "x"
                        current_board[j] = player.playerPiece
                        // Put index j into playerSquares upon playing on that square
                        player.playerSquares.push(j.toString())

                        // Call minimax function. Add to depth since playing another turn
                            // Put false since computer is not maximizing
                        let score = computerMiniMax(current_board, depth + 1, player, computer1, false)

                        // Reset board and remove index j from computerSquares array to reset to previous position            
                        max_lastVal = player.playerSquares.slice(-1)
                        current_board[max_lastVal] = ""
                        player.playerSquares.pop(max_lastVal.toString())
                     
                        // Since minimizing, want higher score     
                            // Update bestScore with score if score from playing on square j gives higher value                     
                        if (score > bestScore) {

                            bestScore = score
                        }
                    }
                }
                // Return bestScore, best score from playing on all possible empty squres back to computerTurn()
                return bestScore;
            }
        }

        // If do not have a winner and parameter isMaximizing set to false
        else {

            // If computer is minimizing
            if (computer1.computerPiece == "o") {

                let bestScore = Infinity

                // loop through all possible squares
                for (i = 0; i < 9; i++) {

                    // if index i is an empty space where can play
                    if (current_board[i] == "") {

                        // Have computer play on square i, using computerPiece = "o"
                        current_board[i] = computer1.computerPiece
                        // Put index i into computerSquares upon playing on that square
                        computer1.computerSquares.push(i.toString())

                        // Call minimax function. Add to depth since playing another turn
                                // Put true since player is maximizing
                        let score = computerMiniMax(current_board, depth + 1, player, computer1, true)

                        // Reset board and remove index j from computerSquares array to reset to previous position
                        min_lastVal = computer1.computerSquares.slice(-1)
                        current_board[min_lastVal] = ""
                        computer1.computerSquares.pop(min_lastVal.toString())

                        // Since minimizing, want lower score     
                            // Update bestScore with score if score from playing on square i gives lower value                     
                        if (score < bestScore) {

                            bestScore = score
                        }
                    }
                }
                // Return bestScore, best score from playing on all possible empty squres back to computerTurn()
                return bestScore
            }

            // If player is minimizing
            else {

                let bestScore = Infinity

                // loop through all possible squares
                for (i = 0; i < 9; i++) {

                    // if index i is an empty space where can play
                    if (current_board[i] == "") {

                        // Have player play on square i, using playerPiece = "o"
                        current_board[i] = player.playerPiece
                        // Put index i into playerSquares upon playing on that square
                        player.playerSquares.push(i.toString())

                        // Call minimax function. Add to depth since playing another turn
                                // Put true since computer is maximizing
                        let score = computerMiniMax(current_board, depth + 1, player, computer1, true)

                        // Reset board and remove index j from computerSquares array to reset to previous position
                        min_lastVal = player.playerSquares.slice(-1)
                        current_board[min_lastVal] = ""
                        player.playerSquares.pop(min_lastVal.toString())

                        // Since minimizing, want lower score     
                            // Update bestScore with score if score from playing on square i gives lower value                     
                        if (score < bestScore) {
                            
                            bestScore = score
                        }                  
                    }
                }
                // Return bestScore, best score from playing on all possible empty squres back to computerTurn()
                return bestScore
            }
        }    
    }
        
    return {
        minimaxScores,
        computerPiece,
        computerSquares,
        updateSquares,
        updateComputer,
        computerTurn, 
        checkWin,
        pauseTurn,
        computerMiniMax
    }; 
}



// Module pattern for game flow
const gameFlow = (() => {

    // Main function that controls the whole game and calls functions based on which buttons on webpage player clicks
    const startGame = () => {

        console.log("Testing startGame")

        // User clicked vsPlayer button. Calls vsPlayerGame() function
        vsPlayerGame()

        // User clicked vsAI button. Calls vsAIGame() function
        vsAIGame()

        // User clicked reset game. Calls resetGame() function
        resetGame(playerX, playerO, computerX, computerO)
    }


    // Calls function vsPlayerGame() upon clicking vsPlayer button on webpage
    const vsPlayerGame = () => {
        vsPlayer_button.addEventListener("click", function() {

            console.log("Player Button clicked")

            // Reset game every time click player/switch between vs player and ai
            reset_button.click()

            // Disable vsPlayer button so cannot click again
            vsPlayer_button.disabled = true;
            // Enable vsAI button in case false so can switch
            vsAI_button.disabled = false;

            // *** Change color of vsPlayer button when clicked?

            // Disable X, O button's. Not needed since automatically switches back and forth
            x_button.disabled = true;
            o_button.disabled = true;
            
            // Have startGamePlayer inside so only start player game when button clicked
            startGamePlayer(playerX, playerO)
        })
    }

    // Call gamePlay function upon moving mouse on board to call gamePlayPlayer() function repeatedly
    const startGamePlayer = (player1, player2) => {

        game_squares.forEach((square) => {
            square.addEventListener("mouseover", function() {

                gamePlayPlayer(player1, player2)
            });
        })
    }

    // gamePlayPlayer takes in variables for two player objects and plays the tic-tac-toe game until winner / tie
    const gamePlayPlayer = (player1, player2) => {

        // player1 using piece "x". player2 using piece "o"

        // If no winner and gameTurn is even, then is player "x"'s turn
        if (gameTurn % 2 == 0 && gameWin == 0) {

            // Disable board for player 2 so they cannot play.
            player2.pauseTurn()
            // Call playerTurn() function for player1 so they can play "x" on board
            player1.playerTurn()

            game_text.innerText = "Player X's Turn"
            console.log("Turn X")
        }
        // If no winner and gameTurn is odd, then is player "o"'s turn
        else if (gameTurn % 2 == 1 && gameWin == 0) {

            // Disable board for player 1 so they cannot play.
            player1.pauseTurn()
            // Call playerTurn() function for player2 so they can play "o" on board
            player2.playerTurn()

            game_text.innerText = "Player O's Turn"
            console.log("Turn O")
        } 
        // If have a winner or tie
        else {
            // Disable board for both players so they cannot keep playing
            player1.pauseTurn()
            player2.pauseTurn()

            // Display some message / text about winner and telling to reset.
                // Can test using console log
            game_text.innerText = "Winner is " + winningPlayer + "! Reset for next game"
            console.log("Winner is: " + winningPlayer)
            console.log("Reset to continue")
        }
    }


    // Calls function vsAIGame() upon clicking vsAI button on webpage
    const vsAIGame = () => {
        vsAI_button.addEventListener("click", function() {

            game_text.innerText = "Pick X or O to start!"
            console.log("AI Button clicked")

            // Reset game every time click player/switch between vs player and ai
            reset_button.click()

            // Disable vsAI button so cannot click again
            vsAI_button.disabled = true;
            // Enable vsPlayer button in case false so can switch
            vsPlayer_button.disabled = false;

            // *** Change color of vsAI button when clicked?

            // Enable X, O button's in case they were disabled. 
                // Used for player to choose between X and O. 
            x_button.disabled = false;
            o_button.disabled = false;

            // function called when player clicks button X
            playerXvsAI()
            // function called when player clicks button O
            playerOvsAI()
        })
    }

    // Function called when player chooses playing X vs AI by clicking button X on webpage
    const playerXvsAI = () => {
        x_button.addEventListener("click", function() {

            console.log("Clicked button X")

            // Reset game every time click/switch between X and O
            reset_button.click()

            // After clicking button X, disable so cannot click again
            x_button.disabled = true;
            // Enable button O, so can switch to playing with that.
            o_button.disabled = false;

            // *** special color for X / O button upon selection?

            // Call startGameAI() function using player with piece "x", computer with piece "o"
            gameFlow.startGameAI(playerX, computerO)

        })
    }

    // Function called when player chooses playing O vs AI by clicking button O on webpage
    const playerOvsAI = () => {
        o_button.addEventListener("click", function() {

            console.log("Clicked button O")

            // Reset game every time click/switch between X and O
            reset_button.click()

            // After clicking button O, disable so cannot click again
            o_button.disabled = true;
            // Enable button X, so can switch to playing with that.
            x_button.disabled = false;

            // *** special color for X / O button upon selection?

            // Call startGameAI() function using player with piece "o", computer with piece "x"
            gameFlow.startGameAI(playerO, computerX)

        })
    }

    // Call gamePlay function upon moving mouse on board to call gamePlayAI() function repeatedly
    const startGameAI = (player1, computer1) => {

        game_squares.forEach((square) => {
            square.addEventListener("mouseover", function() {

                gamePlayAI(player1, computer1)
            });
        })
    }

    const gamePlayAI = (player1, computer1) => {

        console.log("Player piece: " + player1.playerPiece)
        console.log("Computer piece: " + computer1.computerPiece)

        // If no winner and player chooses piece "x", computer gets piece "o"
        if (player1.playerPiece == "x" && computer1.computerPiece == "o") {
       
            // If no winner and gameTurn is even, then is player "x"'s turn
            if (gameTurn % 2 == 0 && gameWin == 0) {

                game_text.innerText = "Player X's Turn"
                console.log("Player Turn: X")

                // Disable board for computer so they cannot play
                computer1.pauseTurn();
                // Call playerTurn() function for player so they can play "x" on board
                player1.playerTurn();
            }
            // If no winner and gameTurn is odd, then is computer "o"'s turn
            else if (gameTurn % 2 == 1 && gameWin == 0) {

                game_text.innerText = "AI O's Turn"

                // Disable board for player so they cannot play
                player1.pauseTurn()
                // Call computerTurn() function for computer so they can play "o" on board
                computer1.computerTurn(player1, computer1)
            } 
            // If have a winner or tie
            else {
                // Disable board for both player and computer so they cannot keep playing
                player1.pauseTurn()
                computer1.pauseTurn()
                
                game_text.innerText = "Winner is " + winningPlayer + "! Reset for next game"
                console.log("Winner is: " + winningPlayer)
                console.log("Reset to continue")
            }

        }
        // If no winner and player chooses piece "o", computer gets piece "x"
        else if (player1.playerPiece == "o" && computer1.computerPiece == "x") {

            // If no winner and gameTurn is even, then is computer "x"'s turn
            if (gameTurn % 2 == 0 && gameWin == 0) {

                game_text.innerText = "AI X's Turn"
        
                // Disable board for [player so they cannot play
                player1.pauseTurn()
                // Call computerTurn() function for computer so they can play "x" on board
                computer1.computerTurn(player1, computer1);                       
            }
            // If no winner and gameTurn is odd, then is player "o"'s turn
            else if (gameTurn % 2 == 1 && gameWin == 0) {
                
                game_text.innerText = "Player O's Turn"
                console.log("Player Turn: O")

                // Disable board for computer so they cannot play
                computer1.pauseTurn();
                // Call playerTurn() function for player so they can play "o" on board
                player1.playerTurn();
            } 
            // If have a winner or tie
            else {
                // Disable board for both player and computer so they cannot keep playing
                player1.pauseTurn()
                computer1.pauseTurn()
    
                game_text.innerText = "Winner is " + winningPlayer + "! Reset for next game"
                console.log("Winner is: " + winningPlayer)
                console.log("Reset to continue")
            }
        }
    }


    const resetGame = (playerX, playerO, computerX, computerO) => {
        reset_button.addEventListener("click", function() {

            console.log("Reset Button clicked")

            // Reset the gameboard to be empty
            gameBoard.board = ["", "", "", "", "", "", "", "", ""]
    
            // Reset global variables for the game
            gameTurn = 0
            gameWin = 0
            winningPlayer = ""

            // Reset html page and remove x / o placed from previous game
            game_squares.forEach((square) => {
                square.textContent = "";
            })

            // Reset individual variables for players/computer - specifically the squares they have played on. 
                // Do this by setting length of array to 0. Cannot say = [] since then just creates new array
            playerX.playerSquares.length = 0
            playerO.playerSquares.length = 0

            computerX.computerSquares.length = 0
            computerO.computerSquares.length = 0
        })
    }


    return {
        startGame,

        vsPlayerGame, 
        startGamePlayer, 
        gamePlayPlayer, 

        vsAIGame, 
        playerXvsAI, 
        playerOvsAI,
        startGameAI,       
        gamePlayAI,      
 
        resetGame
    };
})();

console.log("Gameboard: ")
console.log(gameBoard.board)

const playerX = Player("player x", "x");
const playerO = Player("player o", "o");

const computerX = Computer("x")
const computerO = Computer("o")

// Important function that controls the entire game. Upon calling it, have access to whole game. 
gameFlow.startGame();


