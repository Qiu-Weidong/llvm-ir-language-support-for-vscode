import { ParserRuleContext, Token } from "antlr4ts";
import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Position, Range, Terminal } from "vscode";
import { CompilationUnitContext, TargetDefContext, SourceFilenameContext, TargetDataLayoutContext, TargetTripleContext, TopLevelEntityContext, ModuleAsmContext, TypeDefContext, ComdatDefContext, GlobalDeclContext, GlobalDefContext, IndirectSymbolDefContext, FuncDeclContext, FuncDefContext, AttrGroupDefContext, NamedMetadataDefContext, MetadataDefContext, UseListOrderContext, UseListOrderBBContext, FuncHeaderContext, IndirectSymbolContext, CallingConvContext, CallingConvIntContext, FuncHdrFieldContext, GcContext, PrefixContext, PrologueContext, PersonalityContext, ReturnAttributeContext, FuncBodyContext, BasicBlockContext, InstructionContext, TerminatorContext, LocalDefTermContext, ValueTerminatorContext, RetTermContext, BrTermContext, CondBrTermContext, SwitchTermContext, IndirectBrTermContext, ResumeTermContext, CatchRetTermContext, CleanupRetTermContext, UnreachableTermContext, InvokeTermContext, CallBrTermContext, CatchSwitchTermContext, LabelContext, CaseContext, UnwindTargetContext, HandlersContext, MetadataNodeContext, DiExpressionContext, DiExpressionFieldContext, GlobalFieldContext, SectionContext, ComdatContext, PartitionContext, ConstantContext, BoolConstContext, IntConstContext, FloatConstContext, NullConstContext, NoneConstContext, StructConstContext, ArrayConstContext, VectorConstContext, ZeroInitializerConstContext, UndefConstContext, PoisonConstContext, BlockAddressConstContext, DsoLocalEquivalentConstContext, NoCFIConstContext, ConstantExprContext, TypeConstContext, MetadataAttachmentContext, MdNodeContext, MdTupleContext, MetadataContext, DiArgListContext, TypeValueContext, ValueContext, InlineAsmContext, MdStringContext, MdFieldOrIntContext, DiSPFlagContext, FuncAttributeContext, TypeContext, ParamsContext, ParamContext, ParamAttributeContext, AttrStringContext, AttrPairContext, AlignContext, AlignPairContext, AlignStackContext, AlignStackPairContext, AllocKindContext, AllocSizeContext, UnwindTableContext, VectorScaleRangeContext, ByRefAttrContext, ByvalContext, DereferenceableContext, ElementTypeContext, InAllocaContext, ParamAttrContext, PreallocatedContext, StructRetAttrContext, FirstClassTypeContext, ConcreteTypeContext, IntTypeContext, FloatTypeContext, PointerTypeContext, VectorTypeContext, LabelTypeContext, ArrayTypeContext, StructTypeContext, NamedTypeContext, MmxTypeContext, TokenTypeContext, OpaquePointerTypeContext, AddrSpaceContext, ThreadLocalContext, MetadataTypeContext, BitCastExprContext, GetElementPtrExprContext, GepIndexContext, AddrSpaceCastExprContext, IntToPtrExprContext, ICmpExprContext, FCmpExprContext, SelectExprContext, TruncExprContext, ZExtExprContext, SExtExprContext, FpTruncExprContext, FpExtExprContext, FpToUiExprContext, FpToSiExprContext, UiToFpExprContext, SiToFpExprContext, PtrToIntExprContext, ExtractElementExprContext, InsertElementExprContext, ShuffleVectorExprContext, ShlExprContext, LShrExprContext, AShrExprContext, AndExprContext, OrExprContext, XorExprContext, AddExprContext, SubExprContext, MulExprContext, FNegExprContext, LocalDefInstContext, ValueInstructionContext, StoreInstContext, SyncScopeContext, FenceInstContext, FNegInstContext, AddInstContext, FAddInstContext, SubInstContext, FSubInstContext, MulInstContext, FMulInstContext, UDivInstContext, SDivInstContext, FDivInstContext, URemInstContext, SRemInstContext, FRemInstContext, ShlInstContext, LShrInstContext, AShrInstContext, AndInstContext, OrInstContext, XorInstContext, ExtractElementInstContext, InsertElementInstContext, ShuffleVectorInstContext, ExtractValueInstContext, InsertValueInstContext, AllocaInstContext, LoadInstContext, CmpXchgInstContext, AtomicRMWInstContext, GetElementPtrInstContext, TruncInstContext, ZExtInstContext, SExtInstContext, FpTruncInstContext, FpExtInstContext, FpToUiInstContext, FpToSiInstContext, UiToFpInstContext, SiToFpInstContext, PtrToIntInstContext, IntToPtrInstContext, BitCastInstContext, AddrSpaceCastInstContext, ICmpInstContext, FCmpInstContext, PhiInstContext, SelectInstContext, FreezeInstContext, CallInstContext, VaargInstContext, LandingPadInstContext, CatchPadInstContext, CleanupPadInstContext, IncContext, OperandBundleContext, ClauseContext, ArgsContext, ArgContext, ExceptionArgContext, ExceptionPadContext, ExternalLinkageContext, InternalLinkageContext, LinkageContext, PreemptionContext, VisibilityContext, DllStorageClassContext, TlsModelContext, UnnamedAddrContext, ExternallyInitializedContext, ImmutableContext, FuncAttrContext, DistinctContext, InBoundsContext, ReturnAttrContext, OverflowFlagContext, IPredContext, FPredContext, AtomicOrderingContext, CallingConvEnumContext, FastMathFlagContext, AtomicOpContext, FloatKindContext, SpecializedMDNodeContext, DiBasicTypeContext, DiCommonBlockContext, DiCompileUnitContext, DiCompositeTypeContext, DiCompositeTypeFieldContext, DiDerivedTypeContext, DiDerivedTypeFieldContext, DiEnumeratorContext, DiEnumeratorFieldContext, DiFileContext, DiFileFieldContext, DiGlobalVariableContext, DiGlobalVariableFieldContext, DiGlobalVariableExpressionContext, DiGlobalVariableExpressionFieldContext, DiImportedEntityContext, DiImportedEntityFieldContext, DiLabelContext, DiLabelFieldContext, DiLexicalBlockContext, DiLexicalBlockFieldContext, DiLexicalBlockFileContext, DiLexicalBlockFileFieldContext, DiLocalVariableContext, DiLocalVariableFieldContext, DiLocationContext, DiLocationFieldContext, DiMacroContext, DiMacroFieldContext, DiMacroFileContext, DiMacroFileFieldContext, DiModuleContext, DiModuleFieldContext, DiNamespaceContext, DiNamespaceFieldContext, DiObjCPropertyContext, DiObjCPropertyFieldContext, DiStringTypeContext, DiStringTypeFieldContext, DiSubprogramContext, DiSubprogramFieldContext, DiSubrangeContext, DiSubrangeFieldContext, DiSubroutineTypeContext, DiTemplateTypeParameterContext, DiTemplateValueParameterContext, GenericDiNodeContext, DiTemplateTypeParameterFieldContext, DiCompileUnitFieldContext, DiCommonBlockFieldContext, DiBasicTypeFieldContext, GenericDINodeFieldContext, TagFieldContext, HeaderFieldContext, OperandsFieldContext, DiTemplateValueParameterFieldContext, NameFieldContext, TypeFieldContext, DefaultedFieldContext, ValueFieldContext, MdFieldContext, DiSubroutineTypeFieldContext, FlagsFieldContext, DiFlagsContext, CcFieldContext, AlignFieldContext, AllocatedFieldContext, AnnotationsFieldContext, ArgFieldContext, AssociatedFieldContext, AttributesFieldContext, BaseTypeFieldContext, ChecksumFieldContext, ChecksumkindFieldContext, ColumnFieldContext, ConfigMacrosFieldContext, ContainingTypeFieldContext, CountFieldContext, DebugInfoForProfilingFieldContext, DeclarationFieldContext, DirectoryFieldContext, DiscriminatorFieldContext, DataLocationFieldContext, DiscriminatorIntFieldContext, DwarfAddressSpaceFieldContext, DwoIdFieldContext, ElementsFieldContext, EmissionKindFieldContext, EncodingFieldContext, EntityFieldContext, EnumsFieldContext, ExportSymbolsFieldContext, ExprFieldContext, ExtraDataFieldContext, FileFieldContext, FilenameFieldContext, FlagsStringFieldContext, GetterFieldContext, GlobalsFieldContext, IdentifierFieldContext, ImportsFieldContext, IncludePathFieldContext, InlinedAtFieldContext, IsDeclFieldContext, IsDefinitionFieldContext, IsImplicitCodeFieldContext, IsLocalFieldContext, IsOptimizedFieldContext, IsUnsignedFieldContext, ApiNotesFieldContext, LanguageFieldContext, LineFieldContext, LinkageNameFieldContext, LowerBoundFieldContext, MacrosFieldContext, NameTableKindFieldContext, NodesFieldContext, OffsetFieldContext, ProducerFieldContext, RangesBaseAddressFieldContext, RankFieldContext, RetainedNodesFieldContext, RetainedTypesFieldContext, RuntimeLangFieldContext, RuntimeVersionFieldContext, ScopeFieldContext, ScopeLineFieldContext, SdkFieldContext, SetterFieldContext, SizeFieldContext, SourceFieldContext, SpFlagsFieldContext, SplitDebugFilenameFieldContext, SplitDebugInliningFieldContext, StrideFieldContext, StringLengthFieldContext, StringLengthExpressionFieldContext, StringLocationExpressionFieldContext, SysrootFieldContext, TargetFuncNameFieldContext, TemplateParamsFieldContext, ThisAdjustmentFieldContext, ThrownTypesFieldContext, TypeMacinfoFieldContext, TypesFieldContext, UnitFieldContext, UpperBoundFieldContext, ValueIntFieldContext, ValueStringFieldContext, VarFieldContext, VirtualIndexFieldContext, VirtualityFieldContext, VtableHolderFieldContext, VoidTypeContext, OpaqueTypeContext } from "../llvmir/LLVMIRParser";
import { LLVMIRVisitor } from "../llvmir/LLVMIRVisitor";

// 所有 visitor 的基类
// 使用正则表达式 \?: \(\(ctx: ([a-zA-Z]+)\) => void\) \| undefined;
// 替换为 (ctx: $1): any { return this.visitChildren(ctx); }
export class LLVMIRBaseVisitor implements LLVMIRVisitor<any> {
  
  visitCompilationUnit(ctx: CompilationUnitContext): any { return this.visitChildren(ctx); }
  visitTopLevelEntity(ctx: TopLevelEntityContext): any { return this.visitChildren(ctx); }
  visitTypeDef(ctx: TypeDefContext): any { return this.visitChildren(ctx); }
  visitGlobalDecl(ctx: GlobalDeclContext): any { return this.visitChildren(ctx); }
  visitGlobalDef(ctx: GlobalDefContext): any { return this.visitChildren(ctx); }
  visitIndirectSymbolDef(ctx: IndirectSymbolDefContext): any { return this.visitChildren(ctx); }
  visitFuncDecl(ctx: FuncDeclContext): any { return this.visitChildren(ctx); }
  visitFuncDef(ctx: FuncDefContext): any { return this.visitChildren(ctx); }
  visitFuncHeader(ctx: FuncHeaderContext): any { return this.visitChildren(ctx); }
  visitIndirectSymbol(ctx: IndirectSymbolContext): any { return this.visitChildren(ctx); }
  visitFuncBody(ctx: FuncBodyContext): any { return this.visitChildren(ctx); }
  visitBasicBlock(ctx: BasicBlockContext): any { return this.visitChildren(ctx); }
  visitInstruction(ctx: InstructionContext): any { return this.visitChildren(ctx); }
  visitTerminator(ctx: TerminatorContext): any { return this.visitChildren(ctx); }
  visitLocalDefTerm(ctx: LocalDefTermContext): any { return this.visitChildren(ctx); }
  visitValueTerminator(ctx: ValueTerminatorContext): any { return this.visitChildren(ctx); }
  visitRetTerm(ctx: RetTermContext): any { return this.visitChildren(ctx); }
  visitBrTerm(ctx: BrTermContext): any { return this.visitChildren(ctx); }
  visitCondBrTerm(ctx: CondBrTermContext): any { return this.visitChildren(ctx); }
  visitSwitchTerm(ctx: SwitchTermContext): any { return this.visitChildren(ctx); }
  visitIndirectBrTerm(ctx: IndirectBrTermContext): any { return this.visitChildren(ctx); }
  visitResumeTerm(ctx: ResumeTermContext): any { return this.visitChildren(ctx); }
  visitCatchRetTerm(ctx: CatchRetTermContext): any { return this.visitChildren(ctx); }
  visitCleanupRetTerm(ctx: CleanupRetTermContext): any { return this.visitChildren(ctx); }
  visitUnreachableTerm(ctx: UnreachableTermContext): any { return this.visitChildren(ctx); }
  visitInvokeTerm(ctx: InvokeTermContext): any { return this.visitChildren(ctx); }
  visitCallBrTerm(ctx: CallBrTermContext): any { return this.visitChildren(ctx); }
  visitCatchSwitchTerm(ctx: CatchSwitchTermContext): any { return this.visitChildren(ctx); }
  visitLabel(ctx: LabelContext): any { return this.visitChildren(ctx); }
  visitCase(ctx: CaseContext): any { return this.visitChildren(ctx); }
  visitType(ctx: TypeContext): any { return this.visitChildren(ctx); }
  visitParams(ctx: ParamsContext): any { return this.visitChildren(ctx); }
  visitParam(ctx: ParamContext): any { return this.visitChildren(ctx); }
  visitTypeValue(ctx: TypeValueContext): any { return this.visitChildren(ctx); }
  visitValue(ctx: ValueContext): any { return this.visitChildren(ctx); }
  // type
  visitFirstClassType(ctx: FirstClassTypeContext): any { return this.visitChildren(ctx); }
  visitConcreteType(ctx: ConcreteTypeContext): any { return this.visitChildren(ctx); }
  visitIntType(ctx: IntTypeContext): any { return this.visitChildren(ctx); }
  visitFloatType(ctx: FloatTypeContext): any { return this.visitChildren(ctx); }
  visitPointerType(ctx: PointerTypeContext): any { return this.visitChildren(ctx); }
  visitVectorType(ctx: VectorTypeContext): any { return this.visitChildren(ctx); }
  visitLabelType(ctx: LabelTypeContext): any { return this.visitChildren(ctx); }
  visitArrayType(ctx: ArrayTypeContext): any { return this.visitChildren(ctx); }
  visitStructType(ctx: StructTypeContext): any { return this.visitChildren(ctx); }
  visitNamedType(ctx: NamedTypeContext): any { return this.visitChildren(ctx); }
  visitMmxType(ctx: MmxTypeContext): any { return this.visitChildren(ctx); }
  visitTokenType(ctx: TokenTypeContext): any { return this.visitChildren(ctx); }
  visitOpaquePointerType(ctx: OpaquePointerTypeContext): any { return this.visitChildren(ctx); }
  visitVoidType(ctx: VoidTypeContext): any { return this.visitChildren(ctx); }
  visitOpaqueType(ctx: OpaqueTypeContext): any { return this.visitChildren(ctx); }
  // constant
  visitConstant(ctx: ConstantContext): any { return this.visitChildren(ctx); }
  visitBoolConst(ctx: BoolConstContext): any { return this.visitChildren(ctx); }
  visitIntConst(ctx: IntConstContext): any { return this.visitChildren(ctx); }
  visitFloatConst(ctx: FloatConstContext): any { return this.visitChildren(ctx); }
  visitNullConst(ctx: NullConstContext): any { return this.visitChildren(ctx); }
  visitNoneConst(ctx: NoneConstContext): any { return this.visitChildren(ctx); }
  visitStructConst(ctx: StructConstContext): any { return this.visitChildren(ctx); }
  visitArrayConst(ctx: ArrayConstContext): any { return this.visitChildren(ctx); }
  visitVectorConst(ctx: VectorConstContext): any { return this.visitChildren(ctx); }
  visitZeroInitializerConst(ctx: ZeroInitializerConstContext): any { return this.visitChildren(ctx); }
  visitUndefConst(ctx: UndefConstContext): any { return this.visitChildren(ctx); }
  visitPoisonConst(ctx: PoisonConstContext): any { return this.visitChildren(ctx); }
  visitBlockAddressConst(ctx: BlockAddressConstContext): any { return this.visitChildren(ctx); }
  visitDsoLocalEquivalentConst(ctx: DsoLocalEquivalentConstContext): any { return this.visitChildren(ctx); }
  visitNoCFIConst(ctx: NoCFIConstContext): any { return this.visitChildren(ctx); }
  visitTypeConst(ctx: TypeConstContext): any { return this.visitChildren(ctx); }
  
  // expr
  visitConstantExpr(ctx: ConstantExprContext): any { return this.visitChildren(ctx); }
  visitBitCastExpr(ctx: BitCastExprContext): any { return this.visitChildren(ctx); }
  visitGetElementPtrExpr(ctx: GetElementPtrExprContext): any { return this.visitChildren(ctx); }
  visitGepIndex(ctx: GepIndexContext): any { return this.visitChildren(ctx); }
  visitAddrSpaceCastExpr(ctx: AddrSpaceCastExprContext): any { return this.visitChildren(ctx); }
  visitIntToPtrExpr(ctx: IntToPtrExprContext): any { return this.visitChildren(ctx); }
  visitICmpExpr(ctx: ICmpExprContext): any { return this.visitChildren(ctx); }
  visitFCmpExpr(ctx: FCmpExprContext): any { return this.visitChildren(ctx); }
  visitSelectExpr(ctx: SelectExprContext): any { return this.visitChildren(ctx); }
  visitTruncExpr(ctx: TruncExprContext): any { return this.visitChildren(ctx); }
  visitZExtExpr(ctx: ZExtExprContext): any { return this.visitChildren(ctx); }
  visitSExtExpr(ctx: SExtExprContext): any { return this.visitChildren(ctx); }
  visitFpTruncExpr(ctx: FpTruncExprContext): any { return this.visitChildren(ctx); }
  visitFpExtExpr(ctx: FpExtExprContext): any { return this.visitChildren(ctx); }
  visitFpToUiExpr(ctx: FpToUiExprContext): any { return this.visitChildren(ctx); }
  visitFpToSiExpr(ctx: FpToSiExprContext): any { return this.visitChildren(ctx); }
  visitUiToFpExpr(ctx: UiToFpExprContext): any { return this.visitChildren(ctx); }
  visitSiToFpExpr(ctx: SiToFpExprContext): any { return this.visitChildren(ctx); }
  visitPtrToIntExpr(ctx: PtrToIntExprContext): any { return this.visitChildren(ctx); }
  visitExtractElementExpr(ctx: ExtractElementExprContext): any { return this.visitChildren(ctx); }
  visitInsertElementExpr(ctx: InsertElementExprContext): any { return this.visitChildren(ctx); }
  visitShuffleVectorExpr(ctx: ShuffleVectorExprContext): any { return this.visitChildren(ctx); }
  visitShlExpr(ctx: ShlExprContext): any { return this.visitChildren(ctx); }
  visitLShrExpr(ctx: LShrExprContext): any { return this.visitChildren(ctx); }
  visitAShrExpr(ctx: AShrExprContext): any { return this.visitChildren(ctx); }
  visitAndExpr(ctx: AndExprContext): any { return this.visitChildren(ctx); }
  visitOrExpr(ctx: OrExprContext): any { return this.visitChildren(ctx); }
  visitXorExpr(ctx: XorExprContext): any { return this.visitChildren(ctx); }
  visitAddExpr(ctx: AddExprContext): any { return this.visitChildren(ctx); }
  visitSubExpr(ctx: SubExprContext): any { return this.visitChildren(ctx); }
  visitMulExpr(ctx: MulExprContext): any { return this.visitChildren(ctx); }
  visitFNegExpr(ctx: FNegExprContext): any { return this.visitChildren(ctx); }
  // inst
  visitFenceInst(ctx: FenceInstContext): any { return this.visitChildren(ctx); }
  visitFNegInst(ctx: FNegInstContext): any { return this.visitChildren(ctx); }
  visitAddInst(ctx: AddInstContext): any { return this.visitChildren(ctx); }
  visitFAddInst(ctx: FAddInstContext): any { return this.visitChildren(ctx); }
  visitSubInst(ctx: SubInstContext): any { return this.visitChildren(ctx); }
  visitFSubInst(ctx: FSubInstContext): any { return this.visitChildren(ctx); }
  visitMulInst(ctx: MulInstContext): any { return this.visitChildren(ctx); }
  visitFMulInst(ctx: FMulInstContext): any { return this.visitChildren(ctx); }
  visitUDivInst(ctx: UDivInstContext): any { return this.visitChildren(ctx); }
  visitSDivInst(ctx: SDivInstContext): any { return this.visitChildren(ctx); }
  visitFDivInst(ctx: FDivInstContext): any { return this.visitChildren(ctx); }
  visitURemInst(ctx: URemInstContext): any { return this.visitChildren(ctx); }
  visitSRemInst(ctx: SRemInstContext): any { return this.visitChildren(ctx); }
  visitFRemInst(ctx: FRemInstContext): any { return this.visitChildren(ctx); }
  visitShlInst(ctx: ShlInstContext): any { return this.visitChildren(ctx); }
  visitLShrInst(ctx: LShrInstContext): any { return this.visitChildren(ctx); }
  visitAShrInst(ctx: AShrInstContext): any { return this.visitChildren(ctx); }
  visitAndInst(ctx: AndInstContext): any { return this.visitChildren(ctx); }
  visitOrInst(ctx: OrInstContext): any { return this.visitChildren(ctx); }
  visitXorInst(ctx: XorInstContext): any { return this.visitChildren(ctx); }
  visitExtractElementInst(ctx: ExtractElementInstContext): any { return this.visitChildren(ctx); }
  visitInsertElementInst(ctx: InsertElementInstContext): any { return this.visitChildren(ctx); }
  visitShuffleVectorInst(ctx: ShuffleVectorInstContext): any { return this.visitChildren(ctx); }
  visitExtractValueInst(ctx: ExtractValueInstContext): any { return this.visitChildren(ctx); }
  visitInsertValueInst(ctx: InsertValueInstContext): any { return this.visitChildren(ctx); }
  visitAllocaInst(ctx: AllocaInstContext): any { return this.visitChildren(ctx); }
  visitLoadInst(ctx: LoadInstContext): any { return this.visitChildren(ctx); }
  visitCmpXchgInst(ctx: CmpXchgInstContext): any { return this.visitChildren(ctx); }
  visitAtomicRMWInst(ctx: AtomicRMWInstContext): any { return this.visitChildren(ctx); }
  visitGetElementPtrInst(ctx: GetElementPtrInstContext): any { return this.visitChildren(ctx); }
  visitTruncInst(ctx: TruncInstContext): any { return this.visitChildren(ctx); }
  visitZExtInst(ctx: ZExtInstContext): any { return this.visitChildren(ctx); }
  visitSExtInst(ctx: SExtInstContext): any { return this.visitChildren(ctx); }
  visitFpTruncInst(ctx: FpTruncInstContext): any { return this.visitChildren(ctx); }
  visitFpExtInst(ctx: FpExtInstContext): any { return this.visitChildren(ctx); }
  visitFpToUiInst(ctx: FpToUiInstContext): any { return this.visitChildren(ctx); }
  visitFpToSiInst(ctx: FpToSiInstContext): any { return this.visitChildren(ctx); }
  visitUiToFpInst(ctx: UiToFpInstContext): any { return this.visitChildren(ctx); }
  visitSiToFpInst(ctx: SiToFpInstContext): any { return this.visitChildren(ctx); }
  visitPtrToIntInst(ctx: PtrToIntInstContext): any { return this.visitChildren(ctx); }
  visitIntToPtrInst(ctx: IntToPtrInstContext): any { return this.visitChildren(ctx); }
  visitBitCastInst(ctx: BitCastInstContext): any { return this.visitChildren(ctx); }
  visitAddrSpaceCastInst(ctx: AddrSpaceCastInstContext): any { return this.visitChildren(ctx); }
  visitICmpInst(ctx: ICmpInstContext): any { return this.visitChildren(ctx); }
  visitFCmpInst(ctx: FCmpInstContext): any { return this.visitChildren(ctx); }
  visitPhiInst(ctx: PhiInstContext): any { return this.visitChildren(ctx); }
  visitSelectInst(ctx: SelectInstContext): any { return this.visitChildren(ctx); }
  visitFreezeInst(ctx: FreezeInstContext): any { return this.visitChildren(ctx); }
  visitCallInst(ctx: CallInstContext): any { return this.visitChildren(ctx); }
  visitVaargInst(ctx: VaargInstContext): any { return this.visitChildren(ctx); }
  visitLandingPadInst(ctx: LandingPadInstContext): any { return this.visitChildren(ctx); }
  visitCatchPadInst(ctx: CatchPadInstContext): any { return this.visitChildren(ctx); }
  visitCleanupPadInst(ctx: CleanupPadInstContext): any { return this.visitChildren(ctx); }
  visitStoreInst(ctx: StoreInstContext): any { return this.visitChildren(ctx); }
  visitLocalDefInst(ctx: LocalDefInstContext): any { return this.visitChildren(ctx); }

  visitTargetDef(ctx: TargetDefContext): any { return this.visitChildren(ctx); }
  visitSourceFilename(ctx: SourceFilenameContext): any { return this.visitChildren(ctx); }
  visitTargetDataLayout(ctx: TargetDataLayoutContext): any { return this.visitChildren(ctx); }
  visitTargetTriple(ctx: TargetTripleContext): any { return this.visitChildren(ctx); }
  visitComdatDef(ctx: ComdatDefContext): any { return this.visitChildren(ctx); }
  visitModuleAsm(ctx: ModuleAsmContext): any { return this.visitChildren(ctx); }
  visitAttrGroupDef(ctx: AttrGroupDefContext): any { return this.visitChildren(ctx); }
  visitNamedMetadataDef(ctx: NamedMetadataDefContext): any { return this.visitChildren(ctx); }
  visitMetadataDef(ctx: MetadataDefContext): any { return this.visitChildren(ctx); }
  visitUseListOrder(ctx: UseListOrderContext): any { return this.visitChildren(ctx); }
  visitUseListOrderBB(ctx: UseListOrderBBContext): any { return this.visitChildren(ctx); }
  visitCallingConv(ctx: CallingConvContext): any { return this.visitChildren(ctx); }
  visitCallingConvInt(ctx: CallingConvIntContext): any { return this.visitChildren(ctx); }
  visitFuncHdrField(ctx: FuncHdrFieldContext): any { return this.visitChildren(ctx); }
  visitGc(ctx: GcContext): any { return this.visitChildren(ctx); }
  visitPrefix(ctx: PrefixContext): any { return this.visitChildren(ctx); }
  visitPrologue(ctx: PrologueContext): any { return this.visitChildren(ctx); }
  visitPersonality(ctx: PersonalityContext): any { return this.visitChildren(ctx); }
  visitReturnAttribute(ctx: ReturnAttributeContext): any { return this.visitChildren(ctx); }
  visitUnwindTarget(ctx: UnwindTargetContext): any { return this.visitChildren(ctx); }
  visitHandlers(ctx: HandlersContext): any { return this.visitChildren(ctx); }
  visitMetadataNode(ctx: MetadataNodeContext): any { return this.visitChildren(ctx); }
  visitDiExpression(ctx: DiExpressionContext): any { return this.visitChildren(ctx); }
  visitDiExpressionField(ctx: DiExpressionFieldContext): any { return this.visitChildren(ctx); }
  visitGlobalField(ctx: GlobalFieldContext): any { return this.visitChildren(ctx); }
  visitSection(ctx: SectionContext): any { return this.visitChildren(ctx); }
  visitComdat(ctx: ComdatContext): any { return this.visitChildren(ctx); }
  visitPartition(ctx: PartitionContext): any { return this.visitChildren(ctx); }
  visitMetadataAttachment(ctx: MetadataAttachmentContext): any { return this.visitChildren(ctx); }
  visitMdNode(ctx: MdNodeContext): any { return this.visitChildren(ctx); }
  visitMdTuple(ctx: MdTupleContext): any { return this.visitChildren(ctx); }
  visitMetadata(ctx: MetadataContext): any { return this.visitChildren(ctx); }
  visitDiArgList(ctx: DiArgListContext): any { return this.visitChildren(ctx); }
  visitInlineAsm(ctx: InlineAsmContext): any { return this.visitChildren(ctx); }
  visitMdString(ctx: MdStringContext): any { return this.visitChildren(ctx); }
  visitMdFieldOrInt(ctx: MdFieldOrIntContext): any { return this.visitChildren(ctx); }
  visitDiSPFlag(ctx: DiSPFlagContext): any { return this.visitChildren(ctx); }
  visitFuncAttribute(ctx: FuncAttributeContext): any { return this.visitChildren(ctx); }
  visitParamAttribute(ctx: ParamAttributeContext): any { return this.visitChildren(ctx); }
  visitAttrString(ctx: AttrStringContext): any { return this.visitChildren(ctx); }
  visitAttrPair(ctx: AttrPairContext): any { return this.visitChildren(ctx); }
  visitAlign(ctx: AlignContext): any { return this.visitChildren(ctx); }
  visitAlignPair(ctx: AlignPairContext): any { return this.visitChildren(ctx); }
  visitAlignStack(ctx: AlignStackContext): any { return this.visitChildren(ctx); }
  visitAlignStackPair(ctx: AlignStackPairContext): any { return this.visitChildren(ctx); }
  visitAllocKind(ctx: AllocKindContext): any { return this.visitChildren(ctx); }
  visitAllocSize(ctx: AllocSizeContext): any { return this.visitChildren(ctx); }
  visitUnwindTable(ctx: UnwindTableContext): any { return this.visitChildren(ctx); }
  visitVectorScaleRange(ctx: VectorScaleRangeContext): any { return this.visitChildren(ctx); }
  visitByRefAttr(ctx: ByRefAttrContext): any { return this.visitChildren(ctx); }
  visitByval(ctx: ByvalContext): any { return this.visitChildren(ctx); }
  visitDereferenceable(ctx: DereferenceableContext): any { return this.visitChildren(ctx); }
  visitElementType(ctx: ElementTypeContext): any { return this.visitChildren(ctx); }
  visitInAlloca(ctx: InAllocaContext): any { return this.visitChildren(ctx); }
  visitParamAttr(ctx: ParamAttrContext): any { return this.visitChildren(ctx); }
  visitPreallocated(ctx: PreallocatedContext): any { return this.visitChildren(ctx); }
  visitStructRetAttr(ctx: StructRetAttrContext): any { return this.visitChildren(ctx); }
  visitAddrSpace(ctx: AddrSpaceContext): any { return this.visitChildren(ctx); }
  visitThreadLocal(ctx: ThreadLocalContext): any { return this.visitChildren(ctx); }
  visitMetadataType(ctx: MetadataTypeContext): any { return this.visitChildren(ctx); }
  visitValueInstruction(ctx: ValueInstructionContext): any { return this.visitChildren(ctx); }
  visitSyncScope(ctx: SyncScopeContext): any { return this.visitChildren(ctx); }
  visitInc(ctx: IncContext): any { return this.visitChildren(ctx); }
  visitOperandBundle(ctx: OperandBundleContext): any { return this.visitChildren(ctx); }
  visitClause(ctx: ClauseContext): any { return this.visitChildren(ctx); }
  visitArgs(ctx: ArgsContext): any { return this.visitChildren(ctx); }
  visitArg(ctx: ArgContext): any { return this.visitChildren(ctx); }
  visitExceptionArg(ctx: ExceptionArgContext): any { return this.visitChildren(ctx); }
  visitExceptionPad(ctx: ExceptionPadContext): any { return this.visitChildren(ctx); }
  visitExternalLinkage(ctx: ExternalLinkageContext): any { return this.visitChildren(ctx); }
  visitInternalLinkage(ctx: InternalLinkageContext): any { return this.visitChildren(ctx); }
  visitLinkage(ctx: LinkageContext): any { return this.visitChildren(ctx); }
  visitPreemption(ctx: PreemptionContext): any { return this.visitChildren(ctx); }
  visitVisibility(ctx: VisibilityContext): any { return this.visitChildren(ctx); }
  visitDllStorageClass(ctx: DllStorageClassContext): any { return this.visitChildren(ctx); }
  visitTlsModel(ctx: TlsModelContext): any { return this.visitChildren(ctx); }
  visitUnnamedAddr(ctx: UnnamedAddrContext): any { return this.visitChildren(ctx); }
  visitExternallyInitialized(ctx: ExternallyInitializedContext): any { return this.visitChildren(ctx); }
  visitImmutable(ctx: ImmutableContext): any { return this.visitChildren(ctx); }
  visitFuncAttr(ctx: FuncAttrContext): any { return this.visitChildren(ctx); }
  visitDistinct(ctx: DistinctContext): any { return this.visitChildren(ctx); }
  visitInBounds(ctx: InBoundsContext): any { return this.visitChildren(ctx); }
  visitReturnAttr(ctx: ReturnAttrContext): any { return this.visitChildren(ctx); }
  visitOverflowFlag(ctx: OverflowFlagContext): any { return this.visitChildren(ctx); }
  visitIPred(ctx: IPredContext): any { return this.visitChildren(ctx); }
  visitFPred(ctx: FPredContext): any { return this.visitChildren(ctx); }
  visitAtomicOrdering(ctx: AtomicOrderingContext): any { return this.visitChildren(ctx); }
  visitCallingConvEnum(ctx: CallingConvEnumContext): any { return this.visitChildren(ctx); }
  visitFastMathFlag(ctx: FastMathFlagContext): any { return this.visitChildren(ctx); }
  visitAtomicOp(ctx: AtomicOpContext): any { return this.visitChildren(ctx); }
  visitFloatKind(ctx: FloatKindContext): any { return this.visitChildren(ctx); }
  visitSpecializedMDNode(ctx: SpecializedMDNodeContext): any { return this.visitChildren(ctx); }
  visitDiBasicType(ctx: DiBasicTypeContext): any { return this.visitChildren(ctx); }
  visitDiCommonBlock(ctx: DiCommonBlockContext): any { return this.visitChildren(ctx); }
  visitDiCompileUnit(ctx: DiCompileUnitContext): any { return this.visitChildren(ctx); }
  visitDiCompositeType(ctx: DiCompositeTypeContext): any { return this.visitChildren(ctx); }
  visitDiCompositeTypeField(ctx: DiCompositeTypeFieldContext): any { return this.visitChildren(ctx); }
  visitDiDerivedType(ctx: DiDerivedTypeContext): any { return this.visitChildren(ctx); }
  visitDiDerivedTypeField(ctx: DiDerivedTypeFieldContext): any { return this.visitChildren(ctx); }
  visitDiEnumerator(ctx: DiEnumeratorContext): any { return this.visitChildren(ctx); }
  visitDiEnumeratorField(ctx: DiEnumeratorFieldContext): any { return this.visitChildren(ctx); }
  visitDiFile(ctx: DiFileContext): any { return this.visitChildren(ctx); }
  visitDiFileField(ctx: DiFileFieldContext): any { return this.visitChildren(ctx); }
  visitDiGlobalVariable(ctx: DiGlobalVariableContext): any { return this.visitChildren(ctx); }
  visitDiGlobalVariableField(ctx: DiGlobalVariableFieldContext): any { return this.visitChildren(ctx); }
  visitDiGlobalVariableExpression(ctx: DiGlobalVariableExpressionContext): any { return this.visitChildren(ctx); }
  visitDiGlobalVariableExpressionField(ctx: DiGlobalVariableExpressionFieldContext): any { return this.visitChildren(ctx); }
  visitDiImportedEntity(ctx: DiImportedEntityContext): any { return this.visitChildren(ctx); }
  visitDiImportedEntityField(ctx: DiImportedEntityFieldContext): any { return this.visitChildren(ctx); }
  visitDiLabel(ctx: DiLabelContext): any { return this.visitChildren(ctx); }
  visitDiLabelField(ctx: DiLabelFieldContext): any { return this.visitChildren(ctx); }
  visitDiLexicalBlock(ctx: DiLexicalBlockContext): any { return this.visitChildren(ctx); }
  visitDiLexicalBlockField(ctx: DiLexicalBlockFieldContext): any { return this.visitChildren(ctx); }
  visitDiLexicalBlockFile(ctx: DiLexicalBlockFileContext): any { return this.visitChildren(ctx); }
  visitDiLexicalBlockFileField(ctx: DiLexicalBlockFileFieldContext): any { return this.visitChildren(ctx); }
  visitDiLocalVariable(ctx: DiLocalVariableContext): any { return this.visitChildren(ctx); }
  visitDiLocalVariableField(ctx: DiLocalVariableFieldContext): any { return this.visitChildren(ctx); }
  visitDiLocation(ctx: DiLocationContext): any { return this.visitChildren(ctx); }
  visitDiLocationField(ctx: DiLocationFieldContext): any { return this.visitChildren(ctx); }
  visitDiMacro(ctx: DiMacroContext): any { return this.visitChildren(ctx); }
  visitDiMacroField(ctx: DiMacroFieldContext): any { return this.visitChildren(ctx); }
  visitDiMacroFile(ctx: DiMacroFileContext): any { return this.visitChildren(ctx); }
  visitDiMacroFileField(ctx: DiMacroFileFieldContext): any { return this.visitChildren(ctx); }
  visitDiModule(ctx: DiModuleContext): any { return this.visitChildren(ctx); }
  visitDiModuleField(ctx: DiModuleFieldContext): any { return this.visitChildren(ctx); }
  visitDiNamespace(ctx: DiNamespaceContext): any { return this.visitChildren(ctx); }
  visitDiNamespaceField(ctx: DiNamespaceFieldContext): any { return this.visitChildren(ctx); }
  visitDiObjCProperty(ctx: DiObjCPropertyContext): any { return this.visitChildren(ctx); }
  visitDiObjCPropertyField(ctx: DiObjCPropertyFieldContext): any { return this.visitChildren(ctx); }
  visitDiStringType(ctx: DiStringTypeContext): any { return this.visitChildren(ctx); }
  visitDiStringTypeField(ctx: DiStringTypeFieldContext): any { return this.visitChildren(ctx); }
  visitDiSubprogram(ctx: DiSubprogramContext): any { return this.visitChildren(ctx); }
  visitDiSubprogramField(ctx: DiSubprogramFieldContext): any { return this.visitChildren(ctx); }
  visitDiSubrange(ctx: DiSubrangeContext): any { return this.visitChildren(ctx); }
  visitDiSubrangeField(ctx: DiSubrangeFieldContext): any { return this.visitChildren(ctx); }
  visitDiSubroutineType(ctx: DiSubroutineTypeContext): any { return this.visitChildren(ctx); }
  visitDiTemplateTypeParameter(ctx: DiTemplateTypeParameterContext): any { return this.visitChildren(ctx); }
  visitDiTemplateValueParameter(ctx: DiTemplateValueParameterContext): any { return this.visitChildren(ctx); }
  visitGenericDiNode(ctx: GenericDiNodeContext): any { return this.visitChildren(ctx); }
  visitDiTemplateTypeParameterField(ctx: DiTemplateTypeParameterFieldContext): any { return this.visitChildren(ctx); }
  visitDiCompileUnitField(ctx: DiCompileUnitFieldContext): any { return this.visitChildren(ctx); }
  visitDiCommonBlockField(ctx: DiCommonBlockFieldContext): any { return this.visitChildren(ctx); }
  visitDiBasicTypeField(ctx: DiBasicTypeFieldContext): any { return this.visitChildren(ctx); }
  visitGenericDINodeField(ctx: GenericDINodeFieldContext): any { return this.visitChildren(ctx); }
  visitTagField(ctx: TagFieldContext): any { return this.visitChildren(ctx); }
  visitHeaderField(ctx: HeaderFieldContext): any { return this.visitChildren(ctx); }
  visitOperandsField(ctx: OperandsFieldContext): any { return this.visitChildren(ctx); }
  visitDiTemplateValueParameterField(ctx: DiTemplateValueParameterFieldContext): any { return this.visitChildren(ctx); }
  visitNameField(ctx: NameFieldContext): any { return this.visitChildren(ctx); }
  visitTypeField(ctx: TypeFieldContext): any { return this.visitChildren(ctx); }
  visitDefaultedField(ctx: DefaultedFieldContext): any { return this.visitChildren(ctx); }
  visitValueField(ctx: ValueFieldContext): any { return this.visitChildren(ctx); }
  visitMdField(ctx: MdFieldContext): any { return this.visitChildren(ctx); }
  visitDiSubroutineTypeField(ctx: DiSubroutineTypeFieldContext): any { return this.visitChildren(ctx); }
  visitFlagsField(ctx: FlagsFieldContext): any { return this.visitChildren(ctx); }
  visitDiFlags(ctx: DiFlagsContext): any { return this.visitChildren(ctx); }
  visitCcField(ctx: CcFieldContext): any { return this.visitChildren(ctx); }
  visitAlignField(ctx: AlignFieldContext): any { return this.visitChildren(ctx); }
  visitAllocatedField(ctx: AllocatedFieldContext): any { return this.visitChildren(ctx); }
  visitAnnotationsField(ctx: AnnotationsFieldContext): any { return this.visitChildren(ctx); }
  visitArgField(ctx: ArgFieldContext): any { return this.visitChildren(ctx); }
  visitAssociatedField(ctx: AssociatedFieldContext): any { return this.visitChildren(ctx); }
  visitAttributesField(ctx: AttributesFieldContext): any { return this.visitChildren(ctx); }
  visitBaseTypeField(ctx: BaseTypeFieldContext): any { return this.visitChildren(ctx); }
  visitChecksumField(ctx: ChecksumFieldContext): any { return this.visitChildren(ctx); }
  visitChecksumkindField(ctx: ChecksumkindFieldContext): any { return this.visitChildren(ctx); }
  visitColumnField(ctx: ColumnFieldContext): any { return this.visitChildren(ctx); }
  visitConfigMacrosField(ctx: ConfigMacrosFieldContext): any { return this.visitChildren(ctx); }
  visitContainingTypeField(ctx: ContainingTypeFieldContext): any { return this.visitChildren(ctx); }
  visitCountField(ctx: CountFieldContext): any { return this.visitChildren(ctx); }
  visitDebugInfoForProfilingField(ctx: DebugInfoForProfilingFieldContext): any { return this.visitChildren(ctx); }
  visitDeclarationField(ctx: DeclarationFieldContext): any { return this.visitChildren(ctx); }
  visitDirectoryField(ctx: DirectoryFieldContext): any { return this.visitChildren(ctx); }
  visitDiscriminatorField(ctx: DiscriminatorFieldContext): any { return this.visitChildren(ctx); }
  visitDataLocationField(ctx: DataLocationFieldContext): any { return this.visitChildren(ctx); }
  visitDiscriminatorIntField(ctx: DiscriminatorIntFieldContext): any { return this.visitChildren(ctx); }
  visitDwarfAddressSpaceField(ctx: DwarfAddressSpaceFieldContext): any { return this.visitChildren(ctx); }
  visitDwoIdField(ctx: DwoIdFieldContext): any { return this.visitChildren(ctx); }
  visitElementsField(ctx: ElementsFieldContext): any { return this.visitChildren(ctx); }
  visitEmissionKindField(ctx: EmissionKindFieldContext): any { return this.visitChildren(ctx); }
  visitEncodingField(ctx: EncodingFieldContext): any { return this.visitChildren(ctx); }
  visitEntityField(ctx: EntityFieldContext): any { return this.visitChildren(ctx); }
  visitEnumsField(ctx: EnumsFieldContext): any { return this.visitChildren(ctx); }
  visitExportSymbolsField(ctx: ExportSymbolsFieldContext): any { return this.visitChildren(ctx); }
  visitExprField(ctx: ExprFieldContext): any { return this.visitChildren(ctx); }
  visitExtraDataField(ctx: ExtraDataFieldContext): any { return this.visitChildren(ctx); }
  visitFileField(ctx: FileFieldContext): any { return this.visitChildren(ctx); }
  visitFilenameField(ctx: FilenameFieldContext): any { return this.visitChildren(ctx); }
  visitFlagsStringField(ctx: FlagsStringFieldContext): any { return this.visitChildren(ctx); }
  visitGetterField(ctx: GetterFieldContext): any { return this.visitChildren(ctx); }
  visitGlobalsField(ctx: GlobalsFieldContext): any { return this.visitChildren(ctx); }
  visitIdentifierField(ctx: IdentifierFieldContext): any { return this.visitChildren(ctx); }
  visitImportsField(ctx: ImportsFieldContext): any { return this.visitChildren(ctx); }
  visitIncludePathField(ctx: IncludePathFieldContext): any { return this.visitChildren(ctx); }
  visitInlinedAtField(ctx: InlinedAtFieldContext): any { return this.visitChildren(ctx); }
  visitIsDeclField(ctx: IsDeclFieldContext): any { return this.visitChildren(ctx); }
  visitIsDefinitionField(ctx: IsDefinitionFieldContext): any { return this.visitChildren(ctx); }
  visitIsImplicitCodeField(ctx: IsImplicitCodeFieldContext): any { return this.visitChildren(ctx); }
  visitIsLocalField(ctx: IsLocalFieldContext): any { return this.visitChildren(ctx); }
  visitIsOptimizedField(ctx: IsOptimizedFieldContext): any { return this.visitChildren(ctx); }
  visitIsUnsignedField(ctx: IsUnsignedFieldContext): any { return this.visitChildren(ctx); }
  visitApiNotesField(ctx: ApiNotesFieldContext): any { return this.visitChildren(ctx); }
  visitLanguageField(ctx: LanguageFieldContext): any { return this.visitChildren(ctx); }
  visitLineField(ctx: LineFieldContext): any { return this.visitChildren(ctx); }
  visitLinkageNameField(ctx: LinkageNameFieldContext): any { return this.visitChildren(ctx); }
  visitLowerBoundField(ctx: LowerBoundFieldContext): any { return this.visitChildren(ctx); }
  visitMacrosField(ctx: MacrosFieldContext): any { return this.visitChildren(ctx); }
  visitNameTableKindField(ctx: NameTableKindFieldContext): any { return this.visitChildren(ctx); }
  visitNodesField(ctx: NodesFieldContext): any { return this.visitChildren(ctx); }
  visitOffsetField(ctx: OffsetFieldContext): any { return this.visitChildren(ctx); }
  visitProducerField(ctx: ProducerFieldContext): any { return this.visitChildren(ctx); }
  visitRangesBaseAddressField(ctx: RangesBaseAddressFieldContext): any { return this.visitChildren(ctx); }
  visitRankField(ctx: RankFieldContext): any { return this.visitChildren(ctx); }
  visitRetainedNodesField(ctx: RetainedNodesFieldContext): any { return this.visitChildren(ctx); }
  visitRetainedTypesField(ctx: RetainedTypesFieldContext): any { return this.visitChildren(ctx); }
  visitRuntimeLangField(ctx: RuntimeLangFieldContext): any { return this.visitChildren(ctx); }
  visitRuntimeVersionField(ctx: RuntimeVersionFieldContext): any { return this.visitChildren(ctx); }
  visitScopeField(ctx: ScopeFieldContext): any { return this.visitChildren(ctx); }
  visitScopeLineField(ctx: ScopeLineFieldContext): any { return this.visitChildren(ctx); }
  visitSdkField(ctx: SdkFieldContext): any { return this.visitChildren(ctx); }
  visitSetterField(ctx: SetterFieldContext): any { return this.visitChildren(ctx); }
  visitSizeField(ctx: SizeFieldContext): any { return this.visitChildren(ctx); }
  visitSourceField(ctx: SourceFieldContext): any { return this.visitChildren(ctx); }
  visitSpFlagsField(ctx: SpFlagsFieldContext): any { return this.visitChildren(ctx); }
  visitSplitDebugFilenameField(ctx: SplitDebugFilenameFieldContext): any { return this.visitChildren(ctx); }
  visitSplitDebugInliningField(ctx: SplitDebugInliningFieldContext): any { return this.visitChildren(ctx); }
  visitStrideField(ctx: StrideFieldContext): any { return this.visitChildren(ctx); }
  visitStringLengthField(ctx: StringLengthFieldContext): any { return this.visitChildren(ctx); }
  visitStringLengthExpressionField(ctx: StringLengthExpressionFieldContext): any { return this.visitChildren(ctx); }
  visitStringLocationExpressionField(ctx: StringLocationExpressionFieldContext): any { return this.visitChildren(ctx); }
  visitSysrootField(ctx: SysrootFieldContext): any { return this.visitChildren(ctx); }
  visitTargetFuncNameField(ctx: TargetFuncNameFieldContext): any { return this.visitChildren(ctx); }
  visitTemplateParamsField(ctx: TemplateParamsFieldContext): any { return this.visitChildren(ctx); }
  visitThisAdjustmentField(ctx: ThisAdjustmentFieldContext): any { return this.visitChildren(ctx); }
  visitThrownTypesField(ctx: ThrownTypesFieldContext): any { return this.visitChildren(ctx); }
  visitTypeMacinfoField(ctx: TypeMacinfoFieldContext): any { return this.visitChildren(ctx); }
  visitTypesField(ctx: TypesFieldContext): any { return this.visitChildren(ctx); }
  visitUnitField(ctx: UnitFieldContext): any { return this.visitChildren(ctx); }
  visitUpperBoundField(ctx: UpperBoundFieldContext): any { return this.visitChildren(ctx); }
  visitValueIntField(ctx: ValueIntFieldContext): any { return this.visitChildren(ctx); }
  visitValueStringField(ctx: ValueStringFieldContext): any { return this.visitChildren(ctx); }
  visitVarField(ctx: VarFieldContext): any { return this.visitChildren(ctx); }
  visitVirtualIndexField(ctx: VirtualIndexFieldContext): any { return this.visitChildren(ctx); }
  visitVirtualityField(ctx: VirtualityFieldContext): any { return this.visitChildren(ctx); }
  visitVtableHolderField(ctx: VtableHolderFieldContext): any { return this.visitChildren(ctx); }
  
  
  visit(tree: ParseTree): any {
    return tree.accept(this);
  }
  visitChildren(node: RuleNode): any {
    let result = null;
    for(let i=0; i<node.childCount; i++) 
      result = node.getChild(i).accept(this);
    return result;
  }
  visitTerminal(node: TerminalNode): any {
    return null;
  }
  visitErrorNode(node: ErrorNode): any {
    return this.visitTerminal(node);
  }
  

  // 一些辅助函数
  getSymbolRange(symbol: Token): Range {
    return new Range(
      new Position(symbol.line-1, symbol.charPositionInLine),
      new Position(symbol.line-1, symbol.charPositionInLine + (symbol.text?.length || 0))
    );
  }
  getTerminalRange(node: TerminalNode): Range {
    return this.getSymbolRange(node.symbol);
  }
  getContextRange(ctx: ParserRuleContext): Range {
    const start = ctx.start;
    const stop = ctx.stop;
    if(! stop) {
      return new Range(
        start.line-1, start.charPositionInLine, start.line-1, start.charPositionInLine
      );
    }
    else {
      return new Range(
        start.line-1, start.charPositionInLine, stop.line-1, stop.charPositionInLine + (stop.text?.length || 0)
      );
    }
  }
  positionInContext(ctx: ParserRuleContext, position: Position): boolean {
    const start = ctx.start;
    const stop = ctx.stop;
    if (stop == undefined) return false;
    else if (position.line < start.line - 1 || position.line > stop.line - 1) return false;
    else if (position.line == start.line - 1 && position.line == stop.line - 1) {
      // start 和 stop 位于同一行
      return position.character >= start.charPositionInLine && position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else if (position.line == start.line - 1) {
      // stop 不在这一行
      return position.character >= start.charPositionInLine;
    }
    else if (position.line == stop.line - 1) {
      return position.character <= stop.charPositionInLine + (stop.text?.length || 0);
    }
    else {
      // 在 start 和 stop 中间的某一行
      return true;
    }
  }
  positionInTerminal(node: TerminalNode, position: Position): boolean {
    return this.positionInSymbol(node.symbol, position);
  }
  positionInSymbol(symbol: Token, position: Position): boolean {
    const line = symbol.line - 1;
    const character = symbol.charPositionInLine;
    const end = symbol.charPositionInLine + (symbol.text?.length || 0);
    return (position.line === line && position.character >= character && position.character <= end);
  }
  parseIntLit(intlit: string): number {
    if (intlit.startsWith('u0x') || intlit.startsWith('s0x') || intlit.startsWith('0x')) {
      // 16 进制 todo
      if (intlit.startsWith('0x')) intlit = intlit.slice(2, intlit.length);
      else intlit = intlit.slice(3, intlit.length);
      const ret = parseInt(intlit, 16);
      return ret;
    }
    else {
      return parseInt(intlit);
    }
  }
}

