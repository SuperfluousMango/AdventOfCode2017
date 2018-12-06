import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData);
    const startLoc = { x: 0, y: 0 };
    const childLoc = data.reduce((acc, dir) => processMovement(acc, dir), startLoc);
    
    return calcDistanceFromOrigin(childLoc);
}

function puzzleB() {
    const data = splitData(inputData);
    const startLoc = { x: 0, y: 0 };
    const distances: number[] = [];
    const childLoc = data.reduce((acc, dir) => {
        const newLoc = processMovement(acc, dir);
        distances.push(calcDistanceFromOrigin(newLoc));
        return newLoc;
    }, startLoc);

    return Math.max(...distances);
}

function splitData(input: string) {
    return input.split(',');
}

function processMovement(point: Point, direction: string) {
    switch (direction) {
        case 'n':
            return { x: point.x, y: point.y + 2 };
        case 's':
            return { x: point.x, y: point.y - 2 };
        case 'nw':
            return { x: point.x - 1, y: point.y + 1 };
        case 'ne':
            return { x: point.x + 1, y: point.y + 1 };
        case 'sw':
            return { x: point.x - 1, y: point.y - 1 };
        case 'se':
            return { x: point.x + 1, y: point.y - 1 };
        default:
            return {...point};
    }
}

function calcDistanceFromOrigin(point: Point) {
    return Math.abs(point.x) >= Math.abs(point.y)
    ? Math.abs(point.x)
    : Math.abs(point.x) + (Math.abs(point.y) - Math.abs(point.x)) / 2;
}

interface Point {
    x: number;
    y: number;
}
