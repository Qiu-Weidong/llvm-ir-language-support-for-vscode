import { LLVMIRBasicTypeResolver } from "./LLVMIRBasicTypeResolver";
import {
  FuncType, LLVMIRType,
  ArrayType,
  VectorType,
  StructType,
  PointerType, UndefinedType
} from "./LLVMIRType";
import { CompilationUnitContext, NamedTypeContext, TypeDefContext, } from "../llvmir/LLVMIRParser";
import { Diagnostic, DiagnosticSeverity, Hover, Location, Position, Range, TextDocument } from "vscode";
import { Token } from "antlr4ts";
import { LLVMIREntity } from "./LLVMIREntity";


export class LLVMIRTypeDefResolver extends LLVMIRBasicTypeResolver {
  private types: Map<string, LLVMIREntity>;
  private diagnostics: Diagnostic[];
  private document: TextDocument;

  constructor(diagnostics: Diagnostic[], document: TextDocument) {
    super();
    this.types = new Map();
    this.diagnostics = diagnostics;
    this.document = document;
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

  visitCompilationUnit(ctx: CompilationUnitContext) {
    ctx.topLevelEntity().forEach(entity => {
      entity.typeDef()?.accept(this);
    });

    // 最后解决所有未定义的类型
    this.resolveUndefinedTypes();
  }
  visitTypeDef(ctx: TypeDefContext) {
    const name = ctx.LocalIdent().symbol.text;
    if (!name) { this.addError(ctx.LocalIdent().symbol, 'name is empty string'); }
    else if (this.types.get(name)) { this.addError(ctx.LocalIdent().symbol, 'duplicate define type'); }
    else {
      const ty: LLVMIRType = ctx.type().accept(this);
      const definition = new Location(this.document.uri, this.getSymbolRange(ctx.LocalIdent().symbol));
      const range = this.getContextRange(ctx);
      const st = this.document.offsetAt(range.start);
      const ed = this.document.offsetAt(range.end);
      const value = this.document.getText().slice(st, ed);
      const hover = new Hover({language:'llvm-ir', value});
      const entity = new LLVMIREntity(name, hover, definition, ty);
      this.types.set(name, entity);
    }
  }
  // 如果没有定义，则返回一个 undefined type
  visitNamedType(ctx: NamedTypeContext) {
    const name = ctx.LocalIdent().symbol.text || '';
    if (!name) { this.addError(ctx.LocalIdent().symbol, 'name is empty string'); }

    const ty = this.types.get(name);
    return ty || new UndefinedType(name);
  }

  getTypeTable() {
    return this.types;
  }

  resolveUndefinedTypes() {
    for (const entity of this.types.values()) {
      const type = entity.getType();
      if (type instanceof UndefinedType) {
        console.log(`未定义的类型 ${type.getName()}`);
      }
      else if ((type instanceof VectorType
        || type instanceof ArrayType
        || type instanceof PointerType) && !type.getBaseType().isDefined()) {
        console.log(`${type.getName()} 中有未定义的类型 ${type.getBaseType().getName()}`);
        const baseTypeName = type.getBaseType().getName();
        const baseType = this.types.get(baseTypeName)?.getType();
        if (baseType) {
          type.setBaseType(baseType);
        }
        else {
          console.log(`无法解决 ${baseTypeName} 的引用`);
        }
      }
      else if (type instanceof StructType) {
        const members = type.getMembers();
        // 查看members是否有未定义的类型
        for (let i = 0; i < members.length; i++) {
          // 要直接在数组上更新
          if (!members[i].isDefined()) {
            const name = members[i].getName();
            const ty = this.types.get(name)?.getType();
            if (ty) {
              members[i] = ty;
            }
            else {
              console.log(`无法解决 ${name} 的引用`);
            }
          }
        }
      }
      else if (type instanceof FuncType) {
        const retType = type.getRetType();
        if (!retType.isDefined()) {
          const retTypeName = retType.getName();
          const realRetType = this.types.get(retTypeName)?.getType();
          if (realRetType) {
            type.setRetType(realRetType);
          }
          else {
            console.log(`无法解决 ${retTypeName} 的引用`);
          }
        }

        const params = type.getParams();
        for (let i = 0; i < params.length; i++) {
          if (!params[i].isDefined()) {
            const name = params[i].getName();
            const ty = this.types.get(name)?.getType();
            if (ty) {
              params[i] = ty;
            }
            else {
              console.log(`无法解决 ${name} 的引用`);
            }
          }
        }
      }


    }
  }
}

