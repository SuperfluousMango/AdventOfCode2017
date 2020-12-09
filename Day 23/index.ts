import { inputData } from "./data";
import { Instruction } from "./instruction";
import { Interpreter } from "./interpreter";

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const program = splitInput(inputData),
        interpreter = new Interpreter(program);

    let numberOfMul = 0;
    do {
        if (program[interpreter.pos] && program[interpreter.pos].instr === 'mul') {
            numberOfMul++;
        }

        interpreter.processNextInstruction();
    } while (!interpreter.terminated);
    
    return numberOfMul;
}

function puzzleB() {
    // The input program is essentially counting composite numbers between
    // 108100 and 125100, stepping with an interval of 17, inclusive.
    const min = (81 * 100 + 100000),
        max = min + 17000,
        step = 17;
    
    let numberOfComposite = 0;

    for (let i = min; i <= max; i += step) {
        if (isComposite(i)) {
            numberOfComposite++;
        }
    }

    return numberOfComposite;
}

function splitInput(data: string): Instruction[] {
    return data.split('\n')
        .map(line => {
            const [instr, arg1, arg2] = line.split(' ');
            return { instr, arg1, arg2 };
        })
}

function isComposite(num: number): boolean {
    const cap = Math.floor(Math.sqrt(num));

    for (let i = 2; i <= cap; i++) {
        if (num % i === 0) { return true; }
    }

    return false;
}
