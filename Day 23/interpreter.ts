import { Instruction } from "./instruction";

export class Interpreter {
    pos = 0;
    registers = new Map<string, number>();
    terminated = false;

    constructor(private instructions: Instruction[]) {
        'abcdefgh'.split('')
            .forEach(x => this.registers.set(x, 0));
    }

    processNextInstruction(): void {
        const curInstr = this.instructions[this.pos];
        if (!curInstr) {
            this.terminated = true;
            return;
        }
        const oldPos = this.pos;

        switch (curInstr.instr) {
            case 'set':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'sub':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg1) - this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'mul':
                this.registers.set(curInstr.arg1, this.getVal(curInstr.arg1) * this.getVal(curInstr.arg2));
                this.pos++;
                break;
            case 'jnz':
                const jnzTestVal = this.getVal(curInstr.arg1);
                if (jnzTestVal !== 0) {
                    this.pos += this.getVal(curInstr.arg2);
                } else {
                    this.pos++;
                }
                break;
        }
    }

    setRegister(register: string, val: number) {
        this.registers.set(register, val);
    }

    getRegister(register: string): number {
        return this.registers.get(register);
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
