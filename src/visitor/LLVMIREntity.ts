// 变量和函数、ifunc、alias
import { LLVMIRType } from "./LLVMIRType";
import { Definition, Hover } from "vscode";



export class LLVMIREntity {
  private name: string;
  private hoverMsg: Hover;
  private definition: Definition | undefined;
  private type: LLVMIRType | undefined;

  constructor(name: string, hoverMsg: Hover, definition?: Definition, type?: LLVMIRType) {
    this.name = name;
    this.definition = definition;
    this.hoverMsg = hoverMsg;
    this.type = type;
  }


  setType(type: LLVMIRType) { this.type = type; }
  setName(name: string) { this.name = name; }
  setDefinition(definiton: Definition) { this.definition = definiton; }
  setHoverMsg(msg: Hover) { this.hoverMsg = msg; }

  getName(): string { return this.name; }
  getDefinition() { return this.definition; }
  getHoverMsg() { return this.hoverMsg; }
  getType(): LLVMIRType | undefined { return this.type; }

}
