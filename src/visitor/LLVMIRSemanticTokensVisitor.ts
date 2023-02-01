import { Token } from "antlr4ts";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Position, Range, SemanticTokensBuilder } from "vscode";
import { AddInstContext, AddrSpaceCastInstContext, AllocaInstContext, AndInstContext, ArrayConstContext, AShrInstContext, AtomicRMWInstContext, BasicBlockContext, BitCastInstContext, BoolConstContext, BrTermContext, CallInstContext, CatchPadInstContext, CleanupPadInstContext, CmpXchgInstContext, ComdatDefContext, ExtractElementInstContext, ExtractValueInstContext, FAddInstContext, FastMathFlagContext, FCmpInstContext, FDivInstContext, FenceInstContext, FloatKindContext, FloatTypeContext, FMulInstContext, FNegInstContext, FpExtInstContext, FPredContext, FpToSiInstContext, FpToUiInstContext, FpTruncInstContext, FreezeInstContext, FRemInstContext, FSubInstContext, FuncDeclContext, FuncDefContext, FuncHeaderContext, GetElementPtrInstContext, GlobalDefContext, ICmpInstContext, IndirectBrTermContext, InsertElementInstContext, InsertValueInstContext, IntToPtrInstContext, IPredContext, LabelContext, LabelTypeContext, LandingPadInstContext, LoadInstContext, LocalDefInstContext, LShrInstContext, MetadataTypeContext, MmxTypeContext, ModuleAsmContext, MulInstContext, NamedTypeContext, NoneConstContext, NullConstContext, OpaquePointerTypeContext, OpaqueTypeContext, OrInstContext, OverflowFlagContext, ParamContext, ParamsContext, PhiInstContext, PtrToIntInstContext, RetTermContext, SDivInstContext, SelectInstContext, SExtInstContext, ShlInstContext, ShuffleVectorInstContext, SiToFpInstContext, SourceFilenameContext, SRemInstContext, StoreInstContext, StructConstContext, SubInstContext, TargetDataLayoutContext, TargetTripleContext, TerminatorContext, TokenTypeContext, TruncInstContext, TypeDefContext, UDivInstContext, UiToFpInstContext, URemInstContext, VaargInstContext, ValueInstructionContext, ValueTerminatorContext, VoidTypeContext, XorInstContext, ZExtInstContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";


export class LLVMIRSemanticTokensVisitor extends LLVMIRBaseVisitor {
  private builder: SemanticTokensBuilder;
  constructor(builder: SemanticTokensBuilder) {
    super();
    this.builder = builder;
  }
  // 一个辅助函数
  highlightToken(token: Token | undefined, type: string | undefined) {
    if (token && type && type !== 'none')
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
    const symbol = node.symbol;
    const type = LLVMIRSemanticTokensVisitor.getTokenType(symbol.type);

    this.highlightToken(symbol, type);
  }

  /**sourceFilename: KwSourceFilename '=' StringLit; */
  visitSourceFilename(ctx: SourceFilenameContext): void {
    this.highlightToken(ctx.KwSourceFilename().symbol, 'property');
    this.highlightToken(ctx.StringLit().symbol, 'string');
  }
  // targetDataLayout: KwTarget KwDatalayout '=' StringLit;
  visitTargetDataLayout(ctx: TargetDataLayoutContext): void {
    this.highlightToken(ctx.KwDatalayout().symbol, 'property');
    this.highlightToken(ctx.StringLit().symbol, 'string');
  }
  // targetTriple: KwTarget KwTriple '=' StringLit;
  visitTargetTriple(ctx: TargetTripleContext): void {
    this.highlightToken(ctx.KwTriple().symbol, 'property');
    this.highlightToken(ctx.StringLit().symbol, 'string');
  }
  // moduleAsm: KwModule KwAsm StringLit;
  visitModuleAsm(ctx: ModuleAsmContext): void {
    this.highlightToken(ctx.StringLit().symbol, 'string');
  }
  // typeDef: LocalIdent '=' KwType type;
  visitTypeDef(ctx: TypeDefContext): void {
    const symbol = ctx.LocalIdent().symbol;
    this.highlightToken(symbol, 'type');
    ctx.type().accept(this);
  }
  // comdatDef: ComdatName '=' KwComdat selectionKind;
  visitComdatDef(ctx: ComdatDefContext): void {
    ctx.ComdatName().accept(this);
    this.highlightToken(ctx._selectionKind, 'property');
  }

  visitBasicBlock(ctx: BasicBlockContext): void {
    const symbol = ctx.LabelIdent()?.symbol;
    this.highlightToken(symbol, 'label');
    ctx.instruction().forEach(inst => inst.accept(this));
    ctx.terminator().accept(this);
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

  // localDefInst: LocalIdent '=' valueInstruction;
  visitLocalDefInst(ctx: LocalDefInstContext): void {
    const symbol = ctx.LocalIdent().symbol;
    this.highlightToken(symbol, 'parameter');
    ctx.valueInstruction().accept(this);
  }

  visitCallInst(ctx: CallInstContext): void {
    const symbol = ctx.value().constant()?.GlobalIdent()?.symbol;
    this.highlightToken(symbol, 'function');

    this.visitChildren(ctx);
  }

  visitLabel(ctx: LabelContext): void {
    this.highlightToken(ctx.LocalIdent().symbol, 'label');
  }

  visitOverflowFlag(ctx: OverflowFlagContext): void {
    const symbol = ctx.KwNsw()?.symbol || ctx.KwNuw()?.symbol;
    this.highlightToken(symbol, 'decorator');
  }

  visitIPred(ctx: IPredContext): void {
    this.highlightToken(ctx.start, 'decorator');
  }

  visitFPred(ctx: FPredContext): void {
    this.highlightToken(ctx.start, 'decorator');
  }

  visitFastMathFlag(ctx: FastMathFlagContext): void {
    const symbol = ctx.KwAfn()?.symbol || ctx.KwArcp()?.symbol || ctx.KwContract()?.symbol
      || ctx.KwFast()?.symbol || ctx.KwNinf()?.symbol || ctx.KwNnan()?.symbol
      || ctx.KwNsz()?.symbol || ctx.KwReassoc()?.symbol;
    this.highlightToken(symbol, 'decorator');
  }

  // 最后面留一张 token map
  private static tokenMap: Map<number, string> = new Map([
    [/*IntLit*/31, 'number'], [/*FloatLit*/32, 'number'], [/*StringLit*/33, 'string'],
    [/*GlobalIdent*/34, 'variable'], [/*LocalIdent*/35, 'parameter'], [/**LabelIdent */36, 'label'],
    [/**AttrGroupId */37, 'method'], [/**ComdatName */38, 'macro'], [/**MetadataName */39, 'property'],
    [/**MetadataId */40, 'property'], [/**IntType */41, 'type'], [/** '*' */510, 'keyword']
  ]);

  private static getTokenType(tokentype: number): string {
    // 52 ~ 123 是为 操作符
    if (tokentype >= 52 && tokentype <= 124) return 'operator';
    else {
      return LLVMIRSemanticTokensVisitor.tokenMap.get(tokentype) || 'none';
    }
  }

}



