'use strict';

let currentScore, scores, activePlayer, playing;

// hidden for display dice
const diceEl = document.querySelector('.dice');

// buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggled player class changes when player changes
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const newGame = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

newGame();

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    let number = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.src = `dice-${number}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check for rolled 1:
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true, switch to next player
      changePlayer();
    }
  }
});

// clicked button for holding score
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      // alert(`🥳 player${activePlayer} is win ! `);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      changePlayer();
    }
  }
});

// Reset the game state
btnNew.addEventListener('click', newGame);
