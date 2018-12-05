import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData);

    return data.filter(phrase => {
        return phrase.reduce((acc, word) => {
            return acc.add(word)
        }, new Set<string>()).size === phrase.length;
    }).length;
}

function puzzleB() {
    const data = splitData(inputData);
    
    return data.filter(phrase => {
        return phrase.reduce((acc, word) => {
            return acc.add(word.split('').sort().join(''))
        }, new Set<string>()).size === phrase.length;
    }).length;
}

function splitData(input: string) {
    return input.split('\n')
        .map(phrase => phrase.split(' '));
}
