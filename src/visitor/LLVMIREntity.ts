// 变量和函数、ifunc、alias
import { LLVMIRType } from "./LLVMIRType";

export class LLVMEitity {
  private name: string;
  private referCnt: number;
  private type: LLVMIRType;

  constructor(name: string, type: LLVMIRType) {
    this.name = name; 
    this.type = type;
    this.referCnt = 0;
  }

  refer() { this.referCnt++; }
  setName(name: string) { this.name = name; }
  setType(type: LLVMIRType) { this.type = type; }

  getName(): string { return this.name;}
  getType(): LLVMIRType { return this.type; }
  isRefered() { return this.referCnt > 0; }
  



}
