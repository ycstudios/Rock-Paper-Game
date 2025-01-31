// Simplified pickComputerMove function
function pickComputerMove() {
  const random = Math.random();
  if (random < 1 / 3) return 'Rock';
  else if (random < 2 / 3) return 'Paper';
  else return 'Scissors';
}

// Set or reset score object from localStorage
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

// Function to update and display score
function updateScoreElement() {
  document.querySelector('.socreboard').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Main function to handle gameplay logic
let isAutoPlaying = false;
let intervalId;

// AutoPlay feature to let the game play itself
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto').innerHTML = 'Stop';
  } else {
    clearInterval(intervalId); // Stop auto-play
    isAutoPlaying = false;
    document.querySelector('.auto').innerHTML = 'Auto Play';
  }
}

// Adding event listeners for player to pick move
document.querySelector('.js-rock-button').addEventListener('click', () => playGame('Rock'));
document.querySelector('.js-paper-button').addEventListener('click', () => playGame('Paper'));
document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('Scissors'));

// Reset Score functionality
document.querySelector('.js-reset').addEventListener('click', () => {
  score.wins = 0; score.losses = 0; score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

// Toggle AutoPlay
document.querySelector('.auto').addEventListener('click', () => autoPlay());

// Keyboard controls
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') playGame('Rock');
  if (event.key === 'p') playGame('Paper');
  if (event.key === 's') playGame('Scissors');
});

// Function to play a game and determine the outcome
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = "It's a tie!";
    score.ties++;
  } else if (
    (playerMove === 'Rock' && computerMove === 'Scissors') ||
    (playerMove === 'Paper' && computerMove === 'Rock') ||
    (playerMove === 'Scissors' && computerMove === 'Paper')
  ) {
    result = 'You win!';
    score.wins++;
  } else {
    result = 'You lose!';
    score.losses++;
  }

  // Save score
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.showResult').innerHTML = result;
  document.querySelector('.moves').innerHTML = `You Picked: ${playerMove} <img src="${playerMove}-emoji.png" class="moveicon"> Computer Picked: ${computerMove} <img src="${computerMove}-emoji.png" class="moveicon">`;
}

