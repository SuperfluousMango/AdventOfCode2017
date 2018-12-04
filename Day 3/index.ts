import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = parseInt(inputData);
    const pos = {
        x: 0,
        y: 0
    };

    let sign = 1,
        prop: keyof Point = 'x',
        count = 1,
        curShift = 0,
        maxShift = 1;
    
    while (count < data) {
        count++;
        curShift++;
        pos[prop] += sign;

        if (curShift === maxShift) {
            curShift = 0;
            if (prop === 'x') {
                prop = 'y';
            } else {
                sign *= -1;
                maxShift++;
                prop = 'x';
            }
        }
    }

    return Math.abs(pos.x) + Math.abs(pos.y);
}

function puzzleB() {
    const data = parseInt(inputData);
    const pos = {
        x: 0,
        y: 0
    };
    const values = new Map<string, number>();
    values.set('0,0', 1);

    let sign = 1,
        prop: keyof Point = 'x',
        count = 1,
        newVal = 0,
        curShift = 0,
        maxShift = 1;
    
    while (newVal < data) {
        count++;
        curShift++;
        pos[prop] += sign;
        newVal = fillValue(pos, values);

        if (curShift === maxShift) {
            curShift = 0;
            if (prop === 'x') {
                prop = 'y';
            } else {
                sign *= -1;
                maxShift++;
                prop = 'x';
            }
        }
    }
    const key = buildKey(pos.x, pos.y);
    return values.get(key);
}

function fillValue(pos: Point, values: Map<string, number>) {
    let sum = 0;
    for (let xAdj = -1; xAdj <= 1; xAdj++) {
        for (let yAdj = -1; yAdj <= 1; yAdj++) {
            if (xAdj === 0 && yAdj === 0) continue;
            const key = buildKey(pos.x + xAdj, pos.y + yAdj);
            sum += (values.get(key) || 0);
        }
    }
    const key = buildKey(pos.x, pos.y);
    values.set(key, sum);
    return sum;
}

function buildKey(x: number, y: number) {
    return `${x},${y}`;
}

interface Point { x: number, y: number };