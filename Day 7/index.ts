import { inputData } from './data';
import { Program } from './Program';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData);
    const root = getRoot(data);
    return root.name;
}

function puzzleB() {
    const data = splitData(inputData);
    const root = getRoot(data);

    let curProg = root, newProg;
    while (newProg = curProg.findUnbalancedBranch()) {
        curProg = newProg;
    }
    return curProg.weight - curProg.parent.findWeightDiff();
}

function splitData(input: string) {
    const progDataRegex = /^(\w+) \((\d+)\)( -> (.+))?$/;
    const data = input.split('\n')
        .map(row => {
            const data = progDataRegex.exec(row);
            return { name: data[1], weight: parseInt(data[2]), childText: data[4] || '' }
        });
    const progMap = new Map<string, Program>();
    
    data.forEach(val => progMap.set(val.name, new Program(val.name, val.weight)));
    data.forEach(val => {
        if (!val.childText) return;
        const prog = progMap.get(val.name);
        val.childText.split(', ')
            .forEach(childName => prog.addChildProgram(progMap.get(childName)));
    });

    return progMap;
}

function getRoot(data: Map<string, Program>) {
    let curProg = data.values().next().value;
    while (curProg.parent) {
        curProg = curProg.parent;
    }
    return curProg;
}
