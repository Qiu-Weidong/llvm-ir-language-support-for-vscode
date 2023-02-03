import { FuncHeaderContext, TypeContext, TypeDefContext } from "../llvmir/LLVMIRParser";
import { FuncType, LLVMType, NamedType } from "../types/LLVMType";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";


// type table 里面保存的都是实际类型，不要保存 namedtype。

// 所有 函数 返回 LLVMType 类型
export class LLVMIRTypeResolver extends LLVMIRBaseVisitor {

  visitTypeDef(ctx: TypeDefContext) {
    const ty = ctx.type().accept(this) as LLVMType;
    const name = ctx.LocalIdent().symbol.text;
    if (name) {
      return new NamedType(name, ty);
    }
    return null;
  }

  visitFuncHeader(ctx: FuncHeaderContext) {
    const retType = ctx.type().accept(this) as LLVMType;
    const vaarg = ctx.params()._ellipsis ? true : false;
    const params: LLVMType[] = ctx.params().param().map(param => param.accept(this) as LLVMType);
    return new FuncType(retType, params, vaarg);
  }

  visitType(ctx: TypeContext) {
    const ty = ctx.type();
    if(ty) {
      const retType = ty.accept(this) as LLVMType;
      // type params 或者 type *
      const params = ctx.params();
      if(params) {
        // 函数类型
        
        const vaarg = params._ellipsis ? true : false;
        const param_list: LLVMType[] = params.param().map(param => param.accept(this) as LLVMType);
        return new FuncType(retType, param_list, vaarg);
      }
      else if(ctx.Asterisk()){
        // 指针类型

        // 将字符串转换为整数
        ctx.addrSpace()?.IntLit().text;
      }
      return null;
    }

    const ret: any = ctx.voidType()?.accept(this) 
      || ctx.opaqueType()?.accept(this) 
      || ctx.intType()?.accept(this) 
      || ctx.floatType()?.accept(this) 
      || ctx.opaquePointerType()?.accept(this) 
      || ctx.vectorType()?.accept(this) 
      || ctx.labelType()?.accept(this) 
      || ctx.arrayType()?.accept(this) 
      || ctx.structType()?.accept(this) 
      || ctx.namedType()?.accept(this) 
      || ctx.mmxType()?.accept(this) 
      || ctx.tokenType()?.accept(this) 
      || ctx.metadataType()?.accept(this)
      || null;
    
      return ret;
  }

}





