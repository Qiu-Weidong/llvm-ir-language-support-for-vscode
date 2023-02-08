import { AttrGroupDefContext, BasicBlockContext, ComdatDefContext, CompilationUnitContext, FuncBodyContext, FuncDeclContext, FuncDefContext, GlobalDeclContext, GlobalDefContext, IndirectSymbolDefContext, LocalDefInstContext, MetadataDefContext, NamedMetadataDefContext } from "../llvmir/LLVMIRParser";
import { LocalScope, Scope } from "./LLVMIRScope";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { LLVMIRTypeResolver } from "./LLVMIRTypeResolver";
import { LabelType, LLVMIRType } from "./LLVMIRType";
import { LLVMIREntity } from "./LLVMIREntity";
import { Hover, Location, TextDocument } from "vscode";



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
      const definition = new Location(this.document.uri, this.getSymbolRange(ctx.ComdatName().symbol));
      const hover = new Hover({language: 'llvm-ir', value: content});
      this.scope.addComdat(name, new LLVMIREntity(name, hover, definition));
    }
  }
  visitAttrGroupDef(ctx: AttrGroupDefContext) {
    const name = ctx.AttrGroupId().symbol.text;

    if (name && !this.scope.getAttrGroup(name)) {
      // 直接找到整个 ctx 的range 获取 document 对应 range 的文本
      const range = this.getContextRange(ctx);
      const st = this.document.offsetAt(range.start);
      const ed = this.document.offsetAt(range.end);
      
      const content = this.document.getText().slice(st, ed);
      const definition = new Location(this.document.uri, this.getSymbolRange(ctx.AttrGroupId().symbol));
      const hover = new Hover({language: 'llvm-ir', value: content});
      this.scope.addAttrGroup(name, new LLVMIREntity(name, hover, definition));
    }
  }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext) {
    const symbol = ctx.MetadataName().symbol;
    const name = symbol.text;

    if (name && !this.scope.getMetadata(name)) {
      const range = this.getContextRange(ctx);
      const st = this.document.offsetAt(range.start);
      const ed = this.document.offsetAt(range.end);
      
      const value = this.document.getText().slice(st, ed);
      const hover = new Hover({language: 'llvm-ir', value});
      const definition = new Location(this.document.uri, this.getSymbolRange(symbol));
      this.scope.addMetadata(symbol.text, new LLVMIREntity(
        name, hover, definition
      ));
    }
  }
  visitMetadataDef(ctx: MetadataDefContext) {
    const symbol = ctx.MetadataId().symbol;
    const name = symbol.text;
    if (name && !this.scope.getMetadata(name)) {
      const range = this.getContextRange(ctx);
      const st = this.document.offsetAt(range.start);
      const ed = this.document.offsetAt(range.end);
      
      const value = this.document.getText().slice(st, ed);
      const hover = new Hover({language:'llvm-ir', value});
      this.scope.addMetadata(symbol.text, new LLVMIREntity(
        name, hover, new Location(this.document.uri, this.getSymbolRange(symbol))
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
    const hover = new Hover({language: 'llvm-ir', value: `(global) ${name}: ${ty.getName()}`});
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    );
    const entity = new LLVMIREntity(name, hover, definition, ty);
    this.scope.addEntity(name, entity);
  }
  visitGlobalDef(ctx: GlobalDefContext) {
    const name = ctx.GlobalIdent().text;
    // this.typeResolver.setScope(this.scope);
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    );
    const hover = new Hover({language: 'llvm-ir', value: `(global) ${name}: ${ty.getName()}`});
    const entity = new LLVMIREntity(name, hover, definition, ty);
    this.scope.addEntity(name, entity);
  }

  visitIndirectSymbolDef(ctx: IndirectSymbolDefContext) {
    const name = ctx.GlobalIdent().text;
    const ty: LLVMIRType = ctx.type().accept(this.typeResolver);
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.GlobalIdent().symbol)
    );
    const hover = new Hover({language: 'llvm-ir', value: `(global) ${name}: ${ty.getName()}`});
    const entity = new LLVMIREntity(name, hover, definition, ty);
    this.scope.addEntity(name, entity);
  }

  visitFuncDecl(ctx: FuncDeclContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    const hover = new Hover({language: 'llvm-ir', value: `(function) ${name}: ${ty.getName()}`});
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.funcHeader().GlobalIdent().symbol)
    );

    this.scope.addEntity(name, new LLVMIREntity(name, hover, definition, ty));
  }

  visitFuncDef(ctx: FuncDefContext) {
    const ty: LLVMIRType = ctx.funcHeader().accept(this.typeResolver);
    const name = ctx.funcHeader().GlobalIdent().text;
    const hover = new Hover({language: 'llvm-ir', value: `(function) ${name}: ${ty.getName()}`});
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.funcHeader().GlobalIdent().symbol)
    );
    this.scope.addEntity(name, new LLVMIREntity(name, hover, definition, ty));
    const localscope = new LocalScope(this.scope);
    this.scope.addChild(name, localscope);

    // 切换符号表
    this.scope = localscope;
    this.typeResolver.setScope(this.scope);
    // 首先要讲参数添加到符号表
    ctx.funcHeader().params().param().forEach(param => {
      const symbol = param.LocalIdent();
      if (symbol) {
        const name = symbol.text;
        const ty: LLVMIRType = param.type().accept(this.typeResolver);
        const hover = new Hover({language: 'llvm-ir', value: `(param) ${name}: ${ty.getName()}`});
        const definition = new Location(
          this.document.uri, this.getSymbolRange(symbol.symbol)
        );
        this.scope.addEntity(name, new LLVMIREntity(name, hover, definition, ty));
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
    const symbol = ctx.LabelIdent();
    if (symbol) {
      let label = symbol.text;
      if (label.endsWith(':')) label = label.slice(0, label.length - 1).trim();
      const hover = new Hover({language: 'llvm-ir', value: `(label) ${label}`});
      const definition = new Location(this.document.uri, this.getSymbolRange(symbol.symbol));
      this.scope.addLabel(label, new LLVMIREntity(label, hover, definition, new LabelType()));
    }
    ctx.instruction().forEach(inst => inst.accept(this));
    ctx.terminator().accept(this);
  }

  visitLocalDefInst(ctx: LocalDefInstContext) {
    const ty: LLVMIRType = ctx.valueInstruction().accept(this.typeResolver);
    const name = ctx.LocalIdent().text;
    const hover = new Hover({language: 'llvm-ir', value: `(local) ${name}: ${ty.getName()}`});
    const definition = new Location(
      this.document.uri, this.getSymbolRange(ctx.LocalIdent().symbol)
    );
    this.scope.addEntity(name, new LLVMIREntity(name, hover, definition, ty));
  }

}



