import { AttrGroupDefContext, BasicBlockContext, ComdatDefContext, CompilationUnitContext, FuncBodyContext, FuncDeclContext, FuncDefContext, GlobalDeclContext, GlobalDefContext, IndirectSymbolDefContext, LocalDefInstContext, MetadataDefContext, NamedMetadataDefContext } from "../llvmir/LLVMIRParser";
import { LocalScope, Scope } from "./LLVMIRScope";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { LLVMIRTypeResolver } from "./LLVMIRTypeResolver";
import { LLVMIRType } from "./LLVMIRType";
import { LLVMIRBaseEntity, LLVMIREntity } from "./LLVMIREntity";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Definition, Location, TextDocument } from "vscode";



export class LLVMIRScopeVisitor extends LLVMIRBaseVisitor {
  private scope: Scope;
  private typeResolver: LLVMIRTypeResolver;
  private document: TextDocument;

  constructor(scope: Scope, document: TextDocument) {
    super();
    this.scope = scope;
    this.typeResolver = new LLVMIRTypeResolver(this.scope);
    this.document = document;
  }

  visitComdatDef(ctx: ComdatDefContext) {
    const name = ctx.ComdatName().symbol.text;
    const kind = ctx._selectionKind.text;

    if (name && kind && !this.scope.getComdat(name)) {
      const content = `${name} = comdat ${kind}`;
      this.scope.addComdat(name, new LLVMIRBaseEntity(name, content, new Location(this.document.uri, this.getSymbolRange(ctx.ComdatName().symbol))));
    }
  }
  visitAttrGroupDef(ctx: AttrGroupDefContext) {
    const name = ctx.AttrGroupId().symbol.text;

    if (name && !this.scope.getAttrGroup(name)) {
      let funcattr = '';
      ctx.funcAttribute().forEach(attr => {
        funcattr += attr.text + ', ';
      });
      if (funcattr.endsWith(', ')) funcattr = funcattr.slice(0, funcattr.length - 2);
      const content = `attributes ${name} = { ${funcattr} }`;
      this.scope.addAttrGroup(name, new LLVMIRBaseEntity(name, content, new Location(this.document.uri, this.getSymbolRange(ctx.AttrGroupId().symbol))));
    }
  }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext) {
    const symbol = ctx.MetadataName().symbol;
    const name = symbol.text;

    if (name && !this.scope.getMetadata(name)) {
      let info = '';
      ctx.metadataNode().forEach(node => {
        info += node.text + ', ';
      });
      if (info.endsWith(', ')) info = info.slice(0, info.length - 2);
      const content = `${symbol.text} = ! { ${info} }`
      this.scope.addMetadata(symbol.text, new LLVMIRBaseEntity(
        name, content, new Location(this.document.uri, this.getSymbolRange(symbol))
      ));
    }
  }
  visitMetadataDef(ctx: MetadataDefContext) {
    const symbol = ctx.MetadataId().symbol;
    const name = symbol.text;
    if (name && !this.scope.getMetadata(name)) {
      const info = ctx.mdTuple()?.text || ctx.specializedMDNode()?.text || '';
      const msg = `${symbol.text} = ${ctx.distinct() ? 'distinct ' : ""}${info}`;
      this.scope.addMetadata(symbol.text, new LLVMIRBaseEntity(
        name, msg, new Location(this.document.uri, this.getSymbolRange(symbol))
      ));
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
    const entity = new LLVMIREntity(name, 'todo', ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    ));
    this.scope.addEntity(name, entity);
  }
  visitGlobalDef(ctx: GlobalDefContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const entity = new LLVMIREntity(name, 'todo', ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    ));
    this.scope.addEntity(name, entity);
  }

  visitIndirectSymbolDef(ctx: IndirectSymbolDefContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const entity = new LLVMIREntity(name, 'todo', ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    ));
    this.scope.addEntity(name, entity);
  }

  visitFuncDecl(ctx: FuncDeclContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    this.scope.addEntity(name, new LLVMIREntity(name, 'todo', ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.funcHeader().GlobalIdent().symbol)
    )));
  }

  visitFuncDef(ctx: FuncDefContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    this.scope.addEntity(name, new LLVMIREntity(name, 'todo',ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.funcHeader().GlobalIdent().symbol)
    )));
    const localscope = new LocalScope(this.scope);
    this.scope.addChild(name, localscope);

    // 切换符号表
    this.scope = localscope;
    this.typeResolver.setScope(this.scope);
    // 首先要讲参数添加到符号表
    ctx.funcHeader().params().param().forEach(param => {
      const symbol = param.LocalIdent();
      if(symbol) {
        const name = symbol.text;
        const ty: LLVMIRType = param.type().accept(this.typeResolver);
        this.scope.addEntity(name, new LLVMIREntity(name,'todo', ty, new Location(
          this.document.uri, this.getSymbolRange(symbol.symbol)
        )));
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
    ctx.terminator().accept(this);
  }

  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ty: LLVMIRType = ctx.valueInstruction().accept(this.typeResolver);
    const name = ctx.LocalIdent().text;
    this.scope.addEntity(name, new LLVMIREntity(name,'todo', ty, new Location(
      this.document.uri, this.getSymbolRange(ctx.LocalIdent().symbol)
    )));
  }



  visitTerminal(node: TerminalNode) {
    
  }
}



