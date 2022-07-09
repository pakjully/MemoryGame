

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const nodeList = document.querySelectorAll('ul.deck li');
const cardList = Array.from(nodeList);
const cardDeck = document.querySelector('.deck');
const starsParent = document.querySelector('.stars');
const stars = Array.from(document.querySelectorAll('.stars li i'));
let list = [];
let openCards = [];
let matchedCards = [];
const moveCounter = document.querySelector('.moves');
let counter = 0;
const timerStarter = document.querySelector('.timer');
const restartButton = document.querySelector('.restart');
const shuffledList = shuffle(cardList);
let starRating = 0;
let timerOn = false;
const from = Date.now();

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Create a list that holds all of your cards

function makeBoard () {
    while (cardDeck.firstChild) {
        cardDeck.removeChild(cardDeck.firstChild);
    }
    shuffle(cardList);
    for (let i=0; i<shuffledList.length; i=i+1) {
        cardDeck.appendChild(shuffledList[i]);
        shuffledList[i].classList.remove('open', 'match');
    }
}
makeBoard();

function countMoves () {
    counter++;
    moveCounter.textContent = counter;
    if (counter < 25) {
        starRating = 3;
    } else if  (counter === 25) {
        stars[0].remove();
        starRating = 2;
    }
    else if (counter === 40) {
        stars[0].remove();
        starRating = 1;
    }
}

function returnRating () {
     for (let i=0; i<stars.length; i=i+1) {
         starsParent.appendChild(stars[i]);
     }
}

// set up the event listener for a card. If a card is clicked:
cardList.forEach((card) => card.addEventListener ('click', function () {
    // increment the move counter and display it on the page
     countMoves();
    // display the card's symbol:
     card.classList.toggle('open');
     // add the card to a *list* of "open" cards:
    openCards.push(card);
     // if the list already has another card, check to see if the two cards match:
     const firstCard = openCards[0];
     const secondCard = openCards[1];
    if (openCards.length === 2) {
        if (firstCard.innerHTML === secondCard.innerHTML) {
            matchCards (firstCard, secondCard);
            matchedCards.push(firstCard,secondCard);
            openCards = [];
    // if the cards do not match, remove the cards from the list and hide the card's symbol:
        } else {
            hideCard(firstCard);
            hideCard(secondCard);
            openCards = [];
        }
    }
    if (matchedCards.length === 16) {
            clearTimeout(timer);
            setTimeout (() => {
                displayMessage();
            }, 500);
        }

    }));

function matchCards (card1, card2) {
    setTimeout (() => {
        card1.classList.toggle('match');
        card2.classList.toggle('match');
    }, 300)
}

function hideCard (card) {
    setTimeout(() => {
        card.classList.remove ('open', 'match');
    }, 500);
}

function clearCard (card) {
    card.classList.remove('open', 'match');
}

function setTimer () {
    let to = Date.now();
    const date = new Date(to - from).toLocaleTimeString('ru-RU',{ minute: '2-digit', second: '2-digit',
    })
    timerStarter.innerHTML = date;
}
let timer;

// function runTimer () {
//     clearInterval(timer);
//     timer = setInterval(setTimer, 1000);
// }
// runTimer();
const runTimer = () => {
    const from = Date.now ();
    clearInterval(timer);
    timer = setInterval(setTimer(from), 1000)
}


function stopTimer () {
    clearInterval(timer);
}

// function setTimer() {
//      const to = Date.now();
//      const time = Math.floor(to/1000);
//      timerStarter.innerHTML = time;
// }
// let timer = setInterval(setTimer, 1000);

function displayMessage () {
    alert(`You won! Congratulations! Time spent: ${totalMinutes}:${totalSeconds}; Moves made: ${counter}; Your rating is: ${starRating}`)
}

function restart () {
     makeBoard();
     openCards = [];
     matchedCards = [];
     moveCounter.innerHTML = 0;
     counter = 0;
     returnRating();
     clearInterval(timer);
     timerStarter.innerHTML = 0;
     runTimer();

}

restartButton.addEventListener('click', function () {
    restart();

})