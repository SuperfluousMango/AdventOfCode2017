import { inputData} from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const twistLengths = inputData.split(',')
            .map(x => parseInt(x)),
        elementList = new Array(256)
            .fill(0)
            .map((_, idx) => idx);
    
    performAllTwists(elementList, twistLengths);        

    return elementList[0] * elementList[1];
}

function puzzleB() {
    const twistLengths = inputData.split('')
            .map(x => x.charCodeAt(0))
            .concat(17, 31, 73, 47, 23), // Wow, that's some arbitrary criteria
        elementList = new Array(256)
            .fill(0)
            .map((_, idx) => idx);

    let startPos = 0,
        skipSize = 0;
    
    for (let loopCount = 0; loopCount < 64; loopCount++) {
        [startPos, skipSize] = performAllTwists(elementList, twistLengths, startPos, skipSize);
    }

    const denseHash = buildDenseHash(elementList);
    return denseHash.reduce((acc, val) => acc + padToTwoChars(val.toString(16)), '');
}

function performAllTwists(elementList: number[], twistLengths: number[], startPos = 0, skipSize = 0) {
    twistLengths.forEach(twistLen => {
        performTwist(elementList, twistLen, startPos);
        startPos = (startPos + twistLen + skipSize) % elementList.length;
        skipSize++;
    });

    return [startPos, skipSize];
}

function performTwist(elementList: number[], twistLen: number, startPos: number) {
    const elementsToTwist = [];
    for (let x = 0; x < twistLen; x++) {
        const pos = (startPos + x) % elementList.length;
        elementsToTwist.unshift(elementList[pos]); // Need to reverse them, anyway
    }

    for (let x = 0; x < twistLen; x++) {
        const pos = (startPos + x) % elementList.length;
        elementList[pos] = elementsToTwist.shift();
    }
}

function buildDenseHash(sparseHash: number[]) {
    let pos = 0,
        hash = [];
    
    while (pos < sparseHash.length) {
        hash.push(
            sparseHash.slice(pos, pos + 16)
                .reduce((acc, val) => acc ^ val, 0)
        );
        pos += 16;
    }

    return hash;
}

function padToTwoChars(input: string) {
    return input.length === 1 ? '0' + input : input;
}
