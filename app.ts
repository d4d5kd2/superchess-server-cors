
const express = require('express');
import { Request, Response } from 'express';
// import * as cors from 'cors';
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;


interface ReelElement {
  reelLabel: number;
  topSlot: string;
  centerSlot: string;
  bottomSlot: string;
}

type slotSymbol = string;

type paytableEntry = {
  symbol: slotSymbol,
  n: number,
  win: number,
};


const paytable: paytableEntry[] = [
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


type Payline = number[]

const paylines: Payline[] = [
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

function getPaylineSymbols(symbolsOnPayline: slotSymbol[][], payline: Payline): slotSymbol[] {
  return payline.map((row, idx) => symbolsOnPayline[idx][row]);
}

type LineWin = {
  line: number;
  symbol: slotSymbol;
  n: number;
  winAmount: number;
};

// Define the five predetermined arrays
const reel_1: slotSymbol[] = [
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
const reel_2: slotSymbol[] = [
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
]
const reel_3: slotSymbol[] = [
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
]
const reel_4: slotSymbol[] = [
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
]
const reel_5: slotSymbol[] = [
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
]

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

function getRandomElementWithNeighborsForReel(reel: number, array: string[]): ReelElement {
  const min = 1;
  const max = array.length - 2;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  const reelLabel = reel;
  const bottomSlot = array[randomIndex + 1];
  const centerSlot = array[randomIndex];
  const topSlot = array[randomIndex - 1];
  return { reelLabel, bottomSlot, centerSlot, topSlot };
}
interface WinningEntry {
  symbol: string;
  n: number;
  win: number;
}

const lowMultiplierValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mediumMultiplierValues = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const highMultiplierValues = [75, 100, 125, 150, 175, 200, 225, 250, 275, 300];

const symbolProbabilities: Record<string, number> = {
  XP: 0.50,   // Wild Pawn
  XN: 0.15,   // Wild Knight
  XB: 0.15,   // Wild Bishop
  XR: 0.10,   // Wild Rook
  XQ: 0.05,   // Wild Queen
  XK: 0.05,   // Wild King
};

const probabilities: Record<string, number> = {
  multiplier_low: 0.60,
  multiplier_mid: 0.16,
  multiplier_high: 0.03,
  clock: 0.03,
  free_games: 0.03,
  red_flag: 0.15
};

function getRandomElementWithProbabilities<T>(array: T[], probabilities: Record<string, number>): T {
  const totalProbability = Object.values(probabilities).reduce((a, b) => a + b, 0);
  let randomProbability = Math.random() * totalProbability;

  let index = 0;
  for (let i = 0; i < array.length; i++) {
    index = i;
    randomProbability -= probabilities[String(array[i])];
    if (randomProbability <= 0) {
      break;
    }
  }

  return array[index];
}

interface Tile {
  type: string;
  value: number | null;
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.get('/spin', (req: Request, res: Response) => {


  const reelPositions: ReelElement[] = [];
  reelPositions.push(getRandomElementWithNeighborsForReel(1, reel_1));
  reelPositions.push(getRandomElementWithNeighborsForReel(2, reel_2));
  reelPositions.push(getRandomElementWithNeighborsForReel(3, reel_3));
  reelPositions.push(getRandomElementWithNeighborsForReel(4, reel_4));
  reelPositions.push(getRandomElementWithNeighborsForReel(5, reel_5));

  const lineWins: LineWin[] = [];

  let freeGamesTriggered3 = false;
  let freeGamesTriggered4 = false;
  let freeGamesTriggered5 = false;
  let bonusGameTriggered = false;
  let randomWildSymbol: slotSymbol = "";




  paylines.forEach((payline, index) => {
    const symbolsOnPayline: slotSymbol[][] = reelPositions.map((reelPos) => [
      reelPos.topSlot,
      reelPos.centerSlot,
      reelPos.bottomSlot,
    ]);

    const paylineSymbols = getPaylineSymbols(symbolsOnPayline, payline);
    let highestWinAmount = 0;
    let highestWinEntry: WinningEntry | undefined;
    
    const XXCount = paylineSymbols.filter(symbol => symbol === 'XX').length;
    const SCCount = symbolsOnPayline.flat().filter(symbol => symbol === 'SC').length;

    if (XXCount === 3) freeGamesTriggered3 = true;
    if (XXCount === 4) freeGamesTriggered4 = true;
    if (XXCount >= 5) freeGamesTriggered5 = true;
    if (SCCount === 3 || SCCount > 3) bonusGameTriggered = true;

    if (freeGamesTriggered3 || freeGamesTriggered4 || freeGamesTriggered5) {
      randomWildSymbol = getRandomElementWithProbabilities(Object.keys(symbolProbabilities), symbolProbabilities);
    }




    if (paylineSymbols[0] === 'XX') {
      paytable.forEach((entry) => {
        let currentSymbol = entry.symbol;
        let consecutiveSymbols = 1;

        for (let i = 1; i < paylineSymbols.length; i++) {
          if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
            
            consecutiveSymbols++;
          } else {
            break;
          }
        }

        if (consecutiveSymbols > 1) {
          const winningEntry = paytable.find(
            (entry) => entry.symbol === currentSymbol && entry.n === consecutiveSymbols,
          );

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
          winAmount: highestWinAmount,
        });
      }
    } else {
      let currentSymbol = paylineSymbols[0];
      let consecutiveSymbols = 1;

      for (let i = 1; i < paylineSymbols.length; i++) {
        if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
          consecutiveSymbols++;
        } else {
          break;
        }
      }


      const winningEntry = paytable.find(
        (entry) => entry.symbol === currentSymbol && entry.n === consecutiveSymbols,
      );
      if (winningEntry) {
        lineWins.push({
          line: index,
          symbol: currentSymbol,
          n: consecutiveSymbols,
          winAmount: winningEntry.win,
        });
      }
    }
  });


  const returnArray = [];
  returnArray.push(
    reelPositions[0],
    reelPositions[1],
    reelPositions[2],
    reelPositions[3],
    reelPositions[4],
  );
  returnArray.push(lineWins);

  returnArray.push({
    freeGamesTriggered3,
    freeGamesTriggered4,
    freeGamesTriggered5,
    bonusGameTriggered,
    randomWildSymbol,
  });
  console.log(returnArray)
  res.send(returnArray);
});
app.get('/grid', (req: Request, res: Response) => {
  const symbolType = getRandomElementWithProbabilities(Object.keys(probabilities), probabilities);

  let value: number | null;
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

  const tile: Tile = {
    type: symbolType,
    value: value
  };

  res.json(tile);
});


app.get('/free_spin/:effect', (req: Request, res: Response) => {

  const reelPositions: ReelElement[] = [];
  reelPositions.push(getRandomElementWithNeighborsForReel(1, reel_1));
  reelPositions.push(getRandomElementWithNeighborsForReel(2, reel_2));
  reelPositions.push(getRandomElementWithNeighborsForReel(3, reel_3));
  reelPositions.push(getRandomElementWithNeighborsForReel(4, reel_4));
  reelPositions.push(getRandomElementWithNeighborsForReel(5, reel_5));
  const modified = applySpecialEffect(req.params.effect, reelPositions);

  function applySpecialEffect(effect: string, reelPositions: ReelElement[]): ReelElement[] {
    const modifiedReelPositions = JSON.parse(JSON.stringify(reelPositions));

    if (effect === 'XP') {
      for (let i = 0; i < reelPositions.length; i++) {

        const currentReel = modifiedReelPositions[i];
        const prevReel = modifiedReelPositions[i - 1];
        const nextReel = modifiedReelPositions[i + 1];

        if (currentReel.topSlot === 'BP') {
          if (prevReel) prevReel.centerSlot = 'XX';
          if (nextReel) nextReel.centerSlot = 'XX';
        } else if (currentReel.bottomSlot === 'WP') {
          if (prevReel) prevReel.centerSlot = 'XX';
          if (nextReel) nextReel.centerSlot = 'XX';
        }
        if (currentReel.centerSlot === 'WP') {
          if (prevReel) prevReel.topSlot = 'XX';
          if (nextReel) nextReel.topSlot = 'XX';
        } else if (currentReel.centerSlot === 'BP') {
          if (prevReel) prevReel.bottomSlot = 'XX';
          if (nextReel) nextReel.bottomSlot = 'XX';
        }
      }
      return modifiedReelPositions as ReelElement[];
    }
    if (effect === 'XB') {
      for (let i = 0; i < reelPositions.length; i++) {
        const currentReel = modifiedReelPositions[i];
        const prevReel = modifiedReelPositions[i - 1];
        const nextReel = modifiedReelPositions[i + 1];
        const prevPrevReel = modifiedReelPositions[i - 2];
        const nextNextReel = modifiedReelPositions[i + 2];

        if (currentReel.topSlot === 'BB' || currentReel.topSlot === 'WB') {
          if (prevReel) prevReel.centerSlot = 'XX';
          if (nextReel) nextReel.centerSlot = 'XX';
          if (prevPrevReel) prevPrevReel.bottomSlot = 'XX';
          if (nextNextReel) nextNextReel.bottomSlot = 'XX';
        } else if (currentReel.centerSlot === 'BB' || currentReel.centerSlot === 'WB') {
          if (prevReel) {prevReel.topSlot = 'XX'; prevReel.bottomSlot = 'XX'};
          if (nextReel) {nextReel.topSlot = 'XX'; nextReel.bottomSlot = 'XX'};
        } else if (currentReel.bottomSlot === 'BB' || currentReel.bottomSlot === 'WB') {
          if (prevReel) prevReel.centerSlot = 'XX';
          if (nextReel) nextReel.centerSlot = 'XX';
          if (prevPrevReel) prevPrevReel.topSlot = 'XX';
          if (nextNextReel) nextNextReel.topSlot = 'XX';
        }

      }
      return modifiedReelPositions as ReelElement[];
    }

    if (effect === 'XR') {
      for (let i = 0; i < reelPositions.length; i++) {
        const currentReel = modifiedReelPositions[i];
        const otherReels = modifiedReelPositions.filter((reel: ReelElement) => reel !== currentReel);
        if (currentReel.topSlot === 'BR' || currentReel.topSlot === 'WR') {
          currentReel.centerSlot = 'XX';
          currentReel.bottomSlot = 'XX';
          otherReels.forEach((reel: ReelElement) => {
            reel.topSlot = 'XX';
          });
        } else if (currentReel.centerSlot === 'BR' || currentReel.centerSlot === 'WR') {
          currentReel.topSlot = 'XX';
          currentReel.bottomSlot = 'XX';
          otherReels.forEach((reel: ReelElement) => {
            reel.centerSlot = 'XX';
          });
        } else if (currentReel.bottomSlot === 'BR' || currentReel.bottomSlot === 'WR') {
          currentReel.topSlot = 'XX';
          currentReel.centerSlot = 'XX';
          otherReels.forEach((reel: ReelElement) => {
            reel.bottomSlot = 'XX';
          });
        }
      }
      return modifiedReelPositions as ReelElement[];
    }
    if (effect === 'XQ' || effect === 'XK' || effect === 'XN') {
      return reelPositions;
    }
    return reelPositions;
  }
  
  const lineWins: LineWin[] = [];

  let freeGamesTriggered3 = false;
  let freeGamesTriggered4 = false;
  let freeGamesTriggered5 = false;
  let bonusGameTriggered = false;
  let randomWildSymbol: slotSymbol = "";



  paylines.forEach((payline, index) => {
    const symbolsOnPayline: slotSymbol[][] = modified.map((reelPos) => [
      reelPos.topSlot,
      reelPos.centerSlot,
      reelPos.bottomSlot,
    ]);

    const unmodifiedSymbolsOnPayline: slotSymbol[][] = reelPositions.map((reelPos) => [
      reelPos.topSlot,
      reelPos.centerSlot,
      reelPos.bottomSlot,
    ]);
    const unmodifiedSymbols = getPaylineSymbols(unmodifiedSymbolsOnPayline, payline);
    const paylineSymbols = getPaylineSymbols(symbolsOnPayline, payline);
    let highestWinAmount = 0;
    let highestWinEntry: WinningEntry | undefined;

    const XXCount = unmodifiedSymbols.filter(symbol => symbol === 'XX').length;
    const SCCount = unmodifiedSymbols.filter(symbol => symbol === 'SC').length;

    if (XXCount === 3) freeGamesTriggered3 = true;
    if (XXCount === 4) freeGamesTriggered4 = true;
    if (XXCount >= 5) freeGamesTriggered5 = true;

    if (freeGamesTriggered3 || freeGamesTriggered4 || freeGamesTriggered5) {
      randomWildSymbol = getRandomElementWithProbabilities(Object.keys(symbolProbabilities), symbolProbabilities);
    }



    if (SCCount >= 3) bonusGameTriggered = true;

    if (paylineSymbols[0] === 'XX') {
      paytable.forEach((entry) => {
        let currentSymbol = entry.symbol;
        let consecutiveSymbols = 1;

        for (let i = 1; i < paylineSymbols.length; i++) {
          if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
            currentSymbol = paylineSymbols[i];
            consecutiveSymbols++;
          } else {
            break;
          }
        }

        if (consecutiveSymbols > 1) {
          const winningEntry = paytable.find(
            (entry) => entry.symbol === currentSymbol && entry.n === consecutiveSymbols,
          );

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
          winAmount: highestWinAmount,
        });
      }
    } else {
      let currentSymbol = paylineSymbols[0];
      let consecutiveSymbols = 1;

      for (let i = 1; i < paylineSymbols.length; i++) {
        if (paylineSymbols[i] === currentSymbol || paylineSymbols[i] === 'XX') {
          consecutiveSymbols++;
        } else {
          break;
        }
      }


      const winningEntry = paytable.find(
        (entry) => entry.symbol === currentSymbol && entry.n === consecutiveSymbols,
      );

      if (winningEntry) {
        lineWins.push({
          line: index,
          symbol: currentSymbol,
          n: consecutiveSymbols,
          winAmount: winningEntry.win,
        });
      }
    }
  });


  const returnArray = [];
  returnArray.push(reelPositions);
  returnArray.push(modified)
  returnArray.push(lineWins);

  returnArray.push({
    freeGamesTriggered3,
    freeGamesTriggered4,
    freeGamesTriggered5,
    bonusGameTriggered,
    randomWildSymbol,
  });
  console.log(returnArray);
  res.send(returnArray);


  
  
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});