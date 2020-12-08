import { inputData } from "./data";

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        collectedLetters = [];

    let y = 0,
        x = data[y].indexOf('|'),
        dir = [0, 1];
    
    do {
        let char = data[y][x];
        switch (char) {
            case '+':
                if (dir[0] === 0) {
                    dir[1] = 0;
                    dir[0] = (x === 0 || data[y][x - 1] === ' ')
                        ? 1
                        : -1;
                } else {
                    dir[0] = 0;
                    dir[1] = (y === 0 || data[y - 1][x] === ' ')
                        ? 1
                        : -1;
                }
                break;
            case '|':
            case '-':
                break;
            default:
                collectedLetters.push(char);
                break;
        }

        x += dir[0];
        y += dir[1];
    } while (x >= 0 && x < data[0].length && y >= 0 && y < data.length && data[y][x] !== ' ');

    return collectedLetters.join('');
}

function puzzleB() {
    const data = splitInput(inputData);

    let y = 0,
        x = data[y].indexOf('|'),
        dir = [0, 1],
        steps = 0;
    
    do {
        steps++;
        let char = data[y][x];
        switch (char) {
            case '+':
                if (dir[0] === 0) {
                    dir[1] = 0;
                    dir[0] = (x === 0 || data[y][x - 1] === ' ')
                        ? 1
                        : -1;
                } else {
                    dir[0] = 0;
                    dir[1] = (y === 0 || data[y - 1][x] === ' ')
                        ? 1
                        : -1;
                }
                break;
            case '|':
            case '-':
            default:
                break;
        }

        x += dir[0];
        y += dir[1];
    } while (x >= 0 && x < data[0].length && y >= 0 && y < data.length && data[y][x] !== ' ');

    return steps;
}

function splitInput(data: string): string[] {
    return data.split('\n');
}
