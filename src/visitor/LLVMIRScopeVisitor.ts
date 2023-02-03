import { Token } from "antlr4ts";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { AttrGroupDefContext, ComdatDefContext, MetadataDefContext, NamedMetadataDefContext, TypeDefContext } from "../llvmir/LLVMIRParser";
import { GlobalScope, Scope } from "../types/LLVMScope";
import { LLVMType } from "../types/LLVMType";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";



export class LLVMIRScopeVisitor extends LLVMIRBaseVisitor {
  // 在遍历过程中将错误信息添加进去
  private diagnostics: Diagnostic[];
  private scope: Scope;

  constructor(diagnostics: Diagnostic[]) {
    super();
    this.diagnostics = diagnostics;
    this.scope = new GlobalScope();
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

  visitTypeDef(ctx: TypeDefContext): any {
    const ty = ctx.type().accept(this) as LLVMType;
    const name = ctx.LocalIdent().symbol.text;
    if (!name) {
      const symbol = ctx.LocalIdent().symbol;
      // 报一个符号名称为空的错误
      this.addError(symbol, 'no type name provide');
    }
    else if (this.scope.getNamedType(name)) {
      // 报一个重复定义类型的错误
      this.addError(ctx.LocalIdent().symbol, 'duplicated type');
    }
    else
      this.scope.addNamedType(name, ty);
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
      // let funcattr = '';
      // ctx.funcAttribute().forEach(attr => {
      //   funcattr += attr.accept(this) as string;
      // });
      // const content = `attributes ${name} = { ${funcattr} }`;
      this.scope.addAttrGroup(name, ctx.toString());
    }
  }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext) {
    const symbol = ctx.MetadataName().symbol;
    if(! symbol.text) {
      this.addError(symbol, 'no metadata name or id provide');
    }
    else if(this.scope.getMetadata(symbol.text)) {
      this.addError(symbol, 'duplicate metadata');
    }
    else {

      this.scope.addMetadata(symbol.text, ctx.toString());
    }
  }
  visitMetadataDef(ctx: MetadataDefContext) {
    const symbol = ctx.MetadataId().symbol;
    if(! symbol.text) {
      this.addError(symbol, 'no metadata name or id provide');
    }
    else if(this.scope.getMetadata(symbol.text)) {
      this.addError(symbol, 'duplicate metadata');
    }
    else {

      this.scope.addMetadata(symbol.text, ctx.toString());
    }
  }



}



