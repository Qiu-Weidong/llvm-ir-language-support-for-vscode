// 变量和函数、ifunc、alias
import { LLVMIRType } from "./LLVMIRType";
import { Definition } from "vscode";


export class LLVMIRBaseEntity {
  protected name: string;
  protected hoverMsg: string;
  protected referCnt: number;
  protected definition: Definition | undefined;

  constructor(name: string, hoverMsg: string, definition?: Definition) {
    this.name = name;
    this.definition = definition;
    this.referCnt = 0;
    this.hoverMsg = hoverMsg;
  }

  refer() { this.referCnt++; }
  setName(name: string) { this.name = name; }
  setDefinition(definiton: Definition) { this.definition = definiton;}
  setHoverMsg(msg: string) { this.hoverMsg = msg; }

  getName(): string { return this.name;}
  isRefered() { return this.referCnt > 0; }
  getDefinition() { return this.definition; }
  getHoverMsg() { return this.hoverMsg; }
}

export class LLVMIREntity extends LLVMIRBaseEntity {
  protected type: LLVMIRType;

  constructor(name: string, hoverMsg: string,  type: LLVMIRType, definition?: Definition) {
    super(name, hoverMsg, definition);
    this.type = type;
  }


  setType(type: LLVMIRType) { this.type = type; }
  getType(): LLVMIRType { return this.type; }
  
}
