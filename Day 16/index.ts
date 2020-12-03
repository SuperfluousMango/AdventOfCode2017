import { inputData } from "./data";

const START_ORDER = 'abcdefghijklmnop',
    SPIN = 's',
    EXCHANGE = 'x',
    PARTNER = 'p';

let orderAfterOneDance: string;

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData);
    let output = START_ORDER.split(''),
        curMove: string;

    while (curMove = data.shift()) {
        output = processDanceMove(output, curMove);
    }

    orderAfterOneDance = output.join('');
    return orderAfterOneDance;
}

function puzzleB() {
    const totalDances = 1000 * 1000 * 1000;

    let data = splitInput(inputData);
    let output = START_ORDER.split(''),
        curMove: string,
        numDancesBeforeRepeat: number;

    for (let x = 1; x <= totalDances; x++) {
        for (let i = 0; i < data.length; i++) {
            curMove = data[i];
            output = processDanceMove(output, curMove);
        }

        if (output.join('') === START_ORDER) {
            numDancesBeforeRepeat = x;
            break;
        }
    }

    const remainingDances = totalDances % numDancesBeforeRepeat;
    for (let x = 0; x < remainingDances; x++) {
        for (let i = 0; i < data.length; i++) {
            curMove = data[i];
            output = processDanceMove(output, curMove);
        }
    }

    return output.join('');
}

function splitInput(data: string) {
    return data.split(',');
}

function processDanceMove(output: string[], curMove: string): string[] {
    const moveType = curMove[0],
        moveDetails = curMove.substring(1).split('/');

    let pos1: number,
        pos2: number;

    switch (moveType) {
        case SPIN:
            output = [].concat(output.slice(-moveDetails[0]), output.slice(0, -moveDetails[0]));
            break;
        case EXCHANGE:
            pos1 = Number(moveDetails[0]);
            pos2 = Number(moveDetails[1]);
            const temp = output[pos1];
            output[pos1] = output[pos2];
            output[pos2] = temp;
            break;
        case PARTNER:
            pos1 = output.indexOf(moveDetails[0]);
            pos2 = output.indexOf(moveDetails[1]);
            output[pos1] = moveDetails[1];
            output[pos2] = moveDetails[0];
            break;
    }

    return output;
}
