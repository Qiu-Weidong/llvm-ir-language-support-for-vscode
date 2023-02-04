import { Token } from "antlr4ts";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { AttrGroupDefContext, BasicBlockContext, ComdatDefContext, CompilationUnitContext, FuncAttributeContext, FuncBodyContext, FuncDeclContext, FuncDefContext, GlobalDeclContext, GlobalDefContext, IndirectSymbolDefContext, LocalDefInstContext, MetadataDefContext, NamedMetadataDefContext, TypeDefContext } from "../llvmir/LLVMIRParser";
import { LocalScope, Scope } from "./LLVMIRScope";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { LLVMIRTypeResolver } from "./LLVMIRTypeResolver";
import { LLVMIRType } from "./LLVMIRType";
import { LLVMIREitity } from "./LLVMIREntity";



export class LLVMIRScopeVisitor extends LLVMIRBaseVisitor {
  // 在遍历过程中将错误信息添加进去
  private diagnostics: Diagnostic[];
  private scope: Scope;
  // private localScope: LocalScope | undefined;
  private typeResolver: LLVMIRTypeResolver;

  constructor(diagnostics: Diagnostic[], scope: Scope) {
    super();
    this.diagnostics = diagnostics;
    this.scope = scope;
    this.typeResolver = new LLVMIRTypeResolver(this.scope, diagnostics);

  }

  addError(symbol: Token, msg: string) {
    let diagnostic = new Diagnostic(
      new Range(
        new Position(symbol.line - 1, symbol.charPositionInLine),
        new Position(symbol.line - 1, symbol.charPositionInLine + (symbol.text?.length || 1))
      ),
      msg,
      DiagnosticSeverity.Error
    );
    this.diagnostics.push(diagnostic);
  }

  visitComdatDef(ctx: ComdatDefContext) {
    const name = ctx.ComdatName().symbol.text;
    const kind = ctx._selectionKind.text;

    if (!name) {
      this.addError(ctx.ComdatName().symbol, 'no comdat name provide');
    } else if (!kind) {
      this.addError(ctx._selectionKind, 'no selectionkind provide');
    } else if (this.scope.getComdat(name)) {
      this.addError(ctx.ComdatName().symbol, 'duplicate comdat');
    }
    else {
      const content = `${name} = comdat ${kind}`;
      this.scope.addComdat(name, content);
    }

  }
  visitAttrGroupDef(ctx: AttrGroupDefContext) {
    const name = ctx.AttrGroupId().symbol.text;

    if (!name) {
      this.addError(ctx.AttrGroupId().symbol, 'no attrgroup id provide');
    } else if (this.scope.getAttrGroup(name)) {
      this.addError(ctx.AttrGroupId().symbol, 'duplicate attrgroup');
    }
    else {
      let funcattr = '';
      ctx.funcAttribute().forEach(attr => {
        funcattr += attr.text + ', ';
      });
      if(funcattr.endsWith(', ')) funcattr = funcattr.slice(0, funcattr.length-2);
      const content = `attributes ${name} = { ${funcattr} }`;
      this.scope.addAttrGroup(name, content);
    }
  }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext) {
    const symbol = ctx.MetadataName().symbol;
    if (!symbol.text) {
      this.addError(symbol, 'no metadata name or id provide');
    }
    else if (this.scope.getMetadata(symbol.text)) {
      this.addError(symbol, 'duplicate metadata');
    }
    else {
      let info = '';
      ctx.metadataNode().forEach(node => {
        info += node.text + ', ';
      });
      if(info.endsWith(', ')) info = info.slice(0, info.length-2);
      this.scope.addMetadata(symbol.text, `${symbol.text} = ! { ${info} }`);
    }
  }
  visitMetadataDef(ctx: MetadataDefContext) {
    const symbol = ctx.MetadataId().symbol;
    if (!symbol.text) {
      this.addError(symbol, 'no metadata name or id provide');
    }
    else if (this.scope.getMetadata(symbol.text)) {
      this.addError(symbol, 'duplicate metadata');
    }
    else {
      this.scope.addMetadata(symbol.text, ctx.toString());
    }
  }

  // 使用 LLVMIRTypeResolver 来解析类型
  visitCompilationUnit(ctx: CompilationUnitContext) {
    ctx.topLevelEntity().forEach(entity => {
      entity.comdatDef()?.accept(this);
      entity.globalDecl()?.accept(this);
      entity.globalDef()?.accept(this);
      entity.indirectSymbolDef()?.accept(this);
      entity.funcDecl()?.accept(this);
      entity.funcDef()?.accept(this);
      entity.attrGroupDef()?.accept(this);
      entity.namedMetadataDef()?.accept(this);
      entity.metadataDef()?.accept(this);
    });
  }

  visitGlobalDecl(ctx: GlobalDeclContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const entity = new LLVMIREitity(name, ty);
    this.scope.addEntity(name, entity);
  }
  visitGlobalDef(ctx: GlobalDefContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const entity = new LLVMIREitity(name, ty);
    this.scope.addEntity(name, entity);
  }

  visitIndirectSymbolDef(ctx: IndirectSymbolDefContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const entity = new LLVMIREitity(name, ty);
    this.scope.addEntity(name, entity);
  }

  visitFuncDecl(ctx: FuncDeclContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    this.scope.addEntity(name, new LLVMIREitity(name, ty));
  }

  visitFuncDef(ctx: FuncDefContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    this.scope.addEntity(name, new LLVMIREitity(name, ty));
    const localscope = new LocalScope(this.scope);
    this.scope.addChild(name, localscope);

    // 切换符号表
    this.scope = localscope;
    this.typeResolver.setScope(this.scope);
    // 首先要讲参数添加到符号表
    ctx.funcHeader().params().param().forEach(param => {
      const name = param.LocalIdent()?.text;
      if (name) {
        const ty: LLVMIRType = param.type().accept(this.typeResolver);
        this.scope.addEntity(name, new LLVMIREitity(name, ty));
      }
    });
    ctx.funcBody().accept(this);
    // 切换符号表
    this.scope = this.scope.getParent();
    this.typeResolver.setScope(this.scope);
  }


  visitFuncBody(ctx: FuncBodyContext) {
    ctx.basicBlock().forEach(block => block.accept(this));
  }
  visitBasicBlock(ctx: BasicBlockContext) {
    const label = ctx.LabelIdent()?.text;
    if (label) {
      this.scope.addLabel(label);
    }
    ctx.instruction().forEach(inst => inst.accept(this));
    // ctx.terminator().accept(this);
  }

  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ty: LLVMIRType = ctx.valueInstruction().accept(this.typeResolver);
    const name = ctx.LocalIdent().text;
    this.scope.addEntity(name, new LLVMIREitity(name, ty));
  }
}



