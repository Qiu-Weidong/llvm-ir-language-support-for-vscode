lexer grammar LLVMIRLexer;

fragment AsciiLetter: [A-Za-z];
fragment Letter: AsciiLetter | [-$._];
fragment EscapeLetter: Letter | '\\';
fragment DecimalDigit: [0-9];
fragment HexDigit: [A-Fa-f] | DecimalDigit;
fragment Decimals: DecimalDigit+;
fragment Name: Letter (Letter | DecimalDigit)*;
fragment EscapeName:
	EscapeLetter (EscapeLetter | DecimalDigit)*;
fragment Id: Decimals;
fragment IntHexLit: [us] '0x' HexDigit+;
// 浮点型常量
fragment Sign: [+-];
fragment FracLit: Sign? Decimals '.' DecimalDigit*;
fragment SciLit: FracLit [eE] Sign? Decimals;
/*
 HexFPConstant 0x{_hex_digit}+ // 16 hex digits
 HexFP80Constant 0xK{_hex_digit}+ // 20 hex digits
 HexFP128Constant 0xL{_hex_digit}+ // 32 hex digits
 HexPPC128Constant 0xM{_hex_digit}+ // 32 hex
 digits
 HexHalfConstant 0xH{_hex_digit}+ // 4 hex digits
 HexBFloatConstant 0xR{_hex_digit}+ // 4
 hex digits
 */
fragment FloatHexLit: '0x' [KLMHR]? HexDigit+;
fragment GlobalName: '@' (Name | QuotedString);
fragment GlobalId: '@' Id;
fragment LocalName: '%' (Name | QuotedString);
fragment LocalId: '%' Id;
fragment QuotedString: '"' (~["\r\n])* '"';
Comment: ';' .*? '\r'? '\n' -> channel(HIDDEN);
WhiteSpace: [ \t\n\r]+ -> skip;
IntLit: '-'? DecimalDigit+ | IntHexLit;
FloatLit: FracLit | SciLit | FloatHexLit;
StringLit: QuotedString;
GlobalIdent: GlobalName | GlobalId;
LocalIdent: LocalName | LocalId;
LabelIdent: (Letter | DecimalDigit)+ ':' | QuotedString ':';
AttrGroupId: '#' Id;
ComdatName: '$' (Name | QuotedString);
MetadataName: '!' EscapeName;
MetadataId: '!' Id;
IntType: 'i' DecimalDigit+;
DwarfTag: 'DW_TAG_' (AsciiLetter | DecimalDigit | '_')*;
DwarfAttEncoding: 'DW_ATE_' (AsciiLetter | DecimalDigit | '_')*;
DiFlag: 'DIFlag' (AsciiLetter | DecimalDigit | '_')*;
DispFlag: 'DISPFlag' (AsciiLetter | DecimalDigit | '_')*;
DwarfLang: 'DW_LANG_' (AsciiLetter | DecimalDigit | '_')*;
DwarfCc: 'DW_CC_' (AsciiLetter | DecimalDigit | '_')*;
ChecksumKind: 'CSK_' (AsciiLetter | DecimalDigit | '_')*;
DwarfVirtuality:
	'DW_VIRTUALITY_' (AsciiLetter | DecimalDigit | '_')*;
DwarfMacinfo: 'DW_MACINFO_' (AsciiLetter | DecimalDigit | '_')*;
DwarfOp: 'DW_OP_' (AsciiLetter | DecimalDigit | '_')*;

// 在最后再增添点词法分析 注意，KwNone 和 KwDefault 需要特判
KwSourceFilename: 'source_filename';
KwTarget: 'target';
KwDatalayout: 'datalayout';
KwTriple: 'triple';
KwModule: 'module';
KwAsm: 'asm';
KwType: 'type';
KwComdat: 'comdat';
KwAny: 'any';
KwExactmatch: 'exactmatch';
KwLargest: 'largest';
KwNodeduplicate: 'nodeduplicate';
KwSamesize: 'samesize';
KwAlias: 'alias';
KwIfunc: 'ifunc';
KwDeclare: 'declare';
KwDefine: 'define';
KwAttributes: 'attributes';
KwUselistorder: 'uselistorder';
KwUselistorderBb: 'uselistorder_bb';
KwCc: 'cc';
KwGc: 'gc';
KwPrefix: 'prefix';
KwPrologue: 'prologue';
KwPersonality: 'personality';
KwRet: 'ret';
KwBr: 'br';
KwSwitch: 'switch';
KwIndirectbr: 'indirectbr';
KwResume: 'resume';
KwCatchret: 'catchret';
KwFrom: 'from';
KwTo: 'to';
KwCleanupret: 'cleanupret';
KwUnwind: 'unwind';
KwUnreachable: 'unreachable';
KwInvoke: 'invoke';
KwCallbr: 'callbr';
KwCatchswitch: 'catchswitch';
KwWithin: 'within';
KwLabel: 'label';
KwCaller: 'caller';
KwNoSanitizeAddress: 'no_sanitize_address';
KwNoSanitizeHwaddress: 'no_sanitize_hwaddress';
KwSanitizeAddressDyninit: 'sanitize_address_dyninit';
KwSanitizeMemtag: 'sanitize_memtag';
KwSection: 'section';
KwPartition: 'partition';
KwTrue: 'true';
KwFalse: 'false';
KwNull: 'null';
Kwnone: 'none';
KwC: 'c';
KwZeroinitializer: 'zeroinitializer';
KwUndef: 'undef';
KwPoison: 'poison';
KwBlockaddress: 'blockaddress';
KwDsoLocalEquivalent: 'dso_local_equivalent';
KwNoCfi: 'no_cfi';
KwSideeffect: 'sideeffect';
KwAlignstack: 'alignstack';
KwInteldialect: 'inteldialect';
KwVoid: 'void';
KwOpaque: 'opaque';
KwAlign: 'align';
KwAllockind: 'allockind';
KwAllocsize: 'allocsize';
KwUwtable: 'uwtable';
KwAsync: 'async';
KwSync: 'sync';
KwVscaleRange: 'vscale_range';
KwByref: 'byref';
KwByval: 'byval';
KwDereferenceable: 'dereferenceable';
KwDereferenceableOrNull: 'dereferenceable_or_null';
KwElementtype: 'elementtype';
KwInalloca: 'inalloca';
KwAllocalign: 'allocalign';
KwAllocptr: 'allocptr';
KwImmarg: 'immarg';
KwInreg: 'inreg';
KwNest: 'nest';
KwNoalias: 'noalias';
KwNocapture: 'nocapture';
KwNofree: 'nofree';
KwNonnull: 'nonnull';
KwNoundef: 'noundef';
KwReadnone: 'readnone';
KwReadonly: 'readonly';
KwReturned: 'returned';
KwSignext: 'signext';
KwSwiftasync: 'swiftasync';
KwSwifterror: 'swifterror';
KwSwiftself: 'swiftself';
KwWriteonly: 'writeonly';
KwZeroext: 'zeroext';
KwPreallocated: 'preallocated';
KwSret: 'sret';
KwX: 'x';
KwVscale: 'vscale';
KwX86Mmx: 'x86_mmx';
KwToken: 'token';
KwPtr: 'ptr';
KwAddrspace: 'addrspace';
KwThreadLocal: 'thread_local';
KwMetadata: 'metadata';
KwBitcast: 'bitcast';
KwGetelementptr: 'getelementptr';
KwInrange: 'inrange';
KwAddrspacecast: 'addrspacecast';
KwInttoptr: 'inttoptr';
KwIcmp: 'icmp';
KwFcmp: 'fcmp';
KwSelect: 'select';
KwTrunc: 'trunc';
KwZext: 'zext';
KwSext: 'sext';
KwFptrunc: 'fptrunc';
KwFpext: 'fpext';
KwFptoui: 'fptoui';
KwFptosi: 'fptosi';
KwUitofp: 'uitofp';
KwSitofp: 'sitofp';
KwPtrtoint: 'ptrtoint';
KwExtractelement: 'extractelement';
KwInsertelement: 'insertelement';
KwShufflevector: 'shufflevector';
KwShl: 'shl';
KwLshr: 'lshr';
KwExact: 'exact';
KwAshr: 'ashr';
KwAnd: 'and';
KwOr: 'or';
KwXor: 'xor';
KwAdd: 'add';
KwSub: 'sub';
KwMul: 'mul';
KwFneg: 'fneg';
KwStore: 'store';
KwVolatile: 'volatile';
KwAtomic: 'atomic';
KwSyncscope: 'syncscope';
KwFence: 'fence';
KwFadd: 'fadd';
KwFsub: 'fsub';
KwFmul: 'fmul';
KwUdiv: 'udiv';
KwSdiv: 'sdiv';
KwFdiv: 'fdiv';
KwUrem: 'urem';
KwSrem: 'srem';
KwFrem: 'frem';
KwExtractvalue: 'extractvalue';
KwInsertvalue: 'insertvalue';
KwAlloca: 'alloca';
KwLoad: 'load';
KwCmpxchg: 'cmpxchg';
KwWeak: 'weak';
KwAtomicrmw: 'atomicrmw';
KwPhi: 'phi';
KwFreeze: 'freeze';
KwMusttail: 'musttail';
KwNotail: 'notail';
KwTail: 'tail';
KwCall: 'call';
KwVaArg: 'va_arg';
KwLandingpad: 'landingpad';
KwCleanup: 'cleanup';
KwCatchpad: 'catchpad';
KwCleanuppad: 'cleanuppad';
KwCatch: 'catch';
KwFilter: 'filter';
KwExternWeak: 'extern_weak';
KwExternal: 'external';
KwAppending: 'appending';
KwAvailableExternally: 'available_externally';
KwCommon: 'common';
KwInternal: 'internal';
KwLinkonce: 'linkonce';
KwLinkonceOdr: 'linkonce_odr';
KwPrivate: 'private';
KwWeakOdr: 'weak_odr';
KwDsoLocal: 'dso_local';
KwDsoPreemptable: 'dso_preemptable';
Kwdefault: 'default';
KwHidden: 'hidden';
KwProtected: 'protected';
KwDllexport: 'dllexport';
KwDllimport: 'dllimport';
KwInitialexec: 'initialexec';
KwLocaldynamic: 'localdynamic';
KwLocalexec: 'localexec';
KwLocalUnnamedAddr: 'local_unnamed_addr';
KwUnnamedAddr: 'unnamed_addr';
KwExternallyInitialized: 'externally_initialized';
KwConstant: 'constant';
KwGlobal: 'global';
KwAlwaysinline: 'alwaysinline';
KwArgmemonly: 'argmemonly';
KwBuiltin: 'builtin';
KwCold: 'cold';
KwConvergent: 'convergent';
KwDisableSanitizerInstrumentation:
	'disable_sanitizer_instrumentation';
KwFnRetThunkExtern: 'fn_ret_thunk_extern';
KwHot: 'hot';
KwInaccessiblememOrArgmemonly: 'inaccessiblemem_or_argmemonly';
KwInaccessiblememonly: 'inaccessiblememonly';
KwInlinehint: 'inlinehint';
KwJumptable: 'jumptable';
KwMinsize: 'minsize';
KwMustprogress: 'mustprogress';
KwNaked: 'naked';
KwNobuiltin: 'nobuiltin';
KwNocallback: 'nocallback';
KwNocfCheck: 'nocf_check';
KwNoduplicate: 'noduplicate';
KwNoimplicitfloat: 'noimplicitfloat';
KwNoinline: 'noinline';
KwNomerge: 'nomerge';
KwNonlazybind: 'nonlazybind';
KwNoprofile: 'noprofile';
KwNorecurse: 'norecurse';
KwNoredzone: 'noredzone';
KwNoreturn: 'noreturn';
KwNosanitizeBounds: 'nosanitize_bounds';
KwNosanitizeCoverage: 'nosanitize_coverage';
KwNosync: 'nosync';
KwNounwind: 'nounwind';
KwNullPointerIsValid: 'null_pointer_is_valid';
KwOptforfuzzing: 'optforfuzzing';
KwOptnone: 'optnone';
KwOptsize: 'optsize';
KwPresplitcoroutine: 'presplitcoroutine';
KwReturnsTwice: 'returns_twice';
KwSafestack: 'safestack';
KwSanitizeAddress: 'sanitize_address';
KwSanitizeHwaddress: 'sanitize_hwaddress';
KwSanitizeMemory: 'sanitize_memory';
KwSanitizeThread: 'sanitize_thread';
KwShadowcallstack: 'shadowcallstack';
KwSpeculatable: 'speculatable';
KwSpeculativeLoadHardening: 'speculative_load_hardening';
KwSsp: 'ssp';
KwSspreq: 'sspreq';
KwSspstrong: 'sspstrong';
KwStrictfp: 'strictfp';
KwWillreturn: 'willreturn';
KwDistinct: 'distinct';
KwInbounds: 'inbounds';
KwNsw: 'nsw';
KwNuw: 'nuw';
KwEq: 'eq';
KwNe: 'ne';
KwSge: 'sge';
KwSgt: 'sgt';
KwSle: 'sle';
KwSlt: 'slt';
KwUge: 'uge';
KwUgt: 'ugt';
KwUle: 'ule';
KwUlt: 'ult';
KwOeq: 'oeq';
KwOge: 'oge';
KwOgt: 'ogt';
KwOle: 'ole';
KwOlt: 'olt';
KwOne: 'one';
KwOrd: 'ord';
KwUeq: 'ueq';
KwUne: 'une';
KwUno: 'uno';
KwAcqRel: 'acq_rel';
KwAcquire: 'acquire';
KwMonotonic: 'monotonic';
KwRelease: 'release';
KwSeqCst: 'seq_cst';
KwUnordered: 'unordered';
KwAarch64SveVectorPcs: 'aarch64_sve_vector_pcs';
KwAarch64VectorPcs: 'aarch64_vector_pcs';
KwAmdgpuCs: 'amdgpu_cs';
KwAmdgpuEs: 'amdgpu_es';
KwAmdgpuGfx: 'amdgpu_gfx';
KwAmdgpuGs: 'amdgpu_gs';
KwAmdgpuHs: 'amdgpu_hs';
KwAmdgpuKernel: 'amdgpu_kernel';
KwAmdgpuLs: 'amdgpu_ls';
KwAmdgpuPs: 'amdgpu_ps';
KwAmdgpuVs: 'amdgpu_vs';
KwAnyregcc: 'anyregcc';
KwArmAapcsVfpcc: 'arm_aapcs_vfpcc';
KwArmAapcscc: 'arm_aapcscc';
KwArmApcscc: 'arm_apcscc';
KwAvrIntrcc: 'avr_intrcc';
KwAvrSignalcc: 'avr_signalcc';
KwCcc: 'ccc';
KwCfguardCheckcc: 'cfguard_checkcc';
KwColdcc: 'coldcc';
KwCxxFastTlscc: 'cxx_fast_tlscc';
KwFastcc: 'fastcc';
KwGhccc: 'ghccc';
KwHhvmCcc: 'hhvm_ccc';
KwHhvmcc: 'hhvmcc';
KwIntelOclBicc: 'intel_ocl_bicc';
KwMsp430Intrcc: 'msp430_intrcc';
KwPreserveAllcc: 'preserve_allcc';
KwPreserveMostcc: 'preserve_mostcc';
KwPtxDevice: 'ptx_device';
KwPtxKernel: 'ptx_kernel';
KwSpirFunc: 'spir_func';
KwSpirKernel: 'spir_kernel';
KwSwiftcc: 'swiftcc';
KwSwifttailcc: 'swifttailcc';
KwTailcc: 'tailcc';
KwWebkitJscc: 'webkit_jscc';
KwWin64cc: 'win64cc';
KwX8664Sysvcc: 'x86_64_sysvcc';
KwX86Fastcallcc: 'x86_fastcallcc';
KwX86Intrcc: 'x86_intrcc';
KwX86Regcallcc: 'x86_regcallcc';
KwX86Stdcallcc: 'x86_stdcallcc';
KwX86Thiscallcc: 'x86_thiscallcc';
KwX86Vectorcallcc: 'x86_vectorcallcc';
KwAfn: 'afn';
KwArcp: 'arcp';
KwContract: 'contract';
KwFast: 'fast';
KwNinf: 'ninf';
KwNnan: 'nnan';
KwNsz: 'nsz';
KwReassoc: 'reassoc';
KwFmax: 'fmax';
KwFmin: 'fmin';
KwMax: 'max';
KwMin: 'min';
KwNand: 'nand';
KwUmax: 'umax';
KwUmin: 'umin';
KwXchg: 'xchg';
KwHalf: 'half';
KwBfloat: 'bfloat';
KwFloat: 'float';
KwDouble: 'double';
KwX86Fp80: 'x86_fp80';
KwFp128: 'fp128';
KwPpcFp128: 'ppc_fp128';
KwTagLabel: 'tag:';
KwHeaderLabel: 'header:';
KwOperandsLabel: 'operands:';
KwNameLabel: 'name:';
KwTypeLabel: 'type:';
KwDefaultedLabel: 'defaulted:';
KwValueLabel: 'value:';
KwFlagsLabel: 'flags:';
KwCcLabel: 'cc:';
KwAlignLabel: 'align:';
KwAllocatedLabel: 'allocated:';
KwAnnotationsLabel: 'annotations:';
KwArgLabel: 'arg:';
KwAssociatedLabel: 'associated:';
KwAttributesLabel: 'attributes:';
KwBaseTypeLabel: 'baseType:';
KwChecksumLabel: 'checksum:';
KwChecksumkindLabel: 'checksumkind:';
KwColumnLabel: 'column:';
KwConfigMacrosLabel: 'configMacros:';
KwContainingTypeLabel: 'containingType:';
KwCountLabel: 'count:';
KwDebugInfoForProfilingLabel: 'debugInfoForProfiling:';
KwDeclarationLabel: 'declaration:';
KwDirectoryLabel: 'directory:';
KwDiscriminatorLabel: 'discriminator:';
KwDataLocationLabel: 'dataLocation:';
KwDwarfAddressSpaceLabel: 'dwarfAddressSpace:';
KwDwoIdLabel: 'dwoId:';
KwElementsLabel: 'elements:';
KwEmissionKindLabel: 'emissionKind:';
KwDebugDirectivesOnly: 'DebugDirectivesOnly';
KwFullDebug: 'FullDebug';
KwLineTablesOnly: 'LineTablesOnly';
KwNoDebug: 'NoDebug';
KwEncodingLabel: 'encoding:';
KwEntityLabel: 'entity:';
KwEnumsLabel: 'enums:';
KwExportSymbolsLabel: 'exportSymbols:';
KwExprLabel: 'expr:';
KwExtraDataLabel: 'extraData:';
KwFileLabel: 'file:';
KwFilenameLabel: 'filename:';
KwGetterLabel: 'getter:';
KwGlobalsLabel: 'globals:';
KwIdentifierLabel: 'identifier:';
KwImportsLabel: 'imports:';
KwIncludePathLabel: 'includePath:';
KwInlinedAtLabel: 'inlinedAt:';
KwIsDeclLabel: 'isDecl:';
KwIsDefinitionLabel: 'isDefinition:';
KwIsImplicitCodeLabel: 'isImplicitCode:';
KwIsLocalLabel: 'isLocal:';
KwIsOptimizedLabel: 'isOptimized:';
KwIsUnsignedLabel: 'isUnsigned:';
KwApinotesLabel: 'apinotes:';
KwLanguageLabel: 'language:';
KwLineLabel: 'line:';
KwLinkageNameLabel: 'linkageName:';
KwLowerBoundLabel: 'lowerBound:';
KwMacrosLabel: 'macros:';
KwNameTableKindLabel: 'nameTableKind:';
KwGNU: 'GNU';
KwNone: 'None';
KwDefault: 'Default';
KwNodesLabel: 'nodes:';
KwOffsetLabel: 'offset:';
KwProducerLabel: 'producer:';
KwRangesBaseAddressLabel: 'rangesBaseAddress:';
KwRankLabel: 'rank:';
KwRetainedNodesLabel: 'retainedNodes:';
KwRetainedTypesLabel: 'retainedTypes:';
KwRuntimeLangLabel: 'runtimeLang:';
KwRuntimeVersionLabel: 'runtimeVersion:';
KwScopeLabel: 'scope:';
KwScopeLineLabel: 'scopeLine:';
KwSdkLabel: 'sdk:';
KwSetterLabel: 'setter:';
KwSizeLabel: 'size:';
KwSourceLabel: 'source:';
KwSpFlagsLabel: 'spFlags:';
KwSplitDebugFilenameLabel: 'splitDebugFilename:';
KwSplitDebugInliningLabel: 'splitDebugInlining:';
KwStrideLabel: 'stride:';
KwStringLengthLabel: 'stringLength:';
KwStringLengthExpressionLabel: 'stringLengthExpression:';
KwStringLocationExpressionLabel: 'stringLocationExpression:';
KwSysrootLabel: 'sysroot:';
KwTargetFuncNameLabel: 'targetFuncName:';
KwTemplateParamsLabel: 'templateParams:';
KwThisAdjustmentLabel: 'thisAdjustment:';
KwThrownTypesLabel: 'thrownTypes:';
KwTypesLabel: 'types:';
KwUnitLabel: 'unit:';
KwUpperBoundLabel: 'upperBound:';
KwVarLabel: 'var:';
KwVirtualIndexLabel: 'virtualIndex:';
KwVirtualityLabel: 'virtuality:';
KwVtableHolderLabel: 'vtableHolder:';

// 标点符号
Comma: ',';
SemiColon: ';';
Equal: '=';
LBraces: '{';
RBraces: '}';
Pipe: '|';
Exclamation: '!';
LParenthesis: '(';
RParenthesis: ')';
LBracket: '[';
RBracket: ']';
Ellipsis: '...';
LAngleBrackets: '<';
RAngleBrackets: '>';
Asterisk: '*';

DIExpression: '!DIExpression';
DIArgList: '!DIArgList';
DIBasicType: '!DIBasicType';
DICommonBlock: '!DICommonBlock';
DICompileUnit: '!DICompileUnit';
DICompositeType: '!DICompositeType';
DIDerivedType: '!DIDerivedType';
DIEnumerator: '!DIEnumerator';
DIFile: '!DIFile';
DIGlobalVariable: '!DIGlobalVariable';
DIGlobalVariableExpression: '!DIGlobalVariableExpression';
DIImportedEntity: '!DIImportedEntity';
DILabel: '!DILabel';
DILexicalBlock: '!DILexicalBlock';
DILexicalBlockFile: '!DILexicalBlockFile';
DILocalVariable: '!DILocalVariable';
DILocation: '!DILocation';
DIMacro: '!DIMacro';
DIMacroFile: '!DIMacroFile';
DIModule: '!DIModule';
DINamespace: '!DINamespace';
DIObjCProperty: '!DIObjCProperty';
DIStringType: '!DIStringType';
DISubprogram: '!DISubprogram';
DISubroutineType: '!DISubroutineType';
DITemplateTypeParameter: '!DITemplateTypeParameter';
DITemplateValueParameter: '!DITemplateValueParameter';
GenericDINode: '!GenericDINode';
