parser grammar LLVMIRParser;

options {
  tokenVocab = LLVMIRLexer;
}


compilationUnit: topLevelEntity* EOF;

targetDef: targetDataLayout | targetTriple;
sourceFilename: KwSourceFilename '=' StringLit;
targetDataLayout: KwTarget KwDatalayout '=' StringLit;
targetTriple: KwTarget KwTriple '=' StringLit;

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
moduleAsm: KwModule KwAsm StringLit;
typeDef: LocalIdent '=' KwType type;
comdatDef:
        ComdatName '=' KwComdat selectionKind = (
                KwAny
                | KwExactmatch
                | KwLargest
                | KwNodeduplicate
                | KwSamesize
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
                indirectSymbolKind = (KwAlias | KwIfunc) type ',' indirectSymbol (
                ',' partition
        )*;

funcDecl: KwDeclare metadataAttachment* funcHeader;
funcDef: KwDefine funcHeader metadataAttachment* funcBody;
attrGroupDef:
        KwAttributes AttrGroupId '=' '{' funcAttribute* '}';
namedMetadataDef:
        MetadataName '=' '!' '{' (metadataNode (',' metadataNode)*)? '}';
metadataDef:
        MetadataId '=' distinct? (mdTuple | specializedMDNode);
useListOrder:
        KwUselistorder typeValue ',' '{' IntLit (',' IntLit)* '}';
useListOrderBB:
        KwUselistorderBb GlobalIdent ',' LocalIdent ',' '{' IntLit (
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
callingConvInt: KwCc IntLit;
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
gc: KwGc StringLit;
prefix: KwPrefix typeConst;
prologue: KwPrologue typeConst;
personality: KwPersonality typeConst;
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
        KwRet voidType (',' metadataAttachment)*
        // Value return.
        | KwRet concreteType value (',' metadataAttachment)*;
brTerm: KwBr label (',' metadataAttachment)*;
condBrTerm:
        KwBr IntType value ',' label ',' label (
                ',' metadataAttachment
        )*;
switchTerm:
        KwSwitch typeValue ',' label '[' case* ']' (
                ',' metadataAttachment
        )*;
indirectBrTerm:
        KwIndirectbr typeValue ',' '[' (label (',' label)?)? ']' (
                ',' metadataAttachment
        )*;
resumeTerm: KwResume typeValue (',' metadataAttachment)*;
catchRetTerm:
        KwCatchret KwFrom value KwTo label (',' metadataAttachment)*;
cleanupRetTerm:
        KwCleanupret KwFrom value KwUnwind unwindTarget (
                ',' metadataAttachment
        )*;
unreachableTerm: KwUnreachable (',' metadataAttachment)*;
invokeTerm:
        KwInvoke callingConv? returnAttribute* addrSpace? type value '(' args ')' funcAttribute* (
                '[' (operandBundle ',')+ ']'
        )? KwTo label KwUnwind label (',' metadataAttachment)*;
callBrTerm:
        KwCallbr callingConv? returnAttribute* addrSpace? type value '(' args ')' funcAttribute* (
                '[' (operandBundle ',')+ ']'
        )? KwTo label '[' (label (',' label)*)? ']' (
                ',' metadataAttachment
        )*;
catchSwitchTerm:
        KwCatchswitch KwWithin exceptionPad '[' handlers ']' KwUnwind unwindTarget (
                ',' metadataAttachment
        )*;
label: KwLabel LocalIdent;
case: typeConst ',' label;
unwindTarget: KwTo KwCaller | label;
handlers: label (',' label)*;
metadataNode:
        MetadataId
        // Parse DIExpressions inline as a special case. They are still MDNodes, so they can still
        // appear in named metadata. Remove this logic if they become plain Metadata.
        | diExpression;
diExpression:
        DIExpression '(' (
                diExpressionField (',' diExpressionField)*
        )? ')';
diExpressionField: IntLit | DwarfAttEncoding | DwarfOp;

globalField:
        section
        | partition
        | comdat
        | align
        | sanitizerKind = (
                KwNoSanitizeAddress
                | KwNoSanitizeHwaddress
                | KwSanitizeAddressDyninit
                | KwSanitizeMemtag
        );
section: KwSection StringLit;
comdat: KwComdat ('(' ComdatName ')')?;
partition: KwPartition StringLit;

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
boolConst: KwTrue | KwFalse;
intConst: IntLit;
floatConst: FloatLit;
nullConst: KwNull;
noneConst: Kwnone;
structConst:
        '{' (typeConst (',' typeConst)*)? '}'
        | '<' '{' ( typeConst (',' typeConst)*)? '}' '>';
arrayConst:
        KwC StringLit
        | '[' (typeConst (',' typeConst)*)? ']';
vectorConst: '<' (typeConst (',' typeConst)*)? '>';
zeroInitializerConst: KwZeroinitializer;
undefConst: KwUndef;
poisonConst: KwPoison;
blockAddressConst:
        KwBlockaddress '(' GlobalIdent ',' LocalIdent ')';
dsoLocalEquivalentConst: KwDsoLocalEquivalent GlobalIdent;
noCFIConst: KwNoCfi GlobalIdent;
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
        KwAsm sideEffect = KwSideeffect? alignStackTok = KwAlignstack? intelDialect = KwInteldialect?
                unwind = KwUnwind? StringLit ',' StringLit;
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
voidType: symbol=KwVoid;
opaqueType: symbol=KwOpaque;
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
align: KwAlign IntLit | KwAlign '(' IntLit ')';
alignPair: KwAlign '=' IntLit;
alignStack: KwAlignstack '(' IntLit ')';
alignStackPair: KwAlignstack '=' IntLit;
allocKind: KwAllockind '(' StringLit ')';
allocSize: KwAllocsize '(' IntLit (',' IntLit)? ')';
unwindTable:
        KwUwtable
        | KwUwtable '(' unwindTableKind = (KwAsync | KwSync) ')';
vectorScaleRange:
        KwVscaleRange ('(' (IntLit | IntLit ',' IntLit) ')')?;
byRefAttr: KwByref '(' type ')';
byval: KwByval ( '(' type ')')?;
dereferenceable:
        KwDereferenceable '(' IntLit ')'
        | KwDereferenceableOrNull '(' IntLit ')';
elementType: KwElementtype '(' type ')';
inAlloca: KwInalloca '(' type ')';
paramAttr:
        KwAllocalign
        | KwAllocptr
        | KwImmarg
        | KwInreg
        | KwNest
        | KwNoalias
        | KwNocapture
        | KwNofree
        | KwNonnull
        | KwNoundef
        | KwReadnone
        | KwReadonly
        | KwReturned
        | KwSignext
        | KwSwiftasync
        | KwSwifterror
        | KwSwiftself
        | KwWriteonly
        | KwZeroext;
preallocated: KwPreallocated '(' type ')';
structRetAttr: KwSret '(' type ')';

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
        '<' IntLit KwX type '>'
        | '<' KwVscale KwX IntLit KwX type '>';
labelType: KwLabel;
arrayType: '[' IntLit KwX type ']';
structType:
        '{' (type (',' type)*)? '}'
        | '<' '{' (type (',' type)*)? '}' '>';
namedType: LocalIdent;
mmxType: KwX86Mmx;
tokenType: KwToken;

opaquePointerType: KwPtr addrSpace?;
addrSpace: KwAddrspace '(' IntLit ')';
threadLocal: KwThreadLocal ('(' tlsModel ')')?;
metadataType: KwMetadata;

// expr
bitCastExpr: KwBitcast '(' typeConst KwTo type ')';
getElementPtrExpr:
        KwGetelementptr inBounds? '(' type ',' typeConst (
                ',' gepIndex
        )* ')';
gepIndex: inRange = KwInrange? typeConst;
addrSpaceCastExpr: KwAddrspacecast '(' typeConst KwTo type ')';
intToPtrExpr: KwInttoptr '(' typeConst KwTo type ')';
iCmpExpr: KwIcmp iPred '(' typeConst ',' typeConst ')';
fCmpExpr: KwFcmp fPred '(' typeConst ',' typeConst ')';
selectExpr:
        KwSelect '(' typeConst ',' typeConst ',' typeConst ')';
truncExpr: KwTrunc '(' typeConst KwTo type ')';
zExtExpr: KwZext '(' typeConst KwTo type ')';
sExtExpr: KwSext '(' typeConst KwTo type ')';
fpTruncExpr: KwFptrunc '(' typeConst KwTo type ')';
fpExtExpr: KwFpext '(' typeConst KwTo type ')';
fpToUiExpr: KwFptoui '(' typeConst KwTo type ')';
fpToSiExpr: KwFptosi '(' typeConst KwTo type ')';
uiToFpExpr: KwUitofp '(' typeConst KwTo type ')';
siToFpExpr: KwSitofp '(' typeConst KwTo type ')';
ptrToIntExpr: KwPtrtoint '(' typeConst KwTo type ')';
extractElementExpr:
        KwExtractelement '(' typeConst ',' typeConst ')';
insertElementExpr:
        KwInsertelement '(' typeConst ',' typeConst ',' typeConst ')';
shuffleVectorExpr:
        KwShufflevector '(' typeConst ',' typeConst ',' typeConst ')';
shlExpr: KwShl overflowFlag* '(' typeConst ',' typeConst ')';
lShrExpr:
        KwLshr exact = KwExact? '(' typeConst ',' typeConst ')';
aShrExpr:
        KwAshr exact = KwExact? '(' typeConst ',' typeConst ')';
andExpr: KwAnd '(' typeConst ',' typeConst ')';
orExpr: KwOr '(' typeConst ',' typeConst ')';
xorExpr: KwXor '(' typeConst ',' typeConst ')';
addExpr: KwAdd overflowFlag* '(' typeConst ',' typeConst ')';
subExpr: KwSub overflowFlag* '(' typeConst ',' typeConst ')';
mulExpr: KwMul overflowFlag* '(' typeConst ',' typeConst ')';
fNegExpr: KwFneg '(' typeConst ')';

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
        KwStore volatile = KwVolatile? typeValue ',' typeValue (
                ',' align
        )? (',' metadataAttachment)*
        // atomic=KwAtomic store.
        | KwStore atomic = KwAtomic volatile = KwVolatile? typeValue ',' typeValue syncScope?
                atomicOrdering (',' align)? (',' metadataAttachment)*;

syncScope: KwSyncscope '(' StringLit ')';

fenceInst:
        KwFence syncScope? atomicOrdering (',' metadataAttachment)*;
fNegInst:
        KwFneg fastMathFlag* typeValue (',' metadataAttachment)*;
addInst:
        KwAdd overflowFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
fAddInst:
        KwFadd fastMathFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
subInst:
        KwSub overflowFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
fSubInst:
        KwFsub fastMathFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
mulInst:
        KwMul overflowFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
fMulInst:
        KwFmul fastMathFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
uDivInst:
        KwUdiv exact = KwExact? typeValue ',' value (
                ',' metadataAttachment
        )*;
sDivInst:
        KwSdiv exact = KwExact? typeValue ',' value (
                ',' metadataAttachment
        )*;
fDivInst:
        KwFdiv fastMathFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
uRemInst: KwUrem typeValue ',' value ( ',' metadataAttachment)*;
sRemInst: KwSrem typeValue ',' value ( ',' metadataAttachment)*;
fRemInst:
        KwFrem fastMathFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
shlInst:
        KwShl overflowFlag* typeValue ',' value (
                ',' metadataAttachment
        )*;
lShrInst:
        KwLshr exact = KwExact? typeValue ',' value (
                ',' metadataAttachment
        )*;
aShrInst:
        KwAshr exact = KwExact? typeValue ',' value (
                ',' metadataAttachment
        )*;
andInst: KwAnd typeValue ',' value ( ',' metadataAttachment)*;
orInst: KwOr typeValue ',' value ( ',' metadataAttachment)*;
xorInst: KwXor typeValue ',' value ( ',' metadataAttachment)*;
extractElementInst:
        KwExtractelement typeValue ',' typeValue (
                ',' metadataAttachment
        )*;
insertElementInst:
        KwInsertelement typeValue ',' typeValue ',' typeValue (
                ',' metadataAttachment
        )*;
shuffleVectorInst:
        KwShufflevector typeValue ',' typeValue ',' typeValue (
                ',' metadataAttachment
        )*;
extractValueInst:
        KwExtractvalue typeValue (',' IntLit)+ (
                ',' metadataAttachment
        )*;
insertValueInst:
        KwInsertvalue typeValue ',' typeValue (',' IntLit)+ (
                ',' metadataAttachment
        )*;
allocaInst:
        KwAlloca inAllocaTok = KwInalloca? swiftError = KwSwifterror? type (
                ',' typeValue
        )? (',' align)? (',' addrSpace)? (',' metadataAttachment)*;
loadInst:
        // Load.
        KwLoad volatile = KwVolatile? type ',' typeValue (',' align)? (
                ',' metadataAttachment
        )*
        // atomic=KwAtomic load.
        | KwLoad atomic = KwAtomic volatile = KwVolatile? type ',' typeValue syncScope? atomicOrdering (
                ',' align
        )? (',' metadataAttachment)*;
cmpXchgInst:
        KwCmpxchg weak = KwWeak? volatile = KwVolatile? typeValue ',' typeValue ',' typeValue syncScope?
                atomicOrdering atomicOrdering (',' align)? (
                ',' metadataAttachment
        )*;
atomicRMWInst:
        KwAtomicrmw volatile = KwVolatile? atomicOp typeValue ',' typeValue syncScope? atomicOrdering (
                ',' align
        )? (',' metadataAttachment)*;
getElementPtrInst:
        KwGetelementptr inBounds? type ',' typeValue (',' typeValue)* (
                ',' metadataAttachment
        )*;
truncInst:
        KwTrunc typeValue KwTo type (',' metadataAttachment)*;
zExtInst: KwZext typeValue KwTo type ( ',' metadataAttachment)*;
sExtInst: KwSext typeValue KwTo type ( ',' metadataAttachment)*;
fpTruncInst:
        KwFptrunc typeValue KwTo type (',' metadataAttachment)*;
fpExtInst:
        KwFpext typeValue KwTo type (',' metadataAttachment)*;
fpToUiInst:
        KwFptoui typeValue KwTo type (',' metadataAttachment)*;
fpToSiInst:
        KwFptosi typeValue KwTo type (',' metadataAttachment)*;
uiToFpInst:
        KwUitofp typeValue KwTo type (',' metadataAttachment)*;
siToFpInst:
        KwSitofp typeValue KwTo type (',' metadataAttachment)*;
ptrToIntInst:
        KwPtrtoint typeValue KwTo type (',' metadataAttachment)*;
intToPtrInst:
        KwInttoptr typeValue KwTo type (',' metadataAttachment)*;
bitCastInst:
        KwBitcast typeValue KwTo type (',' metadataAttachment)*;
addrSpaceCastInst:
        KwAddrspacecast typeValue KwTo type (',' metadataAttachment)*;
iCmpInst:
        KwIcmp iPred typeValue ',' value (',' metadataAttachment)*;
fCmpInst:
        KwFcmp fastMathFlag* fPred typeValue ',' value (
                ',' metadataAttachment
        )*;
phiInst:
        KwPhi fastMathFlag* type (inc (',' inc)*) (
                ',' metadataAttachment
        )*;
selectInst:
        KwSelect fastMathFlag* typeValue ',' typeValue ',' typeValue (
                ',' metadataAttachment
        )*;
freezeInst: KwFreeze typeValue;
callInst:
        tail = (KwMusttail | KwNotail | KwTail)? KwCall fastMathFlag* callingConv? returnAttribute*
                addrSpace? type value '(' args ')' funcAttribute* (
                '[' operandBundle (',' operandBundle)* ']'
        )? (',' metadataAttachment)*;
vaargInst:
        KwVaArg typeValue ',' type (',' metadataAttachment)*;
landingPadInst:
        KwLandingpad type cleanUp = KwCleanup? clause* (
                ',' metadataAttachment
        )*;
catchPadInst:
        KwCatchpad KwWithin LocalIdent '[' (
                exceptionArg (',' exceptionArg)*
        )? ']' (',' metadataAttachment)*;
cleanupPadInst:
        KwCleanuppad KwWithin exceptionPad '[' (
                exceptionArg (',' exceptionArg)*
        )? ']' (',' metadataAttachment)*;

inc: '[' value ',' LocalIdent ']';

operandBundle: StringLit '(' (typeValue (',' typeValue)*)? ')';
clause: clauseType = (KwCatch | KwFilter) typeValue;

args:
        ellipsis = '...'?
        | arg (',' arg)* (',' ellipsis = '...')?;
arg: concreteType paramAttribute* value | metadataType metadata;

exceptionArg: concreteType value | metadataType metadata;
exceptionPad: noneConst | LocalIdent;

externalLinkage: KwExternWeak | KwExternal;
internalLinkage:
        KwAppending
        | KwAvailableExternally
        | KwCommon
        | KwInternal
        | KwLinkonce
        | KwLinkonceOdr
        | KwPrivate
        | KwWeak
        | KwWeakOdr;
linkage: internalLinkage | externalLinkage;
preemption: KwDsoLocal | KwDsoPreemptable;
visibility: Kwdefault | KwHidden | KwProtected;
dllStorageClass: KwDllexport | KwDllimport;
tlsModel: KwInitialexec | KwLocaldynamic | KwLocalexec;
unnamedAddr: KwLocalUnnamedAddr | KwUnnamedAddr;
externallyInitialized: KwExternallyInitialized;
immutable: KwConstant | KwGlobal;
funcAttr:
        KwAlwaysinline
        | KwArgmemonly
        | KwBuiltin
        | KwCold
        | KwConvergent
        | KwDisableSanitizerInstrumentation
        | KwFnRetThunkExtern
        | KwHot
        | KwInaccessiblememOrArgmemonly
        | KwInaccessiblememonly
        | KwInlinehint
        | KwJumptable
        | KwMinsize
        | KwMustprogress
        | KwNaked
        | KwNobuiltin
        | KwNocallback
        | KwNocfCheck
        | KwNoduplicate
        | KwNofree
        | KwNoimplicitfloat
        | KwNoinline
        | KwNomerge
        | KwNonlazybind
        | KwNoprofile
        | KwNorecurse
        | KwNoredzone
        | KwNoreturn
        | KwNosanitizeBounds
        | KwNosanitizeCoverage
        | KwNosync
        | KwNounwind
        | KwNullPointerIsValid
        | KwOptforfuzzing
        | KwOptnone
        | KwOptsize
        | KwPresplitcoroutine
        | KwReadnone
        | KwReadonly
        | KwReturnsTwice
        | KwSafestack
        | KwSanitizeAddress
        | KwSanitizeHwaddress
        | KwSanitizeMemory
        | KwSanitizeMemtag
        | KwSanitizeThread
        | KwShadowcallstack
        | KwSpeculatable
        | KwSpeculativeLoadHardening
        | KwSsp
        | KwSspreq
        | KwSspstrong
        | KwStrictfp
        | KwWillreturn
        | KwWriteonly;
distinct: KwDistinct;
inBounds: KwInbounds;
returnAttr:
        KwInreg
        | KwNoalias
        | KwNonnull
        | KwNoundef
        | KwSignext
        | KwZeroext;
overflowFlag: KwNsw | KwNuw;
iPred:
        KwEq
        | KwNe
        | KwSge
        | KwSgt
        | KwSle
        | KwSlt
        | KwUge
        | KwUgt
        | KwUle
        | KwUlt;
fPred:
        KwFalse
        | KwOeq
        | KwOge
        | KwOgt
        | KwOle
        | KwOlt
        | KwOne
        | KwOrd
        | KwTrue
        | KwUeq
        | KwUge
        | KwUgt
        | KwUle
        | KwUlt
        | KwUne
        | KwUno;
atomicOrdering:
        KwAcqRel
        | KwAcquire
        | KwMonotonic
        | KwRelease
        | KwSeqCst
        | KwUnordered;
callingConvEnum:
        KwAarch64SveVectorPcs
        | KwAarch64VectorPcs
        | KwAmdgpuCs
        | KwAmdgpuEs
        | KwAmdgpuGfx
        | KwAmdgpuGs
        | KwAmdgpuHs
        | KwAmdgpuKernel
        | KwAmdgpuLs
        | KwAmdgpuPs
        | KwAmdgpuVs
        | KwAnyregcc
        | KwArmAapcsVfpcc
        | KwArmAapcscc
        | KwArmApcscc
        | KwAvrIntrcc
        | KwAvrSignalcc
        | KwCcc
        | KwCfguardCheckcc
        | KwColdcc
        | KwCxxFastTlscc
        | KwFastcc
        | KwGhccc
        | KwHhvmCcc
        | KwHhvmcc
        | KwIntelOclBicc
        | KwMsp430Intrcc
        | KwPreserveAllcc
        | KwPreserveMostcc
        | KwPtxDevice
        | KwPtxKernel
        | KwSpirFunc
        | KwSpirKernel
        | KwSwiftcc
        | KwSwifttailcc
        | KwTailcc
        | KwWebkitJscc
        | KwWin64cc
        | KwX8664Sysvcc
        | KwX86Fastcallcc
        | KwX86Intrcc
        | KwX86Regcallcc
        | KwX86Stdcallcc
        | KwX86Thiscallcc
        | KwX86Vectorcallcc;

fastMathFlag:
        KwAfn
        | KwArcp
        | KwContract
        | KwFast
        | KwNinf
        | KwNnan
        | KwNsz
        | KwReassoc;
atomicOp:
        KwAdd
        | KwAnd
        | KwFadd
        | KwFmax
        | KwFmin
        | KwFsub
        | KwMax
        | KwMin
        | KwNand
        | KwOr
        | KwSub
        | KwUmax
        | KwUmin
        | KwXchg
        | KwXor;
floatKind:
        KwHalf
        | KwBfloat
        | KwFloat
        | KwDouble
        | KwX86Fp80
        | KwFp128
        | KwPpcFp128;
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
tagField: KwTagLabel DwarfTag;
headerField: KwHeaderLabel StringLit;
operandsField: KwOperandsLabel '{' (mdField (',' mdField)*)? '}';
diTemplateValueParameterField:
        tagField
        | nameField
        | typeField
        | defaultedField
        | valueField;
nameField: KwNameLabel StringLit;
typeField: KwTypeLabel mdField;
defaultedField: KwDefaultedLabel boolConst;
valueField: KwValueLabel mdField;
mdField: nullConst | metadata;
diSubroutineTypeField: flagsField | ccField | typesField;
flagsField: KwFlagsLabel diFlags;
diFlags: DiFlag ('|' DiFlag)*;
ccField: KwCcLabel DwarfCc | IntLit;
alignField: KwAlignLabel IntLit;
allocatedField: KwAllocatedLabel mdField;
annotationsField: KwAnnotationsLabel mdField;
argField: KwArgLabel IntLit;
associatedField: KwAssociatedLabel mdField;
attributesField: KwAttributesLabel IntLit;
baseTypeField: KwBaseTypeLabel mdField;
checksumField: KwChecksumLabel StringLit;
checksumkindField: KwChecksumkindLabel ChecksumKind;
columnField: KwColumnLabel IntLit;
configMacrosField: KwConfigMacrosLabel StringLit;
containingTypeField: KwContainingTypeLabel mdField;
countField: KwCountLabel mdFieldOrInt;
debugInfoForProfilingField: KwDebugInfoForProfilingLabel boolConst;
declarationField: KwDeclarationLabel mdField;
directoryField: KwDirectoryLabel StringLit;
discriminatorField: KwDiscriminatorLabel mdField;
dataLocationField: KwDataLocationLabel mdField;
discriminatorIntField: KwDiscriminatorLabel IntLit;
dwarfAddressSpaceField: KwDwarfAddressSpaceLabel IntLit;
dwoIdField: KwDwoIdLabel IntLit;
elementsField: KwElementsLabel mdField;
emissionKindField:
        KwEmissionKindLabel emissionKind = (
                KwDebugDirectivesOnly
                | KwFullDebug
                | KwLineTablesOnly
                | KwNoDebug
        );
encodingField: KwEncodingLabel (IntLit | DwarfAttEncoding);
entityField: KwEntityLabel mdField;
enumsField: KwEnumsLabel mdField;
exportSymbolsField: KwExportSymbolsLabel boolConst;
exprField: KwExprLabel mdField;
extraDataField: KwExtraDataLabel mdField;
fileField: KwFileLabel mdField;
filenameField: KwFilenameLabel StringLit;
flagsStringField: KwFlagsLabel StringLit;
getterField: KwGetterLabel StringLit;
globalsField: KwGlobalsLabel mdField;
identifierField: KwIdentifierLabel StringLit;
importsField: KwImportsLabel mdField;
includePathField: KwIncludePathLabel StringLit;
inlinedAtField: KwInlinedAtLabel mdField;
isDeclField: KwIsDeclLabel boolConst;
isDefinitionField: KwIsDefinitionLabel boolConst;
isImplicitCodeField: KwIsImplicitCodeLabel boolConst;
isLocalField: KwIsLocalLabel boolConst;
isOptimizedField: KwIsOptimizedLabel boolConst;
isUnsignedField: KwIsUnsignedLabel boolConst;
apiNotesField: KwApinotesLabel StringLit;
languageField: KwLanguageLabel DwarfLang;
lineField: KwLineLabel IntLit;
linkageNameField: KwLinkageNameLabel StringLit;
lowerBoundField: KwLowerBoundLabel mdFieldOrInt;
macrosField: KwMacrosLabel mdField;
nameTableKindField:
        KwNameTableKindLabel nameTableKind = (KwGNU | KwNone | KwDefault);
nodesField: KwNodesLabel mdField;
offsetField:
        // TODO: rename OffsetField= attribute to Offset= when inspirer/textmapper#13 is resolved
        KwOffsetLabel IntLit;
producerField: KwProducerLabel StringLit;
rangesBaseAddressField: KwRangesBaseAddressLabel boolConst;
rankField: KwRankLabel mdFieldOrInt;
retainedNodesField: KwRetainedNodesLabel mdField;
retainedTypesField: KwRetainedTypesLabel mdField;
runtimeLangField: KwRuntimeLangLabel DwarfLang;
runtimeVersionField: KwRuntimeVersionLabel IntLit;
scopeField: KwScopeLabel mdField;
scopeLineField: KwScopeLineLabel IntLit;
sdkField: KwSdkLabel StringLit;
setterField: KwSetterLabel StringLit;
sizeField: KwSizeLabel IntLit;
sourceField: KwSourceLabel StringLit;
spFlagsField: KwSpFlagsLabel (diSPFlag ('|' diSPFlag)*);
splitDebugFilenameField: KwSplitDebugFilenameLabel StringLit;
splitDebugInliningField: KwSplitDebugInliningLabel boolConst;
strideField: KwStrideLabel mdFieldOrInt;
stringLengthField: KwStringLengthLabel mdField;
stringLengthExpressionField: KwStringLengthExpressionLabel mdField;
stringLocationExpressionField:
        KwStringLocationExpressionLabel mdField;
sysrootField: KwSysrootLabel StringLit;
targetFuncNameField: KwTargetFuncNameLabel StringLit;
templateParamsField: KwTemplateParamsLabel mdField;
thisAdjustmentField: KwThisAdjustmentLabel IntLit;
thrownTypesField: KwThrownTypesLabel mdField;
typeMacinfoField: KwTypeLabel DwarfMacinfo;
typesField: KwTypesLabel mdField;
unitField: KwUnitLabel mdField;
upperBoundField: KwUpperBoundLabel mdFieldOrInt;
valueIntField: KwValueLabel IntLit;
valueStringField: KwValueLabel StringLit;
varField: KwVarLabel mdField;
virtualIndexField: KwVirtualIndexLabel IntLit;
virtualityField: KwVirtualityLabel DwarfVirtuality;
vtableHolderField: KwVtableHolderLabel mdField;