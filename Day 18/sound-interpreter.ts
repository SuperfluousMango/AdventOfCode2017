import { Instruction } from "./instruction";

export class SoundInterpreter {
    pos = 0;
    registers = new Map<string, number>();
    
    private lastFrequencyPlayed: number;

    constructor(private instructions: Instruction[]) { }

    processNextInstruction(): null | number {
        const curInstr = this.instructions[this.pos];
        if (!curInstr) {
            throw `Error: no instruction at pos ${this.pos}`;
        }

        switch (curInstr.instr) {
            case 'snd':
                this.lastFrequencyPlayed = this.getVal(curInstr.arg1);
                this.pos++;
                break;
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
                const rcvTestVal = this.registers.get(curInstr.arg1) ?? 0;
                this.pos++;
                return rcvTestVal ? this.lastFrequencyPlayed : null;
            case 'jgz':
                const jgzTestVal = this.registers.get(curInstr.arg1) ?? 0;
                if (jgzTestVal > 0) {
                    this.pos += this.getVal(curInstr.arg2);
                } else {
                    this.pos++;
                }
                break;
        }

        return null;
    }

    private getVal(arg: string): number {
        if (isNaN(Number(arg))) {
            return this.registers.get(arg) ?? 0;
        } else {
            return Number(arg);
        }
    }
}
