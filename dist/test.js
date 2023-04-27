"use strict";
// const NUMBER_OF_SPINS = 1000;
// const NUMBER_OF_RUNS = 5;
// const SPIN_DELAY_MS = 0;
// interface SpinWin {
//   line: number;
//   symbol: string;
//   n: number;
//   winAmount: number;
// }
// interface SpinResult {
//   reelLabel: number;
//   bottomSlot: string;
//   centerSlot: string;
//   topSlot: string;
//   lineWins: SpinWin[];
// }
// const rtpData: number[] = [];
// async function run() {
//   for (let runIndex = 0; runIndex < NUMBER_OF_RUNS; runIndex++) {
//     console.log(`Starting run ${runIndex + 1}...`);
//     let totalBetAmount = 0;
//     let totalWinAmount = 0;
//     for (let spinIndex = 0; spinIndex < NUMBER_OF_SPINS; spinIndex++) {
//         const spinResult: SpinResult = await fetch('http://localhost:8080/spin')
//         .then((res) => res.json())
//         .then((data: any) => {
//           return {
//             reelLabel: data[0].reelLabel,
//             bottomSlot: data[0].bottomSlot,
//             centerSlot: data[0].centerSlot,
//             topSlot: data[0].topSlot,
//             lineWins: data[5],
//           };
//         });      
//       let won = 0;
//       for (const win of spinResult.lineWins) {
//           if (win.winAmount > 0) { 
//           won += win.winAmount;
//           } else {
//             won += 0;
//           }
//       }
//       totalWinAmount += won;
//       totalBetAmount += 20;
//       await new Promise((resolve) => setTimeout(resolve, SPIN_DELAY_MS));
//     }
//     const rtp = totalBetAmount === 0 ? 0 : totalWinAmount / totalBetAmount;
//     console.log(`Total win amount: ${totalWinAmount}, total bet amount: ${totalBetAmount}`);
//     console.log(`RTP: ${rtp}`);
//     rtpData.push(rtp);
//     console.log(`Run ${runIndex + 1} finished. RTP: ${rtp}\n`);
//   }
//   const totalRTP = rtpData.reduce((sum, rtp) => sum + rtp, 0);
//   const averageRTP = totalRTP / NUMBER_OF_RUNS;
//   console.log(`Average RTP: ${averageRTP}`);
//   console.log('All runs finished!');
// }
// run();
