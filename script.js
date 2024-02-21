document.addEventListener("DOMContentLoaded", function () {
  // Generate a random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  // Initialize variables
  let attempts = 10;
  let gameOver = false;
  const previousGuesses = []; // Array to store previous guesses

  // Select elements from the DOM
  const inputField = document.querySelector("input");
  const guessButton = document.querySelector("#button");
  const chancesDisplay = document.querySelector(".chances");
  const guessDisplay = document.querySelector(".guess");
  const messageDisplay = document.createElement("p");
  const previousGuessDisplay = document.createElement("p");

  // Function to display messages
  function displayMessage(message) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = "white";
    messageDisplay.style.fontSize = "30px";
    guessDisplay.appendChild(messageDisplay);
  }

  // Function to update previous guesses
  function updatePreviousGuesses(guess) {
    previousGuesses.push(guess);
    previousGuessDisplay.textContent = `Previous Guesses: ${previousGuesses.join(
      ", "
    )}`;
    // Add new line after each entry in array, so that it looks like this: Previous Guesses: 56, 34
    guessDisplay.appendChild(previousGuessDisplay);
  }

  // Function to handle the game logic
  function checkGuess() {
    if (gameOver) return;

    const userGuess = parseInt(inputField.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      displayMessage("Please enter a valid number between 1 and 100.");
      return;
    }

    attempts--;
    chancesDisplay.textContent = attempts;

    updatePreviousGuesses(userGuess); // Update previous guesses

    if (userGuess === randomNumber) {
      displayMessage(
        `Congratulations! You guessed the correct number: ${randomNumber}`
      );
      gameOver = true;
    } else if (userGuess < randomNumber) {
      displayMessage("Try a higher number.");
    } else {
      displayMessage("Try a lower number.");
    }

    inputField.value = "";

    if (attempts === 0) {
      displayMessage(`Game over! The correct number was ${randomNumber}.`);
      gameOver = true;
    }
  }

  // Event listener for the guess button
  guessButton.addEventListener("click", checkGuess);
});
