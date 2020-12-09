import { initialValue, rulesInput } from "./data";

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const rules = splitRules(rulesInput),
        programState = iterateProgram(rules, 5);

    return programState.join('').split('').filter(x => x === '#').length;
}

function puzzleB() {
    const rules = splitRules(rulesInput),
        programState = iterateProgram(rules, 18);

    return programState.join('').split('').filter(x => x === '#').length;
}

function splitRules(data: string): Map<string, string> { 
    return new Map<string, string>(
        data.split('\n')
            .map(row => row.split(' => ') as [string, string])
    );
}

function iterateProgram(rules: Map<string, string>, maxIterations: number): string[] {
    let programState = splitState(initialValue),
        workState: string[][];

    for (let i = 0; i < maxIterations; i++) {
        if (programState[0].length % 2 === 0) {
            workState = splitIntoChunks(programState, 2);    
        } else {
            workState = splitIntoChunks(programState, 3);
        }

        workState.forEach(row => {
            row.forEach((chunk, idx) => row[idx] = applyRule(chunk, rules));
        });

        programState = recombineChunks(workState);
    }

    return programState;
}

function splitState(data: string): string[] {
    return data.split('\n');
}

function splitIntoChunks(data: string[], size: number): string[][] {
    let y = 0,
        x = 0;

    const output: string[][] = [];

    while (y < data.length) {
        x = 0;
        let chunkRow: string[] = [];
        while (x < data[y].length) {
            let chunk: string[] = [];
            for (let i = 0; i < size; i++) {
                chunk.push(data[y + i].substr(x, size));
            }

            chunkRow.push(chunk.join('/'));
            x += size;
        }

        output.push(chunkRow);
        y += size;
    }

    return output;
}

function applyRule(input: string, rules: Map<string, string>): string {
    let match: string;

    if (rules.has(input)) {
        match = rules.get(input);
    } else {
        const transformations = buildTransformations(input);
        match = rules.get(transformations.filter(x => rules.has(x))[0]);
    }

    return match;
}

function buildTransformations(input: string): string[] {
    const output: string[] = [],
        workingArr = input.split('/');

    // Horizonal flip
    const horizonalFlip = [...workingArr].map(x => x.split('').reverse().join(''));
    output.push(horizonalFlip.join('/'));

    // Rotate 90 degrees
    const rotate90: string[] = [];
    for (let i = 0; i < workingArr.length; i++) {
        rotate90.push(workingArr.map(x => x[i]).reverse().join(''));
    }
    const rotate90Flip = rotate90.map(x => x.split('').reverse().join(''));
    output.push(rotate90.join('/'));
    output.push(rotate90Flip.join('/'));

    // Rotate 180 degrees
    const rotate180: string[] = [];
    for (let i = 0; i < workingArr.length; i++) {
        rotate180.push(rotate90.map(x => x[i]).reverse().join(''));
    }
    const rotate180Flip = rotate180.map(x => x.split('').reverse().join(''));
    output.push(rotate180.join('/'));
    output.push(rotate180Flip.join('/'));

    // Rotate 270 degrees
    const rotate270: string[] = [];
    for (let i = 0; i < workingArr.length; i++) {
        rotate270.push(rotate180.map(x => x[i]).reverse().join(''));
    }
    const rotate270Flip = rotate270.map(x => x.split('').reverse().join(''));
    output.push(rotate270.join('/'));
    output.push(rotate270Flip.join('/'));

    return output;
}

function recombineChunks(workState: string[][]): string[] {
    return workState.map(row => {
        const newRowLines: string[] = [],
            chunks = row.map(x => x.split('/')),
            chunkSize = chunks[0].length;
        for (let i = 0; i < chunkSize; i++) {
            newRowLines.push(chunks.map(chunk => chunk[i]).join(''));
        }
        return newRowLines;
    }).flat();
}
