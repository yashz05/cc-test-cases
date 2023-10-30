const { time, timeEnd } = require('console');
const fs = require('fs');
// const loading = require("./../others")
var startTime = performance.now()
async function writeEvenNos() {
    let finish = false;
    // reduced to 300 loops of 1k numbers
    for (let i = 1; i < 300; i++) {
        for (let j = 1; j <= 1000; j++) {
            if (j % 2 == 0) {
                setTimeout(async () => {
                    fs.appendFileSync("output.txt", String(j) + "\n");
                    // console.log("wrote even: "+j);
                }, 5000);
            }
        }

    }
    return !finish;

}

function writeOddNos() {
    let finish = false;
    // reduced to 300 loops of 1k numbers
    for (let i = 1; i <= 300; i++) {
        for (let j = i; j <= 1000; j++) {
            if (j % 2 != 0) {
                fs.appendFileSync("output.txt", String(j) + "\n");
                // console.log("wrote odd: "+j);
            }

        }
    }
    return !finish;

}

async function exec() {
    const slowDone = await writeEvenNos();
    if (slowDone) writeOddNos();
    return true;
}

const main = async () => {

    await exec();

    var endTime = performance.now()
    console.log(` TEST CASE 1 took  ${endTime - startTime} milliseconds`)
}
module.exports = {
    main
}
