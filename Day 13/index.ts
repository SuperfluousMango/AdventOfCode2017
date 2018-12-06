import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData),
        maxLayer = Math.max(...data.keys());
    let totalSeverity = 0;
    
    for (let layer = 0; layer <= maxLayer; layer++) {
        const depth = data.get(layer);
        if (isCaught(layer, depth)) {
            totalSeverity += layer * depth;
        }
    }

    return totalSeverity;
}

function puzzleB() {
    const data = splitData(inputData),
        maxLayer = Math.max(...data.keys());
    let delay = -1,
        caught;

    do {
        delay++;
        for (let layer = 0; layer <= maxLayer; layer++) {
            const depth = data.get(layer);
            if (depth === undefined) continue;
            if (caught = isCaught(layer + delay, depth)) break;
        }
    } while (caught)

    return delay;
}

function splitData(input: string) {
    return new Map<number, number> (
        input.split('\n')
            .map(row => {
                return row.split(': ')
                    .map(val => parseInt(val)) as [number, number];
            })
        );
}

function isCaught(time: number, depth: number) {
    return depth <= 1 || time % ((depth - 1) * 2) === 0;
}
