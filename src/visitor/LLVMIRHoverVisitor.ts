import { ParserRuleContext, Token } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { info } from "console";
import { Hover, MarkdownString, Position } from "vscode";
import { CallInstContext, ComdatContext, CompilationUnitContext, FuncAttrContext, FuncAttributeContext, FuncDefContext, FuncHeaderContext, LabelContext, LocalDefInstContext, MdNodeContext, MetadataAttachmentContext, MetadataContext, MetadataNodeContext, NamedTypeContext, ParamContext, ParamsContext, TypeContext, ValueContext } from "../llvmir/LLVMIRParser";
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
    /**todo */
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


  visitCompilationUnit(ctx: CompilationUnitContext) {
    ctx.topLevelEntity().forEach(entity => {
      if (this.positionInContext(entity, this.position)) {
        entity.accept(this);
      }
    });
  }

  visitFuncAttribute(ctx: FuncAttributeContext) {
    const attr = ctx.AttrGroupId();
    if (attr && this.positionInTerminal(attr, this.position)) {
      // 悬浮提示
      const info = this.scope.getAttrGroup(attr.text);
      if (info) this.result = info.getHoverMsg();
    }
  }
  visitComdat(ctx: ComdatContext) {
    const name = ctx.ComdatName();
    if (name && this.positionInTerminal(name, this.position)) {
      const info = this.scope.getComdat(name.text);
      if (info) // this.result = new Hover(new MarkdownString(info));
        this.result = info.getHoverMsg();
    }
  }
  visitMetadataAttachment(ctx: MetadataAttachmentContext) {
    if (this.positionInTerminal(ctx.MetadataName(), this.position)) {
      const name = ctx.MetadataName().text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getHoverMsg();
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
        this.result = info.getHoverMsg();
      }
    }
  }
  visitMdNode(ctx: MdNodeContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id, this.position)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getHoverMsg();
      }
    }
  }
  visitMetadata(ctx: MetadataContext) {
    const id = ctx.MetadataId();
    if (id && this.positionInTerminal(id, this.position)) {
      const name = id.text;
      const info = this.scope.getMetadata(name);
      if (info) {
        this.result = info.getHoverMsg();
      }
    }
  }

  visitNamedType(ctx: NamedTypeContext) {
    if (this.positionInTerminal(ctx.LocalIdent(),this.position)) {
      const name = ctx.LocalIdent().text;
      const ty = this.scope.getNamedType(name);
      if (ty) {
        this.result = new Hover([
          { language: 'llvm-ir', value: ty.getName() }
        ]);
      }
    }
  }

  visitFuncHeader(ctx: FuncHeaderContext) {
    if(this.positionInTerminal(ctx.GlobalIdent(), this.position)) {
      const name = ctx.GlobalIdent().text;
      const func = this.scope.getEntity(name);
      if(func) {
        const ty = func.getType();
        this.result = func.getHoverMsg();
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
        this.result = info.getHoverMsg();
      }
    }
  }
  visitParam(ctx: ParamContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident, this.position)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        const ty = info.getType();
        this.result = info.getHoverMsg();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ident = ctx.LocalIdent();
    if (ident && this.positionInTerminal(ident, this.position)) {
      const name = ident.text;
      const info = this.scope.getEntity(name);
      if (info) {
        const ty = info.getType();
        this.result = info.getHoverMsg();
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
        this.result = func.getHoverMsg();
      }
    }
  }
  visitLabel(ctx: LabelContext) {
    let name = ctx.LocalIdent().text;
    if(name.startsWith('%')) name = name.slice(1, name.length);
    const label = this.scope.getLabel(name);
    if(label) this.result = label.getHoverMsg();
  }
}
