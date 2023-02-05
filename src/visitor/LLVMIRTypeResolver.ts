import { Token } from "antlr4ts";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { AddExprContext, AddInstContext, AddrSpaceCastExprContext, AllocaInstContext, AndExprContext, AndInstContext, ArrayConstContext, AShrExprContext, AShrInstContext, BitCastExprContext, BlockAddressConstContext, BoolConstContext, ConcreteTypeContext, ConstantContext, ConstantExprContext, DsoLocalEquivalentConstContext, ExtractElementExprContext, ExtractElementInstContext, FAddInstContext, FCmpExprContext, FDivInstContext, FirstClassTypeContext, FloatConstContext, FMulInstContext, FNegExprContext, FNegInstContext, FpExtExprContext, FpToSiExprContext, FpToUiExprContext, FpTruncExprContext, FRemInstContext, FSubInstContext, FuncHeaderContext, GetElementPtrExprContext, ICmpExprContext, InsertElementExprContext, InsertElementInstContext, IntConstContext, IntToPtrExprContext, LoadInstContext, LShrExprContext, LShrInstContext, MulExprContext, MulInstContext, NamedTypeContext, NoCFIConstContext, NoneConstContext, NullConstContext, OrExprContext, OrInstContext, ParamContext, PoisonConstContext, PtrToIntExprContext, SDivInstContext, SelectExprContext, SExtExprContext, ShlExprContext, ShlInstContext, ShuffleVectorExprContext, ShuffleVectorInstContext, SiToFpExprContext, SRemInstContext, StructConstContext, SubExprContext, SubInstContext, TruncExprContext, TypeConstContext, TypeValueContext, UDivInstContext, UiToFpExprContext, UndefConstContext, URemInstContext, ValueContext, ValueInstructionContext, VectorConstContext, XorExprContext, XorInstContext, ZeroInitializerConstContext, ZExtExprContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBasicTypeResolver } from "./LLVMIRBasicTypeResolver";
import { Scope } from "./LLVMIRScope";
import { ArrayType, FloatType, FuncType, IntType, LLVMIRType, PointerType, StructType, UnknownType, VectorType, VoidType } from "./LLVMIRType";


export class LLVMIRTypeResolver extends LLVMIRBasicTypeResolver {
  protected scope: Scope;
  protected diagnostics: Diagnostic[];

  constructor(scope: Scope, diagnostics: Diagnostic[]) {
    super();
    this.scope = scope;
    this.diagnostics = diagnostics;
  }
  setScope(scope: Scope) {
    this.scope = scope;
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

  visitNamedType(ctx: NamedTypeContext) {
    const name = ctx.LocalIdent().text;
    const ty = this.scope.getNamedType(name);
    if(ty) return ty;
    return new UnknownType();
  }
  visitFuncHeader(ctx: FuncHeaderContext) {
    const retType: LLVMIRType = ctx.type().accept(this);
    const vaarg = ctx.params().Ellipsis() ? true : false;
    const params: LLVMIRType[] = ctx.params().param().map(param => param.accept(this));
    return new FuncType(retType, params, vaarg);
  }
  visitParam(ctx: ParamContext) {
    const ty: LLVMIRType = ctx.type().accept(this);
    return ty;
  }

  visitConstantExpr(ctx: ConstantExprContext) {
    return ctx.getChild(0).accept(this);
  }

  visitConstant(ctx: ConstantContext) {
    if (ctx.GlobalIdent()) {
      const name = ctx.GlobalIdent()?.text || '';
      return this.scope.getEntity(name)?.getType();
    }
    return ctx.getChild(0).accept(this);
  }

  visitBoolConst(ctx: BoolConstContext) {
    return new IntType(1);
  }

  visitIntConst(ctx: IntConstContext) {
    const lit = ctx.IntLit().text;
    const size = LLVMIRBasicTypeResolver.parseIntLit(lit);
    return new IntType(size);
  }

  visitFloatConst(ctx: FloatConstContext) {
    const kind = ctx.FloatLit().text;
    return new FloatType(kind);
  }

  visitNullConst(ctx: NullConstContext) {
    return new VoidType();
  }
  visitNoneConst(ctx: NoneConstContext) {
    return new VoidType();
  }
  visitStructConst(ctx: StructConstContext) {
    const members: LLVMIRType[] = ctx.typeConst().map(item => item.accept(this));
    const packed = ctx.LAngleBrackets() ? true : false;
    return new StructType(packed, members);
  }

  visitArrayConst(ctx: ArrayConstContext) {
    if (ctx.KwC()) {
      // i8 
      const len = (ctx.StringLit()?.text.length || 2) - 2;
      const baseType = new IntType(8);
      return new ArrayType(len, baseType);
    }
    else {
      const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
      const len = ctx.typeConst().length;
      ctx.typeConst().forEach(typeconst => {
        const t: LLVMIRType = typeconst.accept(this);
        // 检查是否为兼容类型
        if (!t.isCompatibleTo(ty) && !ty.isCompatibleTo(t)) {
          // 在 typeconst 上报错
          this.addError(typeconst.start, `can't use different type in array`);
        }
      });
      return new ArrayType(len, ty);
    }
  }
  visitVectorConst(ctx: VectorConstContext) {
    const len = ctx.typeConst().length;

    if (len > 0) {
      const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
      ctx.typeConst().forEach(item => {
        const t: LLVMIRType = item.accept(this);
        if (!t.isCompatibleTo(ty) && !ty.isCompatibleTo(t)) {
          this.addError(item.start, `can't use different type in array`);
        }
      });
      return new VectorType(len, true, ty);
    }
    else {
      this.addError(ctx.start, `vector can't be empty`);
      return new VectorType(0, true, new VoidType());
    }
  }
  visitZeroInitializerConst(ctx: ZeroInitializerConstContext) {
    // todo
    throw new Error('not finished');
  }
  visitUndefConst(ctx: UndefConstContext) {
    throw new Error('not finished');
  }
  visitPoisonConst(ctx: PoisonConstContext) {
    throw new Error('not finished');
  }
  visitBlockAddressConst(ctx: BlockAddressConstContext) {
    throw new Error('not finished');
  }
  visitDsoLocalEquivalentConst(ctx: DsoLocalEquivalentConstContext) {
    throw new Error('not finished');
  }
  visitNoCFIConst(ctx: NoCFIConstContext) {
    throw new Error('not finished');
  }

  visitFNegExpr(ctx: FNegExprContext) {
    const ret: LLVMIRType = ctx.typeConst().accept(this);
    return ret;
  }
  visitAddExpr(ctx: AddExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }
  visitSubExpr(ctx: SubExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }
  visitMulExpr(ctx: MulExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }
  visitAndExpr(ctx: AndExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }
  visitOrExpr(ctx: OrExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }
  visitXorExpr(ctx: XorExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[1].start, `类型不匹配`);
    }
    return ty1;
  }

  // vector expression
  visitExtractElementExpr(ctx: ExtractElementExprContext) {
    const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
    if (ty instanceof VectorType) {
      return ty.getBaseType();
    }
    else {
      this.addError(ctx.typeConst()[0].start, `extractelement指令的第一个参数必须是 vector`);
      return ty;
    }

  }
  visitInsertElementExpr(ctx: InsertElementExprContext) {
    const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
    const itemty: LLVMIRType = ctx.typeConst()[1].accept(this);
    if (ty instanceof VectorType) {
      const baseType = ty.getBaseType();
      if (!baseType.isCompatibleTo(itemty) && !itemty.isCompatibleTo(baseType)) {
        this.addError(ctx.typeConst()[1].start, `两个参数的类型不匹配`);
      }
      return ty;
    }
    else {
      this.addError(ctx.typeConst()[0].start, `insertelement的第一个参数必须是 vector`);
      return ty;
    }
  }
  visitShuffleVectorExpr(ctx: ShuffleVectorExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    const ty3: LLVMIRType = ctx.typeConst()[2].accept(this);

    if (!(ty1 instanceof VectorType)) {
      this.addError(ctx.typeConst()[0].start, `第一个参数必须是 vector`);
    }
    else if (!(ty2 instanceof VectorType)) {
      this.addError(ctx.typeConst()[1].start, `第二个参数必须是 vector`);
    } else if (!(ty3 instanceof VectorType) || !(ty3.getBaseType() instanceof IntType)) {
      this.addError(ctx.typeConst()[2].start, `第三个参数必须是 vector<i32>`);
    }
    else {
      // 检查 ty1 和 ty2 的 baseType 是否兼容
      const base1 = ty1.getBaseType();
      const base2 = ty2.getBaseType();
      if (ty1.getLength() != ty2.getLength()
        || ty1.isScalable() != ty2.isScalable()
        || (
          !base1.isCompatibleTo(base2) && !base2.isCompatibleTo(base1)
        )) {
        this.addError(ctx.typeConst()[0].start, `两个参数的类型不兼容`);
      }
      const m = ty3.getLength();
      return new VectorType(m, ty1.isScalable(), base1);
    }
    return ty1;
  }
  visitGetElementPtrExpr(ctx: GetElementPtrExprContext) {
    // todo
    throw new Error('暂未完成');
  }

  visitTruncExpr(ctx: TruncExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitZExtExpr(ctx: ZExtExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitSExtExpr(ctx: SExtExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpTruncExpr(ctx: FpTruncExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpExtExpr(ctx: FpExtExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpToUiExpr(ctx: FpToUiExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpToSiExpr(ctx: FpToSiExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitUiToFpExpr(ctx: UiToFpExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitSiToFpExpr(ctx: SiToFpExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitPtrToIntExpr(ctx: PtrToIntExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitIntToPtrExpr(ctx: IntToPtrExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitBitCastExpr(ctx: BitCastExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitAddrSpaceCastExpr(ctx: AddrSpaceCastExprContext) {
    const fromty: LLVMIRType = ctx.typeConst().accept(this);
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }

  visitICmpExpr(ctx: ICmpExprContext) {
    return new IntType(1);
  }
  visitFCmpExpr(ctx: FCmpExprContext) {
    return new IntType(1);
  }
  visitSelectExpr(ctx: SelectExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[1].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[2].accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.typeConst()[2].start, `select 的两个选项类型不匹配`);
    }
    return ty1;
  }
  // todo
  visitShlExpr(ctx: ShlExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    // const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    return ty1;
  }
  visitLShrExpr(ctx: LShrExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    // const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    return ty1;
  }
  visitAShrExpr(ctx: AShrExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    // const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    return ty1;
  }
  visitTypeConst(ctx: TypeConstContext) {
    const ret: LLVMIRType = ctx.firstClassType().accept(this);
    const ty: LLVMIRType = ctx.constant().accept(this);
    if(! ret.isCompatibleTo(ty) && ! ty.isCompatibleTo(ret)) {
      this.addError(ctx.firstClassType().start, `类型不匹配`);
    }
    return ret;
  }
  visitFirstClassType(ctx: FirstClassTypeContext) {
    const ret: LLVMIRType = ctx.concreteType()?.accept(this)
      || ctx.metadataType()?.accept(this);
    return ret;
  }
  visitConcreteType(ctx: ConcreteTypeContext) {
    const ret: LLVMIRType = ctx.getChild(0).accept(this);
    return ret;
  }
  
  visitTypeValue(ctx: TypeValueContext) {
    const ty1: LLVMIRType = ctx.firstClassType().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitValue(ctx: ValueContext) {
    if(ctx.constant()) {
      const ret: LLVMIRType = ctx.constant()?.accept(this);
      return ret;
    }
    else if(ctx.LocalIdent()) {
      const name = ctx.LocalIdent()?.text;
      if(name) {
        return this.scope.getEntity(name)?.getType();
      }
    }
  }
  
  // inst
  visitValueInstruction(ctx: ValueInstructionContext) {
    const ret: LLVMIRType = ctx.getChild(0).accept(this);
    return ret;
  }
  visitFNegInst(ctx: FNegInstContext) {
    const ret: LLVMIRType = ctx.typeValue().accept(this);
    return ret;
  }
  visitAddInst(ctx: AddInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitFAddInst(ctx: FAddInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitSubInst(ctx: SubInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitFSubInst(ctx: FSubInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitMulInst(ctx: MulInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitFMulInst(ctx: FMulInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitUDivInst(ctx: UDivInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitSDivInst(ctx: SDivInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitFDivInst(ctx: FDivInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }

  visitURemInst(ctx: URemInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }

  visitSRemInst(ctx: SRemInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitFRemInst(ctx: FRemInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }

  visitShlInst(ctx: ShlInstContext) {
    const ret: LLVMIRType = ctx.typeValue().accept(this);
    return ret;
  }
  visitLShrInst(ctx: LShrInstContext) {
    const ret: LLVMIRType = ctx.typeValue().accept(this);
    return ret;
  }
  visitAShrInst(ctx: AShrInstContext) {
    const ret: LLVMIRType = ctx.typeValue().accept(this);
    return ret;
  }

  visitAndInst(ctx: AndInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitOrInst(ctx: OrInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }
  visitXorInst(ctx: XorInstContext) {
    const ty1:LLVMIRType = ctx.typeValue().accept(this);
    const ty2: LLVMIRType = ctx.value().accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      this.addError(ctx.value().start, '类型不匹配');
    }
    return ty1;
  }

  visitExtractElementInst(ctx: ExtractElementInstContext) {
    const ty: LLVMIRType = ctx.typeValue()[0].accept(this);
    if (ty instanceof VectorType) {
      return ty.getBaseType();
    }
    else {
      this.addError(ctx.typeValue()[0].start, `extractelement指令的第一个参数必须是 vector`);
      return ty;
    }
  }

  visitInsertElementInst(ctx: InsertElementInstContext) {
    const ty: LLVMIRType = ctx.typeValue()[0].accept(this);
    const itemty: LLVMIRType = ctx.typeValue()[1].accept(this);
    if (ty instanceof VectorType) {
      const baseType = ty.getBaseType();
      if (!baseType.isCompatibleTo(itemty) && !itemty.isCompatibleTo(baseType)) {
        this.addError(ctx.typeValue()[1].start, `两个参数的类型不匹配`);
      }
      return ty;
    }
    else {
      this.addError(ctx.typeValue()[0].start, `insertelement的第一个参数必须是 vector`);
      return ty;
    }
  }

  visitShuffleVectorInst(ctx: ShuffleVectorInstContext) {
    const ty1: LLVMIRType = ctx.typeValue()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeValue()[1].accept(this);
    const ty3: LLVMIRType = ctx.typeValue()[2].accept(this);

    if (!(ty1 instanceof VectorType)) {
      this.addError(ctx.typeValue()[0].start, `第一个参数必须是 vector`);
    }
    else if (!(ty2 instanceof VectorType)) {
      this.addError(ctx.typeValue()[1].start, `第二个参数必须是 vector`);
    } else if (!(ty3 instanceof VectorType) || !(ty3.getBaseType() instanceof IntType)) {
      this.addError(ctx.typeValue()[2].start, `第三个参数必须是 vector<i32>`);
    }
    else {
      // 检查 ty1 和 ty2 的 baseType 是否兼容
      const base1 = ty1.getBaseType();
      const base2 = ty2.getBaseType();
      if (ty1.getLength() != ty2.getLength()
        || ty1.isScalable() != ty2.isScalable()
        || (
          !base1.isCompatibleTo(base2) && !base2.isCompatibleTo(base1)
        )) {
        this.addError(ctx.typeValue()[0].start, `两个参数的类型不兼容`);
      }
      const m = ty3.getLength();
      return new VectorType(m, ty1.isScalable(), base1);
    }
    return ty1;
  }

  visitAllocaInst(ctx: AllocaInstContext) {
    const baseType: LLVMIRType = ctx.type().accept(this);
    const addrspace = ctx.addrSpace()?.IntLit().text;
    const i = addrspace ? LLVMIRBasicTypeResolver.parseIntLit(addrspace):undefined;
    return new PointerType(baseType, i);
  }
  visitLoadInst(ctx: LoadInstContext) {
    const ty: LLVMIRType = ctx.type().accept(this);
    return ty;
  }
  
}

