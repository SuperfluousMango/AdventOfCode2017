import { inputData } from "./data";
import { DuetInterpreter } from "./duet-interpreter";
import { Instruction } from "./instruction";
import { SoundInterpreter } from "./sound-interpreter";

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const program = splitInput(inputData),
        interpreter = new SoundInterpreter(program);  

    let output: number;
    do {
        output = interpreter.processNextInstruction();
    } while (output === null);
    
    return output;
}

function puzzleB() {
    const program = splitInput(inputData),
        interpreter1 = new DuetInterpreter(program, 0),
        interpreter2 = new DuetInterpreter(program, 1);
    
    let prog1SendCount = 0,
        output: number;

    do {
        do {
            output = interpreter1.processNextInstruction();
            if (output !== null) {
                interpreter2.addValueToQueue(output);
            }
        } while (!interpreter1.waitingOnInput);

        do {
            output = interpreter2.processNextInstruction();
            if (output !== null) {
                prog1SendCount++;
                interpreter1.addValueToQueue(output);
            }
        } while (!interpreter2.waitingOnInput);
    } while (!(interpreter1.waitingOnInput && interpreter2.waitingOnInput));

    return prog1SendCount;
}

function splitInput(data: string): Instruction[] {
    return data.split('\n')
        .map(line => {
            const [instr, arg1, arg2] = line.split(' ');
            return { instr, arg1, arg2 };
        })
}
