import { inputData } from "./data";

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const program = splitInput(inputData);

    for (let i = 0; i < program.diagnosticSteps; i++) {
        const curVal = program.tape.get(program.pos) ?? 0,
            stateToUse = program.states.get(program.curState)[curVal];
        
        program.tape.set(program.pos, stateToUse.writeVal);
        program.pos += stateToUse.direction;
        program.curState = stateToUse.nextState;
    }

    return Array.from(program.tape.values())
        .filter(x => x === 1)
        .length;
}

function puzzleB() {
}

function splitInput(data: string): TuringProgram {
    const lines = data.split('\n'),
        line1 = lines.shift(),
        line2 = lines.shift(),
        curState = line1.slice(-2,-1),
        pos = 0,
        diagnosticSteps = Number(
            line2.replace('Perform a diagnostic checksum after ', '')
                .replace(' steps.', '')
        ),
        tape = new Map<number, number>(),
        states = new Map<string, State[]>();

    tape.set(0, 0);

    while (lines.length) {
        const line = lines.shift();
        if (!line) { continue; };

        const stateName = line.slice(-2, -1),
            bothStates: State[] = [];
        
        for (let i = 0; i < 2; i++) {
            lines.shift(); // "if the current value is X:"
            const writeLine = lines.shift(),
                moveLine = lines.shift(),
                stateLine = lines.shift(),
                writeVal = Number(writeLine.slice(-2, -1)),
                direction = moveLine.slice(-6) === 'right.' ? 1 : -1,
                nextState = stateLine.slice(-2, -1),
                state = { writeVal, direction, nextState };
                bothStates.push(state);
        }

        states.set(stateName, bothStates);
    }

    return { curState, pos, diagnosticSteps, tape, states };
}

interface TuringProgram {
    curState: string;
    pos: number;
    diagnosticSteps: number;

    tape: Map<number, number>;

    states: Map<string, State[]>;
}

interface State {
    writeVal: number;
    direction: number;
    nextState: string;
}
