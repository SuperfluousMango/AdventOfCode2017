import { inputData } from "./data";

enum Dir {
    North = 1,
    East = 2,
    South = 3,
    West = 4,
}

enum TurnDir {
    Left = 1,
    Right = 2
}

console.log(`Puzzle A answer: ${puzzleA()}`);
console.log(`Puzzle B answer: ${puzzleB()}`);

function puzzleA() {
    const data = splitInput(inputData),
        cellMap = buildCellMap(data);

    let x = (data[0].length - 1) / 2,
        y = (data.length - 1) / 2,
        pos: Point = { x, y },
        dir = Dir.North,
        newInfections = 0;

    for (let i = 0; i < 10000; i++) {
        const posStr = `${pos.x},${pos.y}`,
            curCell = cellMap.get(posStr),
            turnDir = curCell === '#'
                ? TurnDir.Right
                : TurnDir.Left;
        
        let newCellContents: string;
        if (curCell === '#') {
            newCellContents = '.';
        } else {
            newCellContents = '#';
            newInfections++;
        }
        cellMap.set(posStr, newCellContents);
        
        dir = turn(dir, turnDir);
        pos = moveInDir(pos, dir);
        const newPosStr = `${pos.x},${pos.y}`;
        if (!cellMap.has(newPosStr)) { cellMap.set(newPosStr, '.'); }
    }

    return newInfections;
}

function puzzleB() {
    const data = splitInput(inputData),
        cellMap = buildCellMap(data);

    let x = (data[0].length - 1) / 2,
        y = (data.length - 1) / 2,
        pos: Point = { x, y },
        dir = Dir.North,
        newInfections = 0;

    for (let i = 0; i < 10 * 1000 * 1000; i++) {
        const posStr = `${pos.x},${pos.y}`,
            curCell = cellMap.get(posStr);
        
        let newCellContents: string;
        switch (curCell) {
            case '.':
                newCellContents = 'W';
                dir = turn(dir, TurnDir.Left);
                break;
            case 'W':
                newCellContents = '#';
                newInfections++;
                break;
            case '#':
                newCellContents = 'F';
                dir = turn(dir, TurnDir.Right);
                break;
            case 'F':
                newCellContents = '.';
                dir = reverseDir(dir);
                break;
        }
        cellMap.set(posStr, newCellContents);
        
        pos = moveInDir(pos, dir);
        const newPosStr = `${pos.x},${pos.y}`;
        if (!cellMap.has(newPosStr)) { cellMap.set(newPosStr, '.'); }
    }

    return newInfections;
}

function splitInput(data: string): string[] { 
    return data.split('\n');
}

function buildCellMap(data: string[]): Map<string, string> {
    const cellMap =  new Map<string, string>();

    data.forEach((row, y) => {
        row.split('').forEach((cell, x) => cellMap.set(`${x},${y}`, cell));
    });

    return cellMap;
}

function moveInDir(point: Point, dir: Dir): Point {
    let { x, y } = point;
    switch (dir) {
        case Dir.North:
            y--;
            break;
        case Dir.East:
            x++;
            break;
        case Dir.South:
            y++;
            break;
        case Dir.West:
            x--;
            break;
    }

    return { x, y };
}

function turn(dir: Dir, turnDir: TurnDir): Dir {
    switch (dir) {
        case Dir.North:
            return turnDir === TurnDir.Left ? Dir.West : Dir.East;
        case Dir.East:
            return turnDir === TurnDir.Left ? Dir.North : Dir.South;
        case Dir.South:
            return turnDir === TurnDir.Left ? Dir.East : Dir.West;
        case Dir.West:
            return turnDir === TurnDir.Left ? Dir.South : Dir.North;
    }
}

function reverseDir(dir: Dir): Dir {
    switch (dir) {
        case Dir.North: return Dir.South;
        case Dir.East: return Dir.West;
        case Dir.South: return Dir.North;
        case Dir.West: return Dir.East;
    }
}

interface Point {
    x: number;
    y: number;
}
