import { Token } from "antlr4ts";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Position, Range, SemanticTokensBuilder } from "vscode";
import { AddInstContext, AddrSpaceCastInstContext, AllocaInstContext, AndInstContext, ArrayConstContext, AShrInstContext, AtomicRMWInstContext, BasicBlockContext, BitCastInstContext, BoolConstContext, CallInstContext, CatchPadInstContext, CleanupPadInstContext, CmpXchgInstContext, ComdatDefContext, ExtractElementInstContext, ExtractValueInstContext, FAddInstContext, FCmpInstContext, FDivInstContext, FenceInstContext, FloatKindContext, FloatTypeContext, FMulInstContext, FNegInstContext, FpExtInstContext, FpToSiInstContext, FpToUiInstContext, FpTruncInstContext, FreezeInstContext, FRemInstContext, FSubInstContext, FuncDeclContext, FuncDefContext, FuncHeaderContext, GetElementPtrInstContext, GlobalDefContext, ICmpInstContext, InsertElementInstContext, InsertValueInstContext, IntToPtrInstContext, LabelTypeContext, LandingPadInstContext, LoadInstContext, LocalDefInstContext, LShrInstContext, MetadataTypeContext, MmxTypeContext, MulInstContext, NamedTypeContext, NoneConstContext, NullConstContext, OpaquePointerTypeContext, OpaqueTypeContext, OrInstContext, ParamContext, ParamsContext, PhiInstContext, PtrToIntInstContext, SDivInstContext, SelectInstContext, SExtInstContext, ShlInstContext, ShuffleVectorInstContext, SiToFpInstContext, SRemInstContext, StoreInstContext, StructConstContext, SubInstContext, TokenTypeContext, TruncInstContext, TypeDefContext, UDivInstContext, UiToFpInstContext, URemInstContext, VaargInstContext, VoidTypeContext, XorInstContext, ZExtInstContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";


export class LLVMIRSemanticTokensVisitor extends LLVMIRBaseVisitor {
  private builder: SemanticTokensBuilder;
  constructor(builder: SemanticTokensBuilder) {
    super();
    this.builder = builder;
  }
  // 一个辅助函数
  highlightToken(token: Token | undefined, type: string | undefined) {
    if (token && type)
      this.builder.push(
        new Range(
          new Position(token.line - 1, token.charPositionInLine),
          new Position(token.line - 1, token.charPositionInLine + (token.text?.length || 0))
        ),
        type
      );
  }

  // 如果没有处理的则按照默认处理
  visitTerminal(node: TerminalNode): void {
    // const symbol = node.symbol;
    // const type = LLVMIRSemanticTokensVisitor.tokenMap.get(node.symbol.type);

    // this.highlightToken(symbol, type);
  }

  visitComdatDef(ctx: ComdatDefContext): void {
    ctx.ComdatName().accept(this);
    this.highlightToken(ctx._selectionKind, 'property');
    this.highlightToken(ctx.KwComdat().symbol, 'keyword');
  }

  visitTypeDef(ctx: TypeDefContext): void {
    const symbol = ctx.LocalIdent().symbol;
    this.highlightToken(symbol, 'type');
    ctx.type().accept(this);
  }
  visitVoidType(ctx: VoidTypeContext): void {
    this.highlightToken(ctx._symbol, 'type');
  }
  visitOpaqueType(ctx: OpaqueTypeContext): void {
    this.highlightToken(ctx._symbol, 'type');
  }
  visitFloatKind(ctx: FloatKindContext): void {
    this.highlightToken(ctx.start, 'type');
  }
  visitNamedType(ctx: NamedTypeContext): void {
    this.highlightToken(ctx.LocalIdent().symbol, 'type');
  }
  visitMmxType(ctx: MmxTypeContext): void {
    this.highlightToken(ctx.start, 'type');
  }
  visitTokenType(ctx: TokenTypeContext): void {
    this.highlightToken(ctx.start, 'type');
  }
  visitMetadataType(ctx: MetadataTypeContext): void {
    this.highlightToken(ctx.start, 'type');
  }
  visitLabelType(ctx: LabelTypeContext): void {
    this.highlightToken(ctx.start, 'type');
  }
  visitOpaquePointerType(ctx: OpaquePointerTypeContext): void {
    this.highlightToken(ctx.start, 'type');
    ctx.addrSpace()?.accept(this);
  }

  visitParams(ctx: ParamsContext): void {
    this.highlightToken(ctx._ellipsis, 'decorator');
    for (const param of ctx.param()) param.accept(this);
  }
  visitParam(ctx: ParamContext): void {
    ctx.type().accept(this);
    for (const attr of ctx.paramAttribute()) attr.accept(this);
    const symbol = ctx.LocalIdent()?.symbol;
    if (symbol) this.highlightToken(symbol, 'parameter');
  }

  visitFuncHeader(ctx: FuncHeaderContext): void {
    const symbol = ctx.GlobalIdent().symbol;
    this.highlightToken(symbol, 'function');
    this.visitChildren(ctx);
  }

  visitBoolConst(ctx: BoolConstContext): void {
    this.highlightToken(ctx.start, 'number');
  }
  visitNoneConst(ctx: NoneConstContext): void {
    this.highlightToken(ctx.start, 'number');
  }
  visitNullConst(ctx: NullConstContext): void {
    this.highlightToken(ctx.start, 'number');
  }
  visitStructConst(ctx: StructConstContext): void {
    ctx.typeConst().forEach(typeConst => typeConst.accept(this));
  }
  visitArrayConst(ctx: ArrayConstContext): void {
    ctx.typeConst().forEach(typeConst => typeConst.accept(this));
    ctx.StringLit()?.accept(this);
  }

  // inst
  visitFenceInst(ctx: FenceInstContext): void { 
    // fenceInst: 'fence' syncScope? atomicOrdering (',' metadataAttachment)*;
    this.highlightToken(ctx.start, 'operator');
    this.visitChildren(ctx); 
  }
  visitFNegInst(ctx: FNegInstContext): void { this.visitChildren(ctx); }
  visitAddInst(ctx: AddInstContext): void { this.visitChildren(ctx); }
  visitFAddInst(ctx: FAddInstContext): void { this.visitChildren(ctx); }
  visitSubInst(ctx: SubInstContext): void { this.visitChildren(ctx); }
  visitFSubInst(ctx: FSubInstContext): void { this.visitChildren(ctx); }
  visitMulInst(ctx: MulInstContext): void { this.visitChildren(ctx); }
  visitFMulInst(ctx: FMulInstContext): void { this.visitChildren(ctx); }
  visitUDivInst(ctx: UDivInstContext): void { this.visitChildren(ctx); }
  visitSDivInst(ctx: SDivInstContext): void { this.visitChildren(ctx); }
  visitFDivInst(ctx: FDivInstContext): void { this.visitChildren(ctx); }
  visitURemInst(ctx: URemInstContext): void { this.visitChildren(ctx); }
  visitSRemInst(ctx: SRemInstContext): void { this.visitChildren(ctx); }
  visitFRemInst(ctx: FRemInstContext): void { this.visitChildren(ctx); }
  visitShlInst(ctx: ShlInstContext): void { this.visitChildren(ctx); }
  visitLShrInst(ctx: LShrInstContext): void { this.visitChildren(ctx); }
  visitAShrInst(ctx: AShrInstContext): void { this.visitChildren(ctx); }
  visitAndInst(ctx: AndInstContext): void { this.visitChildren(ctx); }
  visitOrInst(ctx: OrInstContext): void { this.visitChildren(ctx); }
  visitXorInst(ctx: XorInstContext): void { this.visitChildren(ctx); }
  visitExtractElementInst(ctx: ExtractElementInstContext): void { this.visitChildren(ctx); }
  visitInsertElementInst(ctx: InsertElementInstContext): void { this.visitChildren(ctx); }
  visitShuffleVectorInst(ctx: ShuffleVectorInstContext): void { this.visitChildren(ctx); }
  visitExtractValueInst(ctx: ExtractValueInstContext): void { this.visitChildren(ctx); }
  visitInsertValueInst(ctx: InsertValueInstContext): void { this.visitChildren(ctx); }
  visitAllocaInst(ctx: AllocaInstContext): void { this.visitChildren(ctx); }
  visitLoadInst(ctx: LoadInstContext): void { this.visitChildren(ctx); }
  visitCmpXchgInst(ctx: CmpXchgInstContext): void { this.visitChildren(ctx); }
  visitAtomicRMWInst(ctx: AtomicRMWInstContext): void { this.visitChildren(ctx); }
  visitGetElementPtrInst(ctx: GetElementPtrInstContext): void { this.visitChildren(ctx); }
  visitTruncInst(ctx: TruncInstContext): void { this.visitChildren(ctx); }
  visitZExtInst(ctx: ZExtInstContext): void { this.visitChildren(ctx); }
  visitSExtInst(ctx: SExtInstContext): void { this.visitChildren(ctx); }
  visitFpTruncInst(ctx: FpTruncInstContext): void { this.visitChildren(ctx); }
  visitFpExtInst(ctx: FpExtInstContext): void { this.visitChildren(ctx); }
  visitFpToUiInst(ctx: FpToUiInstContext): void { this.visitChildren(ctx); }
  visitFpToSiInst(ctx: FpToSiInstContext): void { this.visitChildren(ctx); }
  visitUiToFpInst(ctx: UiToFpInstContext): void { this.visitChildren(ctx); }
  visitSiToFpInst(ctx: SiToFpInstContext): void { this.visitChildren(ctx); }
  visitPtrToIntInst(ctx: PtrToIntInstContext): void { this.visitChildren(ctx); }
  visitIntToPtrInst(ctx: IntToPtrInstContext): void { this.visitChildren(ctx); }
  visitBitCastInst(ctx: BitCastInstContext): void { this.visitChildren(ctx); }
  visitAddrSpaceCastInst(ctx: AddrSpaceCastInstContext): void { this.visitChildren(ctx); }
  visitICmpInst(ctx: ICmpInstContext): void { this.visitChildren(ctx); }
  visitFCmpInst(ctx: FCmpInstContext): void { this.visitChildren(ctx); }
  visitPhiInst(ctx: PhiInstContext): void { this.visitChildren(ctx); }
  visitSelectInst(ctx: SelectInstContext): void { this.visitChildren(ctx); }
  visitFreezeInst(ctx: FreezeInstContext): void { this.visitChildren(ctx); }
  visitCallInst(ctx: CallInstContext): void { this.visitChildren(ctx); }
  visitVaargInst(ctx: VaargInstContext): void { this.visitChildren(ctx); }
  visitLandingPadInst(ctx: LandingPadInstContext): void { this.visitChildren(ctx); }
  visitCatchPadInst(ctx: CatchPadInstContext): void { this.visitChildren(ctx); }
  visitCleanupPadInst(ctx: CleanupPadInstContext): void { this.visitChildren(ctx); }
  visitStoreInst(ctx: StoreInstContext): void { this.visitChildren(ctx); }
  visitLocalDefInst(ctx: LocalDefInstContext): void { 
    const symbol = ctx.LocalIdent().symbol;
    this.highlightToken(symbol, 'parameter');
    ctx.valueInstruction().accept(this);
  }

  // 最后面留一张 token map
  private static tokenMap: Map<number, string> = new Map([
    [/*IntLit*/489, 'number'], [/*FloatLit*/490, 'number'], [/*StringLit*/491, 'string'],
    [/*GlobalIdent*/492, 'variable'], [/*LocalIdent*/493, 'variable'], [/**LabelIdent */494, 'label'],
    [/**AttrGroupId */495, 'typeParameter'], [/**ComdatName */496, 'interface'], [/**MetadataName */497, 'property'],
    [/**MetadataId */498, 'property'], [/**IntType */499, 'type'],

    [500, 'decorator'], [501, 'decorator'], [502, 'decorator'], [503, 'decorator'], [504, 'decorator'],
    [505, 'decorator'], [506, 'decorator'], [507, 'decorator'], [508, 'decorator'], [509, 'decorator'],
  ]);

}



