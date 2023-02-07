import { DocumentSymbol, SymbolKind } from "vscode";
import { BasicBlockContext, LabelContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";



export class LLVMIRSymbolVisitor extends LLVMIRBaseVisitor {
  // 填写 symbols 列表，需要填写 comdat、attrgroup、metadata、函数、变量、类型定义
  // globalident、labelident、localident、attrgroup、comdat、metadata
  private symbols: DocumentSymbol[];
  constructor() {
    super();
    this.symbols = [];
  }


  visitLabel(ctx: LabelContext) {
    // 注意去掉前面的 %
    let name = ctx.LocalIdent().text;
    if(name.startsWith('%')) name = name.slice(1, name.length).trim();
    const symbol = ctx.LocalIdent().symbol;
    const range = this.getSymbolRange(symbol);
    this.symbols.push(new DocumentSymbol(name, `(label) ${name}`, SymbolKind.Field, range, range));
  }
  visitBasicBlock(ctx: BasicBlockContext) {
    const label = ctx.LabelIdent();
    if(label) {
      let name = label.text;
      const range = this.getSymbolRange(label.symbol);
      if(name.endsWith(':')) name = name.slice(0, name.length-1).trim();
      this.symbols.push(new DocumentSymbol(name, `(label) ${name}`, SymbolKind.Field, range, range));
    }
    ctx.instruction().forEach(inst => inst.accept(this));
    ctx.terminator().accept(this);
  }

  getSymbols() { return this.symbols; }
}


