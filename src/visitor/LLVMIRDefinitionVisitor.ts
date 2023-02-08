import { ParserRuleContext } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Definition, Position } from "vscode";
import { CallInstContext, ComdatContext, FuncDefContext, FuncHeaderContext, LabelContext, LocalDefInstContext, MdNodeContext, MetadataAttachmentContext, MetadataContext, MetadataNodeContext, ParamContext, ValueContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Scope } from "./LLVMIRScope";



export class LLVMIRDefinitionVisitor extends LLVMIRBaseVisitor {
  private readonly position: Position;
  private scope: Scope;
  private result: Definition | undefined;
  constructor(position: Position, scope: Scope) {
    super();
    this.position = position;
    this.scope = scope;
  }
  visitTerminal(node: TerminalNode) {
    switch (node.symbol.type) {
      case 34: /**globalident */
        this.result = this.scope.getEntity(node.text)?.getDefinition();
        break;
      case 35: /**localident */
        this.result = this.scope.getEntity(node.text)?.getDefinition()
          || this.scope.getNamedType(node.text)?.getDefinition();
        break;
      case 36: /**labelident */
        // label 需要掐头去尾
        let name = node.text;
        if(name.startsWith('%')) name = name.substring(1);
        if(name.endsWith(':')) name = name.substring(0, name.length-1);
        this.result = this.scope.getLabel(name)?.getDefinition();
        break;
      case 37:/**attrgroupid */
        this.result = this.scope.getAttrGroup(node.text)?.getDefinition();
        break;
      case 38:/**comdatname */
        this.result = this.scope.getComdat(node.text)?.getDefinition();
        break;
      case 39:/**matadataname */
      case 40:/**metadataid */
        this.result = this.scope.getMetadata(node.text)?.getDefinition();
        break;
      default:
        break;
    }
  }

  visitChildren(node: RuleNode) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.getChild(i);
      if (child instanceof ParserRuleContext && this.positionInContext(child, this.position)) {
        child.accept(this);
      }
      else if (child instanceof TerminalNode && this.positionInTerminal(child, this.position)) {
        child.accept(this);
      }
    }
  }


  visitComdat(ctx: ComdatContext) {
    const name = ctx.ComdatName();
    if(name && this.positionInTerminal(name, this.position)) {
      const info = this.scope.getComdat(name.text);
      if (info) // this.result = new Hover(new MarkdownString(info));
        this.result = info.getDefinition();
    }
  }
  visitMetadataAttachment(ctx: MetadataAttachmentContext) {
    if (this.positionInTerminal(ctx.MetadataName(), this.position)) {
      const name = ctx.MetadataName().text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }

    if (this.positionInContext(ctx.mdNode(), this.position)) {
      ctx.mdNode().accept(this);
    }
  }
  visitMetadataNode(ctx: MetadataNodeContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id, this.position)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }
  }
  visitMdNode(ctx: MdNodeContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id, this.position)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }
  }
  visitMetadata(ctx: MetadataContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id, this.position)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }
  }

  visitFuncHeader(ctx: FuncHeaderContext) {
    if(this.positionInTerminal(ctx.GlobalIdent(), this.position)) {
      const name = ctx.GlobalIdent().text;
      const func = this.scope.getEntity(name);
      if(func) {
        const ty = func.getType();
        this.result = func.getDefinition();
      }
    }
    else {
      this.visitChildren(ctx);
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
    if (ident && this.positionInTerminal(ident, this.position)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }
  }
  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident, this.position)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        this.result = info.getDefinition();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitCallInst(ctx: CallInstContext) {
    const name = ctx.value().constant()?.GlobalIdent()?.text;
    if(name) {
      const func = this.scope.getEntity(name);
      if(func) {
        this.result = func.getDefinition();
      }
    }
  }
  visitLabel(ctx: LabelContext) {
    let name = ctx.LocalIdent().text;
    if(name.startsWith('%')) name = name.slice(1, name.length);
    const label = this.scope.getLabel(name);
    if(label) this.result = label.getDefinition();
  }


  getResult() { return this.result; }
}



