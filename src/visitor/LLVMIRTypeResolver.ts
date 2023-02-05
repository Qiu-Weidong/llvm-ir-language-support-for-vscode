import { Token } from "antlr4ts";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Diagnostic, DiagnosticSeverity, Position, Range } from "vscode";
import { AddExprContext, AddInstContext, AddrSpaceCastExprContext, AddrSpaceCastInstContext, AllocaInstContext, AndExprContext, AndInstContext, ArrayConstContext, AShrExprContext, AShrInstContext, AtomicRMWInstContext, BitCastExprContext, BitCastInstContext, BlockAddressConstContext, BoolConstContext, CallInstContext, CatchPadInstContext, CleanupPadInstContext, CmpXchgInstContext, ConcreteTypeContext, ConstantContext, ConstantExprContext, DsoLocalEquivalentConstContext, ExtractElementExprContext, ExtractElementInstContext, ExtractValueInstContext, FAddInstContext, FCmpExprContext, FCmpInstContext, FDivInstContext, FenceInstContext, FirstClassTypeContext, FloatConstContext, FMulInstContext, FNegExprContext, FNegInstContext, FpExtExprContext, FpExtInstContext, FpToSiExprContext, FpToSiInstContext, FpToUiExprContext, FpToUiInstContext, FpTruncExprContext, FpTruncInstContext, FreezeInstContext, FRemInstContext, FSubInstContext, FuncHeaderContext, GetElementPtrExprContext, GetElementPtrInstContext, ICmpExprContext, ICmpInstContext, InsertElementExprContext, InsertElementInstContext, InsertValueInstContext, IntConstContext, IntToPtrExprContext, IntToPtrInstContext, LoadInstContext, LocalDefInstContext, LShrExprContext, LShrInstContext, MulExprContext, MulInstContext, NamedTypeContext, NoCFIConstContext, NoneConstContext, NullConstContext, OrExprContext, OrInstContext, ParamContext, PhiInstContext, PoisonConstContext, PtrToIntExprContext, PtrToIntInstContext, SDivInstContext, SelectExprContext, SelectInstContext, SExtExprContext, SExtInstContext, ShlExprContext, ShlInstContext, ShuffleVectorExprContext, ShuffleVectorInstContext, SiToFpExprContext, SiToFpInstContext, SRemInstContext, StoreInstContext, StructConstContext, SubExprContext, SubInstContext, TruncExprContext, TruncInstContext, TypeConstContext, TypeValueContext, UDivInstContext, UiToFpExprContext, UiToFpInstContext, UndefConstContext, URemInstContext, VaargInstContext, ValueContext, ValueInstructionContext, VectorConstContext, XorExprContext, XorInstContext, ZeroInitializerConstContext, ZExtExprContext, ZExtInstContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBasicTypeResolver } from "./LLVMIRBasicTypeResolver";
import { Scope } from "./LLVMIRScope";
import { ArrayType, FloatType, FuncType, IntType, LLVMIRType, PointerType, StructType, UnknownType, VectorType, VoidType } from "./LLVMIRType";

// 不要返回 null，可以返回 UnknownType
export class LLVMIRTypeResolver extends LLVMIRBasicTypeResolver {
  protected scope: Scope;

  constructor(scope: Scope) {
    super();
    this.scope = scope;
  }
  setScope(scope: Scope) {
    this.scope = scope;
  }

  visitNamedType(ctx: NamedTypeContext) {
    const name = ctx.LocalIdent().text;
    const ty = this.scope.getNamedType(name);
    if (ty) return ty;
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
      return this.scope.getEntity(name)?.getType() || new UnknownType();
    }
    return ctx.getChild(0).accept(this);
  }

  visitBoolConst(ctx: BoolConstContext) {
    return new IntType(1);
  }

  visitIntConst(ctx: IntConstContext) {
    // const lit = ctx.IntLit().text;
    // const size = LLVMIRBasicTypeResolver.parseIntLit(lit);
    return new IntType(32);
  }

  visitFloatConst(ctx: FloatConstContext) {
    return new FloatType('float');
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
      return new ArrayType(len, ty);
    }
  }
  visitVectorConst(ctx: VectorConstContext) {
    const len = ctx.typeConst().length;

    if (len > 0) {
      const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
      return new VectorType(len, true, ty);
    }
    else {
      return new VectorType(0, true, new VoidType());
    }
  }


  // expr
  visitFNegExpr(ctx: FNegExprContext): LLVMIRType {
    const ret: LLVMIRType = ctx.typeConst().accept(this);
    return ret;
  }
  visitAddExpr(ctx: AddExprContext): LLVMIRType {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }
  visitSubExpr(ctx: SubExprContext): LLVMIRType {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }
  visitMulExpr(ctx: MulExprContext): LLVMIRType {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }
  visitAndExpr(ctx: AndExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }
  visitOrExpr(ctx: OrExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }
  visitXorExpr(ctx: XorExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty1;
  }

  // vector expression
  visitExtractElementExpr(ctx: ExtractElementExprContext) {
    const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
    if (ty instanceof VectorType) {
      return ty.getBaseType();
    }
    else {
      // this.addError(ctx.typeConst()[0].start, `extractelement指令的第一个参数必须是 vector`);
      return new UnknownType();
    }

  }
  visitInsertElementExpr(ctx: InsertElementExprContext) {
    const ty: LLVMIRType = ctx.typeConst()[0].accept(this);
    return ty;
  }
  visitShuffleVectorExpr(ctx: ShuffleVectorExprContext) {
    const ty1: LLVMIRType = ctx.typeConst()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeConst()[1].accept(this);
    const ty3: LLVMIRType = ctx.typeConst()[2].accept(this);

    if (!(ty1 instanceof VectorType) || !(ty2 instanceof VectorType) || !(ty3 instanceof VectorType)) {
      return new UnknownType();
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
        return new UnknownType();
      }
      const m = ty3.getLength();
      return new VectorType(m, ty1.isScalable(), base1);
    }
  }
  visitGetElementPtrExpr(ctx: GetElementPtrExprContext) {
    // todo
    throw new Error('暂未完成');
  }

  visitTruncExpr(ctx: TruncExprContext) {
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitZExtExpr(ctx: ZExtExprContext) {
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitSExtExpr(ctx: SExtExprContext) {
    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpTruncExpr(ctx: FpTruncExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpExtExpr(ctx: FpExtExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpToUiExpr(ctx: FpToUiExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitFpToSiExpr(ctx: FpToSiExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitUiToFpExpr(ctx: UiToFpExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitSiToFpExpr(ctx: SiToFpExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitPtrToIntExpr(ctx: PtrToIntExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitIntToPtrExpr(ctx: IntToPtrExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitBitCastExpr(ctx: BitCastExprContext) {

    const toty: LLVMIRType = ctx.type().accept(this);
    // todo 检查能否转换
    return toty;
  }
  visitAddrSpaceCastExpr(ctx: AddrSpaceCastExprContext) {

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
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      return new UnknownType();
    }
    return ty1;
  }
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
    return ty1;
  }
  visitValue(ctx: ValueContext) {
    if (ctx.constant()) {
      const ret: LLVMIRType = ctx.constant()?.accept(this);
      return ret;
    }
    else if (ctx.LocalIdent()) {
      const name = ctx.LocalIdent()?.text;
      if (name) {
        return this.scope.getEntity(name)?.getType();
      }
    }
  }

  // inst
  visitLocalDefInst(ctx: LocalDefInstContext): LLVMIRType {
    return ctx.valueInstruction().accept(this);
  }
  visitValueInstruction(ctx: ValueInstructionContext) {
    const ret: LLVMIRType = ctx.getChild(0).accept(this);
    return ret;
  }
  visitStoreInst(ctx: StoreInstContext) {
    return new VoidType();
  }
  visitFenceInst(ctx: FenceInstContext) {
    return new VoidType();
  }
  visitFNegInst(ctx: FNegInstContext) {
    const ret: LLVMIRType = ctx.typeValue().accept(this);
    return ret;
  }
  visitAddInst(ctx: AddInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitFAddInst(ctx: FAddInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitSubInst(ctx: SubInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitFSubInst(ctx: FSubInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitMulInst(ctx: MulInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitFMulInst(ctx: FMulInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitUDivInst(ctx: UDivInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitSDivInst(ctx: SDivInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitFDivInst(ctx: FDivInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitURemInst(ctx: URemInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitSRemInst(ctx: SRemInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitFRemInst(ctx: FRemInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
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
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitOrInst(ctx: OrInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitXorInst(ctx: XorInstContext) {
    const ty1: LLVMIRType = ctx.typeValue().accept(this);
    return ty1;
  }
  visitExtractElementInst(ctx: ExtractElementInstContext) {
    const ty: LLVMIRType = ctx.typeValue()[0].accept(this);
    if (ty instanceof VectorType) {
      return ty.getBaseType();
    }
    else {
      return new UnknownType();
    }
  }
  visitInsertElementInst(ctx: InsertElementInstContext) {
    const ty: LLVMIRType = ctx.typeValue()[0].accept(this);
    return ty;
  }
  visitShuffleVectorInst(ctx: ShuffleVectorInstContext) {
    const ty1: LLVMIRType = ctx.typeValue()[0].accept(this);
    const ty2: LLVMIRType = ctx.typeValue()[1].accept(this);
    const ty3: LLVMIRType = ctx.typeValue()[2].accept(this);

    if (!(ty1 instanceof VectorType) || !(ty2 instanceof VectorType) || !(ty3 instanceof VectorType) || !(ty3.getBaseType() instanceof IntType)) {
      return new UnknownType();
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
        return new UnknownType();
      }
      const m = ty3.getLength();
      return new VectorType(m, ty1.isScalable(), base1);
    }
  }
  visitExtractValueInst(ctx: ExtractValueInstContext) {
    return new UnknownType(); /**todo */
  }
  visitInsertValueInst(ctx: InsertValueInstContext) {
    return new UnknownType(); /**todo */
  }
  visitAllocaInst(ctx: AllocaInstContext) {
    const baseType: LLVMIRType = ctx.type().accept(this);
    const addrspace = ctx.addrSpace()?.IntLit().text;
    const i = addrspace ? LLVMIRBasicTypeResolver.parseIntLit(addrspace) : undefined;
    return new PointerType(baseType, i);
  }
  visitLoadInst(ctx: LoadInstContext) {
    const ty: LLVMIRType = ctx.type().accept(this);
    return ty;
  }
  visitCmpXchgInst(ctx: CmpXchgInstContext) {
    const ty1: LLVMIRType = ctx.typeValue()[1].accept(this);
    const ty2: LLVMIRType = ctx.typeValue()[2].accept(this);
    if(! ty1.isCompatibleTo(ty2) && ! ty2.isCompatibleTo(ty1)) {
      return new UnknownType();
    }
    return new StructType(false, [ty1, new IntType(1)]);
  }
  visitAtomicRMWInst(ctx: AtomicRMWInstContext): LLVMIRType {
    return ctx.typeValue()[1].accept(this);
  }
  visitGetElementPtrInst(ctx: GetElementPtrInstContext) {
    return new UnknownType(); /*todo*/
  }
  visitTruncInst(ctx: TruncInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitZExtInst(ctx: ZExtInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitSExtInst(ctx: SExtInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitFpTruncInst(ctx: FpTruncInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitFpExtInst(ctx: FpExtInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitFpToSiInst(ctx: FpToSiInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitFpToUiInst(ctx: FpToUiInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitUiToFpInst(ctx: UiToFpInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitSiToFpInst(ctx: SiToFpInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitPtrToIntInst(ctx: PtrToIntInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitIntToPtrInst(ctx: IntToPtrInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitBitCastInst(ctx: BitCastInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitAddrSpaceCastInst(ctx: AddrSpaceCastInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitICmpInst(ctx: ICmpInstContext) {
    return new IntType(1);
  }
  visitFCmpInst(ctx: FCmpInstContext) {
    return new IntType(1);
  }
  visitPhiInst(ctx: PhiInstContext): LLVMIRType {
    return ctx.type().accept(this);
  }
  visitSelectInst(ctx: SelectInstContext) {
    const ty1: LLVMIRType = ctx.typeValue()[1].accept(this);
    const ty2: LLVMIRType = ctx.typeValue()[2].accept(this);
    if (!ty1.isCompatibleTo(ty2) && !ty2.isCompatibleTo(ty1)) {
      return new UnknownType();
    }
    return ty1;
  }
  visitFreezeInst(ctx: FreezeInstContext): LLVMIRType {
    return ctx.typeValue().accept(this)
  }
  visitCallInst(ctx: CallInstContext): LLVMIRType {
    const ty: LLVMIRType = ctx.type().accept(this);
    if(ty instanceof FuncType) return ty.getRetType();
    else return ty;
  }
  visitVaargInst(ctx: VaargInstContext) {
    return new UnknownType(); /*todo*/
  }
  visitCatchPadInst(ctx: CatchPadInstContext) {
    return new UnknownType(); /*todo*/
  }
  visitCleanupPadInst(ctx: CleanupPadInstContext) {
    return new UnknownType(); /*todo*/
  }


  visitZeroInitializerConst(ctx: ZeroInitializerConstContext) {
    // todo
    return new UnknownType(); /*todo*/
  }
  visitUndefConst(ctx: UndefConstContext) {
    return new UnknownType(); /*todo*/
  }
  visitPoisonConst(ctx: PoisonConstContext) {
    return new UnknownType(); /*todo*/
  }
  visitBlockAddressConst(ctx: BlockAddressConstContext) {
    return new UnknownType(); /*todo*/
  }
  visitDsoLocalEquivalentConst(ctx: DsoLocalEquivalentConstContext) {
    return new UnknownType(); /*todo*/
  }
  visitNoCFIConst(ctx: NoCFIConstContext) {
    return new UnknownType(); /*todo*/
  }

  visitTerminal(node: TerminalNode) {
    
  }
}


