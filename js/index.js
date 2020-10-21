const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */

function createCards() {
  const cards = [];
  // Create an array with objects containing the value and the suit of each card
  suits.forEach((suit) => {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit,
      };
      cards.push(cardObject);
    }
  });
  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 30;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;

    const onCardClick = () => {
      if (selectedCardsWrapper.innerHTML) return;

      const magicButton = document.createElement('button');
      magicButton.innerHTML = 'Magic';
      magicButton.classList.add('btn', 'btn-lg', 'btn-secondary', 'btn-space');

      const onMagicClick = () => {
        const requiredCards = [...cardsWrapper.children]
          .filter((el) => parseInt(el.getAttribute('data-value'), 10) === card.value);

        requiredCards.forEach((requiredCard, index) => {
          const position = (index + 1) * 30;
          requiredCard.style.left = `${position}px`;
          selectedCardsWrapper.appendChild(requiredCard);
        });
      };

      magicButton.addEventListener('click', onMagicClick);
      btnWrapper.insertBefore(magicButton, btnWrapper.lastChild);
      cardElement.style.left = '0px';
      selectedCardsWrapper.appendChild(cardElement);
    };

    cardElement.addEventListener('click', onCardClick);
    cardsWrapper.append(cardElement);
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  btnWrapper.innerHTML = '';

  // Create Shuffle button
  const onShuffleClick = () => {
    // Create shuffled cards out of old cards
    const shuffledCards = [...cardsWrapper.children].sort(() => Math.random() - 0.5);
    cardsWrapper.innerHTML = '';
    shuffledCards.forEach((card, index) => {
      card.style.left = `${index * 30}px`;
      cardsWrapper.appendChild(card);
    });
  };

  const shuffleButton = document.createElement('button');
  shuffleButton.innerHTML = 'Shuffle';
  shuffleButton.classList.add('btn', 'btn-lg', 'btn-secondary', 'btn-space');
  shuffleButton.addEventListener('click', onShuffleClick);
  btnWrapper.appendChild(shuffleButton);

  // Create Flip button
  const onFlipClick = () => cardsWrapper.classList.toggle('hidden');

  const flipButton = document.createElement('button');
  flipButton.innerHTML = 'Flip cards';
  flipButton.classList.add('btn', 'btn-lg', 'btn-secondary', 'btn-space');
  flipButton.addEventListener('click', onFlipClick);
  btnWrapper.appendChild(flipButton);

  // Create Restart button
  const onRestartClick = () => {
    cardsWrapper.innerHTML = '';
    selectedCardsWrapper.innerHTML = '';
    // eslint-disable-next-line no-use-before-define
    startGame();
  };

  const restartButton = document.createElement('button');
  restartButton.innerHTML = 'Restart';
  restartButton.classList.add('btn', 'btn-danger', 'btn-lg', 'btn-secondary', 'btn-space');
  restartButton.addEventListener('click', onRestartClick);
  btnWrapper.appendChild(restartButton);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game')
  .addEventListener('click', startGame);
