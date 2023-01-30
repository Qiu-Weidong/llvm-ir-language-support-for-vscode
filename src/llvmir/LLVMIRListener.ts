// Generated from src/llvmir/LLVMIR.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `LLVMIRParser`.
 */
export interface LLVMIRListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `LLVMIRParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	exitCompilationUnit?: (ctx: CompilationUnitContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.targetDef`.
	 * @param ctx the parse tree
	 */
	enterTargetDef?: (ctx: TargetDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.targetDef`.
	 * @param ctx the parse tree
	 */
	exitTargetDef?: (ctx: TargetDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sourceFilename`.
	 * @param ctx the parse tree
	 */
	enterSourceFilename?: (ctx: SourceFilenameContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sourceFilename`.
	 * @param ctx the parse tree
	 */
	exitSourceFilename?: (ctx: SourceFilenameContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.targetDataLayout`.
	 * @param ctx the parse tree
	 */
	enterTargetDataLayout?: (ctx: TargetDataLayoutContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.targetDataLayout`.
	 * @param ctx the parse tree
	 */
	exitTargetDataLayout?: (ctx: TargetDataLayoutContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.targetTriple`.
	 * @param ctx the parse tree
	 */
	enterTargetTriple?: (ctx: TargetTripleContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.targetTriple`.
	 * @param ctx the parse tree
	 */
	exitTargetTriple?: (ctx: TargetTripleContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.topLevelEntity`.
	 * @param ctx the parse tree
	 */
	enterTopLevelEntity?: (ctx: TopLevelEntityContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.topLevelEntity`.
	 * @param ctx the parse tree
	 */
	exitTopLevelEntity?: (ctx: TopLevelEntityContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.moduleAsm`.
	 * @param ctx the parse tree
	 */
	enterModuleAsm?: (ctx: ModuleAsmContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.moduleAsm`.
	 * @param ctx the parse tree
	 */
	exitModuleAsm?: (ctx: ModuleAsmContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typeDef`.
	 * @param ctx the parse tree
	 */
	enterTypeDef?: (ctx: TypeDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typeDef`.
	 * @param ctx the parse tree
	 */
	exitTypeDef?: (ctx: TypeDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.comdatDef`.
	 * @param ctx the parse tree
	 */
	enterComdatDef?: (ctx: ComdatDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.comdatDef`.
	 * @param ctx the parse tree
	 */
	exitComdatDef?: (ctx: ComdatDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	enterGlobalDecl?: (ctx: GlobalDeclContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	exitGlobalDecl?: (ctx: GlobalDeclContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.globalDef`.
	 * @param ctx the parse tree
	 */
	enterGlobalDef?: (ctx: GlobalDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.globalDef`.
	 * @param ctx the parse tree
	 */
	exitGlobalDef?: (ctx: GlobalDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.indirectSymbolDef`.
	 * @param ctx the parse tree
	 */
	enterIndirectSymbolDef?: (ctx: IndirectSymbolDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.indirectSymbolDef`.
	 * @param ctx the parse tree
	 */
	exitIndirectSymbolDef?: (ctx: IndirectSymbolDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	enterFuncDecl?: (ctx: FuncDeclContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	exitFuncDecl?: (ctx: FuncDeclContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcDef`.
	 * @param ctx the parse tree
	 */
	enterFuncDef?: (ctx: FuncDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcDef`.
	 * @param ctx the parse tree
	 */
	exitFuncDef?: (ctx: FuncDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.attrGroupDef`.
	 * @param ctx the parse tree
	 */
	enterAttrGroupDef?: (ctx: AttrGroupDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.attrGroupDef`.
	 * @param ctx the parse tree
	 */
	exitAttrGroupDef?: (ctx: AttrGroupDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.namedMetadataDef`.
	 * @param ctx the parse tree
	 */
	enterNamedMetadataDef?: (ctx: NamedMetadataDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.namedMetadataDef`.
	 * @param ctx the parse tree
	 */
	exitNamedMetadataDef?: (ctx: NamedMetadataDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.metadataDef`.
	 * @param ctx the parse tree
	 */
	enterMetadataDef?: (ctx: MetadataDefContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.metadataDef`.
	 * @param ctx the parse tree
	 */
	exitMetadataDef?: (ctx: MetadataDefContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.useListOrder`.
	 * @param ctx the parse tree
	 */
	enterUseListOrder?: (ctx: UseListOrderContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.useListOrder`.
	 * @param ctx the parse tree
	 */
	exitUseListOrder?: (ctx: UseListOrderContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.useListOrderBB`.
	 * @param ctx the parse tree
	 */
	enterUseListOrderBB?: (ctx: UseListOrderBBContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.useListOrderBB`.
	 * @param ctx the parse tree
	 */
	exitUseListOrderBB?: (ctx: UseListOrderBBContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcHeader`.
	 * @param ctx the parse tree
	 */
	enterFuncHeader?: (ctx: FuncHeaderContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcHeader`.
	 * @param ctx the parse tree
	 */
	exitFuncHeader?: (ctx: FuncHeaderContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.indirectSymbol`.
	 * @param ctx the parse tree
	 */
	enterIndirectSymbol?: (ctx: IndirectSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.indirectSymbol`.
	 * @param ctx the parse tree
	 */
	exitIndirectSymbol?: (ctx: IndirectSymbolContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.callingConv`.
	 * @param ctx the parse tree
	 */
	enterCallingConv?: (ctx: CallingConvContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.callingConv`.
	 * @param ctx the parse tree
	 */
	exitCallingConv?: (ctx: CallingConvContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.callingConvInt`.
	 * @param ctx the parse tree
	 */
	enterCallingConvInt?: (ctx: CallingConvIntContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.callingConvInt`.
	 * @param ctx the parse tree
	 */
	exitCallingConvInt?: (ctx: CallingConvIntContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcHdrField`.
	 * @param ctx the parse tree
	 */
	enterFuncHdrField?: (ctx: FuncHdrFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcHdrField`.
	 * @param ctx the parse tree
	 */
	exitFuncHdrField?: (ctx: FuncHdrFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.gc`.
	 * @param ctx the parse tree
	 */
	enterGc?: (ctx: GcContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.gc`.
	 * @param ctx the parse tree
	 */
	exitGc?: (ctx: GcContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.prefix`.
	 * @param ctx the parse tree
	 */
	enterPrefix?: (ctx: PrefixContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.prefix`.
	 * @param ctx the parse tree
	 */
	exitPrefix?: (ctx: PrefixContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.prologue`.
	 * @param ctx the parse tree
	 */
	enterPrologue?: (ctx: PrologueContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.prologue`.
	 * @param ctx the parse tree
	 */
	exitPrologue?: (ctx: PrologueContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.personality`.
	 * @param ctx the parse tree
	 */
	enterPersonality?: (ctx: PersonalityContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.personality`.
	 * @param ctx the parse tree
	 */
	exitPersonality?: (ctx: PersonalityContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.returnAttribute`.
	 * @param ctx the parse tree
	 */
	enterReturnAttribute?: (ctx: ReturnAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.returnAttribute`.
	 * @param ctx the parse tree
	 */
	exitReturnAttribute?: (ctx: ReturnAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcBody`.
	 * @param ctx the parse tree
	 */
	enterFuncBody?: (ctx: FuncBodyContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcBody`.
	 * @param ctx the parse tree
	 */
	exitFuncBody?: (ctx: FuncBodyContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.basicBlock`.
	 * @param ctx the parse tree
	 */
	enterBasicBlock?: (ctx: BasicBlockContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.basicBlock`.
	 * @param ctx the parse tree
	 */
	exitBasicBlock?: (ctx: BasicBlockContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.instruction`.
	 * @param ctx the parse tree
	 */
	enterInstruction?: (ctx: InstructionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.instruction`.
	 * @param ctx the parse tree
	 */
	exitInstruction?: (ctx: InstructionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.terminator`.
	 * @param ctx the parse tree
	 */
	enterTerminator?: (ctx: TerminatorContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.terminator`.
	 * @param ctx the parse tree
	 */
	exitTerminator?: (ctx: TerminatorContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.localDefTerm`.
	 * @param ctx the parse tree
	 */
	enterLocalDefTerm?: (ctx: LocalDefTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.localDefTerm`.
	 * @param ctx the parse tree
	 */
	exitLocalDefTerm?: (ctx: LocalDefTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.valueTerminator`.
	 * @param ctx the parse tree
	 */
	enterValueTerminator?: (ctx: ValueTerminatorContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.valueTerminator`.
	 * @param ctx the parse tree
	 */
	exitValueTerminator?: (ctx: ValueTerminatorContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.retTerm`.
	 * @param ctx the parse tree
	 */
	enterRetTerm?: (ctx: RetTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.retTerm`.
	 * @param ctx the parse tree
	 */
	exitRetTerm?: (ctx: RetTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.brTerm`.
	 * @param ctx the parse tree
	 */
	enterBrTerm?: (ctx: BrTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.brTerm`.
	 * @param ctx the parse tree
	 */
	exitBrTerm?: (ctx: BrTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.condBrTerm`.
	 * @param ctx the parse tree
	 */
	enterCondBrTerm?: (ctx: CondBrTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.condBrTerm`.
	 * @param ctx the parse tree
	 */
	exitCondBrTerm?: (ctx: CondBrTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.switchTerm`.
	 * @param ctx the parse tree
	 */
	enterSwitchTerm?: (ctx: SwitchTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.switchTerm`.
	 * @param ctx the parse tree
	 */
	exitSwitchTerm?: (ctx: SwitchTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.indirectBrTerm`.
	 * @param ctx the parse tree
	 */
	enterIndirectBrTerm?: (ctx: IndirectBrTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.indirectBrTerm`.
	 * @param ctx the parse tree
	 */
	exitIndirectBrTerm?: (ctx: IndirectBrTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.resumeTerm`.
	 * @param ctx the parse tree
	 */
	enterResumeTerm?: (ctx: ResumeTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.resumeTerm`.
	 * @param ctx the parse tree
	 */
	exitResumeTerm?: (ctx: ResumeTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.catchRetTerm`.
	 * @param ctx the parse tree
	 */
	enterCatchRetTerm?: (ctx: CatchRetTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.catchRetTerm`.
	 * @param ctx the parse tree
	 */
	exitCatchRetTerm?: (ctx: CatchRetTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.cleanupRetTerm`.
	 * @param ctx the parse tree
	 */
	enterCleanupRetTerm?: (ctx: CleanupRetTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.cleanupRetTerm`.
	 * @param ctx the parse tree
	 */
	exitCleanupRetTerm?: (ctx: CleanupRetTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.unreachableTerm`.
	 * @param ctx the parse tree
	 */
	enterUnreachableTerm?: (ctx: UnreachableTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.unreachableTerm`.
	 * @param ctx the parse tree
	 */
	exitUnreachableTerm?: (ctx: UnreachableTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.invokeTerm`.
	 * @param ctx the parse tree
	 */
	enterInvokeTerm?: (ctx: InvokeTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.invokeTerm`.
	 * @param ctx the parse tree
	 */
	exitInvokeTerm?: (ctx: InvokeTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.callBrTerm`.
	 * @param ctx the parse tree
	 */
	enterCallBrTerm?: (ctx: CallBrTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.callBrTerm`.
	 * @param ctx the parse tree
	 */
	exitCallBrTerm?: (ctx: CallBrTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.catchSwitchTerm`.
	 * @param ctx the parse tree
	 */
	enterCatchSwitchTerm?: (ctx: CatchSwitchTermContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.catchSwitchTerm`.
	 * @param ctx the parse tree
	 */
	exitCatchSwitchTerm?: (ctx: CatchSwitchTermContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.label`.
	 * @param ctx the parse tree
	 */
	enterLabel?: (ctx: LabelContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.label`.
	 * @param ctx the parse tree
	 */
	exitLabel?: (ctx: LabelContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.case`.
	 * @param ctx the parse tree
	 */
	enterCase?: (ctx: CaseContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.case`.
	 * @param ctx the parse tree
	 */
	exitCase?: (ctx: CaseContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.unwindTarget`.
	 * @param ctx the parse tree
	 */
	enterUnwindTarget?: (ctx: UnwindTargetContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.unwindTarget`.
	 * @param ctx the parse tree
	 */
	exitUnwindTarget?: (ctx: UnwindTargetContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.handlers`.
	 * @param ctx the parse tree
	 */
	enterHandlers?: (ctx: HandlersContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.handlers`.
	 * @param ctx the parse tree
	 */
	exitHandlers?: (ctx: HandlersContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.metadataNode`.
	 * @param ctx the parse tree
	 */
	enterMetadataNode?: (ctx: MetadataNodeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.metadataNode`.
	 * @param ctx the parse tree
	 */
	exitMetadataNode?: (ctx: MetadataNodeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diExpression`.
	 * @param ctx the parse tree
	 */
	enterDiExpression?: (ctx: DiExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diExpression`.
	 * @param ctx the parse tree
	 */
	exitDiExpression?: (ctx: DiExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diExpressionField`.
	 * @param ctx the parse tree
	 */
	enterDiExpressionField?: (ctx: DiExpressionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diExpressionField`.
	 * @param ctx the parse tree
	 */
	exitDiExpressionField?: (ctx: DiExpressionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.globalField`.
	 * @param ctx the parse tree
	 */
	enterGlobalField?: (ctx: GlobalFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.globalField`.
	 * @param ctx the parse tree
	 */
	exitGlobalField?: (ctx: GlobalFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.section`.
	 * @param ctx the parse tree
	 */
	enterSection?: (ctx: SectionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.section`.
	 * @param ctx the parse tree
	 */
	exitSection?: (ctx: SectionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.comdat`.
	 * @param ctx the parse tree
	 */
	enterComdat?: (ctx: ComdatContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.comdat`.
	 * @param ctx the parse tree
	 */
	exitComdat?: (ctx: ComdatContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.partition`.
	 * @param ctx the parse tree
	 */
	enterPartition?: (ctx: PartitionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.partition`.
	 * @param ctx the parse tree
	 */
	exitPartition?: (ctx: PartitionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.boolConst`.
	 * @param ctx the parse tree
	 */
	enterBoolConst?: (ctx: BoolConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.boolConst`.
	 * @param ctx the parse tree
	 */
	exitBoolConst?: (ctx: BoolConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.intConst`.
	 * @param ctx the parse tree
	 */
	enterIntConst?: (ctx: IntConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.intConst`.
	 * @param ctx the parse tree
	 */
	exitIntConst?: (ctx: IntConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.floatConst`.
	 * @param ctx the parse tree
	 */
	enterFloatConst?: (ctx: FloatConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.floatConst`.
	 * @param ctx the parse tree
	 */
	exitFloatConst?: (ctx: FloatConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.nullConst`.
	 * @param ctx the parse tree
	 */
	enterNullConst?: (ctx: NullConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.nullConst`.
	 * @param ctx the parse tree
	 */
	exitNullConst?: (ctx: NullConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.noneConst`.
	 * @param ctx the parse tree
	 */
	enterNoneConst?: (ctx: NoneConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.noneConst`.
	 * @param ctx the parse tree
	 */
	exitNoneConst?: (ctx: NoneConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.structConst`.
	 * @param ctx the parse tree
	 */
	enterStructConst?: (ctx: StructConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.structConst`.
	 * @param ctx the parse tree
	 */
	exitStructConst?: (ctx: StructConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.arrayConst`.
	 * @param ctx the parse tree
	 */
	enterArrayConst?: (ctx: ArrayConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.arrayConst`.
	 * @param ctx the parse tree
	 */
	exitArrayConst?: (ctx: ArrayConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.vectorConst`.
	 * @param ctx the parse tree
	 */
	enterVectorConst?: (ctx: VectorConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.vectorConst`.
	 * @param ctx the parse tree
	 */
	exitVectorConst?: (ctx: VectorConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.zeroInitializerConst`.
	 * @param ctx the parse tree
	 */
	enterZeroInitializerConst?: (ctx: ZeroInitializerConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.zeroInitializerConst`.
	 * @param ctx the parse tree
	 */
	exitZeroInitializerConst?: (ctx: ZeroInitializerConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.undefConst`.
	 * @param ctx the parse tree
	 */
	enterUndefConst?: (ctx: UndefConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.undefConst`.
	 * @param ctx the parse tree
	 */
	exitUndefConst?: (ctx: UndefConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.poisonConst`.
	 * @param ctx the parse tree
	 */
	enterPoisonConst?: (ctx: PoisonConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.poisonConst`.
	 * @param ctx the parse tree
	 */
	exitPoisonConst?: (ctx: PoisonConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.blockAddressConst`.
	 * @param ctx the parse tree
	 */
	enterBlockAddressConst?: (ctx: BlockAddressConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.blockAddressConst`.
	 * @param ctx the parse tree
	 */
	exitBlockAddressConst?: (ctx: BlockAddressConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dsoLocalEquivalentConst`.
	 * @param ctx the parse tree
	 */
	enterDsoLocalEquivalentConst?: (ctx: DsoLocalEquivalentConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dsoLocalEquivalentConst`.
	 * @param ctx the parse tree
	 */
	exitDsoLocalEquivalentConst?: (ctx: DsoLocalEquivalentConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.noCFIConst`.
	 * @param ctx the parse tree
	 */
	enterNoCFIConst?: (ctx: NoCFIConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.noCFIConst`.
	 * @param ctx the parse tree
	 */
	exitNoCFIConst?: (ctx: NoCFIConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.constantExpr`.
	 * @param ctx the parse tree
	 */
	enterConstantExpr?: (ctx: ConstantExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.constantExpr`.
	 * @param ctx the parse tree
	 */
	exitConstantExpr?: (ctx: ConstantExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typeConst`.
	 * @param ctx the parse tree
	 */
	enterTypeConst?: (ctx: TypeConstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typeConst`.
	 * @param ctx the parse tree
	 */
	exitTypeConst?: (ctx: TypeConstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.metadataAttachment`.
	 * @param ctx the parse tree
	 */
	enterMetadataAttachment?: (ctx: MetadataAttachmentContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.metadataAttachment`.
	 * @param ctx the parse tree
	 */
	exitMetadataAttachment?: (ctx: MetadataAttachmentContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mdNode`.
	 * @param ctx the parse tree
	 */
	enterMdNode?: (ctx: MdNodeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mdNode`.
	 * @param ctx the parse tree
	 */
	exitMdNode?: (ctx: MdNodeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mdTuple`.
	 * @param ctx the parse tree
	 */
	enterMdTuple?: (ctx: MdTupleContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mdTuple`.
	 * @param ctx the parse tree
	 */
	exitMdTuple?: (ctx: MdTupleContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.metadata`.
	 * @param ctx the parse tree
	 */
	enterMetadata?: (ctx: MetadataContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.metadata`.
	 * @param ctx the parse tree
	 */
	exitMetadata?: (ctx: MetadataContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diArgList`.
	 * @param ctx the parse tree
	 */
	enterDiArgList?: (ctx: DiArgListContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diArgList`.
	 * @param ctx the parse tree
	 */
	exitDiArgList?: (ctx: DiArgListContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typeValue`.
	 * @param ctx the parse tree
	 */
	enterTypeValue?: (ctx: TypeValueContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typeValue`.
	 * @param ctx the parse tree
	 */
	exitTypeValue?: (ctx: TypeValueContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.inlineAsm`.
	 * @param ctx the parse tree
	 */
	enterInlineAsm?: (ctx: InlineAsmContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.inlineAsm`.
	 * @param ctx the parse tree
	 */
	exitInlineAsm?: (ctx: InlineAsmContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mdString`.
	 * @param ctx the parse tree
	 */
	enterMdString?: (ctx: MdStringContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mdString`.
	 * @param ctx the parse tree
	 */
	exitMdString?: (ctx: MdStringContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mdFieldOrInt`.
	 * @param ctx the parse tree
	 */
	enterMdFieldOrInt?: (ctx: MdFieldOrIntContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mdFieldOrInt`.
	 * @param ctx the parse tree
	 */
	exitMdFieldOrInt?: (ctx: MdFieldOrIntContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSPFlag`.
	 * @param ctx the parse tree
	 */
	enterDiSPFlag?: (ctx: DiSPFlagContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSPFlag`.
	 * @param ctx the parse tree
	 */
	exitDiSPFlag?: (ctx: DiSPFlagContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcAttribute`.
	 * @param ctx the parse tree
	 */
	enterFuncAttribute?: (ctx: FuncAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcAttribute`.
	 * @param ctx the parse tree
	 */
	exitFuncAttribute?: (ctx: FuncAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.voidType`.
	 * @param ctx the parse tree
	 */
	enterVoidType?: (ctx: VoidTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.voidType`.
	 * @param ctx the parse tree
	 */
	exitVoidType?: (ctx: VoidTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.opaqueType`.
	 * @param ctx the parse tree
	 */
	enterOpaqueType?: (ctx: OpaqueTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.opaqueType`.
	 * @param ctx the parse tree
	 */
	exitOpaqueType?: (ctx: OpaqueTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.params`.
	 * @param ctx the parse tree
	 */
	enterParams?: (ctx: ParamsContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.params`.
	 * @param ctx the parse tree
	 */
	exitParams?: (ctx: ParamsContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.param`.
	 * @param ctx the parse tree
	 */
	enterParam?: (ctx: ParamContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.param`.
	 * @param ctx the parse tree
	 */
	exitParam?: (ctx: ParamContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.paramAttribute`.
	 * @param ctx the parse tree
	 */
	enterParamAttribute?: (ctx: ParamAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.paramAttribute`.
	 * @param ctx the parse tree
	 */
	exitParamAttribute?: (ctx: ParamAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.attrString`.
	 * @param ctx the parse tree
	 */
	enterAttrString?: (ctx: AttrStringContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.attrString`.
	 * @param ctx the parse tree
	 */
	exitAttrString?: (ctx: AttrStringContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.attrPair`.
	 * @param ctx the parse tree
	 */
	enterAttrPair?: (ctx: AttrPairContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.attrPair`.
	 * @param ctx the parse tree
	 */
	exitAttrPair?: (ctx: AttrPairContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.align`.
	 * @param ctx the parse tree
	 */
	enterAlign?: (ctx: AlignContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.align`.
	 * @param ctx the parse tree
	 */
	exitAlign?: (ctx: AlignContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.alignPair`.
	 * @param ctx the parse tree
	 */
	enterAlignPair?: (ctx: AlignPairContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.alignPair`.
	 * @param ctx the parse tree
	 */
	exitAlignPair?: (ctx: AlignPairContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.alignStack`.
	 * @param ctx the parse tree
	 */
	enterAlignStack?: (ctx: AlignStackContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.alignStack`.
	 * @param ctx the parse tree
	 */
	exitAlignStack?: (ctx: AlignStackContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.alignStackPair`.
	 * @param ctx the parse tree
	 */
	enterAlignStackPair?: (ctx: AlignStackPairContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.alignStackPair`.
	 * @param ctx the parse tree
	 */
	exitAlignStackPair?: (ctx: AlignStackPairContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.allocKind`.
	 * @param ctx the parse tree
	 */
	enterAllocKind?: (ctx: AllocKindContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.allocKind`.
	 * @param ctx the parse tree
	 */
	exitAllocKind?: (ctx: AllocKindContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.allocSize`.
	 * @param ctx the parse tree
	 */
	enterAllocSize?: (ctx: AllocSizeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.allocSize`.
	 * @param ctx the parse tree
	 */
	exitAllocSize?: (ctx: AllocSizeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.unwindTable`.
	 * @param ctx the parse tree
	 */
	enterUnwindTable?: (ctx: UnwindTableContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.unwindTable`.
	 * @param ctx the parse tree
	 */
	exitUnwindTable?: (ctx: UnwindTableContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.vectorScaleRange`.
	 * @param ctx the parse tree
	 */
	enterVectorScaleRange?: (ctx: VectorScaleRangeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.vectorScaleRange`.
	 * @param ctx the parse tree
	 */
	exitVectorScaleRange?: (ctx: VectorScaleRangeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.byRefAttr`.
	 * @param ctx the parse tree
	 */
	enterByRefAttr?: (ctx: ByRefAttrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.byRefAttr`.
	 * @param ctx the parse tree
	 */
	exitByRefAttr?: (ctx: ByRefAttrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.byval`.
	 * @param ctx the parse tree
	 */
	enterByval?: (ctx: ByvalContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.byval`.
	 * @param ctx the parse tree
	 */
	exitByval?: (ctx: ByvalContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dereferenceable`.
	 * @param ctx the parse tree
	 */
	enterDereferenceable?: (ctx: DereferenceableContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dereferenceable`.
	 * @param ctx the parse tree
	 */
	exitDereferenceable?: (ctx: DereferenceableContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.elementType`.
	 * @param ctx the parse tree
	 */
	enterElementType?: (ctx: ElementTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.elementType`.
	 * @param ctx the parse tree
	 */
	exitElementType?: (ctx: ElementTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.inAlloca`.
	 * @param ctx the parse tree
	 */
	enterInAlloca?: (ctx: InAllocaContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.inAlloca`.
	 * @param ctx the parse tree
	 */
	exitInAlloca?: (ctx: InAllocaContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.paramAttr`.
	 * @param ctx the parse tree
	 */
	enterParamAttr?: (ctx: ParamAttrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.paramAttr`.
	 * @param ctx the parse tree
	 */
	exitParamAttr?: (ctx: ParamAttrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.preallocated`.
	 * @param ctx the parse tree
	 */
	enterPreallocated?: (ctx: PreallocatedContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.preallocated`.
	 * @param ctx the parse tree
	 */
	exitPreallocated?: (ctx: PreallocatedContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.structRetAttr`.
	 * @param ctx the parse tree
	 */
	enterStructRetAttr?: (ctx: StructRetAttrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.structRetAttr`.
	 * @param ctx the parse tree
	 */
	exitStructRetAttr?: (ctx: StructRetAttrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.firstClassType`.
	 * @param ctx the parse tree
	 */
	enterFirstClassType?: (ctx: FirstClassTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.firstClassType`.
	 * @param ctx the parse tree
	 */
	exitFirstClassType?: (ctx: FirstClassTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.concreteType`.
	 * @param ctx the parse tree
	 */
	enterConcreteType?: (ctx: ConcreteTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.concreteType`.
	 * @param ctx the parse tree
	 */
	exitConcreteType?: (ctx: ConcreteTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.intType`.
	 * @param ctx the parse tree
	 */
	enterIntType?: (ctx: IntTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.intType`.
	 * @param ctx the parse tree
	 */
	exitIntType?: (ctx: IntTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.floatType`.
	 * @param ctx the parse tree
	 */
	enterFloatType?: (ctx: FloatTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.floatType`.
	 * @param ctx the parse tree
	 */
	exitFloatType?: (ctx: FloatTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.pointerType`.
	 * @param ctx the parse tree
	 */
	enterPointerType?: (ctx: PointerTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.pointerType`.
	 * @param ctx the parse tree
	 */
	exitPointerType?: (ctx: PointerTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.vectorType`.
	 * @param ctx the parse tree
	 */
	enterVectorType?: (ctx: VectorTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.vectorType`.
	 * @param ctx the parse tree
	 */
	exitVectorType?: (ctx: VectorTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.labelType`.
	 * @param ctx the parse tree
	 */
	enterLabelType?: (ctx: LabelTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.labelType`.
	 * @param ctx the parse tree
	 */
	exitLabelType?: (ctx: LabelTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.arrayType`.
	 * @param ctx the parse tree
	 */
	enterArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.arrayType`.
	 * @param ctx the parse tree
	 */
	exitArrayType?: (ctx: ArrayTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.structType`.
	 * @param ctx the parse tree
	 */
	enterStructType?: (ctx: StructTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.structType`.
	 * @param ctx the parse tree
	 */
	exitStructType?: (ctx: StructTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.namedType`.
	 * @param ctx the parse tree
	 */
	enterNamedType?: (ctx: NamedTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.namedType`.
	 * @param ctx the parse tree
	 */
	exitNamedType?: (ctx: NamedTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mmxType`.
	 * @param ctx the parse tree
	 */
	enterMmxType?: (ctx: MmxTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mmxType`.
	 * @param ctx the parse tree
	 */
	exitMmxType?: (ctx: MmxTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.tokenType`.
	 * @param ctx the parse tree
	 */
	enterTokenType?: (ctx: TokenTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.tokenType`.
	 * @param ctx the parse tree
	 */
	exitTokenType?: (ctx: TokenTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.opaquePointerType`.
	 * @param ctx the parse tree
	 */
	enterOpaquePointerType?: (ctx: OpaquePointerTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.opaquePointerType`.
	 * @param ctx the parse tree
	 */
	exitOpaquePointerType?: (ctx: OpaquePointerTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.addrSpace`.
	 * @param ctx the parse tree
	 */
	enterAddrSpace?: (ctx: AddrSpaceContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.addrSpace`.
	 * @param ctx the parse tree
	 */
	exitAddrSpace?: (ctx: AddrSpaceContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.threadLocal`.
	 * @param ctx the parse tree
	 */
	enterThreadLocal?: (ctx: ThreadLocalContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.threadLocal`.
	 * @param ctx the parse tree
	 */
	exitThreadLocal?: (ctx: ThreadLocalContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.metadataType`.
	 * @param ctx the parse tree
	 */
	enterMetadataType?: (ctx: MetadataTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.metadataType`.
	 * @param ctx the parse tree
	 */
	exitMetadataType?: (ctx: MetadataTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.bitCastExpr`.
	 * @param ctx the parse tree
	 */
	enterBitCastExpr?: (ctx: BitCastExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.bitCastExpr`.
	 * @param ctx the parse tree
	 */
	exitBitCastExpr?: (ctx: BitCastExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.getElementPtrExpr`.
	 * @param ctx the parse tree
	 */
	enterGetElementPtrExpr?: (ctx: GetElementPtrExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.getElementPtrExpr`.
	 * @param ctx the parse tree
	 */
	exitGetElementPtrExpr?: (ctx: GetElementPtrExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.gepIndex`.
	 * @param ctx the parse tree
	 */
	enterGepIndex?: (ctx: GepIndexContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.gepIndex`.
	 * @param ctx the parse tree
	 */
	exitGepIndex?: (ctx: GepIndexContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.addrSpaceCastExpr`.
	 * @param ctx the parse tree
	 */
	enterAddrSpaceCastExpr?: (ctx: AddrSpaceCastExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.addrSpaceCastExpr`.
	 * @param ctx the parse tree
	 */
	exitAddrSpaceCastExpr?: (ctx: AddrSpaceCastExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.intToPtrExpr`.
	 * @param ctx the parse tree
	 */
	enterIntToPtrExpr?: (ctx: IntToPtrExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.intToPtrExpr`.
	 * @param ctx the parse tree
	 */
	exitIntToPtrExpr?: (ctx: IntToPtrExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.iCmpExpr`.
	 * @param ctx the parse tree
	 */
	enterICmpExpr?: (ctx: ICmpExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.iCmpExpr`.
	 * @param ctx the parse tree
	 */
	exitICmpExpr?: (ctx: ICmpExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fCmpExpr`.
	 * @param ctx the parse tree
	 */
	enterFCmpExpr?: (ctx: FCmpExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fCmpExpr`.
	 * @param ctx the parse tree
	 */
	exitFCmpExpr?: (ctx: FCmpExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.selectExpr`.
	 * @param ctx the parse tree
	 */
	enterSelectExpr?: (ctx: SelectExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.selectExpr`.
	 * @param ctx the parse tree
	 */
	exitSelectExpr?: (ctx: SelectExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.truncExpr`.
	 * @param ctx the parse tree
	 */
	enterTruncExpr?: (ctx: TruncExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.truncExpr`.
	 * @param ctx the parse tree
	 */
	exitTruncExpr?: (ctx: TruncExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.zExtExpr`.
	 * @param ctx the parse tree
	 */
	enterZExtExpr?: (ctx: ZExtExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.zExtExpr`.
	 * @param ctx the parse tree
	 */
	exitZExtExpr?: (ctx: ZExtExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sExtExpr`.
	 * @param ctx the parse tree
	 */
	enterSExtExpr?: (ctx: SExtExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sExtExpr`.
	 * @param ctx the parse tree
	 */
	exitSExtExpr?: (ctx: SExtExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpTruncExpr`.
	 * @param ctx the parse tree
	 */
	enterFpTruncExpr?: (ctx: FpTruncExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpTruncExpr`.
	 * @param ctx the parse tree
	 */
	exitFpTruncExpr?: (ctx: FpTruncExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpExtExpr`.
	 * @param ctx the parse tree
	 */
	enterFpExtExpr?: (ctx: FpExtExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpExtExpr`.
	 * @param ctx the parse tree
	 */
	exitFpExtExpr?: (ctx: FpExtExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpToUiExpr`.
	 * @param ctx the parse tree
	 */
	enterFpToUiExpr?: (ctx: FpToUiExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpToUiExpr`.
	 * @param ctx the parse tree
	 */
	exitFpToUiExpr?: (ctx: FpToUiExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpToSiExpr`.
	 * @param ctx the parse tree
	 */
	enterFpToSiExpr?: (ctx: FpToSiExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpToSiExpr`.
	 * @param ctx the parse tree
	 */
	exitFpToSiExpr?: (ctx: FpToSiExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.uiToFpExpr`.
	 * @param ctx the parse tree
	 */
	enterUiToFpExpr?: (ctx: UiToFpExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.uiToFpExpr`.
	 * @param ctx the parse tree
	 */
	exitUiToFpExpr?: (ctx: UiToFpExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.siToFpExpr`.
	 * @param ctx the parse tree
	 */
	enterSiToFpExpr?: (ctx: SiToFpExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.siToFpExpr`.
	 * @param ctx the parse tree
	 */
	exitSiToFpExpr?: (ctx: SiToFpExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.ptrToIntExpr`.
	 * @param ctx the parse tree
	 */
	enterPtrToIntExpr?: (ctx: PtrToIntExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.ptrToIntExpr`.
	 * @param ctx the parse tree
	 */
	exitPtrToIntExpr?: (ctx: PtrToIntExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.extractElementExpr`.
	 * @param ctx the parse tree
	 */
	enterExtractElementExpr?: (ctx: ExtractElementExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.extractElementExpr`.
	 * @param ctx the parse tree
	 */
	exitExtractElementExpr?: (ctx: ExtractElementExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.insertElementExpr`.
	 * @param ctx the parse tree
	 */
	enterInsertElementExpr?: (ctx: InsertElementExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.insertElementExpr`.
	 * @param ctx the parse tree
	 */
	exitInsertElementExpr?: (ctx: InsertElementExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.shuffleVectorExpr`.
	 * @param ctx the parse tree
	 */
	enterShuffleVectorExpr?: (ctx: ShuffleVectorExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.shuffleVectorExpr`.
	 * @param ctx the parse tree
	 */
	exitShuffleVectorExpr?: (ctx: ShuffleVectorExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.shlExpr`.
	 * @param ctx the parse tree
	 */
	enterShlExpr?: (ctx: ShlExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.shlExpr`.
	 * @param ctx the parse tree
	 */
	exitShlExpr?: (ctx: ShlExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.lShrExpr`.
	 * @param ctx the parse tree
	 */
	enterLShrExpr?: (ctx: LShrExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.lShrExpr`.
	 * @param ctx the parse tree
	 */
	exitLShrExpr?: (ctx: LShrExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.aShrExpr`.
	 * @param ctx the parse tree
	 */
	enterAShrExpr?: (ctx: AShrExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.aShrExpr`.
	 * @param ctx the parse tree
	 */
	exitAShrExpr?: (ctx: AShrExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.andExpr`.
	 * @param ctx the parse tree
	 */
	enterAndExpr?: (ctx: AndExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.andExpr`.
	 * @param ctx the parse tree
	 */
	exitAndExpr?: (ctx: AndExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.orExpr`.
	 * @param ctx the parse tree
	 */
	enterOrExpr?: (ctx: OrExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.orExpr`.
	 * @param ctx the parse tree
	 */
	exitOrExpr?: (ctx: OrExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.xorExpr`.
	 * @param ctx the parse tree
	 */
	enterXorExpr?: (ctx: XorExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.xorExpr`.
	 * @param ctx the parse tree
	 */
	exitXorExpr?: (ctx: XorExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.addExpr`.
	 * @param ctx the parse tree
	 */
	enterAddExpr?: (ctx: AddExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.addExpr`.
	 * @param ctx the parse tree
	 */
	exitAddExpr?: (ctx: AddExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.subExpr`.
	 * @param ctx the parse tree
	 */
	enterSubExpr?: (ctx: SubExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.subExpr`.
	 * @param ctx the parse tree
	 */
	exitSubExpr?: (ctx: SubExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mulExpr`.
	 * @param ctx the parse tree
	 */
	enterMulExpr?: (ctx: MulExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mulExpr`.
	 * @param ctx the parse tree
	 */
	exitMulExpr?: (ctx: MulExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fNegExpr`.
	 * @param ctx the parse tree
	 */
	enterFNegExpr?: (ctx: FNegExprContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fNegExpr`.
	 * @param ctx the parse tree
	 */
	exitFNegExpr?: (ctx: FNegExprContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.localDefInst`.
	 * @param ctx the parse tree
	 */
	enterLocalDefInst?: (ctx: LocalDefInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.localDefInst`.
	 * @param ctx the parse tree
	 */
	exitLocalDefInst?: (ctx: LocalDefInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.valueInstruction`.
	 * @param ctx the parse tree
	 */
	enterValueInstruction?: (ctx: ValueInstructionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.valueInstruction`.
	 * @param ctx the parse tree
	 */
	exitValueInstruction?: (ctx: ValueInstructionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.storeInst`.
	 * @param ctx the parse tree
	 */
	enterStoreInst?: (ctx: StoreInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.storeInst`.
	 * @param ctx the parse tree
	 */
	exitStoreInst?: (ctx: StoreInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.syncScope`.
	 * @param ctx the parse tree
	 */
	enterSyncScope?: (ctx: SyncScopeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.syncScope`.
	 * @param ctx the parse tree
	 */
	exitSyncScope?: (ctx: SyncScopeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fenceInst`.
	 * @param ctx the parse tree
	 */
	enterFenceInst?: (ctx: FenceInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fenceInst`.
	 * @param ctx the parse tree
	 */
	exitFenceInst?: (ctx: FenceInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fNegInst`.
	 * @param ctx the parse tree
	 */
	enterFNegInst?: (ctx: FNegInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fNegInst`.
	 * @param ctx the parse tree
	 */
	exitFNegInst?: (ctx: FNegInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.addInst`.
	 * @param ctx the parse tree
	 */
	enterAddInst?: (ctx: AddInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.addInst`.
	 * @param ctx the parse tree
	 */
	exitAddInst?: (ctx: AddInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fAddInst`.
	 * @param ctx the parse tree
	 */
	enterFAddInst?: (ctx: FAddInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fAddInst`.
	 * @param ctx the parse tree
	 */
	exitFAddInst?: (ctx: FAddInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.subInst`.
	 * @param ctx the parse tree
	 */
	enterSubInst?: (ctx: SubInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.subInst`.
	 * @param ctx the parse tree
	 */
	exitSubInst?: (ctx: SubInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fSubInst`.
	 * @param ctx the parse tree
	 */
	enterFSubInst?: (ctx: FSubInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fSubInst`.
	 * @param ctx the parse tree
	 */
	exitFSubInst?: (ctx: FSubInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mulInst`.
	 * @param ctx the parse tree
	 */
	enterMulInst?: (ctx: MulInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mulInst`.
	 * @param ctx the parse tree
	 */
	exitMulInst?: (ctx: MulInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fMulInst`.
	 * @param ctx the parse tree
	 */
	enterFMulInst?: (ctx: FMulInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fMulInst`.
	 * @param ctx the parse tree
	 */
	exitFMulInst?: (ctx: FMulInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.uDivInst`.
	 * @param ctx the parse tree
	 */
	enterUDivInst?: (ctx: UDivInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.uDivInst`.
	 * @param ctx the parse tree
	 */
	exitUDivInst?: (ctx: UDivInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sDivInst`.
	 * @param ctx the parse tree
	 */
	enterSDivInst?: (ctx: SDivInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sDivInst`.
	 * @param ctx the parse tree
	 */
	exitSDivInst?: (ctx: SDivInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fDivInst`.
	 * @param ctx the parse tree
	 */
	enterFDivInst?: (ctx: FDivInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fDivInst`.
	 * @param ctx the parse tree
	 */
	exitFDivInst?: (ctx: FDivInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.uRemInst`.
	 * @param ctx the parse tree
	 */
	enterURemInst?: (ctx: URemInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.uRemInst`.
	 * @param ctx the parse tree
	 */
	exitURemInst?: (ctx: URemInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sRemInst`.
	 * @param ctx the parse tree
	 */
	enterSRemInst?: (ctx: SRemInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sRemInst`.
	 * @param ctx the parse tree
	 */
	exitSRemInst?: (ctx: SRemInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fRemInst`.
	 * @param ctx the parse tree
	 */
	enterFRemInst?: (ctx: FRemInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fRemInst`.
	 * @param ctx the parse tree
	 */
	exitFRemInst?: (ctx: FRemInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.shlInst`.
	 * @param ctx the parse tree
	 */
	enterShlInst?: (ctx: ShlInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.shlInst`.
	 * @param ctx the parse tree
	 */
	exitShlInst?: (ctx: ShlInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.lShrInst`.
	 * @param ctx the parse tree
	 */
	enterLShrInst?: (ctx: LShrInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.lShrInst`.
	 * @param ctx the parse tree
	 */
	exitLShrInst?: (ctx: LShrInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.aShrInst`.
	 * @param ctx the parse tree
	 */
	enterAShrInst?: (ctx: AShrInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.aShrInst`.
	 * @param ctx the parse tree
	 */
	exitAShrInst?: (ctx: AShrInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.andInst`.
	 * @param ctx the parse tree
	 */
	enterAndInst?: (ctx: AndInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.andInst`.
	 * @param ctx the parse tree
	 */
	exitAndInst?: (ctx: AndInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.orInst`.
	 * @param ctx the parse tree
	 */
	enterOrInst?: (ctx: OrInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.orInst`.
	 * @param ctx the parse tree
	 */
	exitOrInst?: (ctx: OrInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.xorInst`.
	 * @param ctx the parse tree
	 */
	enterXorInst?: (ctx: XorInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.xorInst`.
	 * @param ctx the parse tree
	 */
	exitXorInst?: (ctx: XorInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.extractElementInst`.
	 * @param ctx the parse tree
	 */
	enterExtractElementInst?: (ctx: ExtractElementInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.extractElementInst`.
	 * @param ctx the parse tree
	 */
	exitExtractElementInst?: (ctx: ExtractElementInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.insertElementInst`.
	 * @param ctx the parse tree
	 */
	enterInsertElementInst?: (ctx: InsertElementInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.insertElementInst`.
	 * @param ctx the parse tree
	 */
	exitInsertElementInst?: (ctx: InsertElementInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.shuffleVectorInst`.
	 * @param ctx the parse tree
	 */
	enterShuffleVectorInst?: (ctx: ShuffleVectorInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.shuffleVectorInst`.
	 * @param ctx the parse tree
	 */
	exitShuffleVectorInst?: (ctx: ShuffleVectorInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.extractValueInst`.
	 * @param ctx the parse tree
	 */
	enterExtractValueInst?: (ctx: ExtractValueInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.extractValueInst`.
	 * @param ctx the parse tree
	 */
	exitExtractValueInst?: (ctx: ExtractValueInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.insertValueInst`.
	 * @param ctx the parse tree
	 */
	enterInsertValueInst?: (ctx: InsertValueInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.insertValueInst`.
	 * @param ctx the parse tree
	 */
	exitInsertValueInst?: (ctx: InsertValueInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.allocaInst`.
	 * @param ctx the parse tree
	 */
	enterAllocaInst?: (ctx: AllocaInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.allocaInst`.
	 * @param ctx the parse tree
	 */
	exitAllocaInst?: (ctx: AllocaInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.loadInst`.
	 * @param ctx the parse tree
	 */
	enterLoadInst?: (ctx: LoadInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.loadInst`.
	 * @param ctx the parse tree
	 */
	exitLoadInst?: (ctx: LoadInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.cmpXchgInst`.
	 * @param ctx the parse tree
	 */
	enterCmpXchgInst?: (ctx: CmpXchgInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.cmpXchgInst`.
	 * @param ctx the parse tree
	 */
	exitCmpXchgInst?: (ctx: CmpXchgInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.atomicRMWInst`.
	 * @param ctx the parse tree
	 */
	enterAtomicRMWInst?: (ctx: AtomicRMWInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.atomicRMWInst`.
	 * @param ctx the parse tree
	 */
	exitAtomicRMWInst?: (ctx: AtomicRMWInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.getElementPtrInst`.
	 * @param ctx the parse tree
	 */
	enterGetElementPtrInst?: (ctx: GetElementPtrInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.getElementPtrInst`.
	 * @param ctx the parse tree
	 */
	exitGetElementPtrInst?: (ctx: GetElementPtrInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.truncInst`.
	 * @param ctx the parse tree
	 */
	enterTruncInst?: (ctx: TruncInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.truncInst`.
	 * @param ctx the parse tree
	 */
	exitTruncInst?: (ctx: TruncInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.zExtInst`.
	 * @param ctx the parse tree
	 */
	enterZExtInst?: (ctx: ZExtInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.zExtInst`.
	 * @param ctx the parse tree
	 */
	exitZExtInst?: (ctx: ZExtInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sExtInst`.
	 * @param ctx the parse tree
	 */
	enterSExtInst?: (ctx: SExtInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sExtInst`.
	 * @param ctx the parse tree
	 */
	exitSExtInst?: (ctx: SExtInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpTruncInst`.
	 * @param ctx the parse tree
	 */
	enterFpTruncInst?: (ctx: FpTruncInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpTruncInst`.
	 * @param ctx the parse tree
	 */
	exitFpTruncInst?: (ctx: FpTruncInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpExtInst`.
	 * @param ctx the parse tree
	 */
	enterFpExtInst?: (ctx: FpExtInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpExtInst`.
	 * @param ctx the parse tree
	 */
	exitFpExtInst?: (ctx: FpExtInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpToUiInst`.
	 * @param ctx the parse tree
	 */
	enterFpToUiInst?: (ctx: FpToUiInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpToUiInst`.
	 * @param ctx the parse tree
	 */
	exitFpToUiInst?: (ctx: FpToUiInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fpToSiInst`.
	 * @param ctx the parse tree
	 */
	enterFpToSiInst?: (ctx: FpToSiInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fpToSiInst`.
	 * @param ctx the parse tree
	 */
	exitFpToSiInst?: (ctx: FpToSiInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.uiToFpInst`.
	 * @param ctx the parse tree
	 */
	enterUiToFpInst?: (ctx: UiToFpInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.uiToFpInst`.
	 * @param ctx the parse tree
	 */
	exitUiToFpInst?: (ctx: UiToFpInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.siToFpInst`.
	 * @param ctx the parse tree
	 */
	enterSiToFpInst?: (ctx: SiToFpInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.siToFpInst`.
	 * @param ctx the parse tree
	 */
	exitSiToFpInst?: (ctx: SiToFpInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.ptrToIntInst`.
	 * @param ctx the parse tree
	 */
	enterPtrToIntInst?: (ctx: PtrToIntInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.ptrToIntInst`.
	 * @param ctx the parse tree
	 */
	exitPtrToIntInst?: (ctx: PtrToIntInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.intToPtrInst`.
	 * @param ctx the parse tree
	 */
	enterIntToPtrInst?: (ctx: IntToPtrInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.intToPtrInst`.
	 * @param ctx the parse tree
	 */
	exitIntToPtrInst?: (ctx: IntToPtrInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.bitCastInst`.
	 * @param ctx the parse tree
	 */
	enterBitCastInst?: (ctx: BitCastInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.bitCastInst`.
	 * @param ctx the parse tree
	 */
	exitBitCastInst?: (ctx: BitCastInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.addrSpaceCastInst`.
	 * @param ctx the parse tree
	 */
	enterAddrSpaceCastInst?: (ctx: AddrSpaceCastInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.addrSpaceCastInst`.
	 * @param ctx the parse tree
	 */
	exitAddrSpaceCastInst?: (ctx: AddrSpaceCastInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.iCmpInst`.
	 * @param ctx the parse tree
	 */
	enterICmpInst?: (ctx: ICmpInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.iCmpInst`.
	 * @param ctx the parse tree
	 */
	exitICmpInst?: (ctx: ICmpInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fCmpInst`.
	 * @param ctx the parse tree
	 */
	enterFCmpInst?: (ctx: FCmpInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fCmpInst`.
	 * @param ctx the parse tree
	 */
	exitFCmpInst?: (ctx: FCmpInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.phiInst`.
	 * @param ctx the parse tree
	 */
	enterPhiInst?: (ctx: PhiInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.phiInst`.
	 * @param ctx the parse tree
	 */
	exitPhiInst?: (ctx: PhiInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.selectInst`.
	 * @param ctx the parse tree
	 */
	enterSelectInst?: (ctx: SelectInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.selectInst`.
	 * @param ctx the parse tree
	 */
	exitSelectInst?: (ctx: SelectInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.freezeInst`.
	 * @param ctx the parse tree
	 */
	enterFreezeInst?: (ctx: FreezeInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.freezeInst`.
	 * @param ctx the parse tree
	 */
	exitFreezeInst?: (ctx: FreezeInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.callInst`.
	 * @param ctx the parse tree
	 */
	enterCallInst?: (ctx: CallInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.callInst`.
	 * @param ctx the parse tree
	 */
	exitCallInst?: (ctx: CallInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.vaargInst`.
	 * @param ctx the parse tree
	 */
	enterVaargInst?: (ctx: VaargInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.vaargInst`.
	 * @param ctx the parse tree
	 */
	exitVaargInst?: (ctx: VaargInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.landingPadInst`.
	 * @param ctx the parse tree
	 */
	enterLandingPadInst?: (ctx: LandingPadInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.landingPadInst`.
	 * @param ctx the parse tree
	 */
	exitLandingPadInst?: (ctx: LandingPadInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.catchPadInst`.
	 * @param ctx the parse tree
	 */
	enterCatchPadInst?: (ctx: CatchPadInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.catchPadInst`.
	 * @param ctx the parse tree
	 */
	exitCatchPadInst?: (ctx: CatchPadInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.cleanupPadInst`.
	 * @param ctx the parse tree
	 */
	enterCleanupPadInst?: (ctx: CleanupPadInstContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.cleanupPadInst`.
	 * @param ctx the parse tree
	 */
	exitCleanupPadInst?: (ctx: CleanupPadInstContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.inc`.
	 * @param ctx the parse tree
	 */
	enterInc?: (ctx: IncContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.inc`.
	 * @param ctx the parse tree
	 */
	exitInc?: (ctx: IncContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.operandBundle`.
	 * @param ctx the parse tree
	 */
	enterOperandBundle?: (ctx: OperandBundleContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.operandBundle`.
	 * @param ctx the parse tree
	 */
	exitOperandBundle?: (ctx: OperandBundleContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.clause`.
	 * @param ctx the parse tree
	 */
	enterClause?: (ctx: ClauseContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.clause`.
	 * @param ctx the parse tree
	 */
	exitClause?: (ctx: ClauseContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.args`.
	 * @param ctx the parse tree
	 */
	enterArgs?: (ctx: ArgsContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.args`.
	 * @param ctx the parse tree
	 */
	exitArgs?: (ctx: ArgsContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.arg`.
	 * @param ctx the parse tree
	 */
	enterArg?: (ctx: ArgContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.arg`.
	 * @param ctx the parse tree
	 */
	exitArg?: (ctx: ArgContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.exceptionArg`.
	 * @param ctx the parse tree
	 */
	enterExceptionArg?: (ctx: ExceptionArgContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.exceptionArg`.
	 * @param ctx the parse tree
	 */
	exitExceptionArg?: (ctx: ExceptionArgContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.exceptionPad`.
	 * @param ctx the parse tree
	 */
	enterExceptionPad?: (ctx: ExceptionPadContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.exceptionPad`.
	 * @param ctx the parse tree
	 */
	exitExceptionPad?: (ctx: ExceptionPadContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.externalLinkage`.
	 * @param ctx the parse tree
	 */
	enterExternalLinkage?: (ctx: ExternalLinkageContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.externalLinkage`.
	 * @param ctx the parse tree
	 */
	exitExternalLinkage?: (ctx: ExternalLinkageContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.internalLinkage`.
	 * @param ctx the parse tree
	 */
	enterInternalLinkage?: (ctx: InternalLinkageContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.internalLinkage`.
	 * @param ctx the parse tree
	 */
	exitInternalLinkage?: (ctx: InternalLinkageContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.linkage`.
	 * @param ctx the parse tree
	 */
	enterLinkage?: (ctx: LinkageContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.linkage`.
	 * @param ctx the parse tree
	 */
	exitLinkage?: (ctx: LinkageContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.preemption`.
	 * @param ctx the parse tree
	 */
	enterPreemption?: (ctx: PreemptionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.preemption`.
	 * @param ctx the parse tree
	 */
	exitPreemption?: (ctx: PreemptionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.visibility`.
	 * @param ctx the parse tree
	 */
	enterVisibility?: (ctx: VisibilityContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.visibility`.
	 * @param ctx the parse tree
	 */
	exitVisibility?: (ctx: VisibilityContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dllStorageClass`.
	 * @param ctx the parse tree
	 */
	enterDllStorageClass?: (ctx: DllStorageClassContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dllStorageClass`.
	 * @param ctx the parse tree
	 */
	exitDllStorageClass?: (ctx: DllStorageClassContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.tlsModel`.
	 * @param ctx the parse tree
	 */
	enterTlsModel?: (ctx: TlsModelContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.tlsModel`.
	 * @param ctx the parse tree
	 */
	exitTlsModel?: (ctx: TlsModelContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.unnamedAddr`.
	 * @param ctx the parse tree
	 */
	enterUnnamedAddr?: (ctx: UnnamedAddrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.unnamedAddr`.
	 * @param ctx the parse tree
	 */
	exitUnnamedAddr?: (ctx: UnnamedAddrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.externallyInitialized`.
	 * @param ctx the parse tree
	 */
	enterExternallyInitialized?: (ctx: ExternallyInitializedContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.externallyInitialized`.
	 * @param ctx the parse tree
	 */
	exitExternallyInitialized?: (ctx: ExternallyInitializedContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.immutable`.
	 * @param ctx the parse tree
	 */
	enterImmutable?: (ctx: ImmutableContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.immutable`.
	 * @param ctx the parse tree
	 */
	exitImmutable?: (ctx: ImmutableContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.funcAttr`.
	 * @param ctx the parse tree
	 */
	enterFuncAttr?: (ctx: FuncAttrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.funcAttr`.
	 * @param ctx the parse tree
	 */
	exitFuncAttr?: (ctx: FuncAttrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.distinct`.
	 * @param ctx the parse tree
	 */
	enterDistinct?: (ctx: DistinctContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.distinct`.
	 * @param ctx the parse tree
	 */
	exitDistinct?: (ctx: DistinctContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.inBounds`.
	 * @param ctx the parse tree
	 */
	enterInBounds?: (ctx: InBoundsContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.inBounds`.
	 * @param ctx the parse tree
	 */
	exitInBounds?: (ctx: InBoundsContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.returnAttr`.
	 * @param ctx the parse tree
	 */
	enterReturnAttr?: (ctx: ReturnAttrContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.returnAttr`.
	 * @param ctx the parse tree
	 */
	exitReturnAttr?: (ctx: ReturnAttrContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.overflowFlag`.
	 * @param ctx the parse tree
	 */
	enterOverflowFlag?: (ctx: OverflowFlagContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.overflowFlag`.
	 * @param ctx the parse tree
	 */
	exitOverflowFlag?: (ctx: OverflowFlagContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.iPred`.
	 * @param ctx the parse tree
	 */
	enterIPred?: (ctx: IPredContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.iPred`.
	 * @param ctx the parse tree
	 */
	exitIPred?: (ctx: IPredContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fPred`.
	 * @param ctx the parse tree
	 */
	enterFPred?: (ctx: FPredContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fPred`.
	 * @param ctx the parse tree
	 */
	exitFPred?: (ctx: FPredContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.atomicOrdering`.
	 * @param ctx the parse tree
	 */
	enterAtomicOrdering?: (ctx: AtomicOrderingContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.atomicOrdering`.
	 * @param ctx the parse tree
	 */
	exitAtomicOrdering?: (ctx: AtomicOrderingContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.callingConvEnum`.
	 * @param ctx the parse tree
	 */
	enterCallingConvEnum?: (ctx: CallingConvEnumContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.callingConvEnum`.
	 * @param ctx the parse tree
	 */
	exitCallingConvEnum?: (ctx: CallingConvEnumContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fastMathFlag`.
	 * @param ctx the parse tree
	 */
	enterFastMathFlag?: (ctx: FastMathFlagContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fastMathFlag`.
	 * @param ctx the parse tree
	 */
	exitFastMathFlag?: (ctx: FastMathFlagContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.atomicOp`.
	 * @param ctx the parse tree
	 */
	enterAtomicOp?: (ctx: AtomicOpContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.atomicOp`.
	 * @param ctx the parse tree
	 */
	exitAtomicOp?: (ctx: AtomicOpContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.floatKind`.
	 * @param ctx the parse tree
	 */
	enterFloatKind?: (ctx: FloatKindContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.floatKind`.
	 * @param ctx the parse tree
	 */
	exitFloatKind?: (ctx: FloatKindContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.specializedMDNode`.
	 * @param ctx the parse tree
	 */
	enterSpecializedMDNode?: (ctx: SpecializedMDNodeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.specializedMDNode`.
	 * @param ctx the parse tree
	 */
	exitSpecializedMDNode?: (ctx: SpecializedMDNodeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diBasicType`.
	 * @param ctx the parse tree
	 */
	enterDiBasicType?: (ctx: DiBasicTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diBasicType`.
	 * @param ctx the parse tree
	 */
	exitDiBasicType?: (ctx: DiBasicTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCommonBlock`.
	 * @param ctx the parse tree
	 */
	enterDiCommonBlock?: (ctx: DiCommonBlockContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCommonBlock`.
	 * @param ctx the parse tree
	 */
	exitDiCommonBlock?: (ctx: DiCommonBlockContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCompileUnit`.
	 * @param ctx the parse tree
	 */
	enterDiCompileUnit?: (ctx: DiCompileUnitContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCompileUnit`.
	 * @param ctx the parse tree
	 */
	exitDiCompileUnit?: (ctx: DiCompileUnitContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCompositeType`.
	 * @param ctx the parse tree
	 */
	enterDiCompositeType?: (ctx: DiCompositeTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCompositeType`.
	 * @param ctx the parse tree
	 */
	exitDiCompositeType?: (ctx: DiCompositeTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCompositeTypeField`.
	 * @param ctx the parse tree
	 */
	enterDiCompositeTypeField?: (ctx: DiCompositeTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCompositeTypeField`.
	 * @param ctx the parse tree
	 */
	exitDiCompositeTypeField?: (ctx: DiCompositeTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diDerivedType`.
	 * @param ctx the parse tree
	 */
	enterDiDerivedType?: (ctx: DiDerivedTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diDerivedType`.
	 * @param ctx the parse tree
	 */
	exitDiDerivedType?: (ctx: DiDerivedTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diDerivedTypeField`.
	 * @param ctx the parse tree
	 */
	enterDiDerivedTypeField?: (ctx: DiDerivedTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diDerivedTypeField`.
	 * @param ctx the parse tree
	 */
	exitDiDerivedTypeField?: (ctx: DiDerivedTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diEnumerator`.
	 * @param ctx the parse tree
	 */
	enterDiEnumerator?: (ctx: DiEnumeratorContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diEnumerator`.
	 * @param ctx the parse tree
	 */
	exitDiEnumerator?: (ctx: DiEnumeratorContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diEnumeratorField`.
	 * @param ctx the parse tree
	 */
	enterDiEnumeratorField?: (ctx: DiEnumeratorFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diEnumeratorField`.
	 * @param ctx the parse tree
	 */
	exitDiEnumeratorField?: (ctx: DiEnumeratorFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diFile`.
	 * @param ctx the parse tree
	 */
	enterDiFile?: (ctx: DiFileContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diFile`.
	 * @param ctx the parse tree
	 */
	exitDiFile?: (ctx: DiFileContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diFileField`.
	 * @param ctx the parse tree
	 */
	enterDiFileField?: (ctx: DiFileFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diFileField`.
	 * @param ctx the parse tree
	 */
	exitDiFileField?: (ctx: DiFileFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diGlobalVariable`.
	 * @param ctx the parse tree
	 */
	enterDiGlobalVariable?: (ctx: DiGlobalVariableContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diGlobalVariable`.
	 * @param ctx the parse tree
	 */
	exitDiGlobalVariable?: (ctx: DiGlobalVariableContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diGlobalVariableField`.
	 * @param ctx the parse tree
	 */
	enterDiGlobalVariableField?: (ctx: DiGlobalVariableFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diGlobalVariableField`.
	 * @param ctx the parse tree
	 */
	exitDiGlobalVariableField?: (ctx: DiGlobalVariableFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diGlobalVariableExpression`.
	 * @param ctx the parse tree
	 */
	enterDiGlobalVariableExpression?: (ctx: DiGlobalVariableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diGlobalVariableExpression`.
	 * @param ctx the parse tree
	 */
	exitDiGlobalVariableExpression?: (ctx: DiGlobalVariableExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diGlobalVariableExpressionField`.
	 * @param ctx the parse tree
	 */
	enterDiGlobalVariableExpressionField?: (ctx: DiGlobalVariableExpressionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diGlobalVariableExpressionField`.
	 * @param ctx the parse tree
	 */
	exitDiGlobalVariableExpressionField?: (ctx: DiGlobalVariableExpressionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diImportedEntity`.
	 * @param ctx the parse tree
	 */
	enterDiImportedEntity?: (ctx: DiImportedEntityContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diImportedEntity`.
	 * @param ctx the parse tree
	 */
	exitDiImportedEntity?: (ctx: DiImportedEntityContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diImportedEntityField`.
	 * @param ctx the parse tree
	 */
	enterDiImportedEntityField?: (ctx: DiImportedEntityFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diImportedEntityField`.
	 * @param ctx the parse tree
	 */
	exitDiImportedEntityField?: (ctx: DiImportedEntityFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLabel`.
	 * @param ctx the parse tree
	 */
	enterDiLabel?: (ctx: DiLabelContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLabel`.
	 * @param ctx the parse tree
	 */
	exitDiLabel?: (ctx: DiLabelContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLabelField`.
	 * @param ctx the parse tree
	 */
	enterDiLabelField?: (ctx: DiLabelFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLabelField`.
	 * @param ctx the parse tree
	 */
	exitDiLabelField?: (ctx: DiLabelFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLexicalBlock`.
	 * @param ctx the parse tree
	 */
	enterDiLexicalBlock?: (ctx: DiLexicalBlockContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLexicalBlock`.
	 * @param ctx the parse tree
	 */
	exitDiLexicalBlock?: (ctx: DiLexicalBlockContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLexicalBlockField`.
	 * @param ctx the parse tree
	 */
	enterDiLexicalBlockField?: (ctx: DiLexicalBlockFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLexicalBlockField`.
	 * @param ctx the parse tree
	 */
	exitDiLexicalBlockField?: (ctx: DiLexicalBlockFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLexicalBlockFile`.
	 * @param ctx the parse tree
	 */
	enterDiLexicalBlockFile?: (ctx: DiLexicalBlockFileContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLexicalBlockFile`.
	 * @param ctx the parse tree
	 */
	exitDiLexicalBlockFile?: (ctx: DiLexicalBlockFileContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLexicalBlockFileField`.
	 * @param ctx the parse tree
	 */
	enterDiLexicalBlockFileField?: (ctx: DiLexicalBlockFileFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLexicalBlockFileField`.
	 * @param ctx the parse tree
	 */
	exitDiLexicalBlockFileField?: (ctx: DiLexicalBlockFileFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLocalVariable`.
	 * @param ctx the parse tree
	 */
	enterDiLocalVariable?: (ctx: DiLocalVariableContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLocalVariable`.
	 * @param ctx the parse tree
	 */
	exitDiLocalVariable?: (ctx: DiLocalVariableContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLocalVariableField`.
	 * @param ctx the parse tree
	 */
	enterDiLocalVariableField?: (ctx: DiLocalVariableFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLocalVariableField`.
	 * @param ctx the parse tree
	 */
	exitDiLocalVariableField?: (ctx: DiLocalVariableFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLocation`.
	 * @param ctx the parse tree
	 */
	enterDiLocation?: (ctx: DiLocationContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLocation`.
	 * @param ctx the parse tree
	 */
	exitDiLocation?: (ctx: DiLocationContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diLocationField`.
	 * @param ctx the parse tree
	 */
	enterDiLocationField?: (ctx: DiLocationFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diLocationField`.
	 * @param ctx the parse tree
	 */
	exitDiLocationField?: (ctx: DiLocationFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diMacro`.
	 * @param ctx the parse tree
	 */
	enterDiMacro?: (ctx: DiMacroContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diMacro`.
	 * @param ctx the parse tree
	 */
	exitDiMacro?: (ctx: DiMacroContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diMacroField`.
	 * @param ctx the parse tree
	 */
	enterDiMacroField?: (ctx: DiMacroFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diMacroField`.
	 * @param ctx the parse tree
	 */
	exitDiMacroField?: (ctx: DiMacroFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diMacroFile`.
	 * @param ctx the parse tree
	 */
	enterDiMacroFile?: (ctx: DiMacroFileContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diMacroFile`.
	 * @param ctx the parse tree
	 */
	exitDiMacroFile?: (ctx: DiMacroFileContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diMacroFileField`.
	 * @param ctx the parse tree
	 */
	enterDiMacroFileField?: (ctx: DiMacroFileFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diMacroFileField`.
	 * @param ctx the parse tree
	 */
	exitDiMacroFileField?: (ctx: DiMacroFileFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diModule`.
	 * @param ctx the parse tree
	 */
	enterDiModule?: (ctx: DiModuleContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diModule`.
	 * @param ctx the parse tree
	 */
	exitDiModule?: (ctx: DiModuleContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diModuleField`.
	 * @param ctx the parse tree
	 */
	enterDiModuleField?: (ctx: DiModuleFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diModuleField`.
	 * @param ctx the parse tree
	 */
	exitDiModuleField?: (ctx: DiModuleFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diNamespace`.
	 * @param ctx the parse tree
	 */
	enterDiNamespace?: (ctx: DiNamespaceContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diNamespace`.
	 * @param ctx the parse tree
	 */
	exitDiNamespace?: (ctx: DiNamespaceContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diNamespaceField`.
	 * @param ctx the parse tree
	 */
	enterDiNamespaceField?: (ctx: DiNamespaceFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diNamespaceField`.
	 * @param ctx the parse tree
	 */
	exitDiNamespaceField?: (ctx: DiNamespaceFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diObjCProperty`.
	 * @param ctx the parse tree
	 */
	enterDiObjCProperty?: (ctx: DiObjCPropertyContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diObjCProperty`.
	 * @param ctx the parse tree
	 */
	exitDiObjCProperty?: (ctx: DiObjCPropertyContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diObjCPropertyField`.
	 * @param ctx the parse tree
	 */
	enterDiObjCPropertyField?: (ctx: DiObjCPropertyFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diObjCPropertyField`.
	 * @param ctx the parse tree
	 */
	exitDiObjCPropertyField?: (ctx: DiObjCPropertyFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diStringType`.
	 * @param ctx the parse tree
	 */
	enterDiStringType?: (ctx: DiStringTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diStringType`.
	 * @param ctx the parse tree
	 */
	exitDiStringType?: (ctx: DiStringTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diStringTypeField`.
	 * @param ctx the parse tree
	 */
	enterDiStringTypeField?: (ctx: DiStringTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diStringTypeField`.
	 * @param ctx the parse tree
	 */
	exitDiStringTypeField?: (ctx: DiStringTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubprogram`.
	 * @param ctx the parse tree
	 */
	enterDiSubprogram?: (ctx: DiSubprogramContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubprogram`.
	 * @param ctx the parse tree
	 */
	exitDiSubprogram?: (ctx: DiSubprogramContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubprogramField`.
	 * @param ctx the parse tree
	 */
	enterDiSubprogramField?: (ctx: DiSubprogramFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubprogramField`.
	 * @param ctx the parse tree
	 */
	exitDiSubprogramField?: (ctx: DiSubprogramFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubrange`.
	 * @param ctx the parse tree
	 */
	enterDiSubrange?: (ctx: DiSubrangeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubrange`.
	 * @param ctx the parse tree
	 */
	exitDiSubrange?: (ctx: DiSubrangeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubrangeField`.
	 * @param ctx the parse tree
	 */
	enterDiSubrangeField?: (ctx: DiSubrangeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubrangeField`.
	 * @param ctx the parse tree
	 */
	exitDiSubrangeField?: (ctx: DiSubrangeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubroutineType`.
	 * @param ctx the parse tree
	 */
	enterDiSubroutineType?: (ctx: DiSubroutineTypeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubroutineType`.
	 * @param ctx the parse tree
	 */
	exitDiSubroutineType?: (ctx: DiSubroutineTypeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diTemplateTypeParameter`.
	 * @param ctx the parse tree
	 */
	enterDiTemplateTypeParameter?: (ctx: DiTemplateTypeParameterContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diTemplateTypeParameter`.
	 * @param ctx the parse tree
	 */
	exitDiTemplateTypeParameter?: (ctx: DiTemplateTypeParameterContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diTemplateValueParameter`.
	 * @param ctx the parse tree
	 */
	enterDiTemplateValueParameter?: (ctx: DiTemplateValueParameterContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diTemplateValueParameter`.
	 * @param ctx the parse tree
	 */
	exitDiTemplateValueParameter?: (ctx: DiTemplateValueParameterContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.genericDiNode`.
	 * @param ctx the parse tree
	 */
	enterGenericDiNode?: (ctx: GenericDiNodeContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.genericDiNode`.
	 * @param ctx the parse tree
	 */
	exitGenericDiNode?: (ctx: GenericDiNodeContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diTemplateTypeParameterField`.
	 * @param ctx the parse tree
	 */
	enterDiTemplateTypeParameterField?: (ctx: DiTemplateTypeParameterFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diTemplateTypeParameterField`.
	 * @param ctx the parse tree
	 */
	exitDiTemplateTypeParameterField?: (ctx: DiTemplateTypeParameterFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCompileUnitField`.
	 * @param ctx the parse tree
	 */
	enterDiCompileUnitField?: (ctx: DiCompileUnitFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCompileUnitField`.
	 * @param ctx the parse tree
	 */
	exitDiCompileUnitField?: (ctx: DiCompileUnitFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diCommonBlockField`.
	 * @param ctx the parse tree
	 */
	enterDiCommonBlockField?: (ctx: DiCommonBlockFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diCommonBlockField`.
	 * @param ctx the parse tree
	 */
	exitDiCommonBlockField?: (ctx: DiCommonBlockFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diBasicTypeField`.
	 * @param ctx the parse tree
	 */
	enterDiBasicTypeField?: (ctx: DiBasicTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diBasicTypeField`.
	 * @param ctx the parse tree
	 */
	exitDiBasicTypeField?: (ctx: DiBasicTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.genericDINodeField`.
	 * @param ctx the parse tree
	 */
	enterGenericDINodeField?: (ctx: GenericDINodeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.genericDINodeField`.
	 * @param ctx the parse tree
	 */
	exitGenericDINodeField?: (ctx: GenericDINodeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.tagField`.
	 * @param ctx the parse tree
	 */
	enterTagField?: (ctx: TagFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.tagField`.
	 * @param ctx the parse tree
	 */
	exitTagField?: (ctx: TagFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.headerField`.
	 * @param ctx the parse tree
	 */
	enterHeaderField?: (ctx: HeaderFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.headerField`.
	 * @param ctx the parse tree
	 */
	exitHeaderField?: (ctx: HeaderFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.operandsField`.
	 * @param ctx the parse tree
	 */
	enterOperandsField?: (ctx: OperandsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.operandsField`.
	 * @param ctx the parse tree
	 */
	exitOperandsField?: (ctx: OperandsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diTemplateValueParameterField`.
	 * @param ctx the parse tree
	 */
	enterDiTemplateValueParameterField?: (ctx: DiTemplateValueParameterFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diTemplateValueParameterField`.
	 * @param ctx the parse tree
	 */
	exitDiTemplateValueParameterField?: (ctx: DiTemplateValueParameterFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.nameField`.
	 * @param ctx the parse tree
	 */
	enterNameField?: (ctx: NameFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.nameField`.
	 * @param ctx the parse tree
	 */
	exitNameField?: (ctx: NameFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typeField`.
	 * @param ctx the parse tree
	 */
	enterTypeField?: (ctx: TypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typeField`.
	 * @param ctx the parse tree
	 */
	exitTypeField?: (ctx: TypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.defaultedField`.
	 * @param ctx the parse tree
	 */
	enterDefaultedField?: (ctx: DefaultedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.defaultedField`.
	 * @param ctx the parse tree
	 */
	exitDefaultedField?: (ctx: DefaultedFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.valueField`.
	 * @param ctx the parse tree
	 */
	enterValueField?: (ctx: ValueFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.valueField`.
	 * @param ctx the parse tree
	 */
	exitValueField?: (ctx: ValueFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.mdField`.
	 * @param ctx the parse tree
	 */
	enterMdField?: (ctx: MdFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.mdField`.
	 * @param ctx the parse tree
	 */
	exitMdField?: (ctx: MdFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diSubroutineTypeField`.
	 * @param ctx the parse tree
	 */
	enterDiSubroutineTypeField?: (ctx: DiSubroutineTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diSubroutineTypeField`.
	 * @param ctx the parse tree
	 */
	exitDiSubroutineTypeField?: (ctx: DiSubroutineTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.flagsField`.
	 * @param ctx the parse tree
	 */
	enterFlagsField?: (ctx: FlagsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.flagsField`.
	 * @param ctx the parse tree
	 */
	exitFlagsField?: (ctx: FlagsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.diFlags`.
	 * @param ctx the parse tree
	 */
	enterDiFlags?: (ctx: DiFlagsContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.diFlags`.
	 * @param ctx the parse tree
	 */
	exitDiFlags?: (ctx: DiFlagsContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.ccField`.
	 * @param ctx the parse tree
	 */
	enterCcField?: (ctx: CcFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.ccField`.
	 * @param ctx the parse tree
	 */
	exitCcField?: (ctx: CcFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.alignField`.
	 * @param ctx the parse tree
	 */
	enterAlignField?: (ctx: AlignFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.alignField`.
	 * @param ctx the parse tree
	 */
	exitAlignField?: (ctx: AlignFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.allocatedField`.
	 * @param ctx the parse tree
	 */
	enterAllocatedField?: (ctx: AllocatedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.allocatedField`.
	 * @param ctx the parse tree
	 */
	exitAllocatedField?: (ctx: AllocatedFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.annotationsField`.
	 * @param ctx the parse tree
	 */
	enterAnnotationsField?: (ctx: AnnotationsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.annotationsField`.
	 * @param ctx the parse tree
	 */
	exitAnnotationsField?: (ctx: AnnotationsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.argField`.
	 * @param ctx the parse tree
	 */
	enterArgField?: (ctx: ArgFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.argField`.
	 * @param ctx the parse tree
	 */
	exitArgField?: (ctx: ArgFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.associatedField`.
	 * @param ctx the parse tree
	 */
	enterAssociatedField?: (ctx: AssociatedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.associatedField`.
	 * @param ctx the parse tree
	 */
	exitAssociatedField?: (ctx: AssociatedFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.attributesField`.
	 * @param ctx the parse tree
	 */
	enterAttributesField?: (ctx: AttributesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.attributesField`.
	 * @param ctx the parse tree
	 */
	exitAttributesField?: (ctx: AttributesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.baseTypeField`.
	 * @param ctx the parse tree
	 */
	enterBaseTypeField?: (ctx: BaseTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.baseTypeField`.
	 * @param ctx the parse tree
	 */
	exitBaseTypeField?: (ctx: BaseTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.checksumField`.
	 * @param ctx the parse tree
	 */
	enterChecksumField?: (ctx: ChecksumFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.checksumField`.
	 * @param ctx the parse tree
	 */
	exitChecksumField?: (ctx: ChecksumFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.checksumkindField`.
	 * @param ctx the parse tree
	 */
	enterChecksumkindField?: (ctx: ChecksumkindFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.checksumkindField`.
	 * @param ctx the parse tree
	 */
	exitChecksumkindField?: (ctx: ChecksumkindFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.columnField`.
	 * @param ctx the parse tree
	 */
	enterColumnField?: (ctx: ColumnFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.columnField`.
	 * @param ctx the parse tree
	 */
	exitColumnField?: (ctx: ColumnFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.configMacrosField`.
	 * @param ctx the parse tree
	 */
	enterConfigMacrosField?: (ctx: ConfigMacrosFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.configMacrosField`.
	 * @param ctx the parse tree
	 */
	exitConfigMacrosField?: (ctx: ConfigMacrosFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.containingTypeField`.
	 * @param ctx the parse tree
	 */
	enterContainingTypeField?: (ctx: ContainingTypeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.containingTypeField`.
	 * @param ctx the parse tree
	 */
	exitContainingTypeField?: (ctx: ContainingTypeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.countField`.
	 * @param ctx the parse tree
	 */
	enterCountField?: (ctx: CountFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.countField`.
	 * @param ctx the parse tree
	 */
	exitCountField?: (ctx: CountFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.debugInfoForProfilingField`.
	 * @param ctx the parse tree
	 */
	enterDebugInfoForProfilingField?: (ctx: DebugInfoForProfilingFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.debugInfoForProfilingField`.
	 * @param ctx the parse tree
	 */
	exitDebugInfoForProfilingField?: (ctx: DebugInfoForProfilingFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.declarationField`.
	 * @param ctx the parse tree
	 */
	enterDeclarationField?: (ctx: DeclarationFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.declarationField`.
	 * @param ctx the parse tree
	 */
	exitDeclarationField?: (ctx: DeclarationFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.directoryField`.
	 * @param ctx the parse tree
	 */
	enterDirectoryField?: (ctx: DirectoryFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.directoryField`.
	 * @param ctx the parse tree
	 */
	exitDirectoryField?: (ctx: DirectoryFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.discriminatorField`.
	 * @param ctx the parse tree
	 */
	enterDiscriminatorField?: (ctx: DiscriminatorFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.discriminatorField`.
	 * @param ctx the parse tree
	 */
	exitDiscriminatorField?: (ctx: DiscriminatorFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dataLocationField`.
	 * @param ctx the parse tree
	 */
	enterDataLocationField?: (ctx: DataLocationFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dataLocationField`.
	 * @param ctx the parse tree
	 */
	exitDataLocationField?: (ctx: DataLocationFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.discriminatorIntField`.
	 * @param ctx the parse tree
	 */
	enterDiscriminatorIntField?: (ctx: DiscriminatorIntFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.discriminatorIntField`.
	 * @param ctx the parse tree
	 */
	exitDiscriminatorIntField?: (ctx: DiscriminatorIntFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dwarfAddressSpaceField`.
	 * @param ctx the parse tree
	 */
	enterDwarfAddressSpaceField?: (ctx: DwarfAddressSpaceFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dwarfAddressSpaceField`.
	 * @param ctx the parse tree
	 */
	exitDwarfAddressSpaceField?: (ctx: DwarfAddressSpaceFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.dwoIdField`.
	 * @param ctx the parse tree
	 */
	enterDwoIdField?: (ctx: DwoIdFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.dwoIdField`.
	 * @param ctx the parse tree
	 */
	exitDwoIdField?: (ctx: DwoIdFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.elementsField`.
	 * @param ctx the parse tree
	 */
	enterElementsField?: (ctx: ElementsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.elementsField`.
	 * @param ctx the parse tree
	 */
	exitElementsField?: (ctx: ElementsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.emissionKindField`.
	 * @param ctx the parse tree
	 */
	enterEmissionKindField?: (ctx: EmissionKindFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.emissionKindField`.
	 * @param ctx the parse tree
	 */
	exitEmissionKindField?: (ctx: EmissionKindFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.encodingField`.
	 * @param ctx the parse tree
	 */
	enterEncodingField?: (ctx: EncodingFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.encodingField`.
	 * @param ctx the parse tree
	 */
	exitEncodingField?: (ctx: EncodingFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.entityField`.
	 * @param ctx the parse tree
	 */
	enterEntityField?: (ctx: EntityFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.entityField`.
	 * @param ctx the parse tree
	 */
	exitEntityField?: (ctx: EntityFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.enumsField`.
	 * @param ctx the parse tree
	 */
	enterEnumsField?: (ctx: EnumsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.enumsField`.
	 * @param ctx the parse tree
	 */
	exitEnumsField?: (ctx: EnumsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.exportSymbolsField`.
	 * @param ctx the parse tree
	 */
	enterExportSymbolsField?: (ctx: ExportSymbolsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.exportSymbolsField`.
	 * @param ctx the parse tree
	 */
	exitExportSymbolsField?: (ctx: ExportSymbolsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.exprField`.
	 * @param ctx the parse tree
	 */
	enterExprField?: (ctx: ExprFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.exprField`.
	 * @param ctx the parse tree
	 */
	exitExprField?: (ctx: ExprFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.extraDataField`.
	 * @param ctx the parse tree
	 */
	enterExtraDataField?: (ctx: ExtraDataFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.extraDataField`.
	 * @param ctx the parse tree
	 */
	exitExtraDataField?: (ctx: ExtraDataFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.fileField`.
	 * @param ctx the parse tree
	 */
	enterFileField?: (ctx: FileFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.fileField`.
	 * @param ctx the parse tree
	 */
	exitFileField?: (ctx: FileFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.filenameField`.
	 * @param ctx the parse tree
	 */
	enterFilenameField?: (ctx: FilenameFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.filenameField`.
	 * @param ctx the parse tree
	 */
	exitFilenameField?: (ctx: FilenameFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.flagsStringField`.
	 * @param ctx the parse tree
	 */
	enterFlagsStringField?: (ctx: FlagsStringFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.flagsStringField`.
	 * @param ctx the parse tree
	 */
	exitFlagsStringField?: (ctx: FlagsStringFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.getterField`.
	 * @param ctx the parse tree
	 */
	enterGetterField?: (ctx: GetterFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.getterField`.
	 * @param ctx the parse tree
	 */
	exitGetterField?: (ctx: GetterFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.globalsField`.
	 * @param ctx the parse tree
	 */
	enterGlobalsField?: (ctx: GlobalsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.globalsField`.
	 * @param ctx the parse tree
	 */
	exitGlobalsField?: (ctx: GlobalsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.identifierField`.
	 * @param ctx the parse tree
	 */
	enterIdentifierField?: (ctx: IdentifierFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.identifierField`.
	 * @param ctx the parse tree
	 */
	exitIdentifierField?: (ctx: IdentifierFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.importsField`.
	 * @param ctx the parse tree
	 */
	enterImportsField?: (ctx: ImportsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.importsField`.
	 * @param ctx the parse tree
	 */
	exitImportsField?: (ctx: ImportsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.includePathField`.
	 * @param ctx the parse tree
	 */
	enterIncludePathField?: (ctx: IncludePathFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.includePathField`.
	 * @param ctx the parse tree
	 */
	exitIncludePathField?: (ctx: IncludePathFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.inlinedAtField`.
	 * @param ctx the parse tree
	 */
	enterInlinedAtField?: (ctx: InlinedAtFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.inlinedAtField`.
	 * @param ctx the parse tree
	 */
	exitInlinedAtField?: (ctx: InlinedAtFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isDeclField`.
	 * @param ctx the parse tree
	 */
	enterIsDeclField?: (ctx: IsDeclFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isDeclField`.
	 * @param ctx the parse tree
	 */
	exitIsDeclField?: (ctx: IsDeclFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isDefinitionField`.
	 * @param ctx the parse tree
	 */
	enterIsDefinitionField?: (ctx: IsDefinitionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isDefinitionField`.
	 * @param ctx the parse tree
	 */
	exitIsDefinitionField?: (ctx: IsDefinitionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isImplicitCodeField`.
	 * @param ctx the parse tree
	 */
	enterIsImplicitCodeField?: (ctx: IsImplicitCodeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isImplicitCodeField`.
	 * @param ctx the parse tree
	 */
	exitIsImplicitCodeField?: (ctx: IsImplicitCodeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isLocalField`.
	 * @param ctx the parse tree
	 */
	enterIsLocalField?: (ctx: IsLocalFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isLocalField`.
	 * @param ctx the parse tree
	 */
	exitIsLocalField?: (ctx: IsLocalFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isOptimizedField`.
	 * @param ctx the parse tree
	 */
	enterIsOptimizedField?: (ctx: IsOptimizedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isOptimizedField`.
	 * @param ctx the parse tree
	 */
	exitIsOptimizedField?: (ctx: IsOptimizedFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.isUnsignedField`.
	 * @param ctx the parse tree
	 */
	enterIsUnsignedField?: (ctx: IsUnsignedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.isUnsignedField`.
	 * @param ctx the parse tree
	 */
	exitIsUnsignedField?: (ctx: IsUnsignedFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.apiNotesField`.
	 * @param ctx the parse tree
	 */
	enterApiNotesField?: (ctx: ApiNotesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.apiNotesField`.
	 * @param ctx the parse tree
	 */
	exitApiNotesField?: (ctx: ApiNotesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.languageField`.
	 * @param ctx the parse tree
	 */
	enterLanguageField?: (ctx: LanguageFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.languageField`.
	 * @param ctx the parse tree
	 */
	exitLanguageField?: (ctx: LanguageFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.lineField`.
	 * @param ctx the parse tree
	 */
	enterLineField?: (ctx: LineFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.lineField`.
	 * @param ctx the parse tree
	 */
	exitLineField?: (ctx: LineFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.linkageNameField`.
	 * @param ctx the parse tree
	 */
	enterLinkageNameField?: (ctx: LinkageNameFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.linkageNameField`.
	 * @param ctx the parse tree
	 */
	exitLinkageNameField?: (ctx: LinkageNameFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.lowerBoundField`.
	 * @param ctx the parse tree
	 */
	enterLowerBoundField?: (ctx: LowerBoundFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.lowerBoundField`.
	 * @param ctx the parse tree
	 */
	exitLowerBoundField?: (ctx: LowerBoundFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.macrosField`.
	 * @param ctx the parse tree
	 */
	enterMacrosField?: (ctx: MacrosFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.macrosField`.
	 * @param ctx the parse tree
	 */
	exitMacrosField?: (ctx: MacrosFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.nameTableKindField`.
	 * @param ctx the parse tree
	 */
	enterNameTableKindField?: (ctx: NameTableKindFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.nameTableKindField`.
	 * @param ctx the parse tree
	 */
	exitNameTableKindField?: (ctx: NameTableKindFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.nodesField`.
	 * @param ctx the parse tree
	 */
	enterNodesField?: (ctx: NodesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.nodesField`.
	 * @param ctx the parse tree
	 */
	exitNodesField?: (ctx: NodesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.offsetField`.
	 * @param ctx the parse tree
	 */
	enterOffsetField?: (ctx: OffsetFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.offsetField`.
	 * @param ctx the parse tree
	 */
	exitOffsetField?: (ctx: OffsetFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.producerField`.
	 * @param ctx the parse tree
	 */
	enterProducerField?: (ctx: ProducerFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.producerField`.
	 * @param ctx the parse tree
	 */
	exitProducerField?: (ctx: ProducerFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.rangesBaseAddressField`.
	 * @param ctx the parse tree
	 */
	enterRangesBaseAddressField?: (ctx: RangesBaseAddressFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.rangesBaseAddressField`.
	 * @param ctx the parse tree
	 */
	exitRangesBaseAddressField?: (ctx: RangesBaseAddressFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.rankField`.
	 * @param ctx the parse tree
	 */
	enterRankField?: (ctx: RankFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.rankField`.
	 * @param ctx the parse tree
	 */
	exitRankField?: (ctx: RankFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.retainedNodesField`.
	 * @param ctx the parse tree
	 */
	enterRetainedNodesField?: (ctx: RetainedNodesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.retainedNodesField`.
	 * @param ctx the parse tree
	 */
	exitRetainedNodesField?: (ctx: RetainedNodesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.retainedTypesField`.
	 * @param ctx the parse tree
	 */
	enterRetainedTypesField?: (ctx: RetainedTypesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.retainedTypesField`.
	 * @param ctx the parse tree
	 */
	exitRetainedTypesField?: (ctx: RetainedTypesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.runtimeLangField`.
	 * @param ctx the parse tree
	 */
	enterRuntimeLangField?: (ctx: RuntimeLangFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.runtimeLangField`.
	 * @param ctx the parse tree
	 */
	exitRuntimeLangField?: (ctx: RuntimeLangFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.runtimeVersionField`.
	 * @param ctx the parse tree
	 */
	enterRuntimeVersionField?: (ctx: RuntimeVersionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.runtimeVersionField`.
	 * @param ctx the parse tree
	 */
	exitRuntimeVersionField?: (ctx: RuntimeVersionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.scopeField`.
	 * @param ctx the parse tree
	 */
	enterScopeField?: (ctx: ScopeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.scopeField`.
	 * @param ctx the parse tree
	 */
	exitScopeField?: (ctx: ScopeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.scopeLineField`.
	 * @param ctx the parse tree
	 */
	enterScopeLineField?: (ctx: ScopeLineFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.scopeLineField`.
	 * @param ctx the parse tree
	 */
	exitScopeLineField?: (ctx: ScopeLineFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sdkField`.
	 * @param ctx the parse tree
	 */
	enterSdkField?: (ctx: SdkFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sdkField`.
	 * @param ctx the parse tree
	 */
	exitSdkField?: (ctx: SdkFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.setterField`.
	 * @param ctx the parse tree
	 */
	enterSetterField?: (ctx: SetterFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.setterField`.
	 * @param ctx the parse tree
	 */
	exitSetterField?: (ctx: SetterFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sizeField`.
	 * @param ctx the parse tree
	 */
	enterSizeField?: (ctx: SizeFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sizeField`.
	 * @param ctx the parse tree
	 */
	exitSizeField?: (ctx: SizeFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sourceField`.
	 * @param ctx the parse tree
	 */
	enterSourceField?: (ctx: SourceFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sourceField`.
	 * @param ctx the parse tree
	 */
	exitSourceField?: (ctx: SourceFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.spFlagsField`.
	 * @param ctx the parse tree
	 */
	enterSpFlagsField?: (ctx: SpFlagsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.spFlagsField`.
	 * @param ctx the parse tree
	 */
	exitSpFlagsField?: (ctx: SpFlagsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.splitDebugFilenameField`.
	 * @param ctx the parse tree
	 */
	enterSplitDebugFilenameField?: (ctx: SplitDebugFilenameFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.splitDebugFilenameField`.
	 * @param ctx the parse tree
	 */
	exitSplitDebugFilenameField?: (ctx: SplitDebugFilenameFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.splitDebugInliningField`.
	 * @param ctx the parse tree
	 */
	enterSplitDebugInliningField?: (ctx: SplitDebugInliningFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.splitDebugInliningField`.
	 * @param ctx the parse tree
	 */
	exitSplitDebugInliningField?: (ctx: SplitDebugInliningFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.strideField`.
	 * @param ctx the parse tree
	 */
	enterStrideField?: (ctx: StrideFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.strideField`.
	 * @param ctx the parse tree
	 */
	exitStrideField?: (ctx: StrideFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.stringLengthField`.
	 * @param ctx the parse tree
	 */
	enterStringLengthField?: (ctx: StringLengthFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.stringLengthField`.
	 * @param ctx the parse tree
	 */
	exitStringLengthField?: (ctx: StringLengthFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.stringLengthExpressionField`.
	 * @param ctx the parse tree
	 */
	enterStringLengthExpressionField?: (ctx: StringLengthExpressionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.stringLengthExpressionField`.
	 * @param ctx the parse tree
	 */
	exitStringLengthExpressionField?: (ctx: StringLengthExpressionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.stringLocationExpressionField`.
	 * @param ctx the parse tree
	 */
	enterStringLocationExpressionField?: (ctx: StringLocationExpressionFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.stringLocationExpressionField`.
	 * @param ctx the parse tree
	 */
	exitStringLocationExpressionField?: (ctx: StringLocationExpressionFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.sysrootField`.
	 * @param ctx the parse tree
	 */
	enterSysrootField?: (ctx: SysrootFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.sysrootField`.
	 * @param ctx the parse tree
	 */
	exitSysrootField?: (ctx: SysrootFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.targetFuncNameField`.
	 * @param ctx the parse tree
	 */
	enterTargetFuncNameField?: (ctx: TargetFuncNameFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.targetFuncNameField`.
	 * @param ctx the parse tree
	 */
	exitTargetFuncNameField?: (ctx: TargetFuncNameFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.templateParamsField`.
	 * @param ctx the parse tree
	 */
	enterTemplateParamsField?: (ctx: TemplateParamsFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.templateParamsField`.
	 * @param ctx the parse tree
	 */
	exitTemplateParamsField?: (ctx: TemplateParamsFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.thisAdjustmentField`.
	 * @param ctx the parse tree
	 */
	enterThisAdjustmentField?: (ctx: ThisAdjustmentFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.thisAdjustmentField`.
	 * @param ctx the parse tree
	 */
	exitThisAdjustmentField?: (ctx: ThisAdjustmentFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.thrownTypesField`.
	 * @param ctx the parse tree
	 */
	enterThrownTypesField?: (ctx: ThrownTypesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.thrownTypesField`.
	 * @param ctx the parse tree
	 */
	exitThrownTypesField?: (ctx: ThrownTypesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typeMacinfoField`.
	 * @param ctx the parse tree
	 */
	enterTypeMacinfoField?: (ctx: TypeMacinfoFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typeMacinfoField`.
	 * @param ctx the parse tree
	 */
	exitTypeMacinfoField?: (ctx: TypeMacinfoFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.typesField`.
	 * @param ctx the parse tree
	 */
	enterTypesField?: (ctx: TypesFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.typesField`.
	 * @param ctx the parse tree
	 */
	exitTypesField?: (ctx: TypesFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.unitField`.
	 * @param ctx the parse tree
	 */
	enterUnitField?: (ctx: UnitFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.unitField`.
	 * @param ctx the parse tree
	 */
	exitUnitField?: (ctx: UnitFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.upperBoundField`.
	 * @param ctx the parse tree
	 */
	enterUpperBoundField?: (ctx: UpperBoundFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.upperBoundField`.
	 * @param ctx the parse tree
	 */
	exitUpperBoundField?: (ctx: UpperBoundFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.valueIntField`.
	 * @param ctx the parse tree
	 */
	enterValueIntField?: (ctx: ValueIntFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.valueIntField`.
	 * @param ctx the parse tree
	 */
	exitValueIntField?: (ctx: ValueIntFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.valueStringField`.
	 * @param ctx the parse tree
	 */
	enterValueStringField?: (ctx: ValueStringFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.valueStringField`.
	 * @param ctx the parse tree
	 */
	exitValueStringField?: (ctx: ValueStringFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.varField`.
	 * @param ctx the parse tree
	 */
	enterVarField?: (ctx: VarFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.varField`.
	 * @param ctx the parse tree
	 */
	exitVarField?: (ctx: VarFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.virtualIndexField`.
	 * @param ctx the parse tree
	 */
	enterVirtualIndexField?: (ctx: VirtualIndexFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.virtualIndexField`.
	 * @param ctx the parse tree
	 */
	exitVirtualIndexField?: (ctx: VirtualIndexFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.virtualityField`.
	 * @param ctx the parse tree
	 */
	enterVirtualityField?: (ctx: VirtualityFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.virtualityField`.
	 * @param ctx the parse tree
	 */
	exitVirtualityField?: (ctx: VirtualityFieldContext) => void;

	/**
	 * Enter a parse tree produced by `LLVMIRParser.vtableHolderField`.
	 * @param ctx the parse tree
	 */
	enterVtableHolderField?: (ctx: VtableHolderFieldContext) => void;
	/**
	 * Exit a parse tree produced by `LLVMIRParser.vtableHolderField`.
	 * @param ctx the parse tree
	 */
	exitVtableHolderField?: (ctx: VtableHolderFieldContext) => void;
}

