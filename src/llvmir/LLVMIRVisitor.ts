// Generated from src/llvmir/LLVMIR.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { CompilationUnitContext } from "./LLVMIRParser";
import { TargetDefContext } from "./LLVMIRParser";
import { SourceFilenameContext } from "./LLVMIRParser";
import { TargetDataLayoutContext } from "./LLVMIRParser";
import { TargetTripleContext } from "./LLVMIRParser";
import { TopLevelEntityContext } from "./LLVMIRParser";
import { ModuleAsmContext } from "./LLVMIRParser";
import { TypeDefContext } from "./LLVMIRParser";
import { ComdatDefContext } from "./LLVMIRParser";
import { GlobalDeclContext } from "./LLVMIRParser";
import { GlobalDefContext } from "./LLVMIRParser";
import { IndirectSymbolDefContext } from "./LLVMIRParser";
import { FuncDeclContext } from "./LLVMIRParser";
import { FuncDefContext } from "./LLVMIRParser";
import { AttrGroupDefContext } from "./LLVMIRParser";
import { NamedMetadataDefContext } from "./LLVMIRParser";
import { MetadataDefContext } from "./LLVMIRParser";
import { UseListOrderContext } from "./LLVMIRParser";
import { UseListOrderBBContext } from "./LLVMIRParser";
import { FuncHeaderContext } from "./LLVMIRParser";
import { IndirectSymbolContext } from "./LLVMIRParser";
import { CallingConvContext } from "./LLVMIRParser";
import { CallingConvIntContext } from "./LLVMIRParser";
import { FuncHdrFieldContext } from "./LLVMIRParser";
import { GcContext } from "./LLVMIRParser";
import { PrefixContext } from "./LLVMIRParser";
import { PrologueContext } from "./LLVMIRParser";
import { PersonalityContext } from "./LLVMIRParser";
import { ReturnAttributeContext } from "./LLVMIRParser";
import { FuncBodyContext } from "./LLVMIRParser";
import { BasicBlockContext } from "./LLVMIRParser";
import { InstructionContext } from "./LLVMIRParser";
import { TerminatorContext } from "./LLVMIRParser";
import { LocalDefTermContext } from "./LLVMIRParser";
import { ValueTerminatorContext } from "./LLVMIRParser";
import { RetTermContext } from "./LLVMIRParser";
import { BrTermContext } from "./LLVMIRParser";
import { CondBrTermContext } from "./LLVMIRParser";
import { SwitchTermContext } from "./LLVMIRParser";
import { IndirectBrTermContext } from "./LLVMIRParser";
import { ResumeTermContext } from "./LLVMIRParser";
import { CatchRetTermContext } from "./LLVMIRParser";
import { CleanupRetTermContext } from "./LLVMIRParser";
import { UnreachableTermContext } from "./LLVMIRParser";
import { InvokeTermContext } from "./LLVMIRParser";
import { CallBrTermContext } from "./LLVMIRParser";
import { CatchSwitchTermContext } from "./LLVMIRParser";
import { LabelContext } from "./LLVMIRParser";
import { CaseContext } from "./LLVMIRParser";
import { UnwindTargetContext } from "./LLVMIRParser";
import { HandlersContext } from "./LLVMIRParser";
import { MetadataNodeContext } from "./LLVMIRParser";
import { DiExpressionContext } from "./LLVMIRParser";
import { DiExpressionFieldContext } from "./LLVMIRParser";
import { GlobalFieldContext } from "./LLVMIRParser";
import { SectionContext } from "./LLVMIRParser";
import { ComdatContext } from "./LLVMIRParser";
import { PartitionContext } from "./LLVMIRParser";
import { ConstantContext } from "./LLVMIRParser";
import { BoolConstContext } from "./LLVMIRParser";
import { IntConstContext } from "./LLVMIRParser";
import { FloatConstContext } from "./LLVMIRParser";
import { NullConstContext } from "./LLVMIRParser";
import { NoneConstContext } from "./LLVMIRParser";
import { StructConstContext } from "./LLVMIRParser";
import { ArrayConstContext } from "./LLVMIRParser";
import { VectorConstContext } from "./LLVMIRParser";
import { ZeroInitializerConstContext } from "./LLVMIRParser";
import { UndefConstContext } from "./LLVMIRParser";
import { PoisonConstContext } from "./LLVMIRParser";
import { BlockAddressConstContext } from "./LLVMIRParser";
import { DsoLocalEquivalentConstContext } from "./LLVMIRParser";
import { NoCFIConstContext } from "./LLVMIRParser";
import { ConstantExprContext } from "./LLVMIRParser";
import { TypeConstContext } from "./LLVMIRParser";
import { MetadataAttachmentContext } from "./LLVMIRParser";
import { MdNodeContext } from "./LLVMIRParser";
import { MdTupleContext } from "./LLVMIRParser";
import { MetadataContext } from "./LLVMIRParser";
import { DiArgListContext } from "./LLVMIRParser";
import { TypeValueContext } from "./LLVMIRParser";
import { ValueContext } from "./LLVMIRParser";
import { InlineAsmContext } from "./LLVMIRParser";
import { MdStringContext } from "./LLVMIRParser";
import { MdFieldOrIntContext } from "./LLVMIRParser";
import { DiSPFlagContext } from "./LLVMIRParser";
import { FuncAttributeContext } from "./LLVMIRParser";
import { TypeContext } from "./LLVMIRParser";
import { VoidTypeContext } from "./LLVMIRParser";
import { OpaqueTypeContext } from "./LLVMIRParser";
import { ParamsContext } from "./LLVMIRParser";
import { ParamContext } from "./LLVMIRParser";
import { ParamAttributeContext } from "./LLVMIRParser";
import { AttrStringContext } from "./LLVMIRParser";
import { AttrPairContext } from "./LLVMIRParser";
import { AlignContext } from "./LLVMIRParser";
import { AlignPairContext } from "./LLVMIRParser";
import { AlignStackContext } from "./LLVMIRParser";
import { AlignStackPairContext } from "./LLVMIRParser";
import { AllocKindContext } from "./LLVMIRParser";
import { AllocSizeContext } from "./LLVMIRParser";
import { UnwindTableContext } from "./LLVMIRParser";
import { VectorScaleRangeContext } from "./LLVMIRParser";
import { ByRefAttrContext } from "./LLVMIRParser";
import { ByvalContext } from "./LLVMIRParser";
import { DereferenceableContext } from "./LLVMIRParser";
import { ElementTypeContext } from "./LLVMIRParser";
import { InAllocaContext } from "./LLVMIRParser";
import { ParamAttrContext } from "./LLVMIRParser";
import { PreallocatedContext } from "./LLVMIRParser";
import { StructRetAttrContext } from "./LLVMIRParser";
import { FirstClassTypeContext } from "./LLVMIRParser";
import { ConcreteTypeContext } from "./LLVMIRParser";
import { IntTypeContext } from "./LLVMIRParser";
import { FloatTypeContext } from "./LLVMIRParser";
import { PointerTypeContext } from "./LLVMIRParser";
import { VectorTypeContext } from "./LLVMIRParser";
import { LabelTypeContext } from "./LLVMIRParser";
import { ArrayTypeContext } from "./LLVMIRParser";
import { StructTypeContext } from "./LLVMIRParser";
import { NamedTypeContext } from "./LLVMIRParser";
import { MmxTypeContext } from "./LLVMIRParser";
import { TokenTypeContext } from "./LLVMIRParser";
import { OpaquePointerTypeContext } from "./LLVMIRParser";
import { AddrSpaceContext } from "./LLVMIRParser";
import { ThreadLocalContext } from "./LLVMIRParser";
import { MetadataTypeContext } from "./LLVMIRParser";
import { BitCastExprContext } from "./LLVMIRParser";
import { GetElementPtrExprContext } from "./LLVMIRParser";
import { GepIndexContext } from "./LLVMIRParser";
import { AddrSpaceCastExprContext } from "./LLVMIRParser";
import { IntToPtrExprContext } from "./LLVMIRParser";
import { ICmpExprContext } from "./LLVMIRParser";
import { FCmpExprContext } from "./LLVMIRParser";
import { SelectExprContext } from "./LLVMIRParser";
import { TruncExprContext } from "./LLVMIRParser";
import { ZExtExprContext } from "./LLVMIRParser";
import { SExtExprContext } from "./LLVMIRParser";
import { FpTruncExprContext } from "./LLVMIRParser";
import { FpExtExprContext } from "./LLVMIRParser";
import { FpToUiExprContext } from "./LLVMIRParser";
import { FpToSiExprContext } from "./LLVMIRParser";
import { UiToFpExprContext } from "./LLVMIRParser";
import { SiToFpExprContext } from "./LLVMIRParser";
import { PtrToIntExprContext } from "./LLVMIRParser";
import { ExtractElementExprContext } from "./LLVMIRParser";
import { InsertElementExprContext } from "./LLVMIRParser";
import { ShuffleVectorExprContext } from "./LLVMIRParser";
import { ShlExprContext } from "./LLVMIRParser";
import { LShrExprContext } from "./LLVMIRParser";
import { AShrExprContext } from "./LLVMIRParser";
import { AndExprContext } from "./LLVMIRParser";
import { OrExprContext } from "./LLVMIRParser";
import { XorExprContext } from "./LLVMIRParser";
import { AddExprContext } from "./LLVMIRParser";
import { SubExprContext } from "./LLVMIRParser";
import { MulExprContext } from "./LLVMIRParser";
import { FNegExprContext } from "./LLVMIRParser";
import { LocalDefInstContext } from "./LLVMIRParser";
import { ValueInstructionContext } from "./LLVMIRParser";
import { StoreInstContext } from "./LLVMIRParser";
import { SyncScopeContext } from "./LLVMIRParser";
import { FenceInstContext } from "./LLVMIRParser";
import { FNegInstContext } from "./LLVMIRParser";
import { AddInstContext } from "./LLVMIRParser";
import { FAddInstContext } from "./LLVMIRParser";
import { SubInstContext } from "./LLVMIRParser";
import { FSubInstContext } from "./LLVMIRParser";
import { MulInstContext } from "./LLVMIRParser";
import { FMulInstContext } from "./LLVMIRParser";
import { UDivInstContext } from "./LLVMIRParser";
import { SDivInstContext } from "./LLVMIRParser";
import { FDivInstContext } from "./LLVMIRParser";
import { URemInstContext } from "./LLVMIRParser";
import { SRemInstContext } from "./LLVMIRParser";
import { FRemInstContext } from "./LLVMIRParser";
import { ShlInstContext } from "./LLVMIRParser";
import { LShrInstContext } from "./LLVMIRParser";
import { AShrInstContext } from "./LLVMIRParser";
import { AndInstContext } from "./LLVMIRParser";
import { OrInstContext } from "./LLVMIRParser";
import { XorInstContext } from "./LLVMIRParser";
import { ExtractElementInstContext } from "./LLVMIRParser";
import { InsertElementInstContext } from "./LLVMIRParser";
import { ShuffleVectorInstContext } from "./LLVMIRParser";
import { ExtractValueInstContext } from "./LLVMIRParser";
import { InsertValueInstContext } from "./LLVMIRParser";
import { AllocaInstContext } from "./LLVMIRParser";
import { LoadInstContext } from "./LLVMIRParser";
import { CmpXchgInstContext } from "./LLVMIRParser";
import { AtomicRMWInstContext } from "./LLVMIRParser";
import { GetElementPtrInstContext } from "./LLVMIRParser";
import { TruncInstContext } from "./LLVMIRParser";
import { ZExtInstContext } from "./LLVMIRParser";
import { SExtInstContext } from "./LLVMIRParser";
import { FpTruncInstContext } from "./LLVMIRParser";
import { FpExtInstContext } from "./LLVMIRParser";
import { FpToUiInstContext } from "./LLVMIRParser";
import { FpToSiInstContext } from "./LLVMIRParser";
import { UiToFpInstContext } from "./LLVMIRParser";
import { SiToFpInstContext } from "./LLVMIRParser";
import { PtrToIntInstContext } from "./LLVMIRParser";
import { IntToPtrInstContext } from "./LLVMIRParser";
import { BitCastInstContext } from "./LLVMIRParser";
import { AddrSpaceCastInstContext } from "./LLVMIRParser";
import { ICmpInstContext } from "./LLVMIRParser";
import { FCmpInstContext } from "./LLVMIRParser";
import { PhiInstContext } from "./LLVMIRParser";
import { SelectInstContext } from "./LLVMIRParser";
import { FreezeInstContext } from "./LLVMIRParser";
import { CallInstContext } from "./LLVMIRParser";
import { VaargInstContext } from "./LLVMIRParser";
import { LandingPadInstContext } from "./LLVMIRParser";
import { CatchPadInstContext } from "./LLVMIRParser";
import { CleanupPadInstContext } from "./LLVMIRParser";
import { IncContext } from "./LLVMIRParser";
import { OperandBundleContext } from "./LLVMIRParser";
import { ClauseContext } from "./LLVMIRParser";
import { ArgsContext } from "./LLVMIRParser";
import { ArgContext } from "./LLVMIRParser";
import { ExceptionArgContext } from "./LLVMIRParser";
import { ExceptionPadContext } from "./LLVMIRParser";
import { ExternalLinkageContext } from "./LLVMIRParser";
import { InternalLinkageContext } from "./LLVMIRParser";
import { LinkageContext } from "./LLVMIRParser";
import { PreemptionContext } from "./LLVMIRParser";
import { VisibilityContext } from "./LLVMIRParser";
import { DllStorageClassContext } from "./LLVMIRParser";
import { TlsModelContext } from "./LLVMIRParser";
import { UnnamedAddrContext } from "./LLVMIRParser";
import { ExternallyInitializedContext } from "./LLVMIRParser";
import { ImmutableContext } from "./LLVMIRParser";
import { FuncAttrContext } from "./LLVMIRParser";
import { DistinctContext } from "./LLVMIRParser";
import { InBoundsContext } from "./LLVMIRParser";
import { ReturnAttrContext } from "./LLVMIRParser";
import { OverflowFlagContext } from "./LLVMIRParser";
import { IPredContext } from "./LLVMIRParser";
import { FPredContext } from "./LLVMIRParser";
import { AtomicOrderingContext } from "./LLVMIRParser";
import { CallingConvEnumContext } from "./LLVMIRParser";
import { FastMathFlagContext } from "./LLVMIRParser";
import { AtomicOpContext } from "./LLVMIRParser";
import { FloatKindContext } from "./LLVMIRParser";
import { SpecializedMDNodeContext } from "./LLVMIRParser";
import { DiBasicTypeContext } from "./LLVMIRParser";
import { DiCommonBlockContext } from "./LLVMIRParser";
import { DiCompileUnitContext } from "./LLVMIRParser";
import { DiCompositeTypeContext } from "./LLVMIRParser";
import { DiCompositeTypeFieldContext } from "./LLVMIRParser";
import { DiDerivedTypeContext } from "./LLVMIRParser";
import { DiDerivedTypeFieldContext } from "./LLVMIRParser";
import { DiEnumeratorContext } from "./LLVMIRParser";
import { DiEnumeratorFieldContext } from "./LLVMIRParser";
import { DiFileContext } from "./LLVMIRParser";
import { DiFileFieldContext } from "./LLVMIRParser";
import { DiGlobalVariableContext } from "./LLVMIRParser";
import { DiGlobalVariableFieldContext } from "./LLVMIRParser";
import { DiGlobalVariableExpressionContext } from "./LLVMIRParser";
import { DiGlobalVariableExpressionFieldContext } from "./LLVMIRParser";
import { DiImportedEntityContext } from "./LLVMIRParser";
import { DiImportedEntityFieldContext } from "./LLVMIRParser";
import { DiLabelContext } from "./LLVMIRParser";
import { DiLabelFieldContext } from "./LLVMIRParser";
import { DiLexicalBlockContext } from "./LLVMIRParser";
import { DiLexicalBlockFieldContext } from "./LLVMIRParser";
import { DiLexicalBlockFileContext } from "./LLVMIRParser";
import { DiLexicalBlockFileFieldContext } from "./LLVMIRParser";
import { DiLocalVariableContext } from "./LLVMIRParser";
import { DiLocalVariableFieldContext } from "./LLVMIRParser";
import { DiLocationContext } from "./LLVMIRParser";
import { DiLocationFieldContext } from "./LLVMIRParser";
import { DiMacroContext } from "./LLVMIRParser";
import { DiMacroFieldContext } from "./LLVMIRParser";
import { DiMacroFileContext } from "./LLVMIRParser";
import { DiMacroFileFieldContext } from "./LLVMIRParser";
import { DiModuleContext } from "./LLVMIRParser";
import { DiModuleFieldContext } from "./LLVMIRParser";
import { DiNamespaceContext } from "./LLVMIRParser";
import { DiNamespaceFieldContext } from "./LLVMIRParser";
import { DiObjCPropertyContext } from "./LLVMIRParser";
import { DiObjCPropertyFieldContext } from "./LLVMIRParser";
import { DiStringTypeContext } from "./LLVMIRParser";
import { DiStringTypeFieldContext } from "./LLVMIRParser";
import { DiSubprogramContext } from "./LLVMIRParser";
import { DiSubprogramFieldContext } from "./LLVMIRParser";
import { DiSubrangeContext } from "./LLVMIRParser";
import { DiSubrangeFieldContext } from "./LLVMIRParser";
import { DiSubroutineTypeContext } from "./LLVMIRParser";
import { DiTemplateTypeParameterContext } from "./LLVMIRParser";
import { DiTemplateValueParameterContext } from "./LLVMIRParser";
import { GenericDiNodeContext } from "./LLVMIRParser";
import { DiTemplateTypeParameterFieldContext } from "./LLVMIRParser";
import { DiCompileUnitFieldContext } from "./LLVMIRParser";
import { DiCommonBlockFieldContext } from "./LLVMIRParser";
import { DiBasicTypeFieldContext } from "./LLVMIRParser";
import { GenericDINodeFieldContext } from "./LLVMIRParser";
import { TagFieldContext } from "./LLVMIRParser";
import { HeaderFieldContext } from "./LLVMIRParser";
import { OperandsFieldContext } from "./LLVMIRParser";
import { DiTemplateValueParameterFieldContext } from "./LLVMIRParser";
import { NameFieldContext } from "./LLVMIRParser";
import { TypeFieldContext } from "./LLVMIRParser";
import { DefaultedFieldContext } from "./LLVMIRParser";
import { ValueFieldContext } from "./LLVMIRParser";
import { MdFieldContext } from "./LLVMIRParser";
import { DiSubroutineTypeFieldContext } from "./LLVMIRParser";
import { FlagsFieldContext } from "./LLVMIRParser";
import { DiFlagsContext } from "./LLVMIRParser";
import { CcFieldContext } from "./LLVMIRParser";
import { AlignFieldContext } from "./LLVMIRParser";
import { AllocatedFieldContext } from "./LLVMIRParser";
import { AnnotationsFieldContext } from "./LLVMIRParser";
import { ArgFieldContext } from "./LLVMIRParser";
import { AssociatedFieldContext } from "./LLVMIRParser";
import { AttributesFieldContext } from "./LLVMIRParser";
import { BaseTypeFieldContext } from "./LLVMIRParser";
import { ChecksumFieldContext } from "./LLVMIRParser";
import { ChecksumkindFieldContext } from "./LLVMIRParser";
import { ColumnFieldContext } from "./LLVMIRParser";
import { ConfigMacrosFieldContext } from "./LLVMIRParser";
import { ContainingTypeFieldContext } from "./LLVMIRParser";
import { CountFieldContext } from "./LLVMIRParser";
import { DebugInfoForProfilingFieldContext } from "./LLVMIRParser";
import { DeclarationFieldContext } from "./LLVMIRParser";
import { DirectoryFieldContext } from "./LLVMIRParser";
import { DiscriminatorFieldContext } from "./LLVMIRParser";
import { DataLocationFieldContext } from "./LLVMIRParser";
import { DiscriminatorIntFieldContext } from "./LLVMIRParser";
import { DwarfAddressSpaceFieldContext } from "./LLVMIRParser";
import { DwoIdFieldContext } from "./LLVMIRParser";
import { ElementsFieldContext } from "./LLVMIRParser";
import { EmissionKindFieldContext } from "./LLVMIRParser";
import { EncodingFieldContext } from "./LLVMIRParser";
import { EntityFieldContext } from "./LLVMIRParser";
import { EnumsFieldContext } from "./LLVMIRParser";
import { ExportSymbolsFieldContext } from "./LLVMIRParser";
import { ExprFieldContext } from "./LLVMIRParser";
import { ExtraDataFieldContext } from "./LLVMIRParser";
import { FileFieldContext } from "./LLVMIRParser";
import { FilenameFieldContext } from "./LLVMIRParser";
import { FlagsStringFieldContext } from "./LLVMIRParser";
import { GetterFieldContext } from "./LLVMIRParser";
import { GlobalsFieldContext } from "./LLVMIRParser";
import { IdentifierFieldContext } from "./LLVMIRParser";
import { ImportsFieldContext } from "./LLVMIRParser";
import { IncludePathFieldContext } from "./LLVMIRParser";
import { InlinedAtFieldContext } from "./LLVMIRParser";
import { IsDeclFieldContext } from "./LLVMIRParser";
import { IsDefinitionFieldContext } from "./LLVMIRParser";
import { IsImplicitCodeFieldContext } from "./LLVMIRParser";
import { IsLocalFieldContext } from "./LLVMIRParser";
import { IsOptimizedFieldContext } from "./LLVMIRParser";
import { IsUnsignedFieldContext } from "./LLVMIRParser";
import { ApiNotesFieldContext } from "./LLVMIRParser";
import { LanguageFieldContext } from "./LLVMIRParser";
import { LineFieldContext } from "./LLVMIRParser";
import { LinkageNameFieldContext } from "./LLVMIRParser";
import { LowerBoundFieldContext } from "./LLVMIRParser";
import { MacrosFieldContext } from "./LLVMIRParser";
import { NameTableKindFieldContext } from "./LLVMIRParser";
import { NodesFieldContext } from "./LLVMIRParser";
import { OffsetFieldContext } from "./LLVMIRParser";
import { ProducerFieldContext } from "./LLVMIRParser";
import { RangesBaseAddressFieldContext } from "./LLVMIRParser";
import { RankFieldContext } from "./LLVMIRParser";
import { RetainedNodesFieldContext } from "./LLVMIRParser";
import { RetainedTypesFieldContext } from "./LLVMIRParser";
import { RuntimeLangFieldContext } from "./LLVMIRParser";
import { RuntimeVersionFieldContext } from "./LLVMIRParser";
import { ScopeFieldContext } from "./LLVMIRParser";
import { ScopeLineFieldContext } from "./LLVMIRParser";
import { SdkFieldContext } from "./LLVMIRParser";
import { SetterFieldContext } from "./LLVMIRParser";
import { SizeFieldContext } from "./LLVMIRParser";
import { SourceFieldContext } from "./LLVMIRParser";
import { SpFlagsFieldContext } from "./LLVMIRParser";
import { SplitDebugFilenameFieldContext } from "./LLVMIRParser";
import { SplitDebugInliningFieldContext } from "./LLVMIRParser";
import { StrideFieldContext } from "./LLVMIRParser";
import { StringLengthFieldContext } from "./LLVMIRParser";
import { StringLengthExpressionFieldContext } from "./LLVMIRParser";
import { StringLocationExpressionFieldContext } from "./LLVMIRParser";
import { SysrootFieldContext } from "./LLVMIRParser";
import { TargetFuncNameFieldContext } from "./LLVMIRParser";
import { TemplateParamsFieldContext } from "./LLVMIRParser";
import { ThisAdjustmentFieldContext } from "./LLVMIRParser";
import { ThrownTypesFieldContext } from "./LLVMIRParser";
import { TypeMacinfoFieldContext } from "./LLVMIRParser";
import { TypesFieldContext } from "./LLVMIRParser";
import { UnitFieldContext } from "./LLVMIRParser";
import { UpperBoundFieldContext } from "./LLVMIRParser";
import { ValueIntFieldContext } from "./LLVMIRParser";
import { ValueStringFieldContext } from "./LLVMIRParser";
import { VarFieldContext } from "./LLVMIRParser";
import { VirtualIndexFieldContext } from "./LLVMIRParser";
import { VirtualityFieldContext } from "./LLVMIRParser";
import { VtableHolderFieldContext } from "./LLVMIRParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LLVMIRParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface LLVMIRVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `LLVMIRParser.compilationUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompilationUnit?: (ctx: CompilationUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.targetDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTargetDef?: (ctx: TargetDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sourceFilename`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceFilename?: (ctx: SourceFilenameContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.targetDataLayout`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTargetDataLayout?: (ctx: TargetDataLayoutContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.targetTriple`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTargetTriple?: (ctx: TargetTripleContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.topLevelEntity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopLevelEntity?: (ctx: TopLevelEntityContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.moduleAsm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModuleAsm?: (ctx: ModuleAsmContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typeDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeDef?: (ctx: TypeDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.comdatDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComdatDef?: (ctx: ComdatDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.globalDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalDecl?: (ctx: GlobalDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.globalDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalDef?: (ctx: GlobalDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.indirectSymbolDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirectSymbolDef?: (ctx: IndirectSymbolDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncDecl?: (ctx: FuncDeclContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncDef?: (ctx: FuncDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.attrGroupDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttrGroupDef?: (ctx: AttrGroupDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.namedMetadataDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedMetadataDef?: (ctx: NamedMetadataDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.metadataDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadataDef?: (ctx: MetadataDefContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.useListOrder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUseListOrder?: (ctx: UseListOrderContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.useListOrderBB`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUseListOrderBB?: (ctx: UseListOrderBBContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcHeader`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncHeader?: (ctx: FuncHeaderContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.indirectSymbol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirectSymbol?: (ctx: IndirectSymbolContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.callingConv`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallingConv?: (ctx: CallingConvContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.callingConvInt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallingConvInt?: (ctx: CallingConvIntContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcHdrField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncHdrField?: (ctx: FuncHdrFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.gc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGc?: (ctx: GcContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.prefix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrefix?: (ctx: PrefixContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.prologue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrologue?: (ctx: PrologueContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.personality`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPersonality?: (ctx: PersonalityContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.returnAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnAttribute?: (ctx: ReturnAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncBody?: (ctx: FuncBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.basicBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBasicBlock?: (ctx: BasicBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.instruction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstruction?: (ctx: InstructionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.terminator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminator?: (ctx: TerminatorContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.localDefTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalDefTerm?: (ctx: LocalDefTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.valueTerminator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueTerminator?: (ctx: ValueTerminatorContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.retTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetTerm?: (ctx: RetTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.brTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBrTerm?: (ctx: BrTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.condBrTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondBrTerm?: (ctx: CondBrTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.switchTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchTerm?: (ctx: SwitchTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.indirectBrTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndirectBrTerm?: (ctx: IndirectBrTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.resumeTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResumeTerm?: (ctx: ResumeTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.catchRetTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCatchRetTerm?: (ctx: CatchRetTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.cleanupRetTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCleanupRetTerm?: (ctx: CleanupRetTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.unreachableTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnreachableTerm?: (ctx: UnreachableTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.invokeTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvokeTerm?: (ctx: InvokeTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.callBrTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallBrTerm?: (ctx: CallBrTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.catchSwitchTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCatchSwitchTerm?: (ctx: CatchSwitchTermContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.label`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabel?: (ctx: LabelContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.case`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCase?: (ctx: CaseContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.unwindTarget`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnwindTarget?: (ctx: UnwindTargetContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.handlers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHandlers?: (ctx: HandlersContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.metadataNode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadataNode?: (ctx: MetadataNodeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiExpression?: (ctx: DiExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diExpressionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiExpressionField?: (ctx: DiExpressionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.globalField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalField?: (ctx: GlobalFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSection?: (ctx: SectionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.comdat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComdat?: (ctx: ComdatContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.partition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartition?: (ctx: PartitionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.boolConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolConst?: (ctx: BoolConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.intConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntConst?: (ctx: IntConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.floatConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatConst?: (ctx: FloatConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.nullConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullConst?: (ctx: NullConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.noneConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNoneConst?: (ctx: NoneConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.structConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructConst?: (ctx: StructConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.arrayConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayConst?: (ctx: ArrayConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.vectorConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVectorConst?: (ctx: VectorConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.zeroInitializerConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZeroInitializerConst?: (ctx: ZeroInitializerConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.undefConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUndefConst?: (ctx: UndefConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.poisonConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPoisonConst?: (ctx: PoisonConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.blockAddressConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockAddressConst?: (ctx: BlockAddressConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dsoLocalEquivalentConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDsoLocalEquivalentConst?: (ctx: DsoLocalEquivalentConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.noCFIConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNoCFIConst?: (ctx: NoCFIConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.constantExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstantExpr?: (ctx: ConstantExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typeConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeConst?: (ctx: TypeConstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.metadataAttachment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadataAttachment?: (ctx: MetadataAttachmentContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mdNode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMdNode?: (ctx: MdNodeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mdTuple`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMdTuple?: (ctx: MdTupleContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.metadata`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadata?: (ctx: MetadataContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diArgList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiArgList?: (ctx: DiArgListContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typeValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeValue?: (ctx: TypeValueContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.inlineAsm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInlineAsm?: (ctx: InlineAsmContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mdString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMdString?: (ctx: MdStringContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mdFieldOrInt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMdFieldOrInt?: (ctx: MdFieldOrIntContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSPFlag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSPFlag?: (ctx: DiSPFlagContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncAttribute?: (ctx: FuncAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.voidType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVoidType?: (ctx: VoidTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.opaqueType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaqueType?: (ctx: OpaqueTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParams?: (ctx: ParamsContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam?: (ctx: ParamContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.paramAttribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamAttribute?: (ctx: ParamAttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.attrString`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttrString?: (ctx: AttrStringContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.attrPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttrPair?: (ctx: AttrPairContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.align`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlign?: (ctx: AlignContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.alignPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlignPair?: (ctx: AlignPairContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.alignStack`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlignStack?: (ctx: AlignStackContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.alignStackPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlignStackPair?: (ctx: AlignStackPairContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.allocKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAllocKind?: (ctx: AllocKindContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.allocSize`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAllocSize?: (ctx: AllocSizeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.unwindTable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnwindTable?: (ctx: UnwindTableContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.vectorScaleRange`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVectorScaleRange?: (ctx: VectorScaleRangeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.byRefAttr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitByRefAttr?: (ctx: ByRefAttrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.byval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitByval?: (ctx: ByvalContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dereferenceable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDereferenceable?: (ctx: DereferenceableContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.elementType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementType?: (ctx: ElementTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.inAlloca`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInAlloca?: (ctx: InAllocaContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.paramAttr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamAttr?: (ctx: ParamAttrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.preallocated`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreallocated?: (ctx: PreallocatedContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.structRetAttr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructRetAttr?: (ctx: StructRetAttrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.firstClassType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFirstClassType?: (ctx: FirstClassTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.concreteType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcreteType?: (ctx: ConcreteTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.intType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntType?: (ctx: IntTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.floatType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatType?: (ctx: FloatTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.pointerType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPointerType?: (ctx: PointerTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.vectorType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVectorType?: (ctx: VectorTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.labelType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabelType?: (ctx: LabelTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.arrayType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayType?: (ctx: ArrayTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.structType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructType?: (ctx: StructTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.namedType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedType?: (ctx: NamedTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mmxType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMmxType?: (ctx: MmxTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.tokenType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTokenType?: (ctx: TokenTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.opaquePointerType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOpaquePointerType?: (ctx: OpaquePointerTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.addrSpace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddrSpace?: (ctx: AddrSpaceContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.threadLocal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThreadLocal?: (ctx: ThreadLocalContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.metadataType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadataType?: (ctx: MetadataTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.bitCastExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitCastExpr?: (ctx: BitCastExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.getElementPtrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGetElementPtrExpr?: (ctx: GetElementPtrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.gepIndex`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGepIndex?: (ctx: GepIndexContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.addrSpaceCastExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddrSpaceCastExpr?: (ctx: AddrSpaceCastExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.intToPtrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntToPtrExpr?: (ctx: IntToPtrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.iCmpExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitICmpExpr?: (ctx: ICmpExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fCmpExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFCmpExpr?: (ctx: FCmpExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.selectExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectExpr?: (ctx: SelectExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.truncExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTruncExpr?: (ctx: TruncExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.zExtExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZExtExpr?: (ctx: ZExtExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sExtExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSExtExpr?: (ctx: SExtExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpTruncExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpTruncExpr?: (ctx: FpTruncExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpExtExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpExtExpr?: (ctx: FpExtExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpToUiExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpToUiExpr?: (ctx: FpToUiExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpToSiExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpToSiExpr?: (ctx: FpToSiExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.uiToFpExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUiToFpExpr?: (ctx: UiToFpExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.siToFpExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSiToFpExpr?: (ctx: SiToFpExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.ptrToIntExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrToIntExpr?: (ctx: PtrToIntExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.extractElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtractElementExpr?: (ctx: ExtractElementExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.insertElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertElementExpr?: (ctx: InsertElementExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.shuffleVectorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShuffleVectorExpr?: (ctx: ShuffleVectorExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.shlExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShlExpr?: (ctx: ShlExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.lShrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLShrExpr?: (ctx: LShrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.aShrExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAShrExpr?: (ctx: AShrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.andExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpr?: (ctx: AndExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.orExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpr?: (ctx: OrExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.xorExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitXorExpr?: (ctx: XorExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.addExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddExpr?: (ctx: AddExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.subExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubExpr?: (ctx: SubExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mulExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulExpr?: (ctx: MulExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fNegExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFNegExpr?: (ctx: FNegExprContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.localDefInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalDefInst?: (ctx: LocalDefInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.valueInstruction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueInstruction?: (ctx: ValueInstructionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.storeInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoreInst?: (ctx: StoreInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.syncScope`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSyncScope?: (ctx: SyncScopeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fenceInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFenceInst?: (ctx: FenceInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fNegInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFNegInst?: (ctx: FNegInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.addInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddInst?: (ctx: AddInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fAddInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFAddInst?: (ctx: FAddInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.subInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubInst?: (ctx: SubInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fSubInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFSubInst?: (ctx: FSubInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mulInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMulInst?: (ctx: MulInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fMulInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFMulInst?: (ctx: FMulInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.uDivInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUDivInst?: (ctx: UDivInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sDivInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSDivInst?: (ctx: SDivInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fDivInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFDivInst?: (ctx: FDivInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.uRemInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitURemInst?: (ctx: URemInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sRemInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSRemInst?: (ctx: SRemInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fRemInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFRemInst?: (ctx: FRemInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.shlInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShlInst?: (ctx: ShlInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.lShrInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLShrInst?: (ctx: LShrInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.aShrInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAShrInst?: (ctx: AShrInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.andInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndInst?: (ctx: AndInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.orInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrInst?: (ctx: OrInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.xorInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitXorInst?: (ctx: XorInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.extractElementInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtractElementInst?: (ctx: ExtractElementInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.insertElementInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertElementInst?: (ctx: InsertElementInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.shuffleVectorInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShuffleVectorInst?: (ctx: ShuffleVectorInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.extractValueInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtractValueInst?: (ctx: ExtractValueInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.insertValueInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertValueInst?: (ctx: InsertValueInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.allocaInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAllocaInst?: (ctx: AllocaInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.loadInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoadInst?: (ctx: LoadInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.cmpXchgInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCmpXchgInst?: (ctx: CmpXchgInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.atomicRMWInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicRMWInst?: (ctx: AtomicRMWInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.getElementPtrInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGetElementPtrInst?: (ctx: GetElementPtrInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.truncInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTruncInst?: (ctx: TruncInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.zExtInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitZExtInst?: (ctx: ZExtInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sExtInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSExtInst?: (ctx: SExtInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpTruncInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpTruncInst?: (ctx: FpTruncInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpExtInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpExtInst?: (ctx: FpExtInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpToUiInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpToUiInst?: (ctx: FpToUiInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fpToSiInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpToSiInst?: (ctx: FpToSiInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.uiToFpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUiToFpInst?: (ctx: UiToFpInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.siToFpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSiToFpInst?: (ctx: SiToFpInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.ptrToIntInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPtrToIntInst?: (ctx: PtrToIntInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.intToPtrInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntToPtrInst?: (ctx: IntToPtrInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.bitCastInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBitCastInst?: (ctx: BitCastInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.addrSpaceCastInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddrSpaceCastInst?: (ctx: AddrSpaceCastInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.iCmpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitICmpInst?: (ctx: ICmpInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fCmpInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFCmpInst?: (ctx: FCmpInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.phiInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPhiInst?: (ctx: PhiInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.selectInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectInst?: (ctx: SelectInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.freezeInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFreezeInst?: (ctx: FreezeInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.callInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallInst?: (ctx: CallInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.vaargInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVaargInst?: (ctx: VaargInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.landingPadInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLandingPadInst?: (ctx: LandingPadInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.catchPadInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCatchPadInst?: (ctx: CatchPadInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.cleanupPadInst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCleanupPadInst?: (ctx: CleanupPadInstContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.inc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInc?: (ctx: IncContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.operandBundle`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperandBundle?: (ctx: OperandBundleContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClause?: (ctx: ClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.args`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgs?: (ctx: ArgsContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArg?: (ctx: ArgContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.exceptionArg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExceptionArg?: (ctx: ExceptionArgContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.exceptionPad`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExceptionPad?: (ctx: ExceptionPadContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.externalLinkage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalLinkage?: (ctx: ExternalLinkageContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.internalLinkage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInternalLinkage?: (ctx: InternalLinkageContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.linkage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLinkage?: (ctx: LinkageContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.preemption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPreemption?: (ctx: PreemptionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.visibility`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVisibility?: (ctx: VisibilityContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dllStorageClass`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDllStorageClass?: (ctx: DllStorageClassContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.tlsModel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTlsModel?: (ctx: TlsModelContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.unnamedAddr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnnamedAddr?: (ctx: UnnamedAddrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.externallyInitialized`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternallyInitialized?: (ctx: ExternallyInitializedContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.immutable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImmutable?: (ctx: ImmutableContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.funcAttr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFuncAttr?: (ctx: FuncAttrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.distinct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDistinct?: (ctx: DistinctContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.inBounds`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInBounds?: (ctx: InBoundsContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.returnAttr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnAttr?: (ctx: ReturnAttrContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.overflowFlag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverflowFlag?: (ctx: OverflowFlagContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.iPred`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIPred?: (ctx: IPredContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fPred`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFPred?: (ctx: FPredContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.atomicOrdering`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicOrdering?: (ctx: AtomicOrderingContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.callingConvEnum`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallingConvEnum?: (ctx: CallingConvEnumContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fastMathFlag`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFastMathFlag?: (ctx: FastMathFlagContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.atomicOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomicOp?: (ctx: AtomicOpContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.floatKind`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatKind?: (ctx: FloatKindContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.specializedMDNode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecializedMDNode?: (ctx: SpecializedMDNodeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diBasicType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiBasicType?: (ctx: DiBasicTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCommonBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCommonBlock?: (ctx: DiCommonBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCompileUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCompileUnit?: (ctx: DiCompileUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCompositeType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCompositeType?: (ctx: DiCompositeTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCompositeTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCompositeTypeField?: (ctx: DiCompositeTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diDerivedType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiDerivedType?: (ctx: DiDerivedTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diDerivedTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiDerivedTypeField?: (ctx: DiDerivedTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diEnumerator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiEnumerator?: (ctx: DiEnumeratorContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diEnumeratorField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiEnumeratorField?: (ctx: DiEnumeratorFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diFile`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiFile?: (ctx: DiFileContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diFileField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiFileField?: (ctx: DiFileFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diGlobalVariable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiGlobalVariable?: (ctx: DiGlobalVariableContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diGlobalVariableField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiGlobalVariableField?: (ctx: DiGlobalVariableFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diGlobalVariableExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiGlobalVariableExpression?: (ctx: DiGlobalVariableExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diGlobalVariableExpressionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiGlobalVariableExpressionField?: (ctx: DiGlobalVariableExpressionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diImportedEntity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiImportedEntity?: (ctx: DiImportedEntityContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diImportedEntityField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiImportedEntityField?: (ctx: DiImportedEntityFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLabel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLabel?: (ctx: DiLabelContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLabelField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLabelField?: (ctx: DiLabelFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLexicalBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLexicalBlock?: (ctx: DiLexicalBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLexicalBlockField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLexicalBlockField?: (ctx: DiLexicalBlockFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLexicalBlockFile`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLexicalBlockFile?: (ctx: DiLexicalBlockFileContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLexicalBlockFileField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLexicalBlockFileField?: (ctx: DiLexicalBlockFileFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLocalVariable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLocalVariable?: (ctx: DiLocalVariableContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLocalVariableField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLocalVariableField?: (ctx: DiLocalVariableFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLocation?: (ctx: DiLocationContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diLocationField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiLocationField?: (ctx: DiLocationFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diMacro`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiMacro?: (ctx: DiMacroContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diMacroField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiMacroField?: (ctx: DiMacroFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diMacroFile`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiMacroFile?: (ctx: DiMacroFileContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diMacroFileField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiMacroFileField?: (ctx: DiMacroFileFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diModule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiModule?: (ctx: DiModuleContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diModuleField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiModuleField?: (ctx: DiModuleFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diNamespace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiNamespace?: (ctx: DiNamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diNamespaceField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiNamespaceField?: (ctx: DiNamespaceFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diObjCProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiObjCProperty?: (ctx: DiObjCPropertyContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diObjCPropertyField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiObjCPropertyField?: (ctx: DiObjCPropertyFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diStringType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiStringType?: (ctx: DiStringTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diStringTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiStringTypeField?: (ctx: DiStringTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubprogram`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubprogram?: (ctx: DiSubprogramContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubprogramField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubprogramField?: (ctx: DiSubprogramFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubrange`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubrange?: (ctx: DiSubrangeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubrangeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubrangeField?: (ctx: DiSubrangeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubroutineType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubroutineType?: (ctx: DiSubroutineTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diTemplateTypeParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiTemplateTypeParameter?: (ctx: DiTemplateTypeParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diTemplateValueParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiTemplateValueParameter?: (ctx: DiTemplateValueParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.genericDiNode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericDiNode?: (ctx: GenericDiNodeContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diTemplateTypeParameterField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiTemplateTypeParameterField?: (ctx: DiTemplateTypeParameterFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCompileUnitField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCompileUnitField?: (ctx: DiCompileUnitFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diCommonBlockField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiCommonBlockField?: (ctx: DiCommonBlockFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diBasicTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiBasicTypeField?: (ctx: DiBasicTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.genericDINodeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericDINodeField?: (ctx: GenericDINodeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.tagField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTagField?: (ctx: TagFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.headerField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHeaderField?: (ctx: HeaderFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.operandsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperandsField?: (ctx: OperandsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diTemplateValueParameterField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiTemplateValueParameterField?: (ctx: DiTemplateValueParameterFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.nameField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNameField?: (ctx: NameFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeField?: (ctx: TypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.defaultedField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultedField?: (ctx: DefaultedFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.valueField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueField?: (ctx: ValueFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.mdField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMdField?: (ctx: MdFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diSubroutineTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiSubroutineTypeField?: (ctx: DiSubroutineTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.flagsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlagsField?: (ctx: FlagsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.diFlags`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiFlags?: (ctx: DiFlagsContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.ccField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCcField?: (ctx: CcFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.alignField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlignField?: (ctx: AlignFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.allocatedField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAllocatedField?: (ctx: AllocatedFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.annotationsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationsField?: (ctx: AnnotationsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.argField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgField?: (ctx: ArgFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.associatedField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssociatedField?: (ctx: AssociatedFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.attributesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttributesField?: (ctx: AttributesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.baseTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBaseTypeField?: (ctx: BaseTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.checksumField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecksumField?: (ctx: ChecksumFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.checksumkindField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChecksumkindField?: (ctx: ChecksumkindFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.columnField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnField?: (ctx: ColumnFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.configMacrosField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConfigMacrosField?: (ctx: ConfigMacrosFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.containingTypeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContainingTypeField?: (ctx: ContainingTypeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.countField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCountField?: (ctx: CountFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.debugInfoForProfilingField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDebugInfoForProfilingField?: (ctx: DebugInfoForProfilingFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.declarationField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationField?: (ctx: DeclarationFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.directoryField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirectoryField?: (ctx: DirectoryFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.discriminatorField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiscriminatorField?: (ctx: DiscriminatorFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dataLocationField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataLocationField?: (ctx: DataLocationFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.discriminatorIntField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDiscriminatorIntField?: (ctx: DiscriminatorIntFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dwarfAddressSpaceField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDwarfAddressSpaceField?: (ctx: DwarfAddressSpaceFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.dwoIdField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDwoIdField?: (ctx: DwoIdFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.elementsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementsField?: (ctx: ElementsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.emissionKindField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmissionKindField?: (ctx: EmissionKindFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.encodingField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEncodingField?: (ctx: EncodingFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.entityField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntityField?: (ctx: EntityFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.enumsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumsField?: (ctx: EnumsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.exportSymbolsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportSymbolsField?: (ctx: ExportSymbolsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.exprField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprField?: (ctx: ExprFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.extraDataField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtraDataField?: (ctx: ExtraDataFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.fileField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFileField?: (ctx: FileFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.filenameField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilenameField?: (ctx: FilenameFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.flagsStringField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFlagsStringField?: (ctx: FlagsStringFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.getterField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGetterField?: (ctx: GetterFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.globalsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalsField?: (ctx: GlobalsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.identifierField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierField?: (ctx: IdentifierFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.importsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportsField?: (ctx: ImportsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.includePathField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludePathField?: (ctx: IncludePathFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.inlinedAtField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInlinedAtField?: (ctx: InlinedAtFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isDeclField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsDeclField?: (ctx: IsDeclFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isDefinitionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsDefinitionField?: (ctx: IsDefinitionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isImplicitCodeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsImplicitCodeField?: (ctx: IsImplicitCodeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isLocalField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsLocalField?: (ctx: IsLocalFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isOptimizedField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsOptimizedField?: (ctx: IsOptimizedFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.isUnsignedField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsUnsignedField?: (ctx: IsUnsignedFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.apiNotesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitApiNotesField?: (ctx: ApiNotesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.languageField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLanguageField?: (ctx: LanguageFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.lineField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLineField?: (ctx: LineFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.linkageNameField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLinkageNameField?: (ctx: LinkageNameFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.lowerBoundField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLowerBoundField?: (ctx: LowerBoundFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.macrosField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacrosField?: (ctx: MacrosFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.nameTableKindField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNameTableKindField?: (ctx: NameTableKindFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.nodesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNodesField?: (ctx: NodesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.offsetField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOffsetField?: (ctx: OffsetFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.producerField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProducerField?: (ctx: ProducerFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.rangesBaseAddressField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangesBaseAddressField?: (ctx: RangesBaseAddressFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.rankField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRankField?: (ctx: RankFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.retainedNodesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetainedNodesField?: (ctx: RetainedNodesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.retainedTypesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetainedTypesField?: (ctx: RetainedTypesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.runtimeLangField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuntimeLangField?: (ctx: RuntimeLangFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.runtimeVersionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuntimeVersionField?: (ctx: RuntimeVersionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.scopeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScopeField?: (ctx: ScopeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.scopeLineField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScopeLineField?: (ctx: ScopeLineFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sdkField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSdkField?: (ctx: SdkFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.setterField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetterField?: (ctx: SetterFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sizeField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSizeField?: (ctx: SizeFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sourceField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceField?: (ctx: SourceFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.spFlagsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpFlagsField?: (ctx: SpFlagsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.splitDebugFilenameField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSplitDebugFilenameField?: (ctx: SplitDebugFilenameFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.splitDebugInliningField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSplitDebugInliningField?: (ctx: SplitDebugInliningFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.strideField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrideField?: (ctx: StrideFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.stringLengthField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLengthField?: (ctx: StringLengthFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.stringLengthExpressionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLengthExpressionField?: (ctx: StringLengthExpressionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.stringLocationExpressionField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLocationExpressionField?: (ctx: StringLocationExpressionFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.sysrootField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSysrootField?: (ctx: SysrootFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.targetFuncNameField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTargetFuncNameField?: (ctx: TargetFuncNameFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.templateParamsField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemplateParamsField?: (ctx: TemplateParamsFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.thisAdjustmentField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThisAdjustmentField?: (ctx: ThisAdjustmentFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.thrownTypesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrownTypesField?: (ctx: ThrownTypesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typeMacinfoField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeMacinfoField?: (ctx: TypeMacinfoFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.typesField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypesField?: (ctx: TypesFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.unitField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnitField?: (ctx: UnitFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.upperBoundField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpperBoundField?: (ctx: UpperBoundFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.valueIntField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueIntField?: (ctx: ValueIntFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.valueStringField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueStringField?: (ctx: ValueStringFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.varField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarField?: (ctx: VarFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.virtualIndexField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVirtualIndexField?: (ctx: VirtualIndexFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.virtualityField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVirtualityField?: (ctx: VirtualityFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `LLVMIRParser.vtableHolderField`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVtableHolderField?: (ctx: VtableHolderFieldContext) => Result;
}

