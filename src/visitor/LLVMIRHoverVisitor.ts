import { ParserRuleContext } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Hover, MarkdownString, Position } from "vscode";
import { BasicBlockContext, CallingConvEnumContext, CallingConvIntContext, CallInstContext, ComdatContext, CompilationUnitContext, DllStorageClassContext, ExternalLinkageContext, FuncAttributeContext, FuncDefContext, FuncHeaderContext, GlobalDeclContext, GlobalDefContext, InternalLinkageContext, LabelContext, LinkageContext, LocalDefInstContext, MdNodeContext, MetadataAttachmentContext, MetadataContext, MetadataNodeContext, NamedTypeContext, ParamContext, PreemptionContext, TlsModelContext, ValueContext, VisibilityContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Scope } from "./LLVMIRScope";
import { operators, linkagetypes, dllstorageclasses, visibilitystyles, threadLocalStorageModels, runtimePreemptionSpecifiers, callingConventions } from "../llvmir/LLVMIRDocument";


export class LLVMIRHoverVisitor extends LLVMIRBaseVisitor {
  public result: Hover | null | undefined;
  private readonly position: Position;
  private scope: Scope;
  constructor(position: Position, scope: Scope) {
    super();
    this.position = position;
    this.result = null;
    this.scope = scope;
  }

  visitTerminal(node: TerminalNode) {
    switch (node.symbol.type) {
      case 34: /**globalident */
        this.result = this.scope.getEntity(node.text)?.getHoverMsg();
        break;
      case 35: /**localident */
        this.result = this.scope.getEntity(node.text)?.getHoverMsg()
          || this.scope.getNamedType(node.text)?.getHoverMsg();
        break;
      case 36: /**labelident */
        // label 需要掐头去尾
        let name = node.text;
        if (name.startsWith('%')) name = name.substring(1);
        if (name.endsWith(':')) name = name.substring(0, name.length - 1);
        this.result = this.scope.getLabel(name)?.getHoverMsg();
        break;
      case 37:/**attrgroupid */
        this.result = this.scope.getAttrGroup(node.text)?.getHoverMsg();
        break;
      case 38:/**comdatname */
        this.result = this.scope.getComdat(node.text)?.getHoverMsg();
        break;
      case 39:/**matadataname */
      case 40:/**metadataid */
        this.result = this.scope.getMetadata(node.text)?.getHoverMsg();
        break;
      default:
        break;
    }

    // 对运算符提示 73 个运算符
    if (node.symbol.type >= 52 && node.symbol.type <= 124) {
      const result = operators.find(item => item?.name == node.text);
      if (result) {
        this.result = new Hover(new MarkdownString(result.detail));
      }
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
    else {
      this.visitChildren(ctx);
    }
  }
  visitComdat(ctx: ComdatContext) {
    const name = ctx.ComdatName();
    if (name && this.positionInTerminal(name, this.position)) {
      const info = this.scope.getComdat(name.text);
      if (info) // this.result = new Hover(new MarkdownString(info));
        this.result = info.getHoverMsg();
    }
    else {
      this.visitChildren(ctx);
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
    else if (this.positionInContext(ctx.mdNode(), this.position)) {
      ctx.mdNode().accept(this);
    }
    else {
      this.visitChildren(ctx);
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
    else {
      this.visitChildren(ctx);
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
    else {
      this.visitChildren(ctx);
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
    else {
      this.visitChildren(ctx);
    }
  }

  visitNamedType(ctx: NamedTypeContext) {
    if (this.positionInTerminal(ctx.LocalIdent(), this.position)) {
      const name = ctx.LocalIdent().text;
      const ty = this.scope.getNamedType(name);
      if (ty) {
        this.result = ty.getHoverMsg();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }

  visitFuncHeader(ctx: FuncHeaderContext) {
    if (this.positionInTerminal(ctx.GlobalIdent(), this.position)) {
      const name = ctx.GlobalIdent().text;
      const func = this.scope.getEntity(name);
      if (func) {
        const ty = func.getType();
        this.result = func.getHoverMsg();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }

  visitGlobalDecl(ctx: GlobalDeclContext) {
    if (this.positionInTerminal(ctx.GlobalIdent(), this.position)) {
      const entity = this.scope.getEntity(ctx.GlobalIdent().text);
      if (entity) {
        this.result = entity.getHoverMsg();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitGlobalDef(ctx: GlobalDefContext) {
    if (this.positionInTerminal(ctx.GlobalIdent(), this.position)) {
      const entity = this.scope.getEntity(ctx.GlobalIdent().text);
      if (entity) {
        this.result = entity.getHoverMsg();
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
    if (localScope) {
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
    else {
      this.visitChildren(ctx);
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
    const ident = ctx.value().constant()?.GlobalIdent();
    if (ident && this.positionInTerminal(ident, this.position)) {
      const name = ident.text;
      const func = this.scope.getEntity(name);
      if (func) {
        this.result = func.getHoverMsg();
      }
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitLabel(ctx: LabelContext) {
    if (this.positionInTerminal(ctx.LocalIdent(), this.position)) {
      let name = ctx.LocalIdent().text;
      if (name.startsWith('%')) name = name.slice(1, name.length);
      const label = this.scope.getLabel(name);
      if (label) this.result = label.getHoverMsg();
    }
    else {
      this.visitChildren(ctx);
    }
  }
  visitBasicBlock(ctx: BasicBlockContext) {
    const label = ctx.LabelIdent();
    if (label && this.positionInTerminal(label, this.position)) {
      let name = label.text;
      if (name.endsWith(':')) name = name.slice(0, name.length - 1);
      const info = this.scope.getLabel(name);
      if (info) this.result = info.getHoverMsg();
    }
    else {
      this.visitChildren(ctx);
    }
  }




  visitCallingConvInt(ctx: CallingConvIntContext) {
    const n = this.parseIntLit(ctx.IntLit().text);
    const index = n === 10 ? 'cc 10' : n === 11 ? 'cc 11' : 'cc <n>';

    const doc = callingConventions.find(item => item.name === index);
    if (doc) {
      this.result = new Hover([new MarkdownString(doc.detail), new MarkdownString(doc.document)]);
    }

  }
  visitCallingConvEnum(ctx: CallingConvEnumContext) {
    const doc = callingConventions.find(item => item.name === ctx.text);
    if (doc) {
      this.result = new Hover([new MarkdownString(doc.detail), new MarkdownString(doc.document)]);
    }
  }
  visitVisibility(ctx: VisibilityContext) {
    const doc = visibilitystyles.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }

  visitExternalLinkage(ctx: ExternalLinkageContext) {
    const doc = linkagetypes.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }
  visitInternalLinkage(ctx: InternalLinkageContext) {
    const doc = linkagetypes.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }
  visitTlsModel(ctx: TlsModelContext) {
    const doc = threadLocalStorageModels.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }
  visitDllStorageClass(ctx: DllStorageClassContext) {
    const doc = dllstorageclasses.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }
  visitPreemption(ctx: PreemptionContext) {
    const doc = runtimePreemptionSpecifiers.find(item => item.name === ctx.text);
    if (doc) this.result = new Hover(new MarkdownString(doc.detail));
  }
}
