"use strict";
exports.__esModule = true;
var express = require("express");
// import * as cors from 'cors';
var cors = require('cors');
var app = express.application;
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
var port = process.env.PORT || 3000;
var paytable = [
    { symbol: 'WK', n: 5, win: 1000 },
    { symbol: 'WK', n: 4, win: 500 },
    { symbol: 'WK', n: 3, win: 50 },
    { symbol: 'BK', n: 5, win: 1000 },
    { symbol: 'BK', n: 4, win: 500 },
    { symbol: 'BK', n: 3, win: 50 },
    { symbol: 'WQ', n: 5, win: 500 },
    { symbol: 'WQ', n: 4, win: 200 },
    { symbol: 'WQ', n: 3, win: 20 },
    { symbol: 'BQ', n: 5, win: 500 },
    { symbol: 'BQ', n: 4, win: 200 },
    { symbol: 'BQ', n: 3, win: 20 },
    { symbol: 'WR', n: 5, win: 100 },
    { symbol: 'WR', n: 4, win: 40 },
    { symbol: 'WR', n: 3, win: 20 },
    { symbol: 'BR', n: 5, win: 100 },
    { symbol: 'BR', n: 4, win: 40 },
    { symbol: 'BR', n: 3, win: 20 },
    { symbol: 'WB', n: 5, win: 75 },
    { symbol: 'WB', n: 4, win: 20 },
    { symbol: 'WB', n: 3, win: 10 },
    { symbol: 'BB', n: 5, win: 75 },
    { symbol: 'BB', n: 4, win: 20 },
    { symbol: 'BB', n: 3, win: 10 },
    { symbol: 'WN', n: 5, win: 50 },
    { symbol: 'WN', n: 4, win: 15 },
    { symbol: 'WN', n: 3, win: 4 },
    { symbol: 'BN', n: 5, win: 50 },
    { symbol: 'BN', n: 4, win: 15 },
    { symbol: 'BN', n: 3, win: 4 },
    { symbol: 'WP', n: 5, win: 20 },
    { symbol: 'WP', n: 4, win: 10 },
    { symbol: 'WP', n: 3, win: 4 },
    { symbol: 'BP', n: 5, win: 20 },
    { symbol: 'BP', n: 4, win: 10 },
    { symbol: 'BP', n: 3, win: 4 },
];
var paylines = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 1, 1, 1, 0],
    [2, 1, 1, 1, 2],
    [1, 0, 1, 2, 1],
    [1, 2, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [0, 1, 2, 1, 2],
    [2, 1, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 2, 1, 2],
    [0, 1, 1, 1, 2],
    [2, 1, 1, 1, 0],
];
function getPaylineSymbols(symbolsOnPayline, payline) {
    return payline.map(function (row, idx) { return symbolsOnPayline[idx][row]; });
}
// Define the five predetermined arrays
var reel_1 = [
    "SC",
    "WP",
    "WQ",
    "XX",
    "WR",
    "WN",
    "BK",
    "BQ",
    "BB",
    "BN",
    "BP",
    "SC",
    "XX",
    "WQ",
    "BP",
    "WN",
    "BB",
    "WP",
    "BR",
    "WR",
    "BK",
    "BQ",
    "WP",
    "WB",
    "BB",
    "BR",
    "WR",
    "WB",
    "WP",
    "WK"
];
var reel_2 = [
    "WP",
    "WQ",
    "SC",
    "WN",
    "BK",
    "BQ",
    "XX",
    "BB",
    "BN",
    "BP",
    "XX",
    "WQ",
    "BR",
    "WP",
    "BP",
    "WB",
    "BB",
    "BN",
    "WN",
    "WK",
    "BQ",
    "WP",
    "WP",
    "BP",
    "WR",
    "SC",
    "WN",
    "BR",
    "WR",
    "WB"
];
var reel_3 = [
    "WQ",
    "BP",
    "WK",
    "WN",
    "WP",
    "BK",
    "BQ",
    "BR",
    "BB",
    "BN",
    "BP",
    "XX",
    "WQ",
    "BR",
    "WP",
    "BP",
    "WB",
    "BB",
    "BN",
    "WN",
    "SC",
    "BQ",
    "WP",
    "BP",
    "XX",
    "WR",
    "BB",
    "SC",
    "WR",
    "WP"
];
var reel_4 = [
    "WK",
    "WR",
    "WB",
    "WN",
    "WP",
    "BK",
    "BQ",
    "SC",
    "BR",
    "BB",
    "BN",
    "BP",
    "XX",
    "WQ",
    "BR",
    "WP",
    "BP",
    "WB",
    "BB",
    "BN",
    "WN",
    "BK",
    "BQ",
    "WP",
    "BP",
    "XX",
    "SC",
    "WR",
    "WB",
    "WQ"
];
var reel_5 = [
    "SC",
    "WP",
    "WR",
    "WB",
    "WN",
    "WP",
    "BK",
    "BQ",
    "BR",
    "BB",
    "BN",
    "BP",
    "WQ",
    "WQ",
    "BR",
    "WP",
    "BP",
    "WB",
    "BB",
    "BN",
    "WN",
    "WK",
    "BQ",
    "WP",
    "BP",
    "XX",
    "SC",
    "WR",
    "BB",
    "WK"
];
// function getSlotByIndex(reelElement: ReelElement, index: number): slotSymbol {
//   switch (index) {
//     case 0:
//       return reelElement.topSlot;
//     case 1:
//       return reelElement.centerSlot;
//     case 2:
//       return reelElement.bottomSlot;
//     default:
//       throw new Error('Invalid slot index');
//   }
// }
function getRandomElementWithNeighborsForReel(reel, array) {
    var min = 1;
    var max = array.length - 2;
    var randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    var reelLabel = reel;
    var bottomSlot = array[randomIndex + 1];
    var centerSlot = array[randomIndex];
    var topSlot = array[randomIndex - 1];
    return { reelLabel: reelLabel, bottomSlot: bottomSlot, centerSlot: centerSlot, topSlot: topSlot };
}
var lowMultiplierValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var mediumMultiplierValues = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
var highMultiplierValues = [75, 100, 125, 150, 175, 200, 225, 250, 275, 300];
var symbolProbabilities = {
    XP: 0.50,
    XN: 0.15,
    XB: 0.15,
    XR: 0.10,
    XQ: 0.05,
    XK: 0.05
};
var probabilities = {
    multiplier_low: 0.60,
    multiplier_mid: 0.16,
    multiplier_high: 0.03,
    clock: 0.03,
    free_games: 0.03,
    red_flag: 0.15
};
function getRandomElementWithProbabilities(array, probabilities) {
    var totalProbability = Object.values(probabilities).reduce(function (a, b) { return a + b; }, 0);
    var randomProbability = Math.random() * totalProbability;
    var index = 0;
    for (var i = 0; i < array.length; i++) {
        index = i;
        randomProbability -= probabilities[String(array[i])];
        if (randomProbability <= 0) {
            break;
        }
    }
    return array[index];
}
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/spin', function (req, res) {
    var reelPositions = [];
    reelPositions.push(getRandomElementWithNeighborsForReel(1, reel_1));
    reelPositions.push(getRandomElementWithNeighborsForReel(2, reel_2));
    reelPositions.push(getRandomElementWithNeighborsForReel(3, reel_3));
    reelPositions.push(getRandomElementWithNeighborsForReel(4, reel_4));
    reelPositions.push(getRandomElementWithNeighborsForReel(5, reel_5));
    var lineWins = [];
    var freeGamesTriggered3 = false;
    var freeGamesTriggered4 = false;
    var freeGamesTriggered5 = false;
    var bonusGameTriggered = false;
    var randomWildSymbol = "";
    paylines.forEach(function (payline, index) {
        var symbolsOnPayline = reelPositions.map(function (reelPos) { return [
            reelPos.topSlot,
            reelPos.centerSlot,
            reelPos.bottomSlot,
        ]; });
        var paylineSymbols = getPaylineSymbols(symbolsOnPayline, payline);
        var highestWinAmount = 0;
        var highestWinEntry;
        var XXCount = paylineSymbols.filter(function (symbol) { return symbol === 'XX'; }).length;
        var SCCount = paylineSymbols.filter(function (symbol) { return symbol === 'SC'; }).length;
        if (XXCount === 3)
            freeGamesTriggered3 = true;
        if (XXCount === 4)
            freeGamesTriggered4 = true;
        if (XXCount >= 5)
            freeGamesTriggered5 = true;
        if (freeGamesTriggered3 || freeGamesTriggered4 || freeGamesTriggered5) {
            randomWildSymbol = getRandomElementWithProbabilities(Object.keys(symbolProbabilities), symbolProbabilities);
        }
        if (SCCount >= 3)
            bonusGameTriggered = true;
        if (paylineSymbols[0] === 'XX') {
            paytable.forEach(function (entry) {
                var currentSymbol = entry.symbol;
                var consecutiveSymbols = 1;
                for (var i = 1; i < paylineSymbols.length; i++) {
                    if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
                        currentSymbol = paylineSymbols[i];
                        consecutiveSymbols++;
                    }
                    else {
                        break;
                    }
                }
                if (consecutiveSymbols > 1) {
                    var winningEntry = paytable.find(function (entry) { return entry.symbol === currentSymbol && entry.n === consecutiveSymbols; });
                    if (winningEntry && winningEntry.win > highestWinAmount) {
                        highestWinAmount = winningEntry.win;
                        highestWinEntry = winningEntry;
                    }
                }
            });
            if (highestWinEntry) {
                lineWins.push({
                    line: index,
                    symbol: highestWinEntry.symbol,
                    n: highestWinEntry.n,
                    winAmount: highestWinAmount
                });
            }
        }
        else {
            var currentSymbol_1 = paylineSymbols[0];
            var consecutiveSymbols_1 = 1;
            for (var i = 1; i < paylineSymbols.length; i++) {
                if (paylineSymbols[i] === currentSymbol_1 || paylineSymbols[i] === 'XX') {
                    consecutiveSymbols_1++;
                }
                else {
                    break;
                }
            }
            var winningEntry = paytable.find(function (entry) { return entry.symbol === currentSymbol_1 && entry.n === consecutiveSymbols_1; });
            if (winningEntry) {
                lineWins.push({
                    line: index,
                    symbol: currentSymbol_1,
                    n: consecutiveSymbols_1,
                    winAmount: winningEntry.win
                });
            }
        }
    });
    var returnArray = [];
    returnArray.push(reelPositions[0], reelPositions[1], reelPositions[2], reelPositions[3], reelPositions[4]);
    returnArray.push(lineWins);
    returnArray.push({
        freeGamesTriggered3: freeGamesTriggered3,
        freeGamesTriggered4: freeGamesTriggered4,
        freeGamesTriggered5: freeGamesTriggered5,
        bonusGameTriggered: bonusGameTriggered,
        randomWildSymbol: randomWildSymbol
    });
    res.send(returnArray);
});
app.get('/grid', function (req, res) {
    var symbolType = getRandomElementWithProbabilities(Object.keys(probabilities), probabilities);
    var value;
    switch (symbolType) {
        case 'multiplier_low':
            value = lowMultiplierValues[Math.floor(Math.random() * (lowMultiplierValues.length - 2)) + 1];
            break;
        case 'multiplier_mid':
            value = mediumMultiplierValues[Math.floor(Math.random() * (mediumMultiplierValues.length - 2)) + 1];
            break;
        case 'multiplier_high':
            value = highMultiplierValues[Math.floor(Math.random() * (highMultiplierValues.length - 2)) + 1];
            break;
        case 'clock':
            value = 1;
            break;
        case 'free_games':
            value = 1;
            break;
        case 'red_flag':
            value = null;
            break;
        default:
            value = null;
    }
    var tile = {
        type: symbolType,
        value: value
    };
    res.json(tile);
});
app.get('/free_spin/:effect', function (req, res) {
    var reelPositions = [];
    reelPositions.push(getRandomElementWithNeighborsForReel(1, reel_1));
    reelPositions.push(getRandomElementWithNeighborsForReel(2, reel_2));
    reelPositions.push(getRandomElementWithNeighborsForReel(3, reel_3));
    reelPositions.push(getRandomElementWithNeighborsForReel(4, reel_4));
    reelPositions.push(getRandomElementWithNeighborsForReel(5, reel_5));
    var modified = applySpecialEffect(req.params.effect, reelPositions);
    function applySpecialEffect(effect, reelPositions) {
        var modifiedReelPositions = JSON.parse(JSON.stringify(reelPositions));
        if (effect === 'XP') {
            for (var i = 0; i < reelPositions.length; i++) {
                var currentReel = modifiedReelPositions[i];
                var prevReel = modifiedReelPositions[i - 1];
                var nextReel = modifiedReelPositions[i + 1];
                if (currentReel.topSlot === 'BP') {
                    if (prevReel)
                        prevReel.centerSlot = 'XX';
                    if (nextReel)
                        nextReel.centerSlot = 'XX';
                }
                else if (currentReel.bottomSlot === 'WP') {
                    if (prevReel)
                        prevReel.centerSlot = 'XX';
                    if (nextReel)
                        nextReel.centerSlot = 'XX';
                }
                if (currentReel.centerSlot === 'WP') {
                    if (prevReel)
                        prevReel.topSlot = 'XX';
                    if (nextReel)
                        nextReel.topSlot = 'XX';
                }
                else if (currentReel.centerSlot === 'BP') {
                    if (prevReel)
                        prevReel.bottomSlot = 'XX';
                    if (nextReel)
                        nextReel.bottomSlot = 'XX';
                }
            }
            return modifiedReelPositions;
        }
        if (effect === 'XB') {
            for (var i = 0; i < reelPositions.length; i++) {
                var currentReel = modifiedReelPositions[i];
                var prevReel = modifiedReelPositions[i - 1];
                var nextReel = modifiedReelPositions[i + 1];
                var prevPrevReel = modifiedReelPositions[i - 2];
                var nextNextReel = modifiedReelPositions[i + 2];
                if (currentReel.topSlot === 'BB' || currentReel.topSlot === 'WB') {
                    if (prevReel)
                        prevReel.centerSlot = 'XX';
                    if (nextReel)
                        nextReel.centerSlot = 'XX';
                    if (prevPrevReel)
                        prevPrevReel.bottomSlot = 'XX';
                    if (nextNextReel)
                        nextNextReel.bottomSlot = 'XX';
                }
                else if (currentReel.centerSlot === 'BB' || currentReel.centerSlot === 'WB') {
                    if (prevReel) {
                        prevReel.topSlot = 'XX';
                        prevReel.bottomSlot = 'XX';
                    }
                    ;
                    if (nextReel) {
                        nextReel.topSlot = 'XX';
                        nextReel.bottomSlot = 'XX';
                    }
                    ;
                }
                else if (currentReel.bottomSlot === 'BB' || currentReel.bottomSlot === 'WB') {
                    if (prevReel)
                        prevReel.centerSlot = 'XX';
                    if (nextReel)
                        nextReel.centerSlot = 'XX';
                    if (prevPrevReel)
                        prevPrevReel.topSlot = 'XX';
                    if (nextNextReel)
                        nextNextReel.topSlot = 'XX';
                }
            }
            return modifiedReelPositions;
        }
        if (effect === 'XR') {
            var _loop_1 = function (i) {
                var currentReel = modifiedReelPositions[i];
                var otherReels = modifiedReelPositions.filter(function (reel) { return reel !== currentReel; });
                if (currentReel.topSlot === 'BR' || currentReel.topSlot === 'WR') {
                    currentReel.centerSlot = 'XX';
                    currentReel.bottomSlot = 'XX';
                    otherReels.forEach(function (reel) {
                        reel.topSlot = 'XX';
                    });
                }
                else if (currentReel.centerSlot === 'BR' || currentReel.centerSlot === 'WR') {
                    currentReel.topSlot = 'XX';
                    currentReel.bottomSlot = 'XX';
                    otherReels.forEach(function (reel) {
                        reel.centerSlot = 'XX';
                    });
                }
                else if (currentReel.bottomSlot === 'BR' || currentReel.bottomSlot === 'WR') {
                    currentReel.topSlot = 'XX';
                    currentReel.centerSlot = 'XX';
                    otherReels.forEach(function (reel) {
                        reel.bottomSlot = 'XX';
                    });
                }
            };
            for (var i = 0; i < reelPositions.length; i++) {
                _loop_1(i);
            }
            return modifiedReelPositions;
        }
        if (effect === 'XQ' || effect === 'XK' || effect === 'XN') {
            return reelPositions;
        }
        return reelPositions;
    }
    var lineWins = [];
    var freeGamesTriggered3 = false;
    var freeGamesTriggered4 = false;
    var freeGamesTriggered5 = false;
    var bonusGameTriggered = false;
    var randomWildSymbol = "";
    paylines.forEach(function (payline, index) {
        var symbolsOnPayline = modified.map(function (reelPos) { return [
            reelPos.topSlot,
            reelPos.centerSlot,
            reelPos.bottomSlot,
        ]; });
        var unmodifiedSymbolsOnPayline = reelPositions.map(function (reelPos) { return [
            reelPos.topSlot,
            reelPos.centerSlot,
            reelPos.bottomSlot,
        ]; });
        var unmodifiedSymbols = getPaylineSymbols(unmodifiedSymbolsOnPayline, payline);
        var paylineSymbols = getPaylineSymbols(symbolsOnPayline, payline);
        var highestWinAmount = 0;
        var highestWinEntry;
        var XXCount = unmodifiedSymbols.filter(function (symbol) { return symbol === 'XX'; }).length;
        var SCCount = unmodifiedSymbols.filter(function (symbol) { return symbol === 'SC'; }).length;
        if (XXCount === 3)
            freeGamesTriggered3 = true;
        if (XXCount === 4)
            freeGamesTriggered4 = true;
        if (XXCount >= 5)
            freeGamesTriggered5 = true;
        if (freeGamesTriggered3 || freeGamesTriggered4 || freeGamesTriggered5) {
            randomWildSymbol = getRandomElementWithProbabilities(Object.keys(symbolProbabilities), symbolProbabilities);
        }
        if (SCCount >= 3)
            bonusGameTriggered = true;
        if (paylineSymbols[0] === 'XX') {
            paytable.forEach(function (entry) {
                var currentSymbol = entry.symbol;
                var consecutiveSymbols = 1;
                for (var i = 1; i < paylineSymbols.length; i++) {
                    if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
                        currentSymbol = paylineSymbols[i];
                        consecutiveSymbols++;
                    }
                    else {
                        break;
                    }
                }
                if (consecutiveSymbols > 1) {
                    var winningEntry = paytable.find(function (entry) { return entry.symbol === currentSymbol && entry.n === consecutiveSymbols; });
                    if (winningEntry && winningEntry.win > highestWinAmount) {
                        highestWinAmount = winningEntry.win;
                        highestWinEntry = winningEntry;
                    }
                }
            });
            if (highestWinEntry) {
                lineWins.push({
                    line: index,
                    symbol: highestWinEntry.symbol,
                    n: highestWinEntry.n,
                    winAmount: highestWinAmount
                });
            }
        }
        else {
            var currentSymbol_2 = paylineSymbols[0];
            var consecutiveSymbols_2 = 1;
            for (var i = 1; i < paylineSymbols.length; i++) {
                if (paylineSymbols[i] === currentSymbol_2 || paylineSymbols[i] === 'XX') {
                    consecutiveSymbols_2++;
                }
                else {
                    break;
                }
            }
            var winningEntry = paytable.find(function (entry) { return entry.symbol === currentSymbol_2 && entry.n === consecutiveSymbols_2; });
            if (winningEntry) {
                lineWins.push({
                    line: index,
                    symbol: currentSymbol_2,
                    n: consecutiveSymbols_2,
                    winAmount: winningEntry.win
                });
            }
        }
    });
    var returnArray = [];
    returnArray.push(reelPositions);
    returnArray.push(modified);
    returnArray.push(lineWins);
    returnArray.push({
        freeGamesTriggered3: freeGamesTriggered3,
        freeGamesTriggered4: freeGamesTriggered4,
        freeGamesTriggered5: freeGamesTriggered5,
        bonusGameTriggered: bonusGameTriggered,
        randomWildSymbol: randomWildSymbol
    });
    // console.log(returnArray);
    res.send(returnArray);
});
app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});
