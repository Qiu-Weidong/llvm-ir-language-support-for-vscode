// 变量和函数、ifunc、alias
import { LLVMType } from "./LLVMType";

export class LLVMEitity {
  private name: string;
  private referCnt: number;
  private type: LLVMType;

  constructor(name: string, type: LLVMType) {
    this.name = name; 
    this.type = type;
    this.referCnt = 0;
  }

  refer() { this.referCnt++; }
  setName(name: string) { this.name = name; }
  setType(type: LLVMType) { this.type = type; }

  getName(): string { return this.name;}
  getType(): LLVMType { return this.type; }
  isRefered() { return this.referCnt > 0; }
  



}
