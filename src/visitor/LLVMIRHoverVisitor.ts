import { ParserRuleContext, Token } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Hover, MarkdownString, Position } from "vscode";
import { CompilationUnitContext, FuncAttrContext, FuncAttributeContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Scope } from "./LLVMIRScope";


export class LLVMIRHoverVisitor extends LLVMIRBaseVisitor {
  public result: Hover | null;
  private readonly position: Position;
  private scope: Scope;
  constructor(position: Position, scope: Scope) {
    super();
    this.position = position;
    this.result = null;
    this.scope = scope;
  }

  visitTerminal(node: TerminalNode) {
    // const token = node.symbol;
    // const line = token.line - 1;
    // const character = token.charPositionInLine;
    // const end = token.charPositionInLine + (token.text?.length || 0);
    // if(this.position.line === line && this.position.character >= character && this.position.character <= end) {
    //   // hover 在这里
    // }
  }
  visitChildren(node: RuleNode) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.getChild(i);
      if (child instanceof ParserRuleContext && this.positionInContext(child)) {
        child.accept(this);
      }
      else if (child instanceof TerminalNode && this.positionInTerminal(child)) {
        child.accept(this);
      }
    }
  }

  positionInContext(ctx: ParserRuleContext): boolean {
    const start = ctx.start;
    const stop = ctx.stop;
    if (stop == undefined) return false;
    else if (this.position.line < start.line - 1 || this.position.line > stop.line - 1) return false;
    else if (this.position.line == start.line - 1 && this.position.line == stop.line - 1) {
      // start 和 stop 位于同一行
      return this.position.character >= start.charPositionInLine && this.position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else if (this.position.line == start.line - 1) {
      // stop 不在这一行
      return this.position.character >= start.charPositionInLine;
    }
    else if (this.position.line == stop.line - 1) {
      return this.position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else {
      // 在 start 和 stop 中间的某一行
      return true;
    }
  }
  positionInTerminal(node: TerminalNode): boolean {
    const token = node.symbol;
    const line = token.line - 1;
    const character = token.charPositionInLine;
    const end = token.charPositionInLine + (token.text?.length || 0);
    return (this.position.line === line && this.position.character >= character && this.position.character <= end)
  }

  visitCompilationUnit(ctx: CompilationUnitContext) {
    ctx.topLevelEntity().forEach(entity => {
      if (this.positionInContext(entity)) {
        entity.accept(this);
      }
    });
  }

  visitFuncAttribute(ctx: FuncAttributeContext) {
    const attr = ctx.AttrGroupId();
    if (attr && this.positionInTerminal(attr)) {
      // 悬浮提示
      const info = this.scope.getAttrGroup(attr.text);
      if (info) this.result = new Hover(
        new MarkdownString(info)
      );
    }
  }

}


