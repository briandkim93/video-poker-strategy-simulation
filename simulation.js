class Card {
    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
    }
}

function buildDeck(deck) {
    for (let i = 1; i <= 13; i += 1) {
        deck.push(new Card(i, 'C'));
        deck.push(new Card(i, 'D'));
        deck.push(new Card(i, 'H'));
        deck.push(new Card(i, 'S'));
    }
};

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
};

function deal(deck, hand) {
    for (let i = 0; i < 5; i += 1) {
        hand.push(deck.shift());
    }
};
    
function draw(deck, hand) {
    for (let i = hand.length; hand.length < 5; i += 1) {
        hand.push(deck.shift());
    }
}

function holdStrategy(hand) {
    if (checkOne(hand)) {
        return checkOne(hand);
    }
    if (checkTwo(hand)) {
        return checkTwo(hand);
    }
    if (checkThree(hand)) {
        return checkThree(hand);
    }
    if (checkFour(hand)) {
        return checkFour(hand);
    }
    if (checkFive(hand)) {
        return checkFive(hand);
    }
    if (checkSix(hand)) {
        return checkSix(hand);
    }
    if (checkSeven(hand)) {
        return checkSeven(hand);
    }
    if (checkEight(hand)) {
        return checkEight(hand);
    }
    if (checkNine(hand)) {
        return checkNine(hand);
    }
    if (checkTen(hand)) {
        return checkTen(hand);
    }
    if (checkEleven(hand)) {
        return checkEleven(hand);
    }
    if (checkTwelve(hand)) {
        return checkTwelve(hand);
    }
    if (checkThirteen(hand)) {
        return checkThirteen(hand);
    }
    if (checkFourteen(hand)) {
        return checkFourteen(hand);
    }
    if (checkFifteen(hand)) {
        return checkFifteen(hand);
    }
}

function checkHand(hand, coin) {
    var handResult = '';
    if (checkHighPair(hand)) {
        handResult = 'highPair';
    }
    if (checkTwoPair(hand)) {
        handResult = 'twoPair';
    }
    if (checkThreeOfAKind(hand)) {
        handResult = 'threeOfAKind';
    }
    if (checkStraight(hand)) {
        handResult = 'straight';
    }
    if (checkFlush(hand)) {
        handResult = 'flush';
    }
    if (checkFullHouse(hand)) {
        handResult = 'fullHouse';
    }
    if (checkFourOfAKind(hand)) {
        handResult = 'fourOfAKind';
    }
    if (checkStraightFlush(hand)) {
        handResult = 'straightFlush';
    }
    if (checkRoyalFlush(hand)) {
        handResult = 'royalFlush';
    }       
    if (choosePayScale(coin)[handResult]) {
        return choosePayScale(coin)[handResult];
    } else {
        return 0;
    }
}

function choosePayScale(coin) {
    const oneCoinPayScale = {
    highPair: 1,
    twoPair: 2,
    threeOfAKind: 3,
    straight: 4,
    flush: 6,
    fullHouse: 9,
    fourOfAKind: 25,
    straightFlush: 50,
    royalFlush: 250
    };

    const twoCoinPayScale = {
        highPair: 2,
        twoPair: 4,
        threeOfAKind: 6,
        straight: 8,
        flush: 12,
        fullHouse: 18,
        fourOfAKind: 50,
        straightFlush: 100,
        royalFlush: 500
    };

    const threeCoinPayScale = {
        highPair: 3,
        twoPair: 6,
        threeOfAKind: 9,
        straight: 12,
        flush: 18,
        fullHouse: 27,
        fourOfAKind: 75,
        straightFlush: 150,
        royalFlush: 750
    };

    const fourCoinPayScale = {
        highPair: 4,
        twoPair: 8,
        threeOfAKind: 12,
        straight: 16,
        flush: 24,
        fullHouse: 36,
        fourOfAKind: 100,
        straightFlush: 200,
        royalFlush: 1000
    };

    const fiveCoinPayScale = {
        highPair: 5,
        twoPair: 10,
        threeOfAKind: 15,
        straight: 20,
        flush: 30,
        fullHouse: 45,
        fourOfAKind: 125,
        straightFlush: 250,
        royalFlush: 4000
    };

    if (coin === 1) {
        return oneCoinPayScale;
    }
    if (coin === 2) {
        return twoCoinPayScale;
    }
    if (coin === 3) {
        return threeCoinPayScale;
    }
    if (coin === 4) {
        return fourCoinPayScale;
    }
    if (coin === 5) {
        return fiveCoinPayScale;
    }
}

function playGame(balance, coin) {
    const newDeck = [];
    const newHand = [];
    var payout = 0;

    buildDeck(newDeck);
    shuffleDeck(newDeck);
    deal(newDeck, newHand);
    const heldCards = holdStrategy(newHand);
    draw(newDeck, heldCards);
    payout = checkHand(heldCards, coin);
    return payout;
}

function simulation(n, coin) {
    var simulationBalance = 0;
    var singlePayout = 0;
    var payoutPercentage;
    var coinsSpent = (n * coin);

    for (let i = 0; i < n; i += 1) {
        simulationBalance -= coin;
        singlePayout = playGame(simulationBalance, coin);
        simulationBalance += singlePayout;
    }
    payoutPercentage = (simulationBalance + coinsSpent) / (coinsSpent) * 100;
    return [payoutPercentage + '%', simulationBalance];
}

function checkOne(hand) {
    if (checkRoyalFlush(hand) || checkStraightFlush(hand) || checkFourOfAKind(hand)) {
        return hand;
    } else {
        return false;
    }
}

function checkTwo(hand) {
    const maxSuitInHand = maxSuit(hand).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(hand).maxSuitOccurrence;

    if (maxSuit(hand).maxSuitOccurrence === 4) {
        for (let i = 0; i < hand.length; i += 1) {
            var heldCards = hand.filter(function(card){return card.suit === maxSuitInHand;});
        }
        if (intersection(heldCards.map(card => card.number), [1,10,11,12,13]).length === 4) {
            return heldCards;
        }
    }
    return false;
}

function checkThree(hand) {
    if (checkStraight(hand) || checkFlush(hand) || checkFullHouse(hand)) {
        return hand;
    } else if (checkThreeOfAKind(hand)) {
        const elementCountObject = elementCounter(hand.map(card => card.number));
        for (number in elementCountObject) {
            if (elementCountObject[number] === 3) {
                var threeOfAKindNumber = parseInt(number);
            }
        }
        const heldCards = hand.filter(function(card){return card.number === threeOfAKindNumber;});
        return heldCards;
    } else {
        return false;
    }
}

function checkFour(hand) {
    const maxSuitInHand = maxSuit(hand).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(hand).maxSuitOccurrence;

    if (maxSuit(hand).maxSuitOccurrence === 4) {
        hand = hand.filter(function(card){return card.suit === maxSuitInHand;});
        for (let i = 1; i <= 9; i += 1) {
            const straightArray = [i, i + 1, i + 2, i + 3, i + 4];
        if (intersection(hand.map(card => card.number), straightArray).length === 4) {
            return hand;
        }
        }
    }
    return false;
}

function checkFive(hand) {
    if (checkTwoPair(hand)) {
        const elementCountObject = elementCounter(hand.map(card => card.number));
        for (number in elementCountObject) {
            if (elementCountObject[number] === 1) {
                var toDiscard = parseInt(number);
            }
        }
        const heldCards = hand.filter(function(card){return card.number !== toDiscard;});
        return heldCards;
    } else {
        return false;
    }
}

function checkSix(hand) {
    if (checkHighPair(hand)) {
        const elementCountObject = elementCounter(hand.map(card => card.number));
        var heldCards = hand;
        for (number in elementCountObject) {
            if (elementCountObject[number] === 1) {
                var toDiscard = parseInt(number);
                heldCards = heldCards.filter(function(card){return card.number !== toDiscard;});
            }
        }
        return heldCards;
    } else {
        return false;
    }
}

function checkSeven(hand) {
    const maxSuitInHand = maxSuit(hand).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(hand).maxSuitOccurrence;

    if (maxSuit(hand).maxSuitOccurrence === 3) {
        for (let i = 0; i < hand.length; i += 1) {
            heldCards = hand.filter(function(card){return card.suit === maxSuitInHand;});
        }
        if (intersection(heldCards.map(card => card.number), [1,10,11,12,13]).length === 3) {
            return heldCards;
        }
    }
    return false;
}

function checkEight(hand) {
    const maxSuitInHand = maxSuit(hand).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(hand).maxSuitOccurrence;

    if (maxSuit(hand).maxSuitOccurrence === 4) {
        for (let i = 0; i < hand.length; i += 1) {
            heldCards = hand.filter(function(card){return card.suit === maxSuitInHand;});
        }
        return heldCards;
    }
    return false;
}

function checkNine(hand) {
    if (checkLowPair(hand)) {
        return checkLowPair(hand);
    }
    return false;
}

function checkTen(hand) {
    if (checkFourToOutsideStraight(hand)) {
        return checkFourToOutsideStraight(hand);
    } else {
        return false;
    }
}

function checkEleven(hand) {
    const heldCards = hand.filter(function(card){return (card.number === 1 || card.number >= 11)});
    const maxSuitInHand = maxSuit(heldCards).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(heldCards).maxSuitOccurrence;    
    if (maxSuitOccurrence === 2) {
        return heldCards.filter((function(card){return card.suit === maxSuitInHand}));
    } else {
        return false;
    }
}

function checkTwelve(hand) {
    const maxSuitInHand = maxSuit(hand).maxSuitInHand;
    const maxSuitOccurrence = maxSuit(hand).maxSuitOccurrence;
    if (maxSuit(hand).maxSuitOccurrence === 3) {
        hand = hand.filter(function(card){return card.suit === maxSuitInHand;});
        for (let i = 1; i <= 9; i += 1) {
            const straightArray = [i, i + 1, i + 2, i + 3, i + 4];
            if (intersection(hand.map(card => card.number), straightArray).length === 3) {
                return hand;
            }
        }
    }
    return false;
}

function checkThirteen(hand) {
    var heldCards = hand.filter(function(card){return (card.number === 1 || card.number >= 11)});
    heldCards = sortHand(heldCards);
    if (heldCards.length >= 2) {
        if (heldCards[0].number === 1) {
            heldCards.push(heldCards.shift());
        }
        return heldCards.slice(0, 2);
    }
    return false;
}

function checkFourteen(hand) {
    const heldCards = hand.filter(function(card){return card.number >= 10;});
    const sortedHeldCards = sortHand(heldCards);
    const maxSuitObject = maxSuit(sortedHeldCards);
    if (sortedHeldCards.length > 0 && sortedHeldCards[0].number === 10 && sortedHeldCards[0].suit === maxSuitObject.maxSuitInHand && maxSuitObject.maxSuitOccurrence === 2) {
        return sortedHeldCards;
    }
    return false;
}

function checkFifteen(hand) {
    const sortedHand = sortHand(hand);
    if (sortedHand[0].number === 1) {
        sortedHand.push(sortedHand.shift());
    }
    const highCard = sortedHand.pop();
    if (highCard.number === 1 || highCard.number >= 11) {
        return [highCard];
    } else {
        return [];
    }
}

function checkLowPair(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountObject = elementCounter(handNumbers);
    for (number in elementCountObject) {
        if (elementCountObject[number] === 2) {
            const lowPairNumber = parseInt(number);
            const heldCards = hand.filter(function(card){return card.number === lowPairNumber});
            return heldCards;
        }
    }
    return false;
}

function checkHighPair(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountArray = Object.values((elementCounter(handNumbers)));
    if (elementCountArray.filter(function(count){return count === 2}).length === 1) {
        const handNumbersString = handNumbers.toString();
        if (handNumbersString.includes('1,1') ||
            handNumbersString.includes('11,11') ||
            handNumbersString.includes('12,12') ||
            handNumbersString.includes('13,13')) {
            return true;
        }
    } else {
        return false;
    }
}

function checkTwoPair(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountArray = Object.values(elementCounter(handNumbers));
    if (elementCountArray.filter(function(count){return count === 2}).length === 2) {
        return true;
    } else {
        return false;
    }
}

function checkThreeOfAKind(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountArray = Object.values(elementCounter(handNumbers));
    if (elementCountArray.filter(function(count){return count === 3}).length) {
        return true;
    } else {
        return false;
    }
}

function checkFourToOutsideStraight(hand) {
    const firstFour = sortHand(hand).slice();
    firstFour.pop();

    const lastFour = sortHand(hand).slice();
    lastFour.shift();

    if (checkStraight(firstFour)) {
        return firstFour;
    } else if (checkStraight(lastFour)) {
        return lastFour;
    } else {
        return false;
    }
}

function checkStraight(hand) {
    const handNumbers = hand.map(card => card.number);
    handNumbers.sort((a, b) => a - b);
    if (checkRoyalStraight(hand)) {
        return true;
    }
    for (let i = 0; i < handNumbers.length - 1; i += 1) {
        if (handNumbers[i] + 1 == handNumbers[i + 1]) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function checkRoyalStraight(hand) {
    const handNumbers = hand.map(card => card.number);
    handNumbers.sort((a, b) => a - b);
    const handNumbersString = handNumbers.toString();
    if (handNumbersString === '1,10,11,12,13') {
        return true;
    } else {
        return false;
    }
}

function checkFlush(hand) {
    const handSuits = hand.map(card => card.suit);
    if (handSuits.every(function(suit){return suit === 'C'}) ||
        handSuits.every(function(suit){return suit === 'D'}) ||
        handSuits.every(function(suit){return suit === 'H'}) ||
        handSuits.every(function(suit){return suit === 'S'})) {
        return true;
    } else {
        return false;
    }
}

function checkFullHouse(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountArray = Object.values(elementCounter(handNumbers));
    if (elementCountArray.filter(function(count){return count === 2}).length &&
        elementCountArray.filter(function(count){return count === 3}).length) {
        return true;
    } else {
        return false;
    }
    return;
}

function checkFourOfAKind(hand) {
    const handNumbers = hand.map(card => card.number);
    const elementCountArray = Object.values(elementCounter(handNumbers));
    if (elementCountArray.filter(function(count){return count === 4}).length) {
        return true;
    } else {
        return false;
    }
}

function checkStraightFlush(hand) {
    if (checkStraight(hand) && checkFlush(hand)) {
        return true;
    } else {
        return false;
    }
}

function checkRoyalFlush(hand) {
    if (checkRoyalStraight(hand) && checkFlush(hand)) {
        return true;
    } else {
        return false;
    }
}

function elementCounter(array) {
    const elementCountObject = {};
    for (let i = 0; i < array.length; i += 1) {
        elementCountObject[array[i]] = (elementCountObject[array[i]] || 0) + 1;
    }
    return elementCountObject;
}

function maxSuit(hand) {
    const handSuits = hand.map(card => card.suit);
    const suitCountObject = elementCounter(handSuits);
    const maxSuitObject = {
        maxSuitOccurrence: 0,
        maxSuitInHand: ''
    }
    for (let suit in suitCountObject) {
        if (suitCountObject[suit] > maxSuitObject.maxSuitOccurrence) {
            maxSuitObject.maxSuitOccurrence = suitCountObject[suit];
            maxSuitObject.maxSuitInHand = suit;
        }
    }
    return maxSuitObject;
}

function intersection(array1, array2) {
    const intersectionArray = [];
    for (let i = 0; i < array1.length; i += 1) {
        if (array2.includes(array1[i])) {
            intersectionArray.push(array1[i]);
        }
    }
    return intersectionArray;
}

function sortHand(hand) {
    hand.sort((a, b) => a.number - b.number);
    return hand;
}