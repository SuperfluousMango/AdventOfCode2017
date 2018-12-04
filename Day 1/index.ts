import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    let sum = 0;

    for (let i = 0; i < inputData.length; i++) {
        let a = inputData[i],
            b = i === inputData.length - 1 ? inputData[0] : inputData[i + 1];
        
        if (a === b) sum += parseInt(a);
    }

    return sum;
}

function puzzleB() {
    let sum = 0;
    let len = inputData.length,
        halfLen = len / 2;
    
    for (let i = 0; i < len; i++) {
        let a = inputData[i],
            b = inputData[(i + halfLen) % len];
    
        if (a === b) sum += parseInt(a);
    }

    return sum;
}