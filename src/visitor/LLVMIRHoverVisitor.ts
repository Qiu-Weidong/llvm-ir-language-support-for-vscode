import { ParserRuleContext, Token } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Hover, MarkdownString, Position } from "vscode";
import { ComdatContext, CompilationUnitContext, FuncAttrContext, FuncAttributeContext, FuncDefContext, FuncHeaderContext, LocalDefInstContext, MdNodeContext, MetadataAttachmentContext, MetadataContext, MetadataNodeContext, NamedTypeContext, ParamContext, ParamsContext, TypeContext, ValueContext } from "../llvmir/LLVMIRParser";
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
      if (info) this.result = new Hover([
        { language: "llvm-ir", value: info },
      ]);
    }
  }
  visitComdat(ctx: ComdatContext) {
    const name = ctx.ComdatName();
    if (name && this.positionInTerminal(name)) {
      const info = this.scope.getComdat(name.text);
      if (info) // this.result = new Hover(new MarkdownString(info));
        this.result = new Hover([
          { language: "llvm-ir", value: info },
        ]);
    }
  }
  visitMetadataAttachment(ctx: MetadataAttachmentContext) {
    if (this.positionInTerminal(ctx.MetadataName())) {
      const name = ctx.MetadataName().text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = new Hover([
          { language: "llvm-ir", value: info }
        ]);
      }
    }

    if (this.positionInContext(ctx.mdNode())) {
      ctx.mdNode().accept(this);
    }
  }
  visitMetadataNode(ctx: MetadataNodeContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = new Hover([
          { language: "llvm-ir", value: info }
        ]);
      }
    }
  }
  visitMdNode(ctx: MdNodeContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = new Hover([
          { language: "llvm-ir", value: info }
        ]);
      }
    }
  }
  visitMetadata(ctx: MetadataContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = new Hover([
          { language: "llvm-ir", value: info }
        ]);
      }
    }
  }

  visitNamedType(ctx: NamedTypeContext) {
    if (this.positionInTerminal(ctx.LocalIdent())) {
      const name = ctx.LocalIdent().text;
      const ty = this.scope.getNamedType(name);
      if (ty) {
        this.result = new Hover([
          { language: 'llvm-ir', value: ty.getName() }
        ]);
      }
    }
  }


  // 切换符号表
  visitFuncDef(ctx: FuncDefContext) {
    const header = ctx.funcHeader();
    const name = header.GlobalIdent().text;
    const localScope = this.scope.getChild(name);
    if(localScope) {
      this.scope = localScope;
      this.visitChildren(ctx);
      this.scope = this.scope.getParent();
    }
  }

  visitValue(ctx: ValueContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        const ty = info.getType();
        this.result = new Hover([
          { language: "llvm-ir", value: ty.getName() }
        ]);
      }
    }
  }
  visitParam(ctx: ParamContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        const ty = info.getType();
        this.result = new Hover([
          { language: "llvm-ir", value: ty.getName() }
        ]);
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        const ty = info.getType();
        this.result = new Hover([
          { language: "llvm-ir", value: ty.getName() }
        ]);
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }

}


