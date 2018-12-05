import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const configSet = new Set<string>();
    let data = splitData(inputData),
        iterations = 0,
        key;

    while (true) {
        let minIdx = getMaxArrayIndex(data);
        distributeBlocks(data, minIdx);
        iterations++;
        
        key = data.join(',');
        if (configSet.has(key)) return iterations;
        configSet.add(key);
    }
}

function puzzleB() {
    const configMap = new Map<string, number>();
    let data = splitData(inputData),
        iterations = 0,
        key;

    while (true) {
        let minIdx = getMaxArrayIndex(data);
        distributeBlocks(data, minIdx);
        iterations++;
        
        key = data.join(',');
        if (configMap.has(key)) return iterations - configMap.get(key);
        configMap.set(key, iterations);
    }
}

function splitData(input: string) {
    return input.split('\t')
        .map(x => parseInt(x));
}

function getMaxArrayIndex(data: number[]) {
    let max = Number.MIN_SAFE_INTEGER,
        idxOfMax = 0;
    
    data.forEach((val, idx) => {
        if (val > max) {
            max = val;
            idxOfMax = idx;
        }
    });

    return idxOfMax;
}

function distributeBlocks(data: number[], fromIdx: number) {
    const blocksToDistribute = data[fromIdx],
        startPos = fromIdx + 1;
    
    data[fromIdx] = 0;
    for (let x = 0; x < blocksToDistribute; x++) {
        const pos = (startPos + x) % data.length;
        data[pos] = data[pos] + 1;
    }
}
