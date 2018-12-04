import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const rows = splitData(inputData);
    
    return rows.reduce((acc, row) => {
        let min = Number.MAX_SAFE_INTEGER,
            max = Number.MIN_SAFE_INTEGER;
        row.forEach(cell => {
            if (cell < min) min = cell;
            if (cell > max) max = cell;
        });
        return acc += (max - min);
    }, 0);
}

function puzzleB() {
    const rows = splitData(inputData);

    return rows.reduce((acc, row) => {
        for (let x = 0; x < row.length - 1; x++) {
            for (let y = x + 1; y < row.length; y++) {
                if (row[x] % row[y] === 0) return (acc += row[x] / row[y]);
                if (row[y] % row[x] === 0) return (acc += row[y] / row[x]);
            }
        }
    }, 0);
}

function splitData(input: string) {
    return input.split('\n')
        .map(row => {
            return row.split('\t')
                .map(x => parseInt(x));
        });
}
