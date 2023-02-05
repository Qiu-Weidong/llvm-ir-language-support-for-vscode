import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import {
  FloatType, FuncType, IntType, LLVMIRType,
  ArrayType, MMXType, TokenType, MetadataType,
  LabelType,
  VectorType,
  StructType,
  OpaquePointerType, OpaqueType, PointerType, VoidType
} from "./LLVMIRType";
import { ArrayTypeContext, FloatTypeContext, IntTypeContext, LabelTypeContext, MetadataTypeContext, MmxTypeContext, OpaquePointerTypeContext, OpaqueTypeContext, ParamContext, StructTypeContext, TokenTypeContext, TypeContext, VectorTypeContext, VoidTypeContext } from "../llvmir/LLVMIRParser";


// 主要对 type 这个非终结符进行解析
export class LLVMIRBasicTypeResolver extends LLVMIRBaseVisitor {

  visitType(ctx: TypeContext) {
    // 这个函数有可能返回 undefined type
    const tyContent = ctx.type();
    if (tyContent) {
      // 函数类型或者指针类型
      const ty: LLVMIRType = tyContent.accept(this);
      const paramsContext = ctx.params();
      if (paramsContext) {
        // 函数类型
        const vaarg = paramsContext._ellipsis ? true : false;
        const params: LLVMIRType[] = paramsContext.param().map(param => param.accept(this));
        return new FuncType(ty, params, vaarg);
      }
      else if (ctx.Asterisk()) {
        // 指针类型
        const intlit = ctx.addrSpace()?.IntLit().symbol.text;
        if (intlit) {
          // 将 intlit 转换为 number
          const addrspace = 1;
          return new PointerType(ty, addrspace);
        }
        else {
          return new PointerType(ty);
        }
      }
    }
    else {
      // 直接 递归下去即可
      const ret: LLVMIRType = ctx.voidType()?.accept(this)
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
        ;
      return ret;
    }
  }
  visitParam(ctx: ParamContext): LLVMIRType {
    return ctx.type().accept(this);
  }

  visitVoidType(ctx: VoidTypeContext) {
    return new VoidType();
  }

  visitOpaqueType(ctx: OpaqueTypeContext) {
    return new OpaqueType();
  }

  visitIntType(ctx: IntTypeContext) {
    const name = ctx.IntType().symbol.text;
    if (!name || !name.startsWith('i')) throw new Error('解析整数类型出错');
    const size = parseInt(name.slice(1, name.length));
    return new IntType(size);
  }

  visitFloatType(ctx: FloatTypeContext) {
    const name = ctx.floatKind().text;
    return new FloatType(name);
  }

  visitOpaquePointerType(ctx: OpaquePointerTypeContext) {
    const intlit = ctx.addrSpace()?.IntLit().text;
    if (intlit) {
      const addrspace = LLVMIRBasicTypeResolver.parseIntLit(intlit);
      return new OpaquePointerType(addrspace);
    }
    return new OpaquePointerType();
  }

  visitVectorType(ctx: VectorTypeContext) {
    const scalable = ctx.KwVscale() ? true : false;
    const baseType: LLVMIRType = ctx.type().accept(this);
    const len = LLVMIRBasicTypeResolver.parseIntLit(ctx.IntLit().text);

    return new VectorType(len, scalable, baseType);
  }

  visitArrayType(ctx: ArrayTypeContext) {
    const ty: LLVMIRType = ctx.type().accept(this);
    const intlit = ctx.IntLit().text;
    const len = LLVMIRBasicTypeResolver.parseIntLit(intlit);
    return new ArrayType(len, ty);
  }

  visitLabelType(ctx: LabelTypeContext) {
    return new LabelType();
  }

  visitStructType(ctx: StructTypeContext) {
    const packed = ctx.LAngleBrackets() ? true : false;
    const members: LLVMIRType[] = ctx.type().map(ty => ty.accept(this));
    return new StructType(packed, members);
  }

  visitMmxType(ctx: MmxTypeContext) {
    return new MMXType();
  }
  visitTokenType(ctx: TokenTypeContext) {
    return new TokenType();
  }
  visitMetadataType(ctx: MetadataTypeContext) {
    return new MetadataType();
  }

  static parseIntLit(intlit: string): number {
    if (intlit.startsWith('u0x') || intlit.startsWith('s0x') || intlit.startsWith('0x')) {
      // 16 进制 todo
      if (intlit.startsWith('0x')) intlit = intlit.slice(2, intlit.length);
      else intlit = intlit.slice(3, intlit.length);
      const ret = parseInt(intlit, 16);
      // console.log('parseInt:', ret);
      return ret;
    }
    else {
      return parseInt(intlit);
    }
  }
}

