const STEP_COUNT = 329;

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const maxLoops = 2017,
        buffer = calcLoops(maxLoops),
        lastInsertedPos = buffer.indexOf(maxLoops);
    return buffer[lastInsertedPos + 1];
}

function puzzleB() {
    const maxLoops = 50 * 1000 * 1000;

    let bufferLen = 1,
        pos = 0,
        numInPos1: number;

    for (let x = 0; x < maxLoops; x++) {
        let newPos = (pos + STEP_COUNT) % bufferLen + 1;
        if (newPos === 1) {
            numInPos1 = x + 1;
        }
        bufferLen++;
        pos = newPos;
    }

    return numInPos1;
}


function calcLoops(maxLoops: number): number[] {
    const buffer = [0];
    let pos = 0;

    for (let x = 0; x < maxLoops; x++) {
        let newPos = (pos + STEP_COUNT) % buffer.length + 1;
        buffer.splice(newPos, 0, x + 1);
        pos = newPos;
    }

    return buffer;
}

function leftPad(num: number): string {
    return num > 9 ? `${num}` : ` ${num}`
}
