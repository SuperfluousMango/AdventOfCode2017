import { Instruction } from "./instruction";

export class DuetInterpreter {
    pos = 0;
    registers = new Map<string, number>();
    waitingOnInput = false;
    
    private inputQueue: number[] = [];

    constructor(private instructions: Instruction[], instance: number) {
        this.registers.set('p', instance);
    }

    processNextInstruction(): null | number {
        const curInstr = this.instructions[this.pos];
        if (!curInstr) {
            throw `Error: no instruction at pos ${this.pos}`;
        }

        switch (curInstr.instr) {
            case 'snd':
                this.pos++;
                return this.getVal(curInstr.arg1);
            case 'set':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'add':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg1) + this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'mul':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg1) * this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'mod':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg1) % this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'rcv':
                if (this.inputQueue.length === 0) {
                    this.waitingOnInput = true;
                } else {
                    this.waitingOnInput = false;
                    this.registers.set(curInstr.arg1, this.inputQueue.shift());
                    this.pos++;
                }
                break;
            case 'jgz':
                const jgzTestVal = this.getVal(curInstr.arg1);
                if (jgzTestVal > 0) {
                    this.pos += this.getVal(curInstr.arg2);
                } else {
                    this.pos++;
                }
                break;
        }

        return null;
    }

    public addValueToQueue(val: number): void {
        this.inputQueue.push(val);
        this.waitingOnInput = false;
    }

    private getVal(arg: string): number {
        if (isNaN(Number(arg))) {
            if (!this.registers.has(arg)) {
                throw `Invalid regster ${arg}`;
            }
            return this.registers.get(arg);
        } else {
            return Number(arg);
        }
    }
}
