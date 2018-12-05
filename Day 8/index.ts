import { inputData } from './data';

console.log(`Puzzle A solution: ${puzzleA()}`);
console.log(`Puzzle B solution: ${puzzleB()}`);

function puzzleA() {
    const data = splitData(inputData),
        registers = new Map<string, number>();

    data.forEach(instr => {
        if (conditionIsTrue(instr.condition, registers)) {
            performOperation(instr.operation, registers);
        }
    });

    return Math.max(...Array.from(registers.values()));
}

function puzzleB() {
    const data = splitData(inputData),
        registers = new Map<string, number>();
    let overallMax = Number.MIN_SAFE_INTEGER;

    data.forEach(instr => {
        if (conditionIsTrue(instr.condition, registers)) {
            performOperation(instr.operation, registers);
            const curMax = Math.max(...Array.from(registers.values()));
            overallMax = Math.max(overallMax, curMax);
        }
    });
    
    return overallMax;
}

function splitData(input: string) {
    return input.split('\n')
        .map(row => {
            const splitRow = row.split(' ');
            return {
                operation: {
                    register: splitRow[0],
                    operation: splitRow[1],
                    value: parseInt(splitRow[2])
                },
                condition: {
                    register: splitRow[4],
                    comparison: splitRow[5],
                    value: parseInt(splitRow[6])
                }
            } as Instruction;
        });
}

function conditionIsTrue(condition: Condition, registers: Map<string, number>) {
    const curVal = getRegisterVal(registers, condition.register);
    switch (condition.comparison) {
        case '>':
            return curVal > condition.value;
        case '>=':
            return curVal >= condition.value;
        case '<':
            return curVal < condition.value;
        case '<=':
            return curVal <= condition.value;
        case '==':
            return curVal === condition.value;
        case '!=':
            return curVal !== condition.value;
    }
}

function performOperation(operation: Operation, registers: Map<string, number>) {
    const curVal = getRegisterVal(registers, operation.register);
    const changeAmt = operation.operation === 'inc' ? operation.value : -operation.value;
    registers.set(operation.register, curVal + changeAmt);
}

function getRegisterVal(registers: Map<string, number>, key: string) {
    if (!registers.has(key)) registers.set(key, 0);
    return registers.get(key);
}

interface Instruction {
    operation: Operation;
    condition: Condition;
}

interface Operation {
    register: string;
    operation: string;
    value: number
}

interface Condition {
    register: string;
    comparison: string;
    value: number
}
