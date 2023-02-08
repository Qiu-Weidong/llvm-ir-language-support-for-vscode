import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DocumentSymbol, Range, SymbolKind } from "vscode";
import { BasicBlockContext, FuncDefContext, LabelContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Scope } from "./LLVMIRScope";



export class LLVMIRSymbolVisitor extends LLVMIRBaseVisitor {
  // 填写 symbols 列表，需要填写 comdat、attrgroup、metadata、函数、变量、类型定义
  // globalident、labelident、localident、attrgroup、comdat、metadata
  // 不应该这样写，这样写会污染作用域，应该在 LLVMIRBaseEntity里面增加一个 reference 列表，类型为 DocumentSymbol
  private scope: Scope;
  constructor(scope: Scope) {
    super();
    this.scope = scope;
  }

  visitFuncDef(ctx: FuncDefContext) {
    const header = ctx.funcHeader();
    const name = header.GlobalIdent().text;
    const localScope = this.scope.getChild(name);
    if (localScope) {
      this.scope = localScope;
      this.visitChildren(ctx);
      this.scope = this.scope.getParent();
    }
  }

  visitLabel(ctx: LabelContext) {
    // 注意去掉前面的 %
    const ident = ctx.LocalIdent().symbol;
    let st = ident.charPositionInLine;
    let ed = ident.charPositionInLine + (ident.text?.length || 0);
    let name = ctx.LocalIdent().text;
    if (name.startsWith('%')) { name = name.slice(1, name.length).trim(); st++; }
    const range = new Range(ident.line - 1, st, ident.line - 1, ed);
    const label = this.scope.getLabel(name);
    if (label) {
      label.addSymbol(new DocumentSymbol(name, `(label) ${name}`, SymbolKind.Constant, range, range));
    }
  }
  visitBasicBlock(ctx: BasicBlockContext) {
    const label = ctx.LabelIdent();
    if (label) {
      let name = label.text;
      let ed = label.symbol.charPositionInLine + name.length;
      if (name.endsWith(':')) { name = name.slice(0, name.length - 1).trim(); ed--; }
      const range = new Range(label.symbol.line - 1, label.symbol.charPositionInLine, label.symbol.line - 1, ed);
      this.scope.getLabel(name)?.addSymbol(
        new DocumentSymbol(name, `(label) ${name}`, SymbolKind.Constant, range, range)
      );
    }
    ctx.instruction().forEach(inst => inst.accept(this));
    ctx.terminator().accept(this);
  }

  visitTerminal(node: TerminalNode) {
    const range = this.getTerminalRange(node);
    switch (node.symbol.type) {
      case 34: /**globalident */
        this.scope.getEntity(node.text)?.addSymbol(new DocumentSymbol(
          node.text, 'todo', SymbolKind.Event, range, range
        ));
        break;
      case 35: /**localident */
        const entity = this.scope.getEntity(node.text) || this.scope.getNamedType(node.text);
        entity?.addSymbol(new DocumentSymbol(
          node.text, 'todo', SymbolKind.Namespace, range, range
        ));
        break;
      case 37:/**attrgroupid */
        this.scope.getAttrGroup(node.text)?.addSymbol(new DocumentSymbol(
          node.text, 'attrgroup', SymbolKind.Class, range, range
        ));
        break;
      case 38:/**comdatname */
        this.scope.getComdat(node.text)?.addSymbol(new DocumentSymbol(
          node.text, 'comdat', SymbolKind.Enum, range, range
        ));
        break;
      case 39:/**matadataname */
      case 40:/**metadataid */
        this.scope.getMetadata(node.text)?.addSymbol(new DocumentSymbol(
          node.text, `metadata`, SymbolKind.Field, range, range
        ));
        break;
      default:
        break;
    }
  }
}


