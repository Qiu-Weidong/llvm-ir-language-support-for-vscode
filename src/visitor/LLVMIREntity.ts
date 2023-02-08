// 变量和函数、ifunc、alias
import { LLVMIRType } from "./LLVMIRType";
import { Definition, Hover, Position, Range } from "vscode";
import { DocumentSymbol } from "vscode";



export class LLVMIREntity {
  private name: string;
  private hoverMsg: Hover;
  private definition: Definition | undefined;
  private type: LLVMIRType | undefined;
  private symbols: DocumentSymbol[];

  constructor(name: string, hoverMsg: Hover, definition?: Definition, type?: LLVMIRType) {
    this.name = name;
    this.definition = definition;
    this.hoverMsg = hoverMsg;
    this.type = type;
    this.symbols = [];
  }


  setType(type: LLVMIRType) { this.type = type; }
  setName(name: string) { this.name = name; }
  setDefinition(definiton: Definition) { this.definition = definiton; }
  setHoverMsg(msg: Hover) { this.hoverMsg = msg; }
  addSymbol(symbol: DocumentSymbol) { this.symbols.push(symbol); }

  getName(): string { return this.name; }
  getDefinition() { return this.definition; }
  getHoverMsg() { return this.hoverMsg; }
  getType(): LLVMIRType | undefined { return this.type; }
  getSymbols() { return this.symbols; }
  referd(position: Position) {
    for(const symbol of this.symbols) {
      if(symbol.range.contains(position)) return true;
    }
    return false;
  }
}
