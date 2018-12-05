import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData);
    let pos = 0,
        stepCount = 0,
        oldPos;

    while (true) {
        oldPos = pos;
        pos += data[pos];
        stepCount++;
        if (pos >= data.length) return stepCount;
        data[oldPos]++;
    }
}

function puzzleB() {
    const data = splitData(inputData);
    let pos = 0,
        stepCount = 0,
        oldPos;

    while (true) {
        oldPos = pos;
        pos += data[pos];
        stepCount++;
        if (pos >= data.length) return stepCount;
        data[oldPos] += data[oldPos] >= 3 ? -1 : 1;
    }
}

function splitData(input: string) {
    return input.split('\n')
        .map(x => parseInt(x));
}

function processData(data: number[], incrementFn: (x:number) => number) {
    let pos = 0,
        stepCount = 0,
        oldPos;

    while (true) {
        oldPos = pos;
        pos += data[pos];
        stepCount++;
        if (pos >= data.length) return stepCount;
        data[oldPos] += incrementFn(data[oldPos]);
    }
}