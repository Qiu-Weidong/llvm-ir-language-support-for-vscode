grammar LLVMIR;

compilationUnit: topLevelEntity* EOF;

targetDef: targetDataLayout | targetTriple;
sourceFilename: 'source_filename' '=' StringLit;
targetDataLayout: 'target' 'datalayout' '=' StringLit;
targetTriple: 'target' 'triple' '=' StringLit;

topLevelEntity:
	sourceFilename
	| targetDef
	| moduleAsm
	| typeDef
	| comdatDef
	| globalDecl
	| globalDef
	| indirectSymbolDef
	| funcDecl
	| funcDef
	| attrGroupDef
	| namedMetadataDef
	| metadataDef
	| useListOrder
	| useListOrderBB;
moduleAsm: 'module' 'asm' StringLit;
typeDef: LocalIdent '=' 'type' type;
comdatDef:
	ComdatName '=' 'comdat' selectionKind = (
		'any'
		| 'exactmatch'
		| 'largest'
		| 'nodeduplicate'
		| 'samesize'
	);
globalDecl:
	GlobalIdent '=' externalLinkage preemption? visibility? dllStorageClass? threadLocal?
		unnamedAddr? addrSpace? externallyInitialized? immutable type (
		',' globalField
	)* (',' metadataAttachment)* funcAttribute*;
globalDef:
	GlobalIdent '=' internalLinkage? preemption? visibility? dllStorageClass? threadLocal?
		unnamedAddr? addrSpace? externallyInitialized? immutable type constant (
		',' globalField
	)* (',' metadataAttachment)* funcAttribute*;

indirectSymbolDef:
	GlobalIdent '=' linkage? preemption? visibility? dllStorageClass? threadLocal? unnamedAddr?
		indirectSymbolKind = ('alias' | 'ifunc') type ',' indirectSymbol (
		',' partition
	)*;

funcDecl: 'declare' metadataAttachment* funcHeader;
funcDef: 'define' funcHeader metadataAttachment* funcBody;
attrGroupDef:
	'attributes' AttrGroupId '=' '{' funcAttribute* '}';
namedMetadataDef:
	MetadataName '=' '!' '{' (metadataNode (',' metadataNode)*)? '}';
metadataDef:
	MetadataId '=' distinct? (mdTuple | specializedMDNode);
useListOrder:
	'uselistorder' typeValue ',' '{' IntLit (',' IntLit)* '}';
useListOrderBB:
	'uselistorder_bb' GlobalIdent ',' LocalIdent ',' '{' IntLit (
		',' IntLit
	)* '}';

funcHeader:
	linkage? preemption? visibility? dllStorageClass? callingConv? returnAttribute* type GlobalIdent
		'(' params ')' unnamedAddr? addrSpace? funcHdrField*;
indirectSymbol:
	typeConst
	| bitCastExpr
	| getElementPtrExpr
	| addrSpaceCastExpr
	| intToPtrExpr;
callingConv: callingConvEnum | callingConvInt;
callingConvInt: 'cc' IntLit;
funcHdrField:
	funcAttribute
	| section
	| partition
	| comdat
	| align
	| gc
	| prefix
	| prologue
	| personality;
gc: 'gc' StringLit;
prefix: 'prefix' typeConst;
prologue: 'prologue' typeConst;
personality: 'personality' typeConst;
returnAttribute: returnAttr | dereferenceable;
funcBody: '{' basicBlock+ useListOrder* '}';
basicBlock: LabelIdent? instruction* terminator;
instruction: // Instructions producing values.
	localDefInst
	| valueInstruction
	// Instructions not producing values.
	| storeInst
	| fenceInst;
terminator:
	// Terminators producing values.
	localDefTerm
	| valueTerminator
	// Terminators not producing values.
	| retTerm
	| brTerm
	| condBrTerm
	| switchTerm
	| indirectBrTerm
	| resumeTerm
	| catchRetTerm
	| cleanupRetTerm
	| unreachableTerm;
localDefTerm: LocalIdent '=' valueTerminator;
valueTerminator: invokeTerm | callBrTerm | catchSwitchTerm;
retTerm:
	'ret' voidType (',' metadataAttachment)*
	// Value return.
	| 'ret' concreteType value (',' metadataAttachment)*;
brTerm: 'br' label (',' metadataAttachment)*;
condBrTerm:
	'br' IntType value ',' label ',' label (
		',' metadataAttachment
	)*;
switchTerm:
	'switch' typeValue ',' label '[' case* ']' (
		',' metadataAttachment
	)*;
indirectBrTerm:
	'indirectbr' typeValue ',' '[' (label (',' label)?)? ']' (
		',' metadataAttachment
	)*;
resumeTerm: 'resume' typeValue (',' metadataAttachment)*;
catchRetTerm:
	'catchret' 'from' value 'to' label (',' metadataAttachment)*;
cleanupRetTerm:
	'cleanupret' 'from' value 'unwind' unwindTarget (
		',' metadataAttachment
	)*;
unreachableTerm: 'unreachable' (',' metadataAttachment)*;
invokeTerm:
	'invoke' callingConv? returnAttribute* addrSpace? type value '(' args ')' funcAttribute* (
		'[' (operandBundle ',')+ ']'
	)? 'to' label 'unwind' label (',' metadataAttachment)*;
callBrTerm:
	'callbr' callingConv? returnAttribute* addrSpace? type value '(' args ')' funcAttribute* (
		'[' (operandBundle ',')+ ']'
	)? 'to' label '[' (label (',' label)*)? ']' (
		',' metadataAttachment
	)*;
catchSwitchTerm:
	'catchswitch' 'within' exceptionPad '[' handlers ']' 'unwind' unwindTarget (
		',' metadataAttachment
	)*;
label: 'label' LocalIdent;
case: typeConst ',' label;
unwindTarget: 'to' 'caller' | label;
handlers: label (',' label)*;
metadataNode:
	MetadataId
	// Parse DIExpressions inline as a special case. They are still MDNodes, so they can still
	// appear in named metadata. Remove this logic if they become plain Metadata.
	| diExpression;
diExpression:
	'!DIExpression' '(' (
		diExpressionField (',' diExpressionField)*
	)? ')';
diExpressionField: IntLit | DwarfAttEncoding | DwarfOp;

globalField:
	section
	| partition
	| comdat
	| align
	| sanitizerKind = (
		'no_sanitize_address'
		| 'no_sanitize_hwaddress'
		| 'sanitize_address_dyninit'
		| 'sanitize_memtag'
	);
section: 'section' StringLit;
comdat: 'comdat' ('(' ComdatName ')')?;
partition: 'partition' StringLit;

constant:
	boolConst
	| intConst
	| floatConst
	| nullConst
	| noneConst
	| structConst
	| arrayConst
	| vectorConst
	| zeroInitializerConst
	// @42 @foo
	| GlobalIdent
	| undefConst
	| poisonConst
	| blockAddressConst
	| dsoLocalEquivalentConst
	| noCFIConst
	| constantExpr;
boolConst: 'true' | 'false';
intConst: IntLit;
floatConst: FloatLit;
nullConst: 'null';
noneConst: 'none';
structConst:
	'{' (typeConst (',' typeConst)*)? '}'
	| '<' '{' ( typeConst (',' typeConst)*)? '}' '>';
arrayConst:
	'c' StringLit
	| '[' (typeConst (',' typeConst)*)? ']';
vectorConst: '<' (typeConst (',' typeConst)*)? '>';
zeroInitializerConst: 'zeroinitializer';
undefConst: 'undef';
poisonConst: 'poison';
blockAddressConst:
	'blockaddress' '(' GlobalIdent ',' LocalIdent ')';
dsoLocalEquivalentConst: 'dso_local_equivalent' GlobalIdent;
noCFIConst: 'no_cfi' GlobalIdent;
constantExpr:
	// Unary expressions
	fNegExpr
	// Binary expressions
	| addExpr
	| subExpr
	| mulExpr
	// Bitwise expressions
	| shlExpr
	| lShrExpr
	| aShrExpr
	| andExpr
	| orExpr
	| xorExpr
	// Vector expressions
	| extractElementExpr
	| insertElementExpr
	| shuffleVectorExpr
	// Memory expressions
	| getElementPtrExpr
	// Conversion expressions
	| truncExpr
	| zExtExpr
	| sExtExpr
	| fpTruncExpr
	| fpExtExpr
	| fpToUiExpr
	| fpToSiExpr
	| uiToFpExpr
	| siToFpExpr
	| ptrToIntExpr
	| intToPtrExpr
	| bitCastExpr
	| addrSpaceCastExpr
	// Other expressions
	| iCmpExpr
	| fCmpExpr
	| selectExpr;
typeConst: firstClassType constant;

metadataAttachment: MetadataName mdNode;
mdNode:
	mdTuple
	// !42
	| MetadataId
	//!{ ... }
	| specializedMDNode;
mdTuple: '!' '{' (mdField (',' mdField)*)? '}';
// metadataID: MetadataId;
metadata:
	typeValue
	| mdString
	// !{ ... }
	| mdTuple
	// !7
	| MetadataId
	| diArgList
	| specializedMDNode;
diArgList: '!DIArgList' '(' (typeValue (',' typeValue)*)? ')';
typeValue: firstClassType value;
value:
	constant
	// %42 %foo
	| LocalIdent
	// TODO: Move InlineAsm from Value to Callee and Invokee? Inline assembler expressions may only
	// be used as the callee operand of a call or an invoke instruction.
	| inlineAsm;
inlineAsm:
	'asm' sideEffect = 'sideeffect'? alignStackTok = 'alignstack'? intelDialect = 'inteldialect'?
		unwind = 'unwind'? StringLit ',' StringLit;
mdString: '!' StringLit;
mdFieldOrInt: IntLit | mdField;
diSPFlag: IntLit | DispFlag;
funcAttribute:
	attrString
	| attrPair
	// not used in attribute groups.
	| AttrGroupId
	// used in functions. | align # NOTE: removed to resolve reduce/reduce conflict, see above. used
	// in attribute groups.
	| alignPair
	| alignStack
	| alignStackPair
	| allocKind
	| allocSize
	| funcAttr
	| preallocated
	| unwindTable
	| vectorScaleRange;
type:
	voidType
	| opaqueType
	| type '(' params ')'
	| intType
	| floatType
	| type addrSpace? '*'
	| opaquePointerType
	| vectorType
	| labelType
	| arrayType
	| structType
	| namedType
	| mmxType
	| tokenType
	| metadataType;
voidType: symbol='void';
opaqueType: symbol='opaque';
params:
	ellipsis = '...'?
	| param (',' param)* (',' ellipsis = '...')?;
param: type paramAttribute* LocalIdent?;
paramAttribute:
	attrString
	| attrPair
	| align
	| alignStack
	| byRefAttr
	| byval
	| dereferenceable
	| elementType
	| inAlloca
	| paramAttr
	| preallocated
	| structRetAttr;
attrString: StringLit;
attrPair: StringLit '=' StringLit;
align: 'align' IntLit | 'align' '(' IntLit ')';
alignPair: 'align' '=' IntLit;
alignStack: 'alignstack' '(' IntLit ')';
alignStackPair: 'alignstack' '=' IntLit;
allocKind: 'allockind' '(' StringLit ')';
allocSize: 'allocsize' '(' IntLit (',' IntLit)? ')';
unwindTable:
	'uwtable'
	| 'uwtable' '(' unwindTableKind = ('async' | 'sync') ')';
vectorScaleRange:
	'vscale_range' ('(' (IntLit | IntLit ',' IntLit) ')')?;
byRefAttr: 'byref' '(' type ')';
byval: 'byval' ( '(' type ')')?;
dereferenceable:
	'dereferenceable' '(' IntLit ')'
	| 'dereferenceable_or_null' '(' IntLit ')';
elementType: 'elementtype' '(' type ')';
inAlloca: 'inalloca' '(' type ')';
paramAttr:
	'allocalign'
	| 'allocptr'
	| 'immarg'
	| 'inreg'
	| 'nest'
	| 'noalias'
	| 'nocapture'
	| 'nofree'
	| 'nonnull'
	| 'noundef'
	| 'readnone'
	| 'readonly'
	| 'returned'
	| 'signext'
	| 'swiftasync'
	| 'swifterror'
	| 'swiftself'
	| 'writeonly'
	| 'zeroext';
preallocated: 'preallocated' '(' type ')';
structRetAttr: 'sret' '(' type ')';

// funcType: type '(' params ')';
firstClassType: concreteType | metadataType;
concreteType:
	intType
	| floatType
	| pointerType
	| vectorType
	| labelType
	| arrayType
	| structType
	| namedType
	| mmxType
	| tokenType;

intType: IntType;
floatType: floatKind;
pointerType: type addrSpace? '*' | opaquePointerType;
vectorType:
	'<' IntLit 'x' type '>'
	| '<' 'vscale' 'x' IntLit 'x' type '>';
labelType: 'label';
arrayType: '[' IntLit 'x' type ']';
structType:
	'{' (type (',' type)*)? '}'
	| '<' '{' (type (',' type)*)? '}' '>';
namedType: LocalIdent;
mmxType: 'x86_mmx';
tokenType: 'token';

opaquePointerType: 'ptr' addrSpace?;
addrSpace: 'addrspace' '(' IntLit ')';
threadLocal: 'thread_local' ('(' tlsModel ')')?;
metadataType: 'metadata';

// expr
bitCastExpr: 'bitcast' '(' typeConst 'to' type ')';
getElementPtrExpr:
	'getelementptr' inBounds? '(' type ',' typeConst (
		',' gepIndex
	)* ')';
gepIndex: inRange = 'inrange'? typeConst;
addrSpaceCastExpr: 'addrspacecast' '(' typeConst 'to' type ')';
intToPtrExpr: 'inttoptr' '(' typeConst 'to' type ')';
iCmpExpr: 'icmp' iPred '(' typeConst ',' typeConst ')';
fCmpExpr: 'fcmp' fPred '(' typeConst ',' typeConst ')';
selectExpr:
	'select' '(' typeConst ',' typeConst ',' typeConst ')';
truncExpr: 'trunc' '(' typeConst 'to' type ')';
zExtExpr: 'zext' '(' typeConst 'to' type ')';
sExtExpr: 'sext' '(' typeConst 'to' type ')';
fpTruncExpr: 'fptrunc' '(' typeConst 'to' type ')';
fpExtExpr: 'fpext' '(' typeConst 'to' type ')';
fpToUiExpr: 'fptoui' '(' typeConst 'to' type ')';
fpToSiExpr: 'fptosi' '(' typeConst 'to' type ')';
uiToFpExpr: 'uitofp' '(' typeConst 'to' type ')';
siToFpExpr: 'sitofp' '(' typeConst 'to' type ')';
ptrToIntExpr: 'ptrtoint' '(' typeConst 'to' type ')';
extractElementExpr:
	'extractelement' '(' typeConst ',' typeConst ')';
insertElementExpr:
	'insertelement' '(' typeConst ',' typeConst ',' typeConst ')';
shuffleVectorExpr:
	'shufflevector' '(' typeConst ',' typeConst ',' typeConst ')';
shlExpr: 'shl' overflowFlag* '(' typeConst ',' typeConst ')';
lShrExpr:
	'lshr' exact = 'exact'? '(' typeConst ',' typeConst ')';
aShrExpr:
	'ashr' exact = 'exact'? '(' typeConst ',' typeConst ')';
andExpr: 'and' '(' typeConst ',' typeConst ')';
orExpr: 'or' '(' typeConst ',' typeConst ')';
xorExpr: 'xor' '(' typeConst ',' typeConst ')';
addExpr: 'add' overflowFlag* '(' typeConst ',' typeConst ')';
subExpr: 'sub' overflowFlag* '(' typeConst ',' typeConst ')';
mulExpr: 'mul' overflowFlag* '(' typeConst ',' typeConst ')';
fNegExpr: 'fneg' '(' typeConst ')';

// instructions
localDefInst: LocalIdent '=' valueInstruction;
valueInstruction:
	// Unary instructions
	fNegInst
	// Binary instructions
	| addInst
	| fAddInst
	| subInst
	| fSubInst
	| mulInst
	| fMulInst
	| uDivInst
	| sDivInst
	| fDivInst
	| uRemInst
	| sRemInst
	| fRemInst
	// Bitwise instructions
	| shlInst
	| lShrInst
	| aShrInst
	| andInst
	| orInst
	| xorInst
	// Vector instructions
	| extractElementInst
	| insertElementInst
	| shuffleVectorInst
	// Aggregate instructions
	| extractValueInst
	| insertValueInst
	// Memory instructions
	| allocaInst
	| loadInst
	| cmpXchgInst
	| atomicRMWInst
	| getElementPtrInst
	// Conversion instructions
	| truncInst
	| zExtInst
	| sExtInst
	| fpTruncInst
	| fpExtInst
	| fpToUiInst
	| fpToSiInst
	| uiToFpInst
	| siToFpInst
	| ptrToIntInst
	| intToPtrInst
	| bitCastInst
	| addrSpaceCastInst
	// Other instructions
	| iCmpInst
	| fCmpInst
	| phiInst
	| selectInst
	| freezeInst
	| callInst
	| vaargInst
	| landingPadInst
	| catchPadInst
	| cleanupPadInst;
storeInst:
	// Store.
	'store' volatile = 'volatile'? typeValue ',' typeValue (
		',' align
	)? (',' metadataAttachment)*
	// atomic='atomic' store.
	| 'store' atomic = 'atomic' volatile = 'volatile'? typeValue ',' typeValue syncScope?
		atomicOrdering (',' align)? (',' metadataAttachment)*;

syncScope: 'syncscope' '(' StringLit ')';

fenceInst:
	'fence' syncScope? atomicOrdering (',' metadataAttachment)*;
fNegInst:
	'fneg' fastMathFlag* typeValue (',' metadataAttachment)*;
addInst:
	'add' overflowFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
fAddInst:
	'fadd' fastMathFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
subInst:
	'sub' overflowFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
fSubInst:
	'fsub' fastMathFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
mulInst:
	'mul' overflowFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
fMulInst:
	'fmul' fastMathFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
uDivInst:
	'udiv' exact = 'exact'? typeValue ',' value (
		',' metadataAttachment
	)*;
sDivInst:
	'sdiv' exact = 'exact'? typeValue ',' value (
		',' metadataAttachment
	)*;
fDivInst:
	'fdiv' fastMathFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
uRemInst: 'urem' typeValue ',' value ( ',' metadataAttachment)*;
sRemInst: 'srem' typeValue ',' value ( ',' metadataAttachment)*;
fRemInst:
	'frem' fastMathFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
shlInst:
	'shl' overflowFlag* typeValue ',' value (
		',' metadataAttachment
	)*;
lShrInst:
	'lshr' exact = 'exact'? typeValue ',' value (
		',' metadataAttachment
	)*;
aShrInst:
	'ashr' exact = 'exact'? typeValue ',' value (
		',' metadataAttachment
	)*;
andInst: 'and' typeValue ',' value ( ',' metadataAttachment)*;
orInst: 'or' typeValue ',' value ( ',' metadataAttachment)*;
xorInst: 'xor' typeValue ',' value ( ',' metadataAttachment)*;
extractElementInst:
	'extractelement' typeValue ',' typeValue (
		',' metadataAttachment
	)*;
insertElementInst:
	'insertelement' typeValue ',' typeValue ',' typeValue (
		',' metadataAttachment
	)*;
shuffleVectorInst:
	'shufflevector' typeValue ',' typeValue ',' typeValue (
		',' metadataAttachment
	)*;
extractValueInst:
	'extractvalue' typeValue (',' IntLit)+ (
		',' metadataAttachment
	)*;
insertValueInst:
	'insertvalue' typeValue ',' typeValue (',' IntLit)+ (
		',' metadataAttachment
	)*;
allocaInst:
	'alloca' inAllocaTok = 'inalloca'? swiftError = 'swifterror'? type (
		',' typeValue
	)? (',' align)? (',' addrSpace)? (',' metadataAttachment)*;
loadInst:
	// Load.
	'load' volatile = 'volatile'? type ',' typeValue (',' align)? (
		',' metadataAttachment
	)*
	// atomic='atomic' load.
	| 'load' atomic = 'atomic' volatile = 'volatile'? type ',' typeValue syncScope? atomicOrdering (
		',' align
	)? (',' metadataAttachment)*;
cmpXchgInst:
	'cmpxchg' weak = 'weak'? volatile = 'volatile'? typeValue ',' typeValue ',' typeValue syncScope?
		atomicOrdering atomicOrdering (',' align)? (
		',' metadataAttachment
	)*;
atomicRMWInst:
	'atomicrmw' volatile = 'volatile'? atomicOp typeValue ',' typeValue syncScope? atomicOrdering (
		',' align
	)? (',' metadataAttachment)*;
getElementPtrInst:
	'getelementptr' inBounds? type ',' typeValue (',' typeValue)* (
		',' metadataAttachment
	)*;
truncInst:
	'trunc' typeValue 'to' type (',' metadataAttachment)*;
zExtInst: 'zext' typeValue 'to' type ( ',' metadataAttachment)*;
sExtInst: 'sext' typeValue 'to' type ( ',' metadataAttachment)*;
fpTruncInst:
	'fptrunc' typeValue 'to' type (',' metadataAttachment)*;
fpExtInst:
	'fpext' typeValue 'to' type (',' metadataAttachment)*;
fpToUiInst:
	'fptoui' typeValue 'to' type (',' metadataAttachment)*;
fpToSiInst:
	'fptosi' typeValue 'to' type (',' metadataAttachment)*;
uiToFpInst:
	'uitofp' typeValue 'to' type (',' metadataAttachment)*;
siToFpInst:
	'sitofp' typeValue 'to' type (',' metadataAttachment)*;
ptrToIntInst:
	'ptrtoint' typeValue 'to' type (',' metadataAttachment)*;
intToPtrInst:
	'inttoptr' typeValue 'to' type (',' metadataAttachment)*;
bitCastInst:
	'bitcast' typeValue 'to' type (',' metadataAttachment)*;
addrSpaceCastInst:
	'addrspacecast' typeValue 'to' type (',' metadataAttachment)*;
iCmpInst:
	'icmp' iPred typeValue ',' value (',' metadataAttachment)*;
fCmpInst:
	'fcmp' fastMathFlag* fPred typeValue ',' value (
		',' metadataAttachment
	)*;
phiInst:
	'phi' fastMathFlag* type (inc (',' inc)*) (
		',' metadataAttachment
	)*;
selectInst:
	'select' fastMathFlag* typeValue ',' typeValue ',' typeValue (
		',' metadataAttachment
	)*;
freezeInst: 'freeze' typeValue;
callInst:
	tail = ('musttail' | 'notail' | 'tail')? 'call' fastMathFlag* callingConv? returnAttribute*
		addrSpace? type value '(' args ')' funcAttribute* (
		'[' operandBundle (',' operandBundle)* ']'
	)? (',' metadataAttachment)*;
vaargInst:
	'va_arg' typeValue ',' type (',' metadataAttachment)*;
landingPadInst:
	'landingpad' type cleanUp = 'cleanup'? clause* (
		',' metadataAttachment
	)*;
catchPadInst:
	'catchpad' 'within' LocalIdent '[' (
		exceptionArg (',' exceptionArg)*
	)? ']' (',' metadataAttachment)*;
cleanupPadInst:
	'cleanuppad' 'within' exceptionPad '[' (
		exceptionArg (',' exceptionArg)*
	)? ']' (',' metadataAttachment)*;

inc: '[' value ',' LocalIdent ']';

operandBundle: StringLit '(' (typeValue (',' typeValue)*)? ')';
clause: clauseType = ('catch' | 'filter') typeValue;

args:
	ellipsis = '...'?
	| arg (',' arg)* (',' ellipsis = '...')?;
arg: concreteType paramAttribute* value | metadataType metadata;

exceptionArg: concreteType value | metadataType metadata;
exceptionPad: noneConst | LocalIdent;

externalLinkage: 'extern_weak' | 'external';
internalLinkage:
	'appending'
	| 'available_externally'
	| 'common'
	| 'internal'
	| 'linkonce'
	| 'linkonce_odr'
	| 'private'
	| 'weak'
	| 'weak_odr';
linkage: internalLinkage | externalLinkage;
preemption: 'dso_local' | 'dso_preemptable';
visibility: 'default' | 'hidden' | 'protected';
dllStorageClass: 'dllexport' | 'dllimport';
tlsModel: 'initialexec' | 'localdynamic' | 'localexec';
unnamedAddr: 'local_unnamed_addr' | 'unnamed_addr';
externallyInitialized: 'externally_initialized';
immutable: 'constant' | 'global';
funcAttr:
	'alwaysinline'
	| 'argmemonly'
	| 'builtin'
	| 'cold'
	| 'convergent'
	| 'disable_sanitizer_instrumentation'
	| 'fn_ret_thunk_extern'
	| 'hot'
	| 'inaccessiblemem_or_argmemonly'
	| 'inaccessiblememonly'
	| 'inlinehint'
	| 'jumptable'
	| 'minsize'
	| 'mustprogress'
	| 'naked'
	| 'nobuiltin'
	| 'nocallback'
	| 'nocf_check'
	| 'noduplicate'
	| 'nofree'
	| 'noimplicitfloat'
	| 'noinline'
	| 'nomerge'
	| 'nonlazybind'
	| 'noprofile'
	| 'norecurse'
	| 'noredzone'
	| 'noreturn'
	| 'nosanitize_bounds'
	| 'nosanitize_coverage'
	| 'nosync'
	| 'nounwind'
	| 'null_pointer_is_valid'
	| 'optforfuzzing'
	| 'optnone'
	| 'optsize'
	| 'presplitcoroutine'
	| 'readnone'
	| 'readonly'
	| 'returns_twice'
	| 'safestack'
	| 'sanitize_address'
	| 'sanitize_hwaddress'
	| 'sanitize_memory'
	| 'sanitize_memtag'
	| 'sanitize_thread'
	| 'shadowcallstack'
	| 'speculatable'
	| 'speculative_load_hardening'
	| 'ssp'
	| 'sspreq'
	| 'sspstrong'
	| 'strictfp'
	| 'willreturn'
	| 'writeonly';
distinct: 'distinct';
inBounds: 'inbounds';
returnAttr:
	'inreg'
	| 'noalias'
	| 'nonnull'
	| 'noundef'
	| 'signext'
	| 'zeroext';
overflowFlag: 'nsw' | 'nuw';
iPred:
	'eq'
	| 'ne'
	| 'sge'
	| 'sgt'
	| 'sle'
	| 'slt'
	| 'uge'
	| 'ugt'
	| 'ule'
	| 'ult';
fPred:
	'false'
	| 'oeq'
	| 'oge'
	| 'ogt'
	| 'ole'
	| 'olt'
	| 'one'
	| 'ord'
	| 'true'
	| 'ueq'
	| 'uge'
	| 'ugt'
	| 'ule'
	| 'ult'
	| 'une'
	| 'uno';
atomicOrdering:
	'acq_rel'
	| 'acquire'
	| 'monotonic'
	| 'release'
	| 'seq_cst'
	| 'unordered';
callingConvEnum:
	'aarch64_sve_vector_pcs'
	| 'aarch64_vector_pcs'
	| 'amdgpu_cs'
	| 'amdgpu_es'
	| 'amdgpu_gfx'
	| 'amdgpu_gs'
	| 'amdgpu_hs'
	| 'amdgpu_kernel'
	| 'amdgpu_ls'
	| 'amdgpu_ps'
	| 'amdgpu_vs'
	| 'anyregcc'
	| 'arm_aapcs_vfpcc'
	| 'arm_aapcscc'
	| 'arm_apcscc'
	| 'avr_intrcc'
	| 'avr_signalcc'
	| 'ccc'
	| 'cfguard_checkcc'
	| 'coldcc'
	| 'cxx_fast_tlscc'
	| 'fastcc'
	| 'ghccc'
	| 'hhvm_ccc'
	| 'hhvmcc'
	| 'intel_ocl_bicc'
	| 'msp430_intrcc'
	| 'preserve_allcc'
	| 'preserve_mostcc'
	| 'ptx_device'
	| 'ptx_kernel'
	| 'spir_func'
	| 'spir_kernel'
	| 'swiftcc'
	| 'swifttailcc'
	| 'tailcc'
	| 'webkit_jscc'
	| 'win64cc'
	| 'x86_64_sysvcc'
	| 'x86_fastcallcc'
	| 'x86_intrcc'
	| 'x86_regcallcc'
	| 'x86_stdcallcc'
	| 'x86_thiscallcc'
	| 'x86_vectorcallcc';

fastMathFlag:
	'afn'
	| 'arcp'
	| 'contract'
	| 'fast'
	| 'ninf'
	| 'nnan'
	| 'nsz'
	| 'reassoc';
atomicOp:
	'add'
	| 'and'
	| 'fadd'
	| 'fmax'
	| 'fmin'
	| 'fsub'
	| 'max'
	| 'min'
	| 'nand'
	| 'or'
	| 'sub'
	| 'umax'
	| 'umin'
	| 'xchg'
	| 'xor';
floatKind:
	'half'
	| 'bfloat'
	| 'float'
	| 'double'
	| 'x86_fp80'
	| 'fp128'
	| 'ppc_fp128';
/*看不懂，直接抄过来的 */
specializedMDNode:
	diBasicType
	| diCommonBlock // not in spec as of 2019-12-05
	| diCompileUnit
	| diCompositeType
	| diDerivedType
	| diEnumerator
	| diExpression
	| diFile
	| diGlobalVariable
	| diGlobalVariableExpression
	| diImportedEntity
	| diLabel // not in spec as of 2018-10-14, still not in spec as of 2019-12-05
	| diLexicalBlock
	| diLexicalBlockFile
	| diLocalVariable
	| diLocation
	| diMacro
	| diMacroFile
	| diModule // not in spec as of 2018-02-21, still not in spec as of 2019-12-05
	| diNamespace
	| diObjCProperty
	| diStringType
	| diSubprogram
	| diSubrange
	| diSubroutineType
	| diTemplateTypeParameter
	| diTemplateValueParameter
	| genericDiNode; // not in spec as of 2018-02-21, still not in spec as of 2019-12-05

diBasicType:
	'!DIBasicType' '(' (diBasicTypeField (',' diBasicTypeField)*)? ')';
diCommonBlock:
	'!DICommonBlock' '(' (
		diCommonBlockField (',' diCommonBlockField)*
	)? ')';
diCompileUnit:
	'!DICompileUnit' '(' (
		diCompileUnitField (',' diCompileUnitField)*
	)? ')';
diCompositeType:
	'!DICompositeType' '(' (
		diCompositeTypeField (',' diCompositeTypeField)*
	)? ')';
diCompositeTypeField:
	tagField
	| nameField
	| scopeField
	| fileField
	| lineField
	| baseTypeField
	| sizeField
	| alignField
	| offsetField
	| flagsField
	| elementsField
	| runtimeLangField
	| vtableHolderField
	| templateParamsField
	| identifierField
	| discriminatorField
	| dataLocationField
	| associatedField
	| allocatedField
	| rankField
	| annotationsField;
diDerivedType:
	'!DIDerivedType' '(' (
		diDerivedTypeField (',' diDerivedTypeField)*
	)? ')';
diDerivedTypeField:
	tagField
	| nameField
	| scopeField
	| fileField
	| lineField
	| baseTypeField
	| sizeField
	| alignField
	| offsetField
	| flagsField
	| extraDataField
	| dwarfAddressSpaceField
	| annotationsField;
diEnumerator:
	'!DIEnumerator' '(' (
		diEnumeratorField (',' diEnumeratorField)*
	)? ')';
diEnumeratorField: nameField | valueIntField | isUnsignedField;
diFile: '!DIFile' '(' (diFileField (',' diFileField)*)? ')';
diFileField:
	filenameField
	| directoryField
	| checksumkindField
	| checksumField
	| sourceField;
diGlobalVariable:
	'!DIGlobalVariable' '(' (
		diGlobalVariableField (',' diGlobalVariableField)*
	)? ')';
diGlobalVariableField:
	nameField
	| scopeField
	| linkageNameField
	| fileField
	| lineField
	| typeField
	| isLocalField
	| isDefinitionField
	| templateParamsField
	| declarationField
	| alignField
	| annotationsField;
diGlobalVariableExpression:
	'!DIGlobalVariableExpression' '(' (
		diGlobalVariableExpressionField (
			',' diGlobalVariableExpressionField
		)*
	)? ')';
diGlobalVariableExpressionField: varField | exprField;
diImportedEntity:
	'!DIImportedEntity' '(' (
		diImportedEntityField (',' diImportedEntityField)*
	)? ')';
diImportedEntityField:
	tagField
	| scopeField
	| entityField
	| fileField
	| lineField
	| nameField
	| elementsField;

diLabel: '!DILabel' '(' (diLabelField (',' diLabelField)*)? ')';
diLabelField: scopeField | nameField | fileField | lineField;
diLexicalBlock:
	'!DILexicalBlock' '(' (
		diLexicalBlockField (',' diLexicalBlockField)*
	)? ')';
diLexicalBlockField:
	scopeField
	| fileField
	| lineField
	| columnField;
diLexicalBlockFile:
	'!DILexicalBlockFile' '(' (
		diLexicalBlockFileField (',' diLexicalBlockFileField)*
	)? ')';
diLexicalBlockFileField:
	scopeField
	| fileField
	| discriminatorIntField;
diLocalVariable:
	'!DILocalVariable' '(' (
		diLocalVariableField (',' diLocalVariableField)*
	)? ')';
diLocalVariableField:
	scopeField
	| nameField
	| argField
	| fileField
	| lineField
	| typeField
	| flagsField
	| alignField
	| annotationsField;
diLocation:
	'!DILocation' '(' (diLocationField (',' diLocationField)*)? ')';
diLocationField:
	lineField
	| columnField
	| scopeField
	| inlinedAtField
	| isImplicitCodeField;
diMacro: '!DIMacro' '(' (diMacroField (',' diMacroField)*)? ')';
diMacroField:
	typeMacinfoField
	| lineField
	| nameField
	| valueStringField;
diMacroFile:
	'!DIMacroFile' '(' (diMacroFileField (',' diMacroFileField)*)? ')';
diMacroFileField:
	typeMacinfoField
	| lineField
	| fileField
	| nodesField;
diModule:
	'!DIModule' '(' (diModuleField (',' diModuleField)*)? ')';
diModuleField:
	scopeField
	| nameField
	| configMacrosField
	| includePathField
	| apiNotesField
	| fileField
	| lineField
	| isDeclField;
diNamespace:
	'!DINamespace' '(' (diNamespaceField (',' diNamespaceField)*)? ')';
diNamespaceField: scopeField | nameField | exportSymbolsField;
diObjCProperty:
	'!DIObjCProperty' '(' (
		diObjCPropertyField (',' diObjCPropertyField)*
	)? ')';
diObjCPropertyField:
	nameField
	| fileField
	| lineField
	| setterField
	| getterField
	| attributesField
	| typeField;
diStringType:
	'!DIStringType' '(' (
		diStringTypeField (',' diStringTypeField)*
	)? ')';
diStringTypeField:
	tagField
	| nameField
	| stringLengthField
	| stringLengthExpressionField
	| stringLocationExpressionField
	| sizeField
	| alignField
	| encodingField;
diSubprogram:
	'!DISubprogram' '(' (
		diSubprogramField (',' diSubprogramField)*
	)? ')';
diSubprogramField:
	scopeField
	| nameField
	| linkageNameField
	| fileField
	| lineField
	| typeField
	| isLocalField
	| isDefinitionField
	| scopeLineField
	| containingTypeField
	| virtualityField
	| virtualIndexField
	| thisAdjustmentField
	| flagsField
	| spFlagsField
	| isOptimizedField
	| unitField
	| templateParamsField
	| declarationField
	| retainedNodesField
	| thrownTypesField
	| annotationsField
	| targetFuncNameField;
diSubrange:
	'!DICompileUnit' '(' (diSubrangeField (',' diSubrangeField)*)? ')';
diSubrangeField:
	countField
	| lowerBoundField
	| upperBoundField
	| strideField;
diSubroutineType:
	'!DISubroutineType' '(' (
		diSubroutineTypeField (',' diSubroutineTypeField)*
	)? ')';
diTemplateTypeParameter:
	'!DITemplateTypeParameter' '(' (
		diTemplateTypeParameterField (
			',' diTemplateTypeParameterField
		)*
	)? ')';
diTemplateValueParameter:
	'!DITemplateValueParameter' '(' (
		diTemplateValueParameterField (
			',' diTemplateValueParameterField
		)
	)? ')';
genericDiNode:
	'!GenericDINode' '(' (
		genericDINodeField (',' genericDINodeField)*
	)? ')';

diTemplateTypeParameterField:
	nameField
	| typeField
	| defaultedField;
diCompileUnitField:
	languageField
	| fileField
	| producerField
	| isOptimizedField
	| flagsStringField
	| runtimeVersionField
	| splitDebugFilenameField
	| emissionKindField
	| enumsField
	| retainedTypesField
	| globalsField
	| importsField
	| macrosField
	| dwoIdField
	| splitDebugInliningField
	| debugInfoForProfilingField
	| nameTableKindField
	| rangesBaseAddressField
	| sysrootField
	| sdkField;
diCommonBlockField:
	scopeField
	| declarationField
	| nameField
	| fileField
	| lineField;
diBasicTypeField:
	tagField
	| nameField
	| sizeField
	| alignField
	| encodingField
	| flagsField;
genericDINodeField: tagField | headerField | operandsField;
tagField: 'tag:' DwarfTag;
headerField: 'header:' StringLit;
operandsField: 'operands:' '{' (mdField (',' mdField)*)? '}';
diTemplateValueParameterField:
	tagField
	| nameField
	| typeField
	| defaultedField
	| valueField;
nameField: 'name:' StringLit;
typeField: 'type:' mdField;
defaultedField: 'defaulted:' boolConst;
valueField: 'value:' mdField;
mdField: nullConst | metadata;
diSubroutineTypeField: flagsField | ccField | typesField;
flagsField: 'flags:' diFlags;
diFlags: DiFlag ('|' DiFlag)*;
ccField: 'cc:' DwarfCc | IntLit;
alignField: 'align:' IntLit;
allocatedField: 'allocated:' mdField;
annotationsField: 'annotations:' mdField;
argField: 'arg:' IntLit;
associatedField: 'associated:' mdField;
attributesField: 'attributes:' IntLit;
baseTypeField: 'baseType:' mdField;
checksumField: 'checksum:' StringLit;
checksumkindField: 'checksumkind:' ChecksumKind;
columnField: 'column:' IntLit;
configMacrosField: 'configMacros:' StringLit;
containingTypeField: 'containingType:' mdField;
countField: 'count:' mdFieldOrInt;
debugInfoForProfilingField: 'debugInfoForProfiling:' boolConst;
declarationField: 'declaration:' mdField;
directoryField: 'directory:' StringLit;
discriminatorField: 'discriminator:' mdField;
dataLocationField: 'dataLocation:' mdField;
discriminatorIntField: 'discriminator:' IntLit;
dwarfAddressSpaceField: 'dwarfAddressSpace:' IntLit;
dwoIdField: 'dwoId:' IntLit;
elementsField: 'elements:' mdField;
emissionKindField:
	'emissionKind:' emissionKind = (
		'DebugDirectivesOnly'
		| 'FullDebug'
		| 'LineTablesOnly'
		| 'NoDebug'
	);
encodingField: 'encoding:' (IntLit | DwarfAttEncoding);
entityField: 'entity:' mdField;
enumsField: 'enums:' mdField;
exportSymbolsField: 'exportSymbols:' boolConst;
exprField: 'expr:' mdField;
extraDataField: 'extraData:' mdField;
fileField: 'file:' mdField;
filenameField: 'filename:' StringLit;
flagsStringField: 'flags:' StringLit;
getterField: 'getter:' StringLit;
globalsField: 'globals:' mdField;
identifierField: 'identifier:' StringLit;
importsField: 'imports:' mdField;
includePathField: 'includePath:' StringLit;
inlinedAtField: 'inlinedAt:' mdField;
isDeclField: 'isDecl:' boolConst;
isDefinitionField: 'isDefinition:' boolConst;
isImplicitCodeField: 'isImplicitCode:' boolConst;
isLocalField: 'isLocal:' boolConst;
isOptimizedField: 'isOptimized:' boolConst;
isUnsignedField: 'isUnsigned:' boolConst;
apiNotesField: 'apinotes:' StringLit;
languageField: 'language:' DwarfLang;
lineField: 'line:' IntLit;
linkageNameField: 'linkageName:' StringLit;
lowerBoundField: 'lowerBound:' mdFieldOrInt;
macrosField: 'macros:' mdField;
nameTableKindField:
	'nameTableKind:' nameTableKind = ('GNU' | 'None' | 'Default');
nodesField: 'nodes:' mdField;
offsetField:
	// TODO: rename OffsetField= attribute to Offset= when inspirer/textmapper#13 is resolved
	'offset:' IntLit;
producerField: 'producer:' StringLit;
rangesBaseAddressField: 'rangesBaseAddress:' boolConst;
rankField: 'rank:' mdFieldOrInt;
retainedNodesField: 'retainedNodes:' mdField;
retainedTypesField: 'retainedTypes:' mdField;
runtimeLangField: 'runtimeLang:' DwarfLang;
runtimeVersionField: 'runtimeVersion:' IntLit;
scopeField: 'scope:' mdField;
scopeLineField: 'scopeLine:' IntLit;
sdkField: 'sdk:' StringLit;
setterField: 'setter:' StringLit;
sizeField: 'size:' IntLit;
sourceField: 'source:' StringLit;
spFlagsField: 'spFlags:' (diSPFlag ('|' diSPFlag)*);
splitDebugFilenameField: 'splitDebugFilename:' StringLit;
splitDebugInliningField: 'splitDebugInlining:' boolConst;
strideField: 'stride:' mdFieldOrInt;
stringLengthField: 'stringLength:' mdField;
stringLengthExpressionField: 'stringLengthExpression:' mdField;
stringLocationExpressionField:
	'stringLocationExpression:' mdField;
sysrootField: 'sysroot:' StringLit;
targetFuncNameField: 'targetFuncName:' StringLit;
templateParamsField: 'templateParams:' mdField;
thisAdjustmentField: 'thisAdjustment:' IntLit;
thrownTypesField: 'thrownTypes:' mdField;
typeMacinfoField: 'type:' DwarfMacinfo;
typesField: 'types:' mdField;
unitField: 'unit:' mdField;
upperBoundField: 'upperBound:' mdFieldOrInt;
valueIntField: 'value:' IntLit;
valueStringField: 'value:' StringLit;
varField: 'var:' mdField;
virtualIndexField: 'virtualIndex:' IntLit;
virtualityField: 'virtuality:' DwarfVirtuality;
vtableHolderField: 'vtableHolder:' mdField;

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
KwDisableSanitizerInstrumentation: 'disable_sanitizer_instrumentation';
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
