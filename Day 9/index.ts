import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const cleanedData = removeGarbage(inputData);
    const revisedData = cleanedData.replace(/{/g, '[') // change braces to brackets for easier parsing
        .replace(/}/g, ']')
        .replace(/\[,/g, '["",') // Getting weird "{," and ",}" constructions - are they on purpose, or does my garbage collecting suck?
        .replace(/,]/g, ',""]');
    const parsedData = JSON.parse(revisedData);
    return scoreGroup(parsedData);
}

function puzzleB() {
    return countGarbageLength(inputData);
}

function removeGarbage(data: string) {
    let inGarbage = false,
        garbageStart;

    for (let x = 0; x < data.length; x++) {
        if (inGarbage) {
            if (data[x] === '!') {
                data = data.substring(0, x) + data.substring(x + 2); // Cancel out the next character
                x--; // We just removed the character at this position, so stay here so we can check whatever moves into this slot
            } else if (data[x] === '>') {
                data = data.substring(0, garbageStart) + data.substring(x + 1);
                x = garbageStart - 1; // We just removed a bunch of characters, to we need to start checking again at the start of what we removed
                inGarbage = false;
                garbageStart = undefined;
            }
        } else if (data[x] === '<') {
            inGarbage = true;
            garbageStart = x;
        }
    }

    return data;
}

function countGarbageLength(data: string) {
    let inGarbage = false,
        totalGarbageLength = 0;

    for (let x = 0; x < data.length; x++) {
        if (inGarbage) {
            if (data[x] === '!') {
                x++; // skip this character and the next one
            } else if (data[x] === '>') {
                inGarbage = false;
            } else {
                totalGarbageLength++;
            }
        } else if (data[x] === '<') {
            inGarbage = true;
        }
    }

    return totalGarbageLength;
}

function scoreGroup(input: any[], level = 1): number {
    return Array.isArray(input)
        ? level + input.reduce((acc, val) => acc + scoreGroup(val, level + 1), 0)
        : 0;
}
