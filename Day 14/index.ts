import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    let squaresUsed = 0;

    for (let rowNum = 0; rowNum < 128; rowNum++) {
        const key = `${inputData}-${rowNum}`,
            hash = buildKnotHashFromString(key);
        squaresUsed += hash.split('')
            .map(hexDigit => parseInt(hexDigit, 16).toString(2))
            .reduce((acc, binaryNumber) => acc + binaryNumber.split('').filter(digit => digit === '1').length, 0);
    }

    return squaresUsed;
}

function puzzleB() {
    const diskMap = new Map<number, Set<number>>();

    for (let rowNum = 0; rowNum < 128; rowNum++) {
        const key = `${inputData}-${rowNum}`,
            hash = buildKnotHashFromString(key),
            binaryOfHash = hash.split('')
                .map(hexDigit => padToLen(parseInt(hexDigit, 16).toString(2), 4))
                .join('');
        
        const rowSet = new Set();
        diskMap.set(rowNum, rowSet);
        binaryOfHash.split('')
            .forEach((val, idx) => { if (val === '1') rowSet.add(idx); });
    }

    let regions = 0;
    for (let row = 0; row < 128; row++) {
        const rowSet = diskMap.get(row);
        for (let col = 0; col < 128; col++) {
            if (!rowSet.has(col)) continue;

            // similar to Day 12, part 2
            regions++;
            let regionSize = 0;
            const squaresToProcess = [{ row, col }];
            while (squaresToProcess.length) {
                const square = squaresToProcess.shift();
                if (diskMap.get(square.row).has(square.col)) {
                    regionSize++;
                    diskMap.get(square.row).delete(square.col);
                }
                addNeighbors(square, diskMap, squaresToProcess);
            }
        }
    }

    return regions;
}

function addNeighbors(loc: Location, diskMap: Map<number, Set<number>>, neighbors: Location[]) {
    const size = 128,
        min = 0,
        max = size - 1,
        coordAdjustments = [
            { row: -1, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: - 1 },
            { row: 0, col: 1 }
        ];

    coordAdjustments.forEach(adjust => {
        let row = loc.row + adjust.row,
            col = loc.col + adjust.col;
        if (row < min || row > max || col < min || col > max) return;

        let workingSet = diskMap.get(row);
        if (workingSet.has(col)) neighbors.push({ row, col });
    });
}

// Copy/pasted from Day 10 because I don't want to refactor it out to a shared module
function buildKnotHashFromString(input: string) {
    const twistLengths = input.split('')
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
    return denseHash.reduce((acc, val) => acc + padToLen(val.toString(16), 2), '');
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

function padToLen(input: string, length: number) {
    while (input.length < length) input = '0' + input;
    return input;
}

interface Location {
    row: number,
    col: number
}
