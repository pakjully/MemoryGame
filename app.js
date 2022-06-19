

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
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
let totalSeconds = 0;
let totalMinutes = 0;
let starterTime = 0;
const restartButton = document.querySelector('.restart');
const shuffledList = shuffle(cardList);
let starRating = 0;


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
        if (stars[2].parentNode) {
            stars[2].parentNode.removeChild(stars[2]);
            starRating = 2;
        }
    }
    else if (counter === 40) {
        if (stars[1].parentNode) {
            stars[1].parentNode.removeChild(stars[1]);
            starRating = 1;
        }
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
    if (openCards.length === 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            matchCards (openCards[0], openCards[1]);
            matchedCards.push(openCards[0],openCards[1]);
            openCards = [];
    // if the cards do not match, remove the cards from the list and hide the card's symbol:
        } else {
            hideCard(openCards[0]);
            hideCard(openCards[1]);
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
    seconds.innerHTML = totalSeconds;
    minutes.innerHTML = totalMinutes;
    totalSeconds++;
    if (totalSeconds === 60) {
    totalMinutes++;
    totalSeconds = 0;
    }  else if (totalSeconds < 10) {
        totalSeconds = '0'+ `${totalSeconds}`;
    }
}

const timer = setInterval(setTimer, 1000);

function displayMessage () {
    alert(`You won! Congratulations! Time spent: ${totalMinutes}:${totalSeconds}; Moves made: ${counter}; Your rating is: ${starRating}`)
}

function restart () {
     makeBoard();
     openCards = [];
     matchedCards = [];
     moveCounter.innerHTML = 0;
     counter = 0;
     totalSeconds = 0;
     totalMinutes = 0;
     minutes.innerHTML = 0;
     seconds.innerHTML = 0;
     returnRating();
}

restartButton.addEventListener('click', function () {
    restart();

})