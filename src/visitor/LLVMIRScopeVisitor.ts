import { Diagnostic } from "vscode";
import { AttrGroupDefContext, ComdatDefContext, MetadataDefContext, NamedMetadataDefContext, TypeDefContext } from "../llvmir/LLVMIRParser";
import { GlobalScope, Scope } from "../types/LLVMScope";
import { LLVMType, NamedType } from "../types/LLVMType";
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

  visitTypeDef(ctx: TypeDefContext): any {
    const ty = ctx.type().accept(this) as LLVMType;
    const name = ctx.LocalIdent().symbol.text;
    if (!name) {
      // 报一个符号名称为空的错误

    }
    else if (this.scope.getNamedType(name)) {
      // 报一个重复定义类型的错误

    }
    else
      this.scope.addNamedType(name, ty);
  }
  visitComdatDef(ctx: ComdatDefContext) {
    const name = ctx.ComdatName().symbol.text;
    const kind = ctx._selectionKind.text;

    if (!name) {

    } else if (!kind) {

    } else if(this.scope.getComdat(name)) {

    }
    else {
      const content = `${name} = comdat ${kind}`;
      this.scope.addComdat(name, content);
    }

  }
  visitAttrGroupDef(ctx: AttrGroupDefContext) {
    const name = ctx.AttrGroupId().symbol.text;

    if (!name) {

    } else if(this.scope.getAttrGroup(name)) {

    }
    else {
      let funcattr = '';
      ctx.funcAttribute().forEach(attr => {
        funcattr += attr.accept(this) as string;
      });
      const content = `attributes ${name} = { ${funcattr} }`;
      this.scope.addAttrGroup(name, content);
    }
  }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext) {
    
  }
  visitMetadataDef(ctx: MetadataDefContext) {
    
  }



}



