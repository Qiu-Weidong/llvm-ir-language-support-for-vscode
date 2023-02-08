const raw = `## \`ret\` Instruction

### Syntax:
\`\`\`
ret <type> <value>       ; Return a value from a non-void function
ret void                 ; Return from void function
\`\`\`
### Overview:

The ‘\`ret\`’ instruction is used to return control flow (and optionally a value) from a function back to the caller.

There are two forms of the ‘\`ret\`’ instruction: one that returns a value and then causes control flow, and one that just causes control flow to occur.

### Arguments:

The ‘\`ret\`’ instruction optionally accepts a single argument, the return value. The type of the return value must be a ‘[first class](#t-firstclass)’ type.

A function is not [well formed](#wellformed) if it has a non-void return type and contains a ‘\`ret\`’ instruction with no return value or a return value with a type that does not match its type, or if it has a void return type and contains a ‘\`ret\`’ instruction with a return value.

### Semantics:

When the ‘\`ret\`’ instruction is executed, control flow returns back to the calling function’s context. If the caller is a “[call](#i-call)” instruction, execution continues at the instruction after the call. If the caller was an “[invoke](#i-invoke)” instruction, execution continues at the beginning of the “normal” destination block. If the instruction returns a value, that value shall set the call or invoke instruction’s return value.

### Example:
\`\`\`
ret i32 5                       ; Return an integer value of 5
ret void                        ; Return from a void function
ret { i32, i8 } { i32 4, i8 2 } ; Return a struct of values 4 and 2
\`\`\`
## \`br\` Instruction

### Syntax:
\`\`\`
br i1 <cond>, label <iftrue>, label <iffalse>
br label <dest>          ; Unconditional branch
\`\`\`
### Overview:

The ‘\`br\`’ instruction is used to cause control flow to transfer to a different basic block in the current function. There are two forms of this instruction, corresponding to a conditional branch and an unconditional branch.

### Arguments:

The conditional branch form of the ‘\`br\`’ instruction takes a single ‘\`i1\`’ value and two ‘\`label\`’ values. The unconditional form of the ‘\`br\`’ instruction takes a single ‘\`label\`’ value as a target.

### Semantics:

Upon execution of a conditional ‘\`br\`’ instruction, the ‘\`i1\`’ argument is evaluated. If the value is \`true\`, control flows to the ‘\`iftrue\`’ \`label\` argument. If “cond” is \`false\`, control flows to the ‘\`iffalse\`’ \`label\` argument. If ‘\`cond\`’ is \`poison\` or \`undef\`, this instruction has undefined behavior.

### Example:
\`\`\`
Test:
  %cond = icmp eq i32 %a, %b
  br i1 %cond, label %IfEqual, label %IfUnequal
IfEqual:
  ret i32 1
IfUnequal:
  ret i32 0
\`\`\`
## \`switch\` Instruction

### Syntax:
\`\`\`
switch <intty> <value>, label <defaultdest> [ <intty> <val>, label <dest> ... ]
\`\`\`
### Overview:

The ‘\`switch\`’ instruction is used to transfer control flow to one of several different places. It is a generalization of the ‘\`br\`’ instruction, allowing a branch to occur to one of many possible destinations.

### Arguments:

The ‘\`switch\`’ instruction uses three parameters: an integer comparison value ‘\`value\`’, a default ‘\`label\`’ destination, and an array of pairs of comparison value constants and ‘\`label\`’s. The table is not allowed to contain duplicate constant entries.

### Semantics:

The \`switch\` instruction specifies a table of values and destinations. When the ‘\`switch\`’ instruction is executed, this table is searched for the given value. If the value is found, control flow is transferred to the corresponding destination; otherwise, control flow is transferred to the default destination. If ‘\`value\`’ is \`poison\` or \`undef\`, this instruction has undefined behavior.

### Implementation:

Depending on properties of the target machine and the particular \`switch\` instruction, this instruction may be code generated in different ways. For example, it could be generated as a series of chained conditional branches or with a lookup table.

### Example:
\`\`\`
; Emulate a conditional br instruction
%Val = zext i1 %value to i32
switch i32 %Val, label %truedest [ i32 0, label %falsedest ]

; Emulate an unconditional br instruction
switch i32 0, label %dest [ ]

; Implement a jump table:
switch i32 %val, label %otherwise [ i32 0, label %onzero
                                    i32 1, label %onone
                                    i32 2, label %ontwo ]
\`\`\`

## \`indirectbr\` Instruction

### Syntax:
\`\`\`
indirectbr ptr <address>, [ label <dest1>, label <dest2>, ... ]
\`\`\`
### Overview:

The ‘\`indirectbr\`’ instruction implements an indirect branch to a label within the current function, whose address is specified by “\`address\`”. Address must be derived from a [blockaddress](#blockaddress) constant.

### Arguments:

The ‘\`address\`’ argument is the address of the label to jump to. The rest of the arguments indicate the full set of possible destinations that the address may point to. Blocks are allowed to occur multiple times in the destination list, though this isn’t particularly useful.

This destination list is required so that dataflow analysis has an accurate understanding of the CFG.

### Semantics:

Control transfers to the block specified in the address argument. All possible destination blocks must be listed in the label list, otherwise this instruction has undefined behavior. This implies that jumps to labels defined in other functions have undefined behavior as well. If ‘\`address\`’ is \`poison\` or \`undef\`, this instruction has undefined behavior.

### Implementation:

This is typically implemented with a jump through a register.

### Example:
\`\`\`
indirectbr ptr %Addr, [ label %bb1, label %bb2, label %bb3 ]
\`\`\`

## \`invoke\` Instruction

### Syntax:
\`\`\`
<result> = invoke [cconv] [ret attrs] [addrspace(<num>)] <ty>|<fnty> <fnptrval>(<function args>) [fn attrs]
              [operand bundles] to label <normal label> unwind label <exception label>
\`\`\`
### Overview:

The ‘\`invoke\`’ instruction causes control to transfer to a specified function, with the possibility of control flow transfer to either the ‘\`normal\`’ label or the ‘\`exception\`’ label. If the callee function returns with the “\`ret\`” instruction, control flow will return to the “normal” label. If the callee (or any indirect callees) returns via the “[resume](#i-resume)” instruction or other exception handling mechanism, control is interrupted and continued at the dynamically nearest “exception” label.

The ‘\`exception\`’ label is a [landing pad](ExceptionHandling.html#overview) for the exception. As such, ‘\`exception\`’ label is required to have the “[landingpad](#i-landingpad)” instruction, which contains the information about the behavior of the program after unwinding happens, as its first non-PHI instruction. The restrictions on the “\`landingpad\`” instruction’s tightly couples it to the “\`invoke\`” instruction, so that the important information contained within the “\`landingpad\`” instruction can’t be lost through normal code motion.

### Arguments:

This instruction requires several arguments:

1.  The optional “cconv” marker indicates which [calling convention](#callingconv) the call should use. If none is specified, the call defaults to using C calling conventions.
2.  The optional [Parameter Attributes](#paramattrs) list for return values. Only ‘\`zeroext\`’, ‘\`signext\`’, and ‘\`inreg\`’ attributes are valid here.
3.  The optional addrspace attribute can be used to indicate the address space of the called function. If it is not specified, the program address space from the [datalayout string](#langref-datalayout) will be used.
4.  ‘\`ty\`’: the type of the call instruction itself which is also the type of the return value. Functions that return no value are marked \`void\`.
5.  ‘\`fnty\`’: shall be the signature of the function being invoked. The argument types must match the types implied by this signature. This type can be omitted if the function is not varargs.
6.  ‘\`fnptrval\`’: An LLVM value containing a pointer to a function to be invoked. In most cases, this is a direct function invocation, but indirect \`invoke\`’s are just as possible, calling an arbitrary pointer to function value.
7.  ‘\`function args\`’: argument list whose types match the function signature argument types and parameter attributes. All arguments must be of [first class](#t-firstclass) type. If the function signature indicates the function accepts a variable number of arguments, the extra arguments can be specified.
8.  ‘\`normal label\`’: the label reached when the called function executes a ‘\`ret\`’ instruction.
9.  ‘\`exception label\`’: the label reached when a callee returns via the [resume](#i-resume) instruction or other exception handling mechanism.
10.  The optional [function attributes](#fnattrs) list.
11.  The optional [operand bundles](#opbundles) list.

### Semantics:

This instruction is designed to operate as a standard ‘\`call\`’ instruction in most regards. The primary difference is that it establishes an association with a label, which is used by the runtime library to unwind the stack.

This instruction is used in languages with destructors to ensure that proper cleanup is performed in the case of either a \`longjmp\` or a thrown exception. Additionally, this is important for implementation of ‘\`catch\`’ clauses in high-level languages that support them.

For the purposes of the SSA form, the definition of the value returned by the ‘\`invoke\`’ instruction is deemed to occur on the edge from the current block to the “normal” label. If the callee unwinds then no return value is available.

### Example:
\`\`\`
%retval = invoke i32 @Test(i32 15) to label %Continue
            unwind label %TestCleanup              ; i32:retval set
%retval = invoke coldcc i32 %Testfnptr(i32 15) to label %Continue
            unwind label %TestCleanup              ; i32:retval set
\`\`\`
## \`callbr\` Instruction

### Syntax:
\`\`\`
<result> = callbr [cconv] [ret attrs] [addrspace(<num>)] <ty>|<fnty> <fnptrval>(<function args>) [fn attrs]
              [operand bundles] to label <fallthrough label> [indirect labels]
\`\`\`
### Overview:

The ‘\`callbr\`’ instruction causes control to transfer to a specified function, with the possibility of control flow transfer to either the ‘\`fallthrough\`’ label or one of the ‘\`indirect\`’ labels.

This instruction should only be used to implement the “goto” feature of gcc style inline assembly. Any other usage is an error in the IR verifier.

### Arguments:

This instruction requires several arguments:

1.  The optional “cconv” marker indicates which [calling convention](#callingconv) the call should use. If none is specified, the call defaults to using C calling conventions.
2.  The optional [Parameter Attributes](#paramattrs) list for return values. Only ‘\`zeroext\`’, ‘\`signext\`’, and ‘\`inreg\`’ attributes are valid here.
3.  The optional addrspace attribute can be used to indicate the address space of the called function. If it is not specified, the program address space from the [datalayout string](#langref-datalayout) will be used.
4.  ‘\`ty\`’: the type of the call instruction itself which is also the type of the return value. Functions that return no value are marked \`void\`.
5.  ‘\`fnty\`’: shall be the signature of the function being called. The argument types must match the types implied by this signature. This type can be omitted if the function is not varargs.
6.  ‘\`fnptrval\`’: An LLVM value containing a pointer to a function to be called. In most cases, this is a direct function call, but other \`callbr\`’s are just as possible, calling an arbitrary pointer to function value.
7.  ‘\`function args\`’: argument list whose types match the function signature argument types and parameter attributes. All arguments must be of [first class](#t-firstclass) type. If the function signature indicates the function accepts a variable number of arguments, the extra arguments can be specified.
8.  ‘\`fallthrough label\`’: the label reached when the inline assembly’s execution exits the bottom.
9.  ‘\`indirect labels\`’: the labels reached when a callee transfers control to a location other than the ‘\`fallthrough label\`’. Label constraints refer to these destinations.
10.  The optional [function attributes](#fnattrs) list.
11.  The optional [operand bundles](#opbundles) list.

### Semantics:

This instruction is designed to operate as a standard ‘\`call\`’ instruction in most regards. The primary difference is that it establishes an association with additional labels to define where control flow goes after the call.

The output values of a ‘\`callbr\`’ instruction are available only to the ‘\`fallthrough\`’ block, not to any ‘\`indirect\`’ blocks(s).

The only use of this today is to implement the “goto” feature of gcc inline assembly where additional labels can be provided as locations for the inline assembly to jump to.

### Example:
\`\`\`
; "asm goto" without output constraints.
callbr void asm "", "r,!i"(i32 %x)
            to label %fallthrough [label %indirect]

; "asm goto" with output constraints.
<result> = callbr i32 asm "", "=r,r,!i"(i32 %x)
            to label %fallthrough [label %indirect]
\`\`\`
## \`resume\` Instruction

### Syntax:
\`\`\`
resume <type> <value>
\`\`\`
### Overview:

The ‘\`resume\`’ instruction is a terminator instruction that has no successors.

### Arguments:

The ‘\`resume\`’ instruction requires one argument, which must have the same type as the result of any ‘\`landingpad\`’ instruction in the same function.

### Semantics:

The ‘\`resume\`’ instruction resumes propagation of an existing (in-flight) exception whose unwinding was interrupted with a [landingpad](#i-landingpad) instruction.

### Example:
\`\`\`
resume { ptr, i32 } %exn
\`\`\`
## \`catchswitch\` Instruction

### Syntax:
\`\`\`
<resultval> = catchswitch within <parent> [ label <handler1>, label <handler2>, ... ] unwind to caller
<resultval> = catchswitch within <parent> [ label <handler1>, label <handler2>, ... ] unwind label <default>
\`\`\`
### Overview:

The ‘\`catchswitch\`’ instruction is used by [LLVM’s exception handling system](ExceptionHandling.html#overview) to describe the set of possible catch handlers that may be executed by the [EH personality routine](#personalityfn).

### Arguments:

The \`parent\` argument is the token of the funclet that contains the \`catchswitch\` instruction. If the \`catchswitch\` is not inside a funclet, this operand may be the token \`none\`.

The \`default\` argument is the label of another basic block beginning with either a \`cleanuppad\` or \`catchswitch\` instruction. This unwind destination must be a legal target with respect to the \`parent\` links, as described in the [exception handling documentation](ExceptionHandling.html#wineh-constraints).

The \`handlers\` are a nonempty list of successor blocks that each begin with a [catchpad](#i-catchpad) instruction.

### Semantics:

Executing this instruction transfers control to one of the successors in \`handlers\`, if appropriate, or continues to unwind via the unwind label if present.

The \`catchswitch\` is both a terminator and a “pad” instruction, meaning that it must be both the first non-phi instruction and last instruction in the basic block. Therefore, it must be the only non-phi instruction in the block.

### Example:
\`\`\`
dispatch1:
  %cs1 = catchswitch within none [label %handler0, label %handler1] unwind to caller
dispatch2:
  %cs2 = catchswitch within %parenthandler [label %handler0] unwind label %cleanup
\`\`\`
## \`catchret\` Instruction

### Syntax:
\`\`\`
catchret from <token> to label <normal>
\`\`\`
### Overview:

The ‘\`catchret\`’ instruction is a terminator instruction that has a single successor.

### Arguments:

The first argument to a ‘\`catchret\`’ indicates which \`catchpad\` it exits. It must be a [catchpad](#i-catchpad). The second argument to a ‘\`catchret\`’ specifies where control will transfer to next.

### Semantics:

The ‘\`catchret\`’ instruction ends an existing (in-flight) exception whose unwinding was interrupted with a [catchpad](#i-catchpad) instruction. The [personality function](#personalityfn) gets a chance to execute arbitrary code to, for example, destroy the active exception. Control then transfers to \`normal\`.

The \`token\` argument must be a token produced by a \`catchpad\` instruction. If the specified \`catchpad\` is not the most-recently-entered not-yet-exited funclet pad (as described in the [EH documentation](ExceptionHandling.html#wineh-constraints)), the \`catchret\`’s behavior is undefined.

### Example:
\`\`\`
catchret from %catch to label %continue
\`\`\`
## \`cleanupret\` Instruction

### Syntax:
\`\`\`
cleanupret from <value> unwind label <continue>
cleanupret from <value> unwind to caller
\`\`\`
### Overview:

The ‘\`cleanupret\`’ instruction is a terminator instruction that has an optional successor.

### Arguments:

The ‘\`cleanupret\`’ instruction requires one argument, which indicates which \`cleanuppad\` it exits, and must be a [cleanuppad](#i-cleanuppad). If the specified \`cleanuppad\` is not the most-recently-entered not-yet-exited funclet pad (as described in the [EH documentation](ExceptionHandling.html#wineh-constraints)), the \`cleanupret\`’s behavior is undefined.

The ‘\`cleanupret\`’ instruction also has an optional successor, \`continue\`, which must be the label of another basic block beginning with either a \`cleanuppad\` or \`catchswitch\` instruction. This unwind destination must be a legal target with respect to the \`parent\` links, as described in the [exception handling documentation](ExceptionHandling.html#wineh-constraints).

### Semantics:

The ‘\`cleanupret\`’ instruction indicates to the [personality function](#personalityfn) that one [cleanuppad](#i-cleanuppad) it transferred control to has ended. It transfers control to \`continue\` or unwinds out of the function.

### Example:
\`\`\`
cleanupret from %cleanup unwind to caller
cleanupret from %cleanup unwind label %continue
\`\`\`
## \`unreachable\` Instruction

### Syntax:
\`\`\`
unreachable
\`\`\`
### Overview:

The ‘\`unreachable\`’ instruction has no defined semantics. This instruction is used to inform the optimizer that a particular portion of the code is not reachable. This can be used to indicate that the code after a no-return function cannot be reached, and other facts.

### Semantics:

The ‘\`unreachable\`’ instruction has no defined semantics.



## \`fneg\` Instruction

### Syntax:
\`\`\`
<result> = fneg [fast-math flags]* <ty> <op1>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`fneg\`’ instruction returns the negation of its operand.

### Arguments:

The argument to the ‘\`fneg\`’ instruction must be a [floating-point](#t-floating) or [vector](#t-vector) of floating-point values.

### Semantics:

The value produced is a copy of the operand with its sign bit flipped. This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = fneg float %val          ; yields float:result = -%var
\`\`\`

## \`add\` Instruction

### Syntax:
\`\`\`
<result> = add <ty> <op1>, <op2>          ; yields ty:result
<result> = add nuw <ty> <op1>, <op2>      ; yields ty:result
<result> = add nsw <ty> <op1>, <op2>      ; yields ty:result
<result> = add nuw nsw <ty> <op1>, <op2>  ; yields ty:result
\`\`\`
### Overview:

The ‘\`add\`’ instruction returns the sum of its two operands.

### Arguments:

The two arguments to the ‘\`add\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The value produced is the integer sum of the two operands.

If the sum has unsigned overflow, the result returned is the mathematical result modulo 2n, where n is the bit width of the result.

Because LLVM integers use a two’s complement representation, this instruction is appropriate for both signed and unsigned integers.

\`nuw\` and \`nsw\` stand for “No Unsigned Wrap” and “No Signed Wrap”, respectively. If the \`nuw\` and/or \`nsw\` keywords are present, the result value of the \`add\` is a [poison value](#poisonvalues) if unsigned and/or signed overflow, respectively, occurs.

### Example:
\`\`\`
<result> = add i32 4, %var          ; yields i32:result = 4 + %var
\`\`\`
## \`fadd\` Instruction

### Syntax:
\`\`\`
<result> = fadd [fast-math flags]* <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`fadd\`’ instruction returns the sum of its two operands.

### Arguments:

The two arguments to the ‘\`fadd\`’ instruction must be [floating-point](#t-floating) or [vector](#t-vector) of floating-point values. Both arguments must have identical types.

### Semantics:

The value produced is the floating-point sum of the two operands. This instruction is assumed to execute in the default [floating-point environment](#floatenv). This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = fadd float 4.0, %var          ; yields float:result = 4.0 + %var
\`\`\`
## \`sub\` Instruction

### Syntax:
\`\`\`
<result> = sub <ty> <op1>, <op2>          ; yields ty:result
<result> = sub nuw <ty> <op1>, <op2>      ; yields ty:result
<result> = sub nsw <ty> <op1>, <op2>      ; yields ty:result
<result> = sub nuw nsw <ty> <op1>, <op2>  ; yields ty:result
\`\`\`
### Overview:

The ‘\`sub\`’ instruction returns the difference of its two operands.

Note that the ‘\`sub\`’ instruction is used to represent the ‘\`neg\`’ instruction present in most other intermediate representations.

### Arguments:

The two arguments to the ‘\`sub\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The value produced is the integer difference of the two operands.

If the difference has unsigned overflow, the result returned is the mathematical result modulo 2n, where n is the bit width of the result.

Because LLVM integers use a two’s complement representation, this instruction is appropriate for both signed and unsigned integers.

\`nuw\` and \`nsw\` stand for “No Unsigned Wrap” and “No Signed Wrap”, respectively. If the \`nuw\` and/or \`nsw\` keywords are present, the result value of the \`sub\` is a [poison value](#poisonvalues) if unsigned and/or signed overflow, respectively, occurs.

### Example:
\`\`\`
<result> = sub i32 4, %var          ; yields i32:result = 4 - %var
<result> = sub i32 0, %val          ; yields i32:result = -%var
\`\`\`
## \`fsub\` Instruction

### Syntax:
\`\`\`
<result> = fsub [fast-math flags]* <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`fsub\`’ instruction returns the difference of its two operands.

### Arguments:

The two arguments to the ‘\`fsub\`’ instruction must be [floating-point](#t-floating) or [vector](#t-vector) of floating-point values. Both arguments must have identical types.

### Semantics:

The value produced is the floating-point difference of the two operands. This instruction is assumed to execute in the default [floating-point environment](#floatenv). This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = fsub float 4.0, %var           ; yields float:result = 4.0 - %var
<result> = fsub float -0.0, %val          ; yields float:result = -%var
\`\`\`
## \`mul\` Instruction

### Syntax:
\`\`\`
<result> = mul <ty> <op1>, <op2>          ; yields ty:result
<result> = mul nuw <ty> <op1>, <op2>      ; yields ty:result
<result> = mul nsw <ty> <op1>, <op2>      ; yields ty:result
<result> = mul nuw nsw <ty> <op1>, <op2>  ; yields ty:result
\`\`\`
### Overview:

The ‘\`mul\`’ instruction returns the product of its two operands.

### Arguments:

The two arguments to the ‘\`mul\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The value produced is the integer product of the two operands.

If the result of the multiplication has unsigned overflow, the result returned is the mathematical result modulo 2n, where n is the bit width of the result.

Because LLVM integers use a two’s complement representation, and the result is the same width as the operands, this instruction returns the correct result for both signed and unsigned integers. If a full product (e.g. \`i32\` * \`i32\` -> \`i64\`) is needed, the operands should be sign-extended or zero-extended as appropriate to the width of the full product.

\`nuw\` and \`nsw\` stand for “No Unsigned Wrap” and “No Signed Wrap”, respectively. If the \`nuw\` and/or \`nsw\` keywords are present, the result value of the \`mul\` is a [poison value](#poisonvalues) if unsigned and/or signed overflow, respectively, occurs.

### Example:
\`\`\`
<result> = mul i32 4, %var          ; yields i32:result = 4 * %var
\`\`\`
## \`fmul\` Instruction

### Syntax:
\`\`\`
<result> = fmul [fast-math flags]* <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`fmul\`’ instruction returns the product of its two operands.

### Arguments:

The two arguments to the ‘\`fmul\`’ instruction must be [floating-point](#t-floating) or [vector](#t-vector) of floating-point values. Both arguments must have identical types.

### Semantics:

The value produced is the floating-point product of the two operands. This instruction is assumed to execute in the default [floating-point environment](#floatenv). This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = fmul float 4.0, %var          ; yields float:result = 4.0 * %var
\`\`\`
## \`udiv\` Instruction

### Syntax:
\`\`\`
<result> = udiv <ty> <op1>, <op2>         ; yields ty:result
<result> = udiv exact <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`udiv\`’ instruction returns the quotient of its two operands.

### Arguments:

The two arguments to the ‘\`udiv\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The value produced is the unsigned integer quotient of the two operands.

Note that unsigned integer division and signed integer division are distinct operations; for signed integer division, use ‘\`sdiv\`’.

Division by zero is undefined behavior. For vectors, if any element of the divisor is zero, the operation has undefined behavior.

If the \`exact\` keyword is present, the result value of the \`udiv\` is a [poison value](#poisonvalues) if %op1 is not a multiple of %op2 (as such, “((a udiv exact b) mul b) == a”).

### Example:
\`\`\`
<result> = udiv i32 4, %var          ; yields i32:result = 4 / %var
\`\`\`
## \`sdiv\` Instruction

### Syntax:
\`\`\`
<result> = sdiv <ty> <op1>, <op2>         ; yields ty:result
<result> = sdiv exact <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`sdiv\`’ instruction returns the quotient of its two operands.

### Arguments:

The two arguments to the ‘\`sdiv\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The value produced is the signed integer quotient of the two operands rounded towards zero.

Note that signed integer division and unsigned integer division are distinct operations; for unsigned integer division, use ‘\`udiv\`’.

Division by zero is undefined behavior. For vectors, if any element of the divisor is zero, the operation has undefined behavior. Overflow also leads to undefined behavior; this is a rare case, but can occur, for example, by doing a 32-bit division of -2147483648 by -1.

If the \`exact\` keyword is present, the result value of the \`sdiv\` is a [poison value](#poisonvalues) if the result would be rounded.

### Example:
\`\`\`
<result> = sdiv i32 4, %var          ; yields i32:result = 4 / %var
\`\`\`
## \`fdiv\` Instruction

### Syntax:
\`\`\`
<result> = fdiv [fast-math flags]* <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`fdiv\`’ instruction returns the quotient of its two operands.

### Arguments:

The two arguments to the ‘\`fdiv\`’ instruction must be [floating-point](#t-floating) or [vector](#t-vector) of floating-point values. Both arguments must have identical types.

### Semantics:

The value produced is the floating-point quotient of the two operands. This instruction is assumed to execute in the default [floating-point environment](#floatenv). This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = fdiv float 4.0, %var          ; yields float:result = 4.0 / %var
\`\`\`
## \`urem\` Instruction

### Syntax:
\`\`\`
<result> = urem <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`urem\`’ instruction returns the remainder from the unsigned division of its two arguments.

### Arguments:

The two arguments to the ‘\`urem\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

This instruction returns the unsigned integer *remainder* of a division. This instruction always performs an unsigned division to get the remainder.

Note that unsigned integer remainder and signed integer remainder are distinct operations; for signed integer remainder, use ‘\`srem\`’.

Taking the remainder of a division by zero is undefined behavior. For vectors, if any element of the divisor is zero, the operation has undefined behavior.

### Example:
\`\`\`
<result> = urem i32 4, %var          ; yields i32:result = 4 % %var
\`\`\`
## \`srem\` Instruction

### Syntax:
\`\`\`
<result> = srem <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`srem\`’ instruction returns the remainder from the signed division of its two operands. This instruction can also take [vector](#t-vector) versions of the values in which case the elements must be integers.

### Arguments:

The two arguments to the ‘\`srem\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

This instruction returns the *remainder* of a division (where the result is either zero or has the same sign as the dividend, \`op1\`), not the *modulo* operator (where the result is either zero or has the same sign as the divisor, \`op2\`) of a value. For more information about the difference, see [The Math Forum](http://mathforum.org/dr.math/problems/anne.4.28.99.html). For a table of how this is implemented in various languages, please see [Wikipedia: modulo operation](http://en.wikipedia.org/wiki/Modulo_operation).

Note that signed integer remainder and unsigned integer remainder are distinct operations; for unsigned integer remainder, use ‘\`urem\`’.

Taking the remainder of a division by zero is undefined behavior. For vectors, if any element of the divisor is zero, the operation has undefined behavior. Overflow also leads to undefined behavior; this is a rare case, but can occur, for example, by taking the remainder of a 32-bit division of -2147483648 by -1. (The remainder doesn’t actually overflow, but this rule lets srem be implemented using instructions that return both the result of the division and the remainder.)

### Example:
\`\`\`
<result> = srem i32 4, %var          ; yields i32:result = 4 % %var
\`\`\`
## \`frem\` Instruction

### Syntax:
\`\`\`
<result> = frem [fast-math flags]* <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`frem\`’ instruction returns the remainder from the division of its two operands.

### Arguments:

The two arguments to the ‘\`frem\`’ instruction must be [floating-point](#t-floating) or [vector](#t-vector) of floating-point values. Both arguments must have identical types.

### Semantics:

The value produced is the floating-point remainder of the two operands. This is the same output as a libm ‘\`fmod\`’ function, but without any possibility of setting \`errno\`. The remainder has the same sign as the dividend. This instruction is assumed to execute in the default [floating-point environment](#floatenv). This instruction can also take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations:

### Example:
\`\`\`
<result> = frem float 4.0, %var          ; yields float:result = 4.0 % %var
\`\`\`

## \`shl\` Instruction

### Syntax:
\`\`\`
<result> = shl <ty> <op1>, <op2>           ; yields ty:result
<result> = shl nuw <ty> <op1>, <op2>       ; yields ty:result
<result> = shl nsw <ty> <op1>, <op2>       ; yields ty:result
<result> = shl nuw nsw <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`shl\`’ instruction returns the first operand shifted to the left a specified number of bits.

### Arguments:

Both arguments to the ‘\`shl\`’ instruction must be the same [integer](#t-integer) or [vector](#t-vector) of integer type. ‘\`op2\`’ is treated as an unsigned value.

### Semantics:

The value produced is \`op1\` * 2op2 mod 2n, where \`n\` is the width of the result. If \`op2\` is (statically or dynamically) equal to or larger than the number of bits in \`op1\`, this instruction returns a [poison value](#poisonvalues). If the arguments are vectors, each vector element of \`op1\` is shifted by the corresponding shift amount in \`op2\`.

If the \`nuw\` keyword is present, then the shift produces a poison value if it shifts out any non-zero bits. If the \`nsw\` keyword is present, then the shift produces a poison value if it shifts out any bits that disagree with the resultant sign bit.

### Example:
\`\`\`
<result> = shl i32 4, %var   ; yields i32: 4 << %var
<result> = shl i32 4, 2      ; yields i32: 16
<result> = shl i32 1, 10     ; yields i32: 1024
<result> = shl i32 1, 32     ; undefined
<result> = shl <2 x i32> < i32 1, i32 1>, < i32 1, i32 2>   ; yields: result=<2 x i32> < i32 2, i32 4>
\`\`\`
## \`lshr\` Instruction

### Syntax:
\`\`\`
<result> = lshr <ty> <op1>, <op2>         ; yields ty:result
<result> = lshr exact <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`lshr\`’ instruction (logical shift right) returns the first operand shifted to the right a specified number of bits with zero fill.

### Arguments:

Both arguments to the ‘\`lshr\`’ instruction must be the same [integer](#t-integer) or [vector](#t-vector) of integer type. ‘\`op2\`’ is treated as an unsigned value.

### Semantics:

This instruction always performs a logical shift right operation. The most significant bits of the result will be filled with zero bits after the shift. If \`op2\` is (statically or dynamically) equal to or larger than the number of bits in \`op1\`, this instruction returns a [poison value](#poisonvalues). If the arguments are vectors, each vector element of \`op1\` is shifted by the corresponding shift amount in \`op2\`.

If the \`exact\` keyword is present, the result value of the \`lshr\` is a poison value if any of the bits shifted out are non-zero.

### Example:
\`\`\`
<result> = lshr i32 4, 1   ; yields i32:result = 2
<result> = lshr i32 4, 2   ; yields i32:result = 1
<result> = lshr i8  4, 3   ; yields i8:result = 0
<result> = lshr i8 -2, 1   ; yields i8:result = 0x7F
<result> = lshr i32 1, 32  ; undefined
<result> = lshr <2 x i32> < i32 -2, i32 4>, < i32 1, i32 2>   ; yields: result=<2 x i32> < i32 0x7FFFFFFF, i32 1>
\`\`\`
## \`ashr\` Instruction

### Syntax:
\`\`\`
<result> = ashr <ty> <op1>, <op2>         ; yields ty:result
<result> = ashr exact <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`ashr\`’ instruction (arithmetic shift right) returns the first operand shifted to the right a specified number of bits with sign extension.

### Arguments:

Both arguments to the ‘\`ashr\`’ instruction must be the same [integer](#t-integer) or [vector](#t-vector) of integer type. ‘\`op2\`’ is treated as an unsigned value.

### Semantics:

This instruction always performs an arithmetic shift right operation, The most significant bits of the result will be filled with the sign bit of \`op1\`. If \`op2\` is (statically or dynamically) equal to or larger than the number of bits in \`op1\`, this instruction returns a [poison value](#poisonvalues). If the arguments are vectors, each vector element of \`op1\` is shifted by the corresponding shift amount in \`op2\`.

If the \`exact\` keyword is present, the result value of the \`ashr\` is a poison value if any of the bits shifted out are non-zero.

### Example:
\`\`\`
<result> = ashr i32 4, 1   ; yields i32:result = 2
<result> = ashr i32 4, 2   ; yields i32:result = 1
<result> = ashr i8  4, 3   ; yields i8:result = 0
<result> = ashr i8 -2, 1   ; yields i8:result = -1
<result> = ashr i32 1, 32  ; undefined
<result> = ashr <2 x i32> < i32 -2, i32 4>, < i32 1, i32 3>   ; yields: result=<2 x i32> < i32 -1, i32 0>
\`\`\`
## \`and\` Instruction

### Syntax:
\`\`\`
<result> = and <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`and\`’ instruction returns the bitwise logical and of its two operands.

### Arguments:

The two arguments to the ‘\`and\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The truth table used for the ‘\`and\`’ instruction is:

<table border="1" class="docutils"><colgroup><col width="33%"> <col width="33%"> <col width="33%"></colgroup><tbody valign="top"><tr class="row-odd"><td>In0</td><td>In1</td><td>Out</td></tr><tr class="row-even"><td>0</td><td>0</td><td>0</td></tr><tr class="row-odd"><td>0</td><td>1</td><td>0</td></tr><tr class="row-even"><td>1</td><td>0</td><td>0</td></tr><tr class="row-odd"><td>1</td><td>1</td><td>1</td></tr></tbody></table>

### Example:
\`\`\`
<result> = and i32 4, %var         ; yields i32:result = 4 & %var
<result> = and i32 15, 40          ; yields i32:result = 8
<result> = and i32 4, 8            ; yields i32:result = 0
\`\`\`
## \`or\` Instruction

### Syntax:
\`\`\`
<result> = or <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`or\`’ instruction returns the bitwise logical inclusive or of its two operands.

### Arguments:

The two arguments to the ‘\`or\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The truth table used for the ‘\`or\`’ instruction is:

<table border="1" class="docutils"><colgroup><col width="33%"> <col width="33%"> <col width="33%"></colgroup><tbody valign="top"><tr class="row-odd"><td>In0</td><td>In1</td><td>Out</td></tr><tr class="row-even"><td>0</td><td>0</td><td>0</td></tr><tr class="row-odd"><td>0</td><td>1</td><td>1</td></tr><tr class="row-even"><td>1</td><td>0</td><td>1</td></tr><tr class="row-odd"><td>1</td><td>1</td><td>1</td></tr></tbody></table>

### Example:
\`\`\`
<result> = or i32 4, %var         ; yields i32:result = 4 | %var
<result> = or i32 15, 40          ; yields i32:result = 47
<result> = or i32 4, 8            ; yields i32:result = 12
\`\`\`
## \`xor\` Instruction

### Syntax:
\`\`\`
<result> = xor <ty> <op1>, <op2>   ; yields ty:result
\`\`\`
### Overview:

The ‘\`xor\`’ instruction returns the bitwise logical exclusive or of its two operands. The \`xor\` is used to implement the “one’s complement” operation, which is the “~” operator in C.

### Arguments:

The two arguments to the ‘\`xor\`’ instruction must be [integer](#t-integer) or [vector](#t-vector) of integer values. Both arguments must have identical types.

### Semantics:

The truth table used for the ‘\`xor\`’ instruction is:

<table border="1" class="docutils"><colgroup><col width="33%"> <col width="33%"> <col width="33%"></colgroup><tbody valign="top"><tr class="row-odd"><td>In0</td><td>In1</td><td>Out</td></tr><tr class="row-even"><td>0</td><td>0</td><td>0</td></tr><tr class="row-odd"><td>0</td><td>1</td><td>1</td></tr><tr class="row-even"><td>1</td><td>0</td><td>1</td></tr><tr class="row-odd"><td>1</td><td>1</td><td>0</td></tr></tbody></table>

### Example:
\`\`\`
<result> = xor i32 4, %var         ; yields i32:result = 4 ^ %var
<result> = xor i32 15, 40          ; yields i32:result = 39
<result> = xor i32 4, 8            ; yields i32:result = 12
<result> = xor i32 %V, -1          ; yields i32:result = ~%V
\`\`\`

## \`extractelement\` Instruction

### Syntax:
\`\`\`
<result> = extractelement <n x <ty>> <val>, <ty2> <idx>  ; yields <ty>
<result> = extractelement <vscale x n x <ty>> <val>, <ty2> <idx> ; yields <ty>
\`\`\`
### Overview:

The ‘\`extractelement\`’ instruction extracts a single scalar element from a vector at a specified index.

### Arguments:

The first operand of an ‘\`extractelement\`’ instruction is a value of [vector](#t-vector) type. The second operand is an index indicating the position from which to extract the element. The index may be a variable of any integer type, and will be treated as an unsigned integer.

### Semantics:

The result is a scalar of the same type as the element type of \`val\`. Its value is the value at position \`idx\` of \`val\`. If \`idx\` exceeds the length of \`val\` for a fixed-length vector, the result is a [poison value](#poisonvalues). For a scalable vector, if the value of \`idx\` exceeds the runtime length of the vector, the result is a [poison value](#poisonvalues).

### Example:
\`\`\`
<result> = extractelement <4 x i32> %vec, i32 0    ; yields i32
\`\`\`
## \`insertelement\` Instruction

### Syntax:
\`\`\`
<result> = insertelement <n x <ty>> <val>, <ty> <elt>, <ty2> <idx>    ; yields <n x <ty>>
<result> = insertelement <vscale x n x <ty>> <val>, <ty> <elt>, <ty2> <idx> ; yields <vscale x n x <ty>>
\`\`\`
### Overview:

The ‘\`insertelement\`’ instruction inserts a scalar element into a vector at a specified index.

### Arguments:

The first operand of an ‘\`insertelement\`’ instruction is a value of [vector](#t-vector) type. The second operand is a scalar value whose type must equal the element type of the first operand. The third operand is an index indicating the position at which to insert the value. The index may be a variable of any integer type, and will be treated as an unsigned integer.

### Semantics:

The result is a vector of the same type as \`val\`. Its element values are those of \`val\` except at position \`idx\`, where it gets the value \`elt\`. If \`idx\` exceeds the length of \`val\` for a fixed-length vector, the result is a [poison value](#poisonvalues). For a scalable vector, if the value of \`idx\` exceeds the runtime length of the vector, the result is a [poison value](#poisonvalues).

### Example:
\`\`\`
<result> = insertelement <4 x i32> %vec, i32 1, i32 0    ; yields <4 x i32>
\`\`\`
## \`shufflevector\` Instruction

### Syntax:
\`\`\`
<result> = shufflevector <n x <ty>> <v1>, <n x <ty>> <v2>, <m x i32> <mask>    ; yields <m x <ty>>
<result> = shufflevector <vscale x n x <ty>> <v1>, <vscale x n x <ty>> v2, <vscale x m x i32> <mask>  ; yields <vscale x m x <ty>>
\`\`\`
### Overview:

The ‘\`shufflevector\`’ instruction constructs a permutation of elements from two input vectors, returning a vector with the same element type as the input and length that is the same as the shuffle mask.

### Arguments:

The first two operands of a ‘\`shufflevector\`’ instruction are vectors with the same type. The third argument is a shuffle mask vector constant whose element type is \`i32\`. The mask vector elements must be constant integers or \`undef\` values. The result of the instruction is a vector whose length is the same as the shuffle mask and whose element type is the same as the element type of the first two operands.

### Semantics:

The elements of the two input vectors are numbered from left to right across both of the vectors. For each element of the result vector, the shuffle mask selects an element from one of the input vectors to copy to the result. Non-negative elements in the mask represent an index into the concatenated pair of input vectors.

If the shuffle mask is undefined, the result vector is undefined. If the shuffle mask selects an undefined element from one of the input vectors, the resulting element is undefined. An undefined element in the mask vector specifies that the resulting element is undefined. An undefined element in the mask vector prevents a poisoned vector element from propagating.

For scalable vectors, the only valid mask values at present are \`zeroinitializer\` and \`undef\`, since we cannot write all indices as literals for a vector with a length unknown at compile time.

### Example:
\`\`\`
<result> = shufflevector <4 x i32> %v1, <4 x i32> %v2,
                        <4 x i32> <i32 0, i32 4, i32 1, i32 5>  ; yields <4 x i32>
<result> = shufflevector <4 x i32> %v1, <4 x i32> undef,
                        <4 x i32> <i32 0, i32 1, i32 2, i32 3>  ; yields <4 x i32> - Identity shuffle.
<result> = shufflevector <8 x i32> %v1, <8 x i32> undef,
                        <4 x i32> <i32 0, i32 1, i32 2, i32 3>  ; yields <4 x i32>
<result> = shufflevector <4 x i32> %v1, <4 x i32> %v2,
                        <8 x i32> <i32 0, i32 1, i32 2, i32 3, i32 4, i32 5, i32 6, i32 7 >  ; yields <8 x i32>
\`\`\`
## \`extractvalue\` Instruction

### Syntax:
\`\`\`
<result> = extractvalue <aggregate type> <val>, <idx>{, <idx>}*
\`\`\`
### Overview:

The ‘\`extractvalue\`’ instruction extracts the value of a member field from an [aggregate](#t-aggregate) value.

### Arguments:

The first operand of an ‘\`extractvalue\`’ instruction is a value of [struct](#t-struct) or [array](#t-array) type. The other operands are constant indices to specify which value to extract in a similar manner as indices in a ‘\`getelementptr\`’ instruction.

The major differences to \`getelementptr\` indexing are:

+   Since the value being indexed is not a pointer, the first index is omitted and assumed to be zero.
+   At least one index must be specified.
+   Not only struct indices but also array indices must be in bounds.

### Semantics:

The result is the value at the position in the aggregate specified by the index operands.

### Example:
\`\`\`
<result> = extractvalue {i32, float} %agg, 0    ; yields i32
\`\`\`
## \`insertvalue\` Instruction

### Syntax:
\`\`\`
<result> = insertvalue <aggregate type> <val>, <ty> <elt>, <idx>{, <idx>}*    ; yields <aggregate type>
\`\`\`
### Overview:

The ‘\`insertvalue\`’ instruction inserts a value into a member field in an [aggregate](#t-aggregate) value.

### Arguments:

The first operand of an ‘\`insertvalue\`’ instruction is a value of [struct](#t-struct) or [array](#t-array) type. The second operand is a first-class value to insert. The following operands are constant indices indicating the position at which to insert the value in a similar manner as indices in a ‘\`extractvalue\`’ instruction. The value to insert must have the same type as the value identified by the indices.

### Semantics:

The result is an aggregate of the same type as \`val\`. Its value is that of \`val\` except that the value at the position specified by the indices is that of \`elt\`.

### Example:
\`\`\`
%agg1 = insertvalue {i32, float} undef, i32 1, 0              ; yields {i32 1, float undef}
%agg2 = insertvalue {i32, float} %agg1, float %val, 1         ; yields {i32 1, float %val}
%agg3 = insertvalue {i32, {float}} undef, float %val, 1, 0    ; yields {i32 undef, {float %val}}
\`\`\`
## \`alloca\` Instruction

### Syntax:
\`\`\`
<result> = alloca [inalloca] <type> [, <ty> <NumElements>] [, align <alignment>] [, addrspace(<num>)]     ; yields type addrspace(num)*:result
\`\`\`
### Overview:

The ‘\`alloca\`’ instruction allocates memory on the stack frame of the currently executing function, to be automatically released when this function returns to its caller. If the address space is not explicitly specified, the object is allocated in the alloca address space from the [datalayout string](#langref-datalayout).

### Arguments:

The ‘\`alloca\`’ instruction allocates \`sizeof(<type>)*NumElements\` bytes of memory on the runtime stack, returning a pointer of the appropriate type to the program. If “NumElements” is specified, it is the number of elements allocated, otherwise “NumElements” is defaulted to be one.

If a constant alignment is specified, the value result of the allocation is guaranteed to be aligned to at least that boundary. The alignment may not be greater than \`1 << 32\`.

The alignment is only optional when parsing textual IR; for in-memory IR, it is always present. If not specified, the target can choose to align the allocation on any convenient boundary compatible with the type.

‘\`type\`’ may be any sized type.

### Semantics:

Memory is allocated; a pointer is returned. The allocated memory is uninitialized, and loading from uninitialized memory produces an undefined value. The operation itself is undefined if there is insufficient stack space for the allocation.’\`alloca\`’d memory is automatically released when the function returns. The ‘\`alloca\`’ instruction is commonly used to represent automatic variables that must have an address available. When the function returns (either with the \`ret\` or \`resume\` instructions), the memory is reclaimed. Allocating zero bytes is legal, but the returned pointer may not be unique. The order in which memory is allocated (ie., which way the stack grows) is not specified.

Note that ‘\`alloca\`’ outside of the alloca address space from the [datalayout string](#langref-datalayout) is meaningful only if the target has assigned it a semantics.

If the returned pointer is used by [llvm.lifetime.start](#int-lifestart), the returned object is initially dead. See [llvm.lifetime.start](#int-lifestart) and [llvm.lifetime.end](#int-lifeend) for the precise semantics of lifetime-manipulating intrinsics.

### Example:
\`\`\`
%ptr = alloca i32                             ; yields ptr
%ptr = alloca i32, i32 4                      ; yields ptr
%ptr = alloca i32, i32 4, align 1024          ; yields ptr
%ptr = alloca i32, align 1024                 ; yields ptr
\`\`\`
## \`load\` Instruction

### Syntax:
\`\`\`
<result> = load [volatile] <ty>, ptr <pointer>[, align <alignment>][, !nontemporal !<nontemp_node>][, !invariant.load !<empty_node>][, !invariant.group !<empty_node>][, !nonnull !<empty_node>][, !dereferenceable !<deref_bytes_node>][, !dereferenceable_or_null !<deref_bytes_node>][, !align !<align_node>][, !noundef !<empty_node>]
<result> = load atomic [volatile] <ty>, ptr <pointer> [syncscope("<target-scope>")] <ordering>, align <alignment> [, !invariant.group !<empty_node>]
!<nontemp_node> = !{ i32 1 }
!<empty_node> = !{}
!<deref_bytes_node> = !{ i64 <dereferenceable_bytes> }
!<align_node> = !{ i64 <value_alignment> }
\`\`\`
### Overview:

The ‘\`load\`’ instruction is used to read from memory.

### Arguments:

The argument to the \`load\` instruction specifies the memory address from which to load. The type specified must be a [first class](#t-firstclass) type of known size (i.e. not containing an [opaque structural type](#t-opaque)). If the \`load\` is marked as \`volatile\`, then the optimizer is not allowed to modify the number or order of execution of this \`load\` with other [volatile operations](#volatile).

If the \`load\` is marked as \`atomic\`, it takes an extra [ordering](#ordering) and optional \`syncscope("<target-scope>")\` argument. The \`release\` and \`acq_rel\` orderings are not valid on \`load\` instructions. Atomic loads produce [defined](#memmodel) results when they may see multiple atomic stores. The type of the pointee must be an integer, pointer, or floating-point type whose bit width is a power of two greater than or equal to eight and less than or equal to a target-specific size limit. \`align\` must be explicitly specified on atomic loads, and the load has undefined behavior if the alignment is not set to a value which is at least the size in bytes of the pointee. \`!nontemporal\` does not have any defined semantics for atomic loads.

The optional constant \`align\` argument specifies the alignment of the operation (that is, the alignment of the memory address). It is the responsibility of the code emitter to ensure that the alignment information is correct. Overestimating the alignment results in undefined behavior. Underestimating the alignment may produce less efficient code. An alignment of 1 is always safe. The maximum possible alignment is \`1 << 32\`. An alignment value higher than the size of the loaded type implies memory up to the alignment value bytes can be safely loaded without trapping in the default address space. Access of the high bytes can interfere with debugging tools, so should not be accessed if the function has the \`sanitize_thread\` or \`sanitize_address\` attributes.

The alignment is only optional when parsing textual IR; for in-memory IR, it is always present. An omitted \`align\` argument means that the operation has the ABI alignment for the target.

The optional \`!nontemporal\` metadata must reference a single metadata name \`<nontemp_node>\` corresponding to a metadata node with one \`i32\` entry of value 1. The existence of the \`!nontemporal\` metadata on the instruction tells the optimizer and code generator that this load is not expected to be reused in the cache. The code generator may select special instructions to save cache bandwidth, such as the \`MOVNT\` instruction on x86.

The optional \`!invariant.load\` metadata must reference a single metadata name \`<empty_node>\` corresponding to a metadata node with no entries. If a load instruction tagged with the \`!invariant.load\` metadata is executed, the memory location referenced by the load has to contain the same value at all points in the program where the memory location is dereferenceable; otherwise, the behavior is undefined.

The optional \`!invariant.group\` metadata must reference a single metadata name

\`<empty_node>\` corresponding to a metadata node with no entries. See \`invariant.group\` metadata [invariant.group](#md-invariant-group).

The optional \`!nonnull\` metadata must reference a single metadata name \`<empty_node>\` corresponding to a metadata node with no entries. The existence of the \`!nonnull\` metadata on the instruction tells the optimizer that the value loaded is known to never be null. If the value is null at runtime, a poison value is returned instead. This is analogous to the \`nonnull\` attribute on parameters and return values. This metadata can only be applied to loads of a pointer type.

The optional \`!dereferenceable\` metadata must reference a single metadata name \`<deref_bytes_node>\` corresponding to a metadata node with one \`i64\` entry. See \`dereferenceable\` metadata [dereferenceable](#md-dereferenceable).

The optional \`!dereferenceable_or_null\` metadata must reference a single metadata name \`<deref_bytes_node>\` corresponding to a metadata node with one \`i64\` entry. See \`dereferenceable_or_null\` metadata [dereferenceable_or_null](#md-dereferenceable-or-null).

The optional \`!align\` metadata must reference a single metadata name \`<align_node>\` corresponding to a metadata node with one \`i64\` entry. The existence of the \`!align\` metadata on the instruction tells the optimizer that the value loaded is known to be aligned to a boundary specified by the integer value in the metadata node. The alignment must be a power of 2. This is analogous to the ‘’align’’ attribute on parameters and return values. This metadata can only be applied to loads of a pointer type. If the returned value is not appropriately aligned at runtime, a poison value is returned instead.

The optional \`!noundef\` metadata must reference a single metadata name \`<empty_node>\` corresponding to a node with no entries. The existence of \`!noundef\` metadata on the instruction tells the optimizer that the value loaded is known to be [well defined](#welldefinedvalues). If the value isn’t well defined, the behavior is undefined. If the \`!noundef\` metadata is combined with poison-generating metadata like \`!nonnull\`, violation of that metadata constraint will also result in undefined behavior.

### Semantics:

The location of memory pointed to is loaded. If the value being loaded is of scalar type then the number of bytes read does not exceed the minimum number of bytes needed to hold all bits of the type. For example, loading an \`i24\` reads at most three bytes. When loading a value of a type like \`i20\` with a size that is not an integral number of bytes, the result is undefined if the value was not originally written using a store of the same type. If the value being loaded is of aggregate type, the bytes that correspond to padding may be accessed but are ignored, because it is impossible to observe padding from the loaded aggregate value. If \`<pointer>\` is not a well-defined value, the behavior is undefined.

### Examples:

%ptr = alloca i32                               ; yields ptr
store i32 3, ptr %ptr                           ; yields void
%val = load i32, ptr %ptr                       ; yields i32:val = i32 3

## \`store\` Instruction

### Syntax:
\`\`\`
store [volatile] <ty> <value>, ptr <pointer>[, align <alignment>][, !nontemporal !<nontemp_node>][, !invariant.group !<empty_node>]        ; yields void
store atomic [volatile] <ty> <value>, ptr <pointer> [syncscope("<target-scope>")] <ordering>, align <alignment> [, !invariant.group !<empty_node>] ; yields void
!<nontemp_node> = !{ i32 1 }
!<empty_node> = !{}
\`\`\`
### Overview:

The ‘\`store\`’ instruction is used to write to memory.

### Arguments:

There are two arguments to the \`store\` instruction: a value to store and an address at which to store it. The type of the \`<pointer>\` operand must be a pointer to the [first class](#t-firstclass) type of the \`<value>\` operand. If the \`store\` is marked as \`volatile\`, then the optimizer is not allowed to modify the number or order of execution of this \`store\` with other [volatile operations](#volatile). Only values of [first class](#t-firstclass) types of known size (i.e. not containing an [opaque structural type](#t-opaque)) can be stored.

If the \`store\` is marked as \`atomic\`, it takes an extra [ordering](#ordering) and optional \`syncscope("<target-scope>")\` argument. The \`acquire\` and \`acq_rel\` orderings aren’t valid on \`store\` instructions. Atomic loads produce [defined](#memmodel) results when they may see multiple atomic stores. The type of the pointee must be an integer, pointer, or floating-point type whose bit width is a power of two greater than or equal to eight and less than or equal to a target-specific size limit. \`align\` must be explicitly specified on atomic stores, and the store has undefined behavior if the alignment is not set to a value which is at least the size in bytes of the pointee. \`!nontemporal\` does not have any defined semantics for atomic stores.

The optional constant \`align\` argument specifies the alignment of the operation (that is, the alignment of the memory address). It is the responsibility of the code emitter to ensure that the alignment information is correct. Overestimating the alignment results in undefined behavior. Underestimating the alignment may produce less efficient code. An alignment of 1 is always safe. The maximum possible alignment is \`1 << 32\`. An alignment value higher than the size of the loaded type implies memory up to the alignment value bytes can be safely loaded without trapping in the default address space. Access of the high bytes can interfere with debugging tools, so should not be accessed if the function has the \`sanitize_thread\` or \`sanitize_address\` attributes.

The alignment is only optional when parsing textual IR; for in-memory IR, it is always present. An omitted \`align\` argument means that the operation has the ABI alignment for the target.

The optional \`!nontemporal\` metadata must reference a single metadata name \`<nontemp_node>\` corresponding to a metadata node with one \`i32\` entry of value 1. The existence of the \`!nontemporal\` metadata on the instruction tells the optimizer and code generator that this load is not expected to be reused in the cache. The code generator may select special instructions to save cache bandwidth, such as the \`MOVNT\` instruction on x86.

The optional \`!invariant.group\` metadata must reference a single metadata name \`<empty_node>\`. See \`invariant.group\` metadata.

### Semantics:

The contents of memory are updated to contain \`<value>\` at the location specified by the \`<pointer>\` operand. If \`<value>\` is of scalar type then the number of bytes written does not exceed the minimum number of bytes needed to hold all bits of the type. For example, storing an \`i24\` writes at most three bytes. When writing a value of a type like \`i20\` with a size that is not an integral number of bytes, it is unspecified what happens to the extra bits that do not belong to the type, but they will typically be overwritten. If \`<value>\` is of aggregate type, padding is filled with [undef](#undefvalues). If \`<pointer>\` is not a well-defined value, the behavior is undefined.

### Example:
\`\`\`
%ptr = alloca i32                               ; yields ptr
store i32 3, ptr %ptr                           ; yields void
%val = load i32, ptr %ptr                       ; yields i32:val = i32 3
\`\`\`
## \`fence\` Instruction

### Syntax:
\`\`\`
fence [syncscope("<target-scope>")] <ordering>  ; yields void
\`\`\`
### Overview:

The ‘\`fence\`’ instruction is used to introduce happens-before edges between operations.

### Arguments:

‘\`fence\`’ instructions take an [ordering](#ordering) argument which defines what *synchronizes-with* edges they add. They can only be given \`acquire\`, \`release\`, \`acq_rel\`, and \`seq_cst\` orderings.

### Semantics:

A fence A which has (at least) \`release\` ordering semantics *synchronizes with* a fence B with (at least) \`acquire\` ordering semantics if and only if there exist atomic operations X and Y, both operating on some atomic object M, such that A is sequenced before X, X modifies M (either directly or through some side effect of a sequence headed by X), Y is sequenced before B, and Y observes M. This provides a *happens-before* dependency between A and B. Rather than an explicit \`fence\`, one (but not both) of the atomic operations X or Y might provide a \`release\` or \`acquire\` (resp.) ordering constraint and still *synchronize-with* the explicit \`fence\` and establish the *happens-before* edge.

A \`fence\` which has \`seq_cst\` ordering, in addition to having both \`acquire\` and \`release\` semantics specified above, participates in the global program order of other \`seq_cst\` operations and/or fences.

A \`fence\` instruction can also take an optional “[syncscope](#syncscope)” argument.

### Example:
\`\`\`
fence acquire                                        ; yields void
fence syncscope("singlethread") seq_cst              ; yields void
fence syncscope("agent") seq_cst                     ; yields void
\`\`\`
## \`cmpxchg\` Instruction

### Syntax:
\`\`\`
cmpxchg [weak] [volatile] ptr <pointer>, <ty> <cmp>, <ty> <new> [syncscope("<target-scope>")] <success ordering> <failure ordering>[, align <alignment>] ; yields  { ty, i1 }
\`\`\`
### Overview:

The ‘\`cmpxchg\`’ instruction is used to atomically modify memory. It loads a value in memory and compares it to a given value. If they are equal, it tries to store a new value into the memory.

### Arguments:

There are three arguments to the ‘\`cmpxchg\`’ instruction: an address to operate on, a value to compare to the value currently be at that address, and a new value to place at that address if the compared values are equal. The type of ‘<cmp>’ must be an integer or pointer type whose bit width is a power of two greater than or equal to eight and less than or equal to a target-specific size limit. ‘<cmp>’ and ‘<new>’ must have the same type, and the type of ‘<pointer>’ must be a pointer to that type. If the \`cmpxchg\` is marked as \`volatile\`, then the optimizer is not allowed to modify the number or order of execution of this \`cmpxchg\` with other [volatile operations](#volatile).

The success and failure [ordering](#ordering) arguments specify how this \`cmpxchg\` synchronizes with other atomic operations. Both ordering parameters must be at least \`monotonic\`, the failure ordering cannot be either \`release\` or \`acq_rel\`.

A \`cmpxchg\` instruction can also take an optional “[syncscope](#syncscope)” argument.

The alignment must be a power of two greater or equal to the size of the <value> type.

The alignment is only optional when parsing textual IR; for in-memory IR, it is always present. If unspecified, the alignment is assumed to be equal to the size of the ‘<value>’ type. Note that this default alignment assumption is different from the alignment used for the load/store instructions when align isn’t specified.

The pointer passed into cmpxchg must have alignment greater than or equal to the size in memory of the operand.

### Semantics:

The contents of memory at the location specified by the ‘\`<pointer>\`’ operand is read and compared to ‘\`<cmp>\`’; if the values are equal, ‘\`<new>\`’ is written to the location. The original value at the location is returned, together with a flag indicating success (true) or failure (false).

If the cmpxchg operation is marked as \`weak\` then a spurious failure is permitted: the operation may not write \`<new>\` even if the comparison matched.

If the cmpxchg operation is strong (the default), the i1 value is 1 if and only if the value loaded equals \`cmp\`.

A successful \`cmpxchg\` is a read-modify-write instruction for the purpose of identifying release sequences. A failed \`cmpxchg\` is equivalent to an atomic load with an ordering parameter determined the second ordering parameter.

### Example:
\`\`\`
entry:
  %orig = load atomic i32, ptr %ptr unordered, align 4                      ; yields i32
  br label %loop

loop:
  %cmp = phi i32 [ %orig, %entry ], [%value_loaded, %loop]
  %squared = mul i32 %cmp, %cmp
  %val_success = cmpxchg ptr %ptr, i32 %cmp, i32 %squared acq_rel monotonic ; yields  { i32, i1 }
  %value_loaded = extractvalue { i32, i1 } %val_success, 0
  %success = extractvalue { i32, i1 } %val_success, 1
  br i1 %success, label %done, label %loop

done:
  ...
\`\`\`
## \`atomicrmw\` Instruction

### Syntax:
\`\`\`
atomicrmw [volatile] <operation> ptr <pointer>, <ty> <value> [syncscope("<target-scope>")] <ordering>[, align <alignment>]  ; yields ty
\`\`\`
### Overview:

The ‘\`atomicrmw\`’ instruction is used to atomically modify memory.

### Arguments:

There are three arguments to the ‘\`atomicrmw\`’ instruction: an operation to apply, an address whose value to modify, an argument to the operation. The operation must be one of the following keywords:

+   xchg
+   add
+   sub
+   and
+   nand
+   or
+   xor
+   max
+   min
+   umax
+   umin
+   fadd
+   fsub
+   fmax
+   fmin
+   uinc_wrap
+   udec_wrap

For most of these operations, the type of ‘<value>’ must be an integer type whose bit width is a power of two greater than or equal to eight and less than or equal to a target-specific size limit. For xchg, this may also be a floating point or a pointer type with the same size constraints as integers. For fadd/fsub/fmax/fmin, this must be a floating point type. The type of the ‘\`<pointer>\`’ operand must be a pointer to that type. If the \`atomicrmw\` is marked as \`volatile\`, then the optimizer is not allowed to modify the number or order of execution of this \`atomicrmw\` with other [volatile operations](#volatile).

The alignment must be a power of two greater or equal to the size of the <value> type.

The alignment is only optional when parsing textual IR; for in-memory IR, it is always present. If unspecified, the alignment is assumed to be equal to the size of the ‘<value>’ type. Note that this default alignment assumption is different from the alignment used for the load/store instructions when align isn’t specified.

A \`atomicrmw\` instruction can also take an optional “[syncscope](#syncscope)” argument.

### Semantics:

The contents of memory at the location specified by the ‘\`<pointer>\`’ operand are atomically read, modified, and written back. The original value at the location is returned. The modification is specified by the operation argument:

+   xchg: \`*ptr = val\`
+   add: \`*ptr = *ptr + val\`
+   sub: \`*ptr = *ptr - val\`
+   and: \`*ptr = *ptr & val\`
+   nand: \`*ptr = ~(*ptr & val)\`
+   or: \`*ptr = *ptr | val\`
+   xor: \`*ptr = *ptr ^ val\`
+   max: \`*ptr = *ptr > val ? *ptr : val\` (using a signed comparison)
+   min: \`*ptr = *ptr < val ? *ptr : val\` (using a signed comparison)
+   umax: \`*ptr = *ptr > val ? *ptr : val\` (using an unsigned comparison)
+   umin: \`*ptr = *ptr < val ? *ptr : val\` (using an unsigned comparison)
+   fadd: \`*ptr = *ptr + val\` (using floating point arithmetic)
+   fsub: \`*ptr = *ptr - val\` (using floating point arithmetic)
+   fmax: \`*ptr = maxnum(*ptr, val)\` (match the llvm.maxnum.*\` intrinsic)
+   fmin: \`*ptr = minnum(*ptr, val)\` (match the llvm.minnum.*\` intrinsic)
+   uinc_wrap: \`*ptr = (*ptr u>= val) ? 0 : (*ptr + 1)\` (increment value with wraparound to zero when incremented above input value)
+   udec_wrap: \`*ptr = ((*ptr == 0) || (*ptr u> val)) ? val : (*ptr - 1)\` (decrement with wraparound to input value when decremented below zero).

### Example:
\`\`\`
%old = atomicrmw add ptr %ptr, i32 1 acquire                        ; yields i32
\`\`\`
## \`getelementptr\` Instruction

### Syntax:
\`\`\`
<result> = getelementptr <ty>, ptr <ptrval>{, [inrange] <ty> <idx>}*
<result> = getelementptr inbounds <ty>, ptr <ptrval>{, [inrange] <ty> <idx>}*
<result> = getelementptr <ty>, <N x ptr> <ptrval>, [inrange] <vector index type> <idx>
\`\`\`
### Overview:

The ‘\`getelementptr\`’ instruction is used to get the address of a subelement of an [aggregate](#t-aggregate) data structure. It performs address calculation only and does not access memory. The instruction can also be used to calculate a vector of such addresses.

### Arguments:

The first argument is always a type used as the basis for the calculations. The second argument is always a pointer or a vector of pointers, and is the base address to start from. The remaining arguments are indices that indicate which of the elements of the aggregate object are indexed. The interpretation of each index is dependent on the type being indexed into. The first index always indexes the pointer value given as the second argument, the second index indexes a value of the type pointed to (not necessarily the value directly pointed to, since the first index can be non-zero), etc. The first type indexed into must be a pointer value, subsequent types can be arrays, vectors, and structs. Note that subsequent types being indexed into can never be pointers, since that would require loading the pointer before continuing calculation.

The type of each index argument depends on the type it is indexing into. When indexing into a (optionally packed) structure, only \`i32\` integer **constants** are allowed (when using a vector of indices they must all be the **same** \`i32\` integer constant). When indexing into an array, pointer or vector, integers of any width are allowed, and they are not required to be constant. These integers are treated as signed values where relevant.

For example, let’s consider a C code fragment and how it gets compiled to LLVM:

struct RT {
  char A;
  int B[10][20];
  char C;
};
struct ST {
  int X;
  double Y;
  struct RT Z;
};

int *foo(struct ST *s) {
  return &s[1].Z.B[5][13];
}

The LLVM code generated by Clang is:

%struct.RT = type { i8, [10 x [20 x i32]], i8 }
%struct.ST = type { i32, double, %struct.RT }

define ptr @foo(ptr %s) nounwind uwtable readnone optsize ssp {
entry:
  %arrayidx = getelementptr inbounds %struct.ST, ptr %s, i64 1, i32 2, i32 1, i64 5, i64 13
  ret ptr %arrayidx
}

### Semantics:

In the example above, the first index is indexing into the ‘\`%struct.ST*\`’ type, which is a pointer, yielding a ‘\`%struct.ST\`’ = ‘\`{ i32, double, %struct.RT }\`’ type, a structure. The second index indexes into the third element of the structure, yielding a ‘\`%struct.RT\`’ = ‘\`{ i8 , [10 x [20 x i32]], i8 }\`’ type, another structure. The third index indexes into the second element of the structure, yielding a ‘\`[10 x [20 x i32]]\`’ type, an array. The two dimensions of the array are subscripted into, yielding an ‘\`i32\`’ type. The ‘\`getelementptr\`’ instruction returns a pointer to this element.

Note that it is perfectly legal to index partially through a structure, returning a pointer to an inner element. Because of this, the LLVM code for the given testcase is equivalent to:

define ptr @foo(ptr %s) {
  %t1 = getelementptr %struct.ST, ptr %s, i32 1
  %t2 = getelementptr %struct.ST, ptr %t1, i32 0, i32 2
  %t3 = getelementptr %struct.RT, ptr %t2, i32 0, i32 1
  %t4 = getelementptr [10 x [20 x i32]], ptr %t3, i32 0, i32 5
  %t5 = getelementptr [20 x i32], ptr %t4, i32 0, i32 13
  ret ptr %t5
}

If the \`inbounds\` keyword is present, the result value of the \`getelementptr\` is a [poison value](#poisonvalues) if one of the following rules is violated:

+   The base pointer has an *in bounds* address of an allocated object, which means that it points into an allocated object, or to its end. The only *in bounds* address for a null pointer in the default address-space is the null pointer itself.
+   If the type of an index is larger than the pointer index type, the truncation to the pointer index type preserves the signed value.
+   The multiplication of an index by the type size does not wrap the pointer index type in a signed sense (\`nsw\`).
+   The successive addition of offsets (without adding the base address) does not wrap the pointer index type in a signed sense (\`nsw\`).
+   The successive addition of the current address, interpreted as an unsigned number, and an offset, interpreted as a signed number, does not wrap the unsigned address space and remains *in bounds* of the allocated object. As a corollary, if the added offset is non-negative, the addition does not wrap in an unsigned sense (\`nuw\`).
+   In cases where the base is a vector of pointers, the \`inbounds\` keyword applies to each of the computations element-wise.

These rules are based on the assumption that no allocated object may cross the unsigned address space boundary, and no allocated object may be larger than half the pointer index type space.

If the \`inbounds\` keyword is not present, the offsets are added to the base address with silently-wrapping two’s complement arithmetic. If the offsets have a different width from the pointer, they are sign-extended or truncated to the width of the pointer. The result value of the \`getelementptr\` may be outside the object pointed to by the base pointer. The result value may not necessarily be used to access memory though, even if it happens to point into allocated storage. See the [Pointer Aliasing Rules](#pointeraliasing) section for more information.

If the \`inrange\` keyword is present before any index, loading from or storing to any pointer derived from the \`getelementptr\` has undefined behavior if the load or store would access memory outside of the bounds of the element selected by the index marked as \`inrange\`. The result of a pointer comparison or \`ptrtoint\` (including \`ptrtoint\`-like operations involving memory) involving a pointer derived from a \`getelementptr\` with the \`inrange\` keyword is undefined, with the exception of comparisons in the case where both operands are in the range of the element selected by the \`inrange\` keyword, inclusive of the address one past the end of that element. Note that the \`inrange\` keyword is currently only allowed in constant \`getelementptr\` expressions.

The getelementptr instruction is often confusing. For some more insight into how it works, see [the getelementptr FAQ](GetElementPtr.html).

### Example:
\`\`\`
%aptr = getelementptr {i32, [12 x i8]}, ptr %saptr, i64 0, i32 1
%vptr = getelementptr {i32, <2 x i8>}, ptr %svptr, i64 0, i32 1, i32 1
%eptr = getelementptr [12 x i8], ptr %aptr, i64 0, i32 1
%iptr = getelementptr [10 x i32], ptr @arr, i16 0, i16 0
\`\`\`
### Vector of pointers:

The \`getelementptr\` returns a vector of pointers, instead of a single address, when one or more of its arguments is a vector. In such cases, all vector arguments should have the same number of elements, and every scalar argument will be effectively broadcast into a vector during address calculation.

; All arguments are vectors:
;   A[i] = ptrs[i] + offsets[i]*sizeof(i8)
%A = getelementptr i8, <4 x i8*> %ptrs, <4 x i64> %offsets

; Add the same scalar offset to each pointer of a vector:
;   A[i] = ptrs[i] + offset*sizeof(i8)
%A = getelementptr i8, <4 x ptr> %ptrs, i64 %offset

; Add distinct offsets to the same pointer:
;   A[i] = ptr + offsets[i]*sizeof(i8)
%A = getelementptr i8, ptr %ptr, <4 x i64> %offsets

; In all cases described above the type of the result is <4 x ptr>

The two following instructions are equivalent:

getelementptr  %struct.ST, <4 x ptr> %s, <4 x i64> %ind1,
  <4 x i32> <i32 2, i32 2, i32 2, i32 2>,
  <4 x i32> <i32 1, i32 1, i32 1, i32 1>,
  <4 x i32> %ind4,
  <4 x i64> <i64 13, i64 13, i64 13, i64 13>

getelementptr  %struct.ST, <4 x ptr> %s, <4 x i64> %ind1,
  i32 2, i32 1, <4 x i32> %ind4, i64 13

Let’s look at the C code, where the vector version of \`getelementptr\` makes sense:

// Let's assume that we vectorize the following loop:
double *A, *B; int *C;
for (int i = 0; i < size; ++i) {
  A[i] = B[C[i]];
}

; get pointers for 8 elements from array B
%ptrs = getelementptr double, ptr %B, <8 x i32> %C
; load 8 elements from array B into A
%A = call <8 x double> @llvm.masked.gather.v8f64.v8p0f64(<8 x ptr> %ptrs,
     i32 8, <8 x i1> %mask, <8 x double> %passthru)

## \`trunc\` Instruction

### Syntax:
\`\`\`
<result> = trunc <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`trunc\`’ instruction truncates its operand to the type \`ty2\`.

### Arguments:

The ‘\`trunc\`’ instruction takes a value to trunc, and a type to trunc it to. Both types must be of [integer](#t-integer) types, or vectors of the same number of integers. The bit size of the \`value\` must be larger than the bit size of the destination type, \`ty2\`. Equal sized types are not allowed.

### Semantics:

The ‘\`trunc\`’ instruction truncates the high order bits in \`value\` and converts the remaining bits to \`ty2\`. Since the source size must be larger than the destination size, \`trunc\` cannot be a *no-op cast*. It will always truncate bits.

### Example:
\`\`\`
%X = trunc i32 257 to i8                        ; yields i8:1
%Y = trunc i32 123 to i1                        ; yields i1:true
%Z = trunc i32 122 to i1                        ; yields i1:false
%W = trunc <2 x i16> <i16 8, i16 7> to <2 x i8> ; yields <i8 8, i8 7>
\`\`\`
## \`zext\` Instruction

### Syntax:
\`\`\`
<result> = zext <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`zext\`’ instruction zero extends its operand to type \`ty2\`.

### Arguments:

The ‘\`zext\`’ instruction takes a value to cast, and a type to cast it to. Both types must be of [integer](#t-integer) types, or vectors of the same number of integers. The bit size of the \`value\` must be smaller than the bit size of the destination type, \`ty2\`.

### Semantics:

The \`zext\` fills the high order bits of the \`value\` with zero bits until it reaches the size of the destination type, \`ty2\`.

When zero extending from i1, the result will always be either 0 or 1.

### Example:
\`\`\`
%X = zext i32 257 to i64              ; yields i64:257
%Y = zext i1 true to i32              ; yields i32:1
%Z = zext <2 x i16> <i16 8, i16 7> to <2 x i32> ; yields <i32 8, i32 7>
\`\`\`
## \`sext\` Instruction

### Syntax:
\`\`\`
<result> = sext <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`sext\`’ sign extends \`value\` to the type \`ty2\`.

### Arguments:

The ‘\`sext\`’ instruction takes a value to cast, and a type to cast it to. Both types must be of [integer](#t-integer) types, or vectors of the same number of integers. The bit size of the \`value\` must be smaller than the bit size of the destination type, \`ty2\`.

### Semantics:

The ‘\`sext\`’ instruction performs a sign extension by copying the sign bit (highest order bit) of the \`value\` until it reaches the bit size of the type \`ty2\`.

When sign extending from i1, the extension always results in -1 or 0.

### Example:
\`\`\`
%X = sext i8  -1 to i16              ; yields i16   :65535
%Y = sext i1 true to i32             ; yields i32:-1
%Z = sext <2 x i16> <i16 8, i16 7> to <2 x i32> ; yields <i32 8, i32 7>
\`\`\`
## \`fptrunc\` Instruction

### Syntax:
\`\`\`
<result> = fptrunc <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`fptrunc\`’ instruction truncates \`value\` to type \`ty2\`.

### Arguments:

The ‘\`fptrunc\`’ instruction takes a [floating-point](#t-floating) value to cast and a [floating-point](#t-floating) type to cast it to. The size of \`value\` must be larger than the size of \`ty2\`. This implies that \`fptrunc\` cannot be used to make a *no-op cast*.

### Semantics:

The ‘\`fptrunc\`’ instruction casts a \`value\` from a larger [floating-point](#t-floating) type to a smaller [floating-point](#t-floating) type. This instruction is assumed to execute in the default [floating-point environment](#floatenv).

### Example:

%X = fptrunc double 16777217.0 to float    ; yields float:16777216.0
%Y = fptrunc double 1.0E+300 to half       ; yields half:+infinity

## \`fpext\` Instruction

### Syntax:
\`\`\`
<result> = fpext <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`fpext\`’ extends a floating-point \`value\` to a larger floating-point value.

### Arguments:

The ‘\`fpext\`’ instruction takes a [floating-point](#t-floating) \`value\` to cast, and a [floating-point](#t-floating) type to cast it to. The source type must be smaller than the destination type.

### Semantics:

The ‘\`fpext\`’ instruction extends the \`value\` from a smaller [floating-point](#t-floating) type to a larger [floating-point](#t-floating) type. The \`fpext\` cannot be used to make a *no-op cast* because it always changes bits. Use \`bitcast\` to make a *no-op cast* for a floating-point cast.

### Example:
\`\`\`
%X = fpext float 3.125 to double         ; yields double:3.125000e+00
%Y = fpext double %X to fp128            ; yields fp128:0xL00000000000000004000900000000000
\`\`\`
## \`fptoui\` Instruction

### Syntax:
\`\`\`
<result> = fptoui <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`fptoui\`’ converts a floating-point \`value\` to its unsigned integer equivalent of type \`ty2\`.

### Arguments:

The ‘\`fptoui\`’ instruction takes a value to cast, which must be a scalar or vector [floating-point](#t-floating) value, and a type to cast it to \`ty2\`, which must be an [integer](#t-integer) type. If \`ty\` is a vector floating-point type, \`ty2\` must be a vector integer type with the same number of elements as \`ty\`

### Semantics:

The ‘\`fptoui\`’ instruction converts its [floating-point](#t-floating) operand into the nearest (rounding towards zero) unsigned integer value. If the value cannot fit in \`ty2\`, the result is a [poison value](#poisonvalues).

### Example:
\`\`\`
%X = fptoui double 123.0 to i32      ; yields i32:123
%Y = fptoui float 1.0E+300 to i1     ; yields undefined:1
%Z = fptoui float 1.04E+17 to i8     ; yields undefined:1
\`\`\`
## \`fptosi\` Instruction

### Syntax:
\`\`\`
<result> = fptosi <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`fptosi\`’ instruction converts [floating-point](#t-floating) \`value\` to type \`ty2\`.

### Arguments:

The ‘\`fptosi\`’ instruction takes a value to cast, which must be a scalar or vector [floating-point](#t-floating) value, and a type to cast it to \`ty2\`, which must be an [integer](#t-integer) type. If \`ty\` is a vector floating-point type, \`ty2\` must be a vector integer type with the same number of elements as \`ty\`

### Semantics:

The ‘\`fptosi\`’ instruction converts its [floating-point](#t-floating) operand into the nearest (rounding towards zero) signed integer value. If the value cannot fit in \`ty2\`, the result is a [poison value](#poisonvalues).

### Example:
\`\`\`
%X = fptosi double -123.0 to i32      ; yields i32:-123
%Y = fptosi float 1.0E-247 to i1      ; yields undefined:1
%Z = fptosi float 1.04E+17 to i8      ; yields undefined:1
\`\`\`
## \`uitofp\` Instruction

### Syntax:
\`\`\`
<result> = uitofp <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`uitofp\`’ instruction regards \`value\` as an unsigned integer and converts that value to the \`ty2\` type.

### Arguments:

The ‘\`uitofp\`’ instruction takes a value to cast, which must be a scalar or vector [integer](#t-integer) value, and a type to cast it to \`ty2\`, which must be an [floating-point](#t-floating) type. If \`ty\` is a vector integer type, \`ty2\` must be a vector floating-point type with the same number of elements as \`ty\`

### Semantics:

The ‘\`uitofp\`’ instruction interprets its operand as an unsigned integer quantity and converts it to the corresponding floating-point value. If the value cannot be exactly represented, it is rounded using the default rounding mode.

### Example:
\`\`\`
%X = uitofp i32 257 to float         ; yields float:257.0
%Y = uitofp i8 -1 to double          ; yields double:255.0
\`\`\`
## \`sitofp\` Instruction

### Syntax:
\`\`\`
<result> = sitofp <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`sitofp\`’ instruction regards \`value\` as a signed integer and converts that value to the \`ty2\` type.

### Arguments:

The ‘\`sitofp\`’ instruction takes a value to cast, which must be a scalar or vector [integer](#t-integer) value, and a type to cast it to \`ty2\`, which must be an [floating-point](#t-floating) type. If \`ty\` is a vector integer type, \`ty2\` must be a vector floating-point type with the same number of elements as \`ty\`

### Semantics:

The ‘\`sitofp\`’ instruction interprets its operand as a signed integer quantity and converts it to the corresponding floating-point value. If the value cannot be exactly represented, it is rounded using the default rounding mode.

### Example:
\`\`\`
%X = sitofp i32 257 to float         ; yields float:257.0
%Y = sitofp i8 -1 to double          ; yields double:-1.0
\`\`\`
## \`ptrtoint\` Instruction

### Syntax:
\`\`\`
<result> = ptrtoint <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`ptrtoint\`’ instruction converts the pointer or a vector of pointers \`value\` to the integer (or vector of integers) type \`ty2\`.

### Arguments:

The ‘\`ptrtoint\`’ instruction takes a \`value\` to cast, which must be a value of type [pointer](#t-pointer) or a vector of pointers, and a type to cast it to \`ty2\`, which must be an [integer](#t-integer) or a vector of integers type.

### Semantics:

The ‘\`ptrtoint\`’ instruction converts \`value\` to integer type \`ty2\` by interpreting the pointer value as an integer and either truncating or zero extending that value to the size of the integer type. If \`value\` is smaller than \`ty2\` then a zero extension is done. If \`value\` is larger than \`ty2\` then a truncation is done. If they are the same size, then nothing is done (*no-op cast*) other than a type change.

### Example:

%X = ptrtoint ptr %P to i8                         ; yields truncation on 32-bit architecture
%Y = ptrtoint ptr %P to i64                        ; yields zero extension on 32-bit architecture
%Z = ptrtoint <4 x ptr> %P to <4 x i64>; yields vector zero extension for a vector of addresses on 32-bit architecture

## \`inttoptr\` Instruction

### Syntax:
\`\`\`
<result> = inttoptr <ty> <value> to <ty2>[, !dereferenceable !<deref_bytes_node>][, !dereferenceable_or_null !<deref_bytes_node>]             ; yields ty2
\`\`\`
### Overview:

The ‘\`inttoptr\`’ instruction converts an integer \`value\` to a pointer type, \`ty2\`.

### Arguments:

The ‘\`inttoptr\`’ instruction takes an [integer](#t-integer) value to cast, and a type to cast it to, which must be a [pointer](#t-pointer) type.

The optional \`!dereferenceable\` metadata must reference a single metadata name \`<deref_bytes_node>\` corresponding to a metadata node with one \`i64\` entry. See \`dereferenceable\` metadata.

The optional \`!dereferenceable_or_null\` metadata must reference a single metadata name \`<deref_bytes_node>\` corresponding to a metadata node with one \`i64\` entry. See \`dereferenceable_or_null\` metadata.

### Semantics:

The ‘\`inttoptr\`’ instruction converts \`value\` to type \`ty2\` by applying either a zero extension or a truncation depending on the size of the integer \`value\`. If \`value\` is larger than the size of a pointer then a truncation is done. If \`value\` is smaller than the size of a pointer then a zero extension is done. If they are the same size, nothing is done (*no-op cast*).

### Example:
\`\`\`
%X = inttoptr i32 255 to ptr           ; yields zero extension on 64-bit architecture
%Y = inttoptr i32 255 to ptr           ; yields no-op on 32-bit architecture
%Z = inttoptr i64 0 to ptr             ; yields truncation on 32-bit architecture
%Z = inttoptr <4 x i32> %G to <4 x ptr>; yields truncation of vector G to four pointers
\`\`\`
## \`bitcast\` Instruction

### Syntax:
\`\`\`
<result> = bitcast <ty> <value> to <ty2>             ; yields ty2
\`\`\`
### Overview:

The ‘\`bitcast\`’ instruction converts \`value\` to type \`ty2\` without changing any bits.

### Arguments:

The ‘\`bitcast\`’ instruction takes a value to cast, which must be a non-aggregate first class value, and a type to cast it to, which must also be a non-aggregate [first class](#t-firstclass) type. The bit sizes of \`value\` and the destination type, \`ty2\`, must be identical. If the source type is a pointer, the destination type must also be a pointer of the same size. This instruction supports bitwise conversion of vectors to integers and to vectors of other types (as long as they have the same size).

### Semantics:

The ‘\`bitcast\`’ instruction converts \`value\` to type \`ty2\`. It is always a *no-op cast* because no bits change with this conversion. The conversion is done as if the \`value\` had been stored to memory and read back as type \`ty2\`. Pointer (or vector of pointers) types may only be converted to other pointer (or vector of pointers) types with the same address space through this instruction. To convert pointers to other types, use the [inttoptr](#i-inttoptr) or [ptrtoint](#i-ptrtoint) instructions first.

There is a caveat for bitcasts involving vector types in relation to endianess. For example \`bitcast <2 x i8> <value> to i16\` puts element zero of the vector in the least significant bits of the i16 for little-endian while element zero ends up in the most significant bits for big-endian.

### Example:
\`\`\`
%X = bitcast i8 255 to i8          ; yields i8 :-1
%Y = bitcast i32* %x to i16*       ; yields i16*:%x
%Z = bitcast <2 x i32> %V to i64;  ; yields i64: %V (depends on endianess)
%Z = bitcast <2 x i32*> %V to <2 x i64*> ; yields <2 x i64*>
\`\`\`
## \`addrspacecast\` Instruction

### Syntax:
\`\`\`
<result> = addrspacecast <pty> <ptrval> to <pty2>       ; yields pty2
\`\`\`
### Overview:

The ‘\`addrspacecast\`’ instruction converts \`ptrval\` from \`pty\` in address space \`n\` to type \`pty2\` in address space \`m\`.

### Arguments:

The ‘\`addrspacecast\`’ instruction takes a pointer or vector of pointer value to cast and a pointer type to cast it to, which must have a different address space.

### Semantics:

The ‘\`addrspacecast\`’ instruction converts the pointer value \`ptrval\` to type \`pty2\`. It can be a *no-op cast* or a complex value modification, depending on the target and the address space pair. Pointer conversions within the same address space must be performed with the \`bitcast\` instruction. Note that if the address space conversion produces a dereferenceable result then both result and operand refer to the same memory location. The conversion must have no side effects, and must not capture the value of the pointer.

If the source is [poison](#poisonvalues), the result is [poison](#poisonvalues).

If the source is not [poison](#poisonvalues), and both source and destination are [integral pointers](#nointptrtype), and the result pointer is dereferenceable, the cast is assumed to be reversible (i.e. casting the result back to the original address space should yield the original bit pattern).

### Example:
\`\`\`
%X = addrspacecast ptr %x to ptr addrspace(1)
%Y = addrspacecast ptr addrspace(1) %y to ptr addrspace(2)
%Z = addrspacecast <4 x ptr> %z to <4 x ptr addrspace(3)>
\`\`\`
## \`icmp\` Instruction

### Syntax:
\`\`\`
<result> = icmp <cond> <ty> <op1>, <op2>   ; yields i1 or <N x i1>:result
\`\`\`
### Overview:

The ‘\`icmp\`’ instruction returns a boolean value or a vector of boolean values based on comparison of its two integer, integer vector, pointer, or pointer vector operands.

### Arguments:

The ‘\`icmp\`’ instruction takes three operands. The first operand is the condition code indicating the kind of comparison to perform. It is not a value, just a keyword. The possible condition codes are:

1.  \`eq\`: equal
2.  \`ne\`: not equal
3.  \`ugt\`: unsigned greater than
4.  \`uge\`: unsigned greater or equal
5.  \`ult\`: unsigned less than
6.  \`ule\`: unsigned less or equal
7.  \`sgt\`: signed greater than
8.  \`sge\`: signed greater or equal
9.  \`slt\`: signed less than
10.  \`sle\`: signed less or equal

The remaining two arguments must be [integer](#t-integer) or [pointer](#t-pointer) or integer [vector](#t-vector) typed. They must also be identical types.

### Semantics:

The ‘\`icmp\`’ compares \`op1\` and \`op2\` according to the condition code given as \`cond\`. The comparison performed always yields either an [i1](#t-integer) or vector of \`i1\` result, as follows:

1.  \`eq\`: yields \`true\` if the operands are equal, \`false\` otherwise. No sign interpretation is necessary or performed.
2.  \`ne\`: yields \`true\` if the operands are unequal, \`false\` otherwise. No sign interpretation is necessary or performed.
3.  \`ugt\`: interprets the operands as unsigned values and yields \`true\` if \`op1\` is greater than \`op2\`.
4.  \`uge\`: interprets the operands as unsigned values and yields \`true\` if \`op1\` is greater than or equal to \`op2\`.
5.  \`ult\`: interprets the operands as unsigned values and yields \`true\` if \`op1\` is less than \`op2\`.
6.  \`ule\`: interprets the operands as unsigned values and yields \`true\` if \`op1\` is less than or equal to \`op2\`.
7.  \`sgt\`: interprets the operands as signed values and yields \`true\` if \`op1\` is greater than \`op2\`.
8.  \`sge\`: interprets the operands as signed values and yields \`true\` if \`op1\` is greater than or equal to \`op2\`.
9.  \`slt\`: interprets the operands as signed values and yields \`true\` if \`op1\` is less than \`op2\`.
10.  \`sle\`: interprets the operands as signed values and yields \`true\` if \`op1\` is less than or equal to \`op2\`.

If the operands are [pointer](#t-pointer) typed, the pointer values are compared as if they were integers.

If the operands are integer vectors, then they are compared element by element. The result is an \`i1\` vector with the same number of elements as the values being compared. Otherwise, the result is an \`i1\`.

### Example:
\`\`\`
<result> = icmp eq i32 4, 5          ; yields: result=false
<result> = icmp ne ptr %X, %X        ; yields: result=false
<result> = icmp ult i16  4, 5        ; yields: result=true
<result> = icmp sgt i16  4, 5        ; yields: result=false
<result> = icmp ule i16 -4, 5        ; yields: result=false
<result> = icmp sge i16  4, 5        ; yields: result=false
\`\`\`
## \`fcmp\` Instruction

### Syntax:
\`\`\`
<result> = fcmp [fast-math flags]* <cond> <ty> <op1>, <op2>     ; yields i1 or <N x i1>:result
\`\`\`
### Overview:

The ‘\`fcmp\`’ instruction returns a boolean value or vector of boolean values based on comparison of its operands.

If the operands are floating-point scalars, then the result type is a boolean ([i1](#t-integer)).

If the operands are floating-point vectors, then the result type is a vector of boolean with the same number of elements as the operands being compared.

### Arguments:

The ‘\`fcmp\`’ instruction takes three operands. The first operand is the condition code indicating the kind of comparison to perform. It is not a value, just a keyword. The possible condition codes are:

1.  \`false\`: no comparison, always returns false
2.  \`oeq\`: ordered and equal
3.  \`ogt\`: ordered and greater than
4.  \`oge\`: ordered and greater than or equal
5.  \`olt\`: ordered and less than
6.  \`ole\`: ordered and less than or equal
7.  \`one\`: ordered and not equal
8.  \`ord\`: ordered (no nans)
9.  \`ueq\`: unordered or equal
10.  \`ugt\`: unordered or greater than
11.  \`uge\`: unordered or greater than or equal
12.  \`ult\`: unordered or less than
13.  \`ule\`: unordered or less than or equal
14.  \`une\`: unordered or not equal
15.  \`uno\`: unordered (either nans)
16.  \`true\`: no comparison, always returns true

*Ordered* means that neither operand is a QNAN while *unordered* means that either operand may be a QNAN.

Each of \`val1\` and \`val2\` arguments must be either a [floating-point](#t-floating) type or a [vector](#t-vector) of floating-point type. They must have identical types.

### Semantics:

The ‘\`fcmp\`’ instruction compares \`op1\` and \`op2\` according to the condition code given as \`cond\`. If the operands are vectors, then the vectors are compared element by element. Each comparison performed always yields an [i1](#t-integer) result, as follows:

1.  \`false\`: always yields \`false\`, regardless of operands.
2.  \`oeq\`: yields \`true\` if both operands are not a QNAN and \`op1\` is equal to \`op2\`.
3.  \`ogt\`: yields \`true\` if both operands are not a QNAN and \`op1\` is greater than \`op2\`.
4.  \`oge\`: yields \`true\` if both operands are not a QNAN and \`op1\` is greater than or equal to \`op2\`.
5.  \`olt\`: yields \`true\` if both operands are not a QNAN and \`op1\` is less than \`op2\`.
6.  \`ole\`: yields \`true\` if both operands are not a QNAN and \`op1\` is less than or equal to \`op2\`.
7.  \`one\`: yields \`true\` if both operands are not a QNAN and \`op1\` is not equal to \`op2\`.
8.  \`ord\`: yields \`true\` if both operands are not a QNAN.
9.  \`ueq\`: yields \`true\` if either operand is a QNAN or \`op1\` is equal to \`op2\`.
10.  \`ugt\`: yields \`true\` if either operand is a QNAN or \`op1\` is greater than \`op2\`.
11.  \`uge\`: yields \`true\` if either operand is a QNAN or \`op1\` is greater than or equal to \`op2\`.
12.  \`ult\`: yields \`true\` if either operand is a QNAN or \`op1\` is less than \`op2\`.
13.  \`ule\`: yields \`true\` if either operand is a QNAN or \`op1\` is less than or equal to \`op2\`.
14.  \`une\`: yields \`true\` if either operand is a QNAN or \`op1\` is not equal to \`op2\`.
15.  \`uno\`: yields \`true\` if either operand is a QNAN.
16.  \`true\`: always yields \`true\`, regardless of operands.

The \`fcmp\` instruction can also optionally take any number of [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations.

Any set of fast-math flags are legal on an \`fcmp\` instruction, but the only flags that have any effect on its semantics are those that allow assumptions to be made about the values of input arguments; namely \`nnan\`, \`ninf\`, and \`reassoc\`. See [Fast-Math Flags](#fastmath) for more information.

### Example:
\`\`\`
<result> = fcmp oeq float 4.0, 5.0    ; yields: result=false
<result> = fcmp one float 4.0, 5.0    ; yields: result=true
<result> = fcmp olt float 4.0, 5.0    ; yields: result=true
<result> = fcmp ueq double 1.0, 2.0   ; yields: result=false
\`\`\`
## \`phi\` Instruction

### Syntax:
\`\`\`
<result> = phi [fast-math-flags] <ty> [ <val0>, <label0>], ...
\`\`\`
### Overview:

The ‘\`phi\`’ instruction is used to implement the φ node in the SSA graph representing the function.

### Arguments:

The type of the incoming values is specified with the first type field. After this, the ‘\`phi\`’ instruction takes a list of pairs as arguments, with one pair for each predecessor basic block of the current block. Only values of [first class](#t-firstclass) type may be used as the value arguments to the PHI node. Only labels may be used as the label arguments.

There must be no non-phi instructions between the start of a basic block and the PHI instructions: i.e. PHI instructions must be first in a basic block.

For the purposes of the SSA form, the use of each incoming value is deemed to occur on the edge from the corresponding predecessor block to the current block (but after any definition of an ‘\`invoke\`’ instruction’s return value on the same edge).

The optional \`fast-math-flags\` marker indicates that the phi has one or more [fast-math-flags](#fastmath). These are optimization hints to enable otherwise unsafe floating-point optimizations. Fast-math-flags are only valid for phis that return a floating-point scalar or vector type, or an array (nested to any depth) of floating-point scalar or vector types.

### Semantics:

At runtime, the ‘\`phi\`’ instruction logically takes on the value specified by the pair corresponding to the predecessor basic block that executed just prior to the current block.

### Example:
\`\`\`
Loop:       ; Infinite loop that counts from 0 on up...
  %indvar = phi i32 [ 0, %LoopHeader ], [ %nextindvar, %Loop ]
  %nextindvar = add i32 %indvar, 1
  br label %Loop
\`\`\`
## \`select\` Instruction

### Syntax:
\`\`\`
<result> = select [fast-math flags] selty <cond>, <ty> <val1>, <ty> <val2>             ; yields ty
\`\`\`
selty is either i1 or {<N x i1>}

### Overview:

The ‘\`select\`’ instruction is used to choose one value based on a condition, without IR-level branching.

### Arguments:

The ‘\`select\`’ instruction requires an ‘i1’ value or a vector of ‘i1’ values indicating the condition, and two values of the same [first class](#t-firstclass) type.

1.  The optional \`fast-math flags\` marker indicates that the select has one or more [fast-math flags](#fastmath). These are optimization hints to enable otherwise unsafe floating-point optimizations. Fast-math flags are only valid for selects that return a floating-point scalar or vector type, or an array (nested to any depth) of floating-point scalar or vector types.

### Semantics:

If the condition is an i1 and it evaluates to 1, the instruction returns the first value argument; otherwise, it returns the second value argument.

If the condition is a vector of i1, then the value arguments must be vectors of the same size, and the selection is done element by element.

If the condition is an i1 and the value arguments are vectors of the same size, then an entire vector is selected.

### Example:
\`\`\`
%X = select i1 true, i8 17, i8 42          ; yields i8:17
\`\`\`
## \`freeze\` Instruction

### Syntax:
\`\`\`
<result> = freeze ty <val>    ; yields ty:result
\`\`\`
### Overview:

The ‘\`freeze\`’ instruction is used to stop propagation of [undef](#undefvalues) and [poison](#poisonvalues) values.

### Arguments:

The ‘\`freeze\`’ instruction takes a single argument.

### Semantics:

If the argument is \`undef\` or \`poison\`, ‘\`freeze\`’ returns an arbitrary, but fixed, value of type ‘\`ty\`’. Otherwise, this instruction is a no-op and returns the input argument. All uses of a value returned by the same ‘\`freeze\`’ instruction are guaranteed to always observe the same value, while different ‘\`freeze\`’ instructions may yield different values.

While \`undef\` and \`poison\` pointers can be frozen, the result is a non-dereferenceable pointer. See the [Pointer Aliasing Rules](#pointeraliasing) section for more information. If an aggregate value or vector is frozen, the operand is frozen element-wise. The padding of an aggregate isn’t considered, since it isn’t visible without storing it into memory and loading it with a different type.

### Example:
\`\`\`
%w = i32 undef
%x = freeze i32 %w
%y = add i32 %w, %w         ; undef
%z = add i32 %x, %x         ; even number because all uses of %x observe
                            ; the same value
%x2 = freeze i32 %w
%cmp = icmp eq i32 %x, %x2  ; can be true or false

; example with vectors
%v = <2 x i32> <i32 undef, i32 poison>
%a = extractelement <2 x i32> %v, i32 0    ; undef
%b = extractelement <2 x i32> %v, i32 1    ; poison
%add = add i32 %a, %a                      ; undef

%v.fr = freeze <2 x i32> %v                ; element-wise freeze
%d = extractelement <2 x i32> %v.fr, i32 0 ; not undef
%add.f = add i32 %d, %d                    ; even number

; branching on frozen value
%poison = add nsw i1 %k, undef   ; poison
%c = freeze i1 %poison
br i1 %c, label %foo, label %bar ; non-deterministic branch to %foo or %bar
\`\`\`
## \`call\` Instruction

### Syntax:
\`\`\`
<result> = [tail | musttail | notail ] call [fast-math flags] [cconv] [ret attrs] [addrspace(<num>)]
           <ty>|<fnty> <fnptrval>(<function args>) [fn attrs] [ operand bundles ]
\`\`\`
### Overview:

The ‘\`call\`’ instruction represents a simple function call.

### Arguments:

This instruction requires several arguments:

1.  The optional \`tail\` and \`musttail\` markers indicate that the optimizers should perform tail call optimization. The \`tail\` marker is a hint that [can be ignored](CodeGenerator.html#sibcallopt). The \`musttail\` marker means that the call must be tail call optimized in order for the program to be correct. This is true even in the presence of attributes like “disable-tail-calls”. The \`musttail\` marker provides these guarantees:
    
    1.  The call will not cause unbounded stack growth if it is part of a recursive cycle in the call graph.
    2.  Arguments with the [inalloca](#attr-inalloca) or [preallocated](#attr-preallocated) attribute are forwarded in place.
    3.  If the musttail call appears in a function with the \`"thunk"\` attribute and the caller and callee both have varargs, than any unprototyped arguments in register or memory are forwarded to the callee. Similarly, the return value of the callee is returned to the caller’s caller, even if a void return type is in use.
    
    Both markers imply that the callee does not access allocas from the caller. The \`tail\` marker additionally implies that the callee does not access varargs from the caller. Calls marked \`musttail\` must obey the following additional rules:
    
    +   The call must immediately precede a [ret](#i-ret) instruction, or a pointer bitcast followed by a ret instruction.
    +   The ret instruction must return the (possibly bitcasted) value produced by the call, undef, or void.
    +   The calling conventions of the caller and callee must match.
    +   The callee must be varargs iff the caller is varargs. Bitcasting a non-varargs function to the appropriate varargs type is legal so long as the non-varargs prefixes obey the other rules.
    +   The return type must not undergo automatic conversion to an sret pointer.

> In addition, if the calling convention is not swifttailcc or tailcc:
> 
> > +   All ABI-impacting function attributes, such as sret, byval, inreg, returned, and inalloca, must match.
> > +   The caller and callee prototypes must match. Pointer types of parameters or return types may differ in pointee type, but not in address space.
> 
> On the other hand, if the calling convention is swifttailcc or swiftcc:
> 
> > +   Only these ABI-impacting attributes attributes are allowed: sret, byval, swiftself, and swiftasync.
> > +   Prototypes are not required to match.
> > 
> > Tail call optimization for calls marked \`tail\` is guaranteed to occur if the following conditions are met:
> > 
> > +   Caller and callee both have the calling convention \`fastcc\` or \`tailcc\`.
> > +   The call is in tail position (ret immediately follows call and ret uses value of call or is void).
> > +   Option \`-tailcallopt\` is enabled, \`llvm::GuaranteedTailCallOpt\` is \`true\`, or the calling convention is \`tailcc\`
> > +   [Platform-specific constraints are met.](CodeGenerator.html#tailcallopt)

1.  The optional \`notail\` marker indicates that the optimizers should not add \`tail\` or \`musttail\` markers to the call. It is used to prevent tail call optimization from being performed on the call.
2.  The optional \`fast-math flags\` marker indicates that the call has one or more [fast-math flags](#fastmath), which are optimization hints to enable otherwise unsafe floating-point optimizations. Fast-math flags are only valid for calls that return a floating-point scalar or vector type, or an array (nested to any depth) of floating-point scalar or vector types.
3.  The optional “cconv” marker indicates which [calling convention](#callingconv) the call should use. If none is specified, the call defaults to using C calling conventions. The calling convention of the call must match the calling convention of the target function, or else the behavior is undefined.
4.  The optional [Parameter Attributes](#paramattrs) list for return values. Only ‘\`zeroext\`’, ‘\`signext\`’, and ‘\`inreg\`’ attributes are valid here.
5.  The optional addrspace attribute can be used to indicate the address space of the called function. If it is not specified, the program address space from the [datalayout string](#langref-datalayout) will be used.
6.  ‘\`ty\`’: the type of the call instruction itself which is also the type of the return value. Functions that return no value are marked \`void\`.
7.  ‘\`fnty\`’: shall be the signature of the function being called. The argument types must match the types implied by this signature. This type can be omitted if the function is not varargs.
8.  ‘\`fnptrval\`’: An LLVM value containing a pointer to a function to be called. In most cases, this is a direct function call, but indirect \`call\`’s are just as possible, calling an arbitrary pointer to function value.
9.  ‘\`function args\`’: argument list whose types match the function signature argument types and parameter attributes. All arguments must be of [first class](#t-firstclass) type. If the function signature indicates the function accepts a variable number of arguments, the extra arguments can be specified.
10.  The optional [function attributes](#fnattrs) list.
11.  The optional [operand bundles](#opbundles) list.

### Semantics:

The ‘\`call\`’ instruction is used to cause control flow to transfer to a specified function, with its incoming arguments bound to the specified values. Upon a ‘\`ret\`’ instruction in the called function, control flow continues with the instruction after the function call, and the return value of the function is bound to the result argument.

### Example:
\`\`\`
%retval = call i32 @test(i32 %argc)
call i32 (ptr, ...) @printf(ptr %msg, i32 12, i8 42)        ; yields i32
%X = tail call i32 @foo()                                    ; yields i32
%Y = tail call fastcc i32 @foo()  ; yields i32
call void %foo(i8 signext 97)

%struct.A = type { i32, i8 }
%r = call %struct.A @foo()                        ; yields { i32, i8 }
%gr = extractvalue %struct.A %r, 0                ; yields i32
%gr1 = extractvalue %struct.A %r, 1               ; yields i8
%Z = call void @foo() noreturn                    ; indicates that %foo never returns normally
%ZZ = call zeroext i32 @bar()                     ; Return value is %zero extended
\`\`\`
llvm treats calls to some functions with names and arguments that match the standard C99 library as being the C99 library functions, and may perform optimizations or generate code for them under that assumption. This is something we’d like to change in the future to provide better support for freestanding environments and non-C-based languages.

## \`va_arg\` Instruction

### Syntax:
\`\`\`
<resultval> = va_arg <va_list*> <arglist>, <argty>
\`\`\`
### Overview:

The ‘\`va_arg\`’ instruction is used to access arguments passed through the “variable argument” area of a function call. It is used to implement the \`va_arg\` macro in C.

### Arguments:

This instruction takes a \`va_list*\` value and the type of the argument. It returns a value of the specified argument type and increments the \`va_list\` to point to the next argument. The actual type of \`va_list\` is target specific.

### Semantics:

The ‘\`va_arg\`’ instruction loads an argument of the specified type from the specified \`va_list\` and causes the \`va_list\` to point to the next argument. For more information, see the variable argument handling [Intrinsic Functions](#int-varargs).

It is legal for this instruction to be called in a function which does not take a variable number of arguments, for example, the \`vfprintf\` function.

\`va_arg\` is an LLVM instruction instead of an [intrinsic function](#intrinsics) because it takes a type as an argument.

### Example:

See the [variable argument processing](#int-varargs) section.

Note that the code generator does not yet fully support va_arg on many targets. Also, it does not currently support va_arg with aggregate types on any target.

## \`landingpad\` Instruction

### Syntax:
\`\`\`
<resultval> = landingpad <resultty> <clause>+
<resultval> = landingpad <resultty> cleanup <clause>*

<clause> := catch <type> <value>
<clause> := filter <array constant type> <array constant>
\`\`\`
### Overview:

The ‘\`landingpad\`’ instruction is used by [LLVM’s exception handling system](ExceptionHandling.html#overview) to specify that a basic block is a landing pad — one where the exception lands, and corresponds to the code found in the \`catch\` portion of a \`try\`/\`catch\` sequence. It defines values supplied by the [personality function](#personalityfn) upon re-entry to the function. The \`resultval\` has the type \`resultty\`.

### Arguments:

The optional \`cleanup\` flag indicates that the landing pad block is a cleanup.

A \`clause\` begins with the clause type — \`catch\` or \`filter\` — and contains the global variable representing the “type” that may be caught or filtered respectively. Unlike the \`catch\` clause, the \`filter\` clause takes an array constant as its argument. Use “\`[0 x ptr] undef\`” for a filter which cannot throw. The ‘\`landingpad\`’ instruction must contain *at least* one \`clause\` or the \`cleanup\` flag.

### Semantics:

The ‘\`landingpad\`’ instruction defines the values which are set by the [personality function](#personalityfn) upon re-entry to the function, and therefore the “result type” of the \`landingpad\` instruction. As with calling conventions, how the personality function results are represented in LLVM IR is target specific.

The clauses are applied in order from top to bottom. If two \`landingpad\` instructions are merged together through inlining, the clauses from the calling function are appended to the list of clauses. When the call stack is being unwound due to an exception being thrown, the exception is compared against each \`clause\` in turn. If it doesn’t match any of the clauses, and the \`cleanup\` flag is not set, then unwinding continues further up the call stack.

The \`landingpad\` instruction has several restrictions:

+   A landing pad block is a basic block which is the unwind destination of an ‘\`invoke\`’ instruction.
+   A landing pad block must have a ‘\`landingpad\`’ instruction as its first non-PHI instruction.
+   There can be only one ‘\`landingpad\`’ instruction within the landing pad block.
+   A basic block that is not a landing pad block may not include a ‘\`landingpad\`’ instruction.

### Example:
\`\`\`
;; A landing pad which can catch an integer.
%res = landingpad { ptr, i32 }
         catch ptr @_ZTIi
;; A landing pad that is a cleanup.
%res = landingpad { ptr, i32 }
         cleanup
;; A landing pad which can catch an integer and can only throw a double.
%res = landingpad { ptr, i32 }
         catch ptr @_ZTIi
         filter [1 x ptr] [ptr @_ZTId]
\`\`\`
## \`catchpad\` Instruction

### Syntax:
\`\`\`
<resultval> = catchpad within <catchswitch> [<args>*]
\`\`\`
### Overview:

The ‘\`catchpad\`’ instruction is used by [LLVM’s exception handling system](ExceptionHandling.html#overview) to specify that a basic block begins a catch handler — one where a personality routine attempts to transfer control to catch an exception.

### Arguments:

The \`catchswitch\` operand must always be a token produced by a [catchswitch](#i-catchswitch) instruction in a predecessor block. This ensures that each \`catchpad\` has exactly one predecessor block, and it always terminates in a \`catchswitch\`.

The \`args\` correspond to whatever information the personality routine requires to know if this is an appropriate handler for the exception. Control will transfer to the \`catchpad\` if this is the first appropriate handler for the exception.

The \`resultval\` has the type [token](#t-token) and is used to match the \`catchpad\` to corresponding [catchrets](#i-catchret) and other nested EH pads.

### Semantics:

When the call stack is being unwound due to an exception being thrown, the exception is compared against the \`args\`. If it doesn’t match, control will not reach the \`catchpad\` instruction. The representation of \`args\` is entirely target and personality function-specific.

Like the [landingpad](#i-landingpad) instruction, the \`catchpad\` instruction must be the first non-phi of its parent basic block.

The meaning of the tokens produced and consumed by \`catchpad\` and other “pad” instructions is described in the [Windows exception handling documentation](ExceptionHandling.html#wineh).

When a \`catchpad\` has been “entered” but not yet “exited” (as described in the [EH documentation](ExceptionHandling.html#wineh-constraints)), it is undefined behavior to execute a [call](#i-call) or [invoke](#i-invoke) that does not carry an appropriate [“funclet” bundle](#ob-funclet).

### Example:
\`\`\`
dispatch:
  %cs = catchswitch within none [label %handler0] unwind to caller
  ;; A catch block which can catch an integer.
handler0:
  %tok = catchpad within %cs [ptr @_ZTIi]
\`\`\`
## \`cleanuppad\` Instruction

### Syntax:
\`\`\`
<resultval> = cleanuppad within <parent> [<args>*]
\`\`\`
### Overview:

The ‘\`cleanuppad\`’ instruction is used by [LLVM’s exception handling system](ExceptionHandling.html#overview) to specify that a basic block is a cleanup block — one where a personality routine attempts to transfer control to run cleanup actions. The \`args\` correspond to whatever additional information the [personality function](#personalityfn) requires to execute the cleanup. The \`resultval\` has the type [token](#t-token) and is used to match the \`cleanuppad\` to corresponding [cleanuprets](#i-cleanupret). The \`parent\` argument is the token of the funclet that contains the \`cleanuppad\` instruction. If the \`cleanuppad\` is not inside a funclet, this operand may be the token \`none\`.

### Arguments:

The instruction takes a list of arbitrary values which are interpreted by the [personality function](#personalityfn).

### Semantics:

When the call stack is being unwound due to an exception being thrown, the [personality function](#personalityfn) transfers control to the \`cleanuppad\` with the aid of the personality-specific arguments. As with calling conventions, how the personality function results are represented in LLVM IR is target specific.

The \`cleanuppad\` instruction has several restrictions:

+   A cleanup block is a basic block which is the unwind destination of an exceptional instruction.
+   A cleanup block must have a ‘\`cleanuppad\`’ instruction as its first non-PHI instruction.
+   There can be only one ‘\`cleanuppad\`’ instruction within the cleanup block.
+   A basic block that is not a cleanup block may not include a ‘\`cleanuppad\`’ instruction.

When a \`cleanuppad\` has been “entered” but not yet “exited” (as described in the [EH documentation](ExceptionHandling.html#wineh-constraints)), it is undefined behavior to execute a [call](#i-call) or [invoke](#i-invoke) that does not carry an appropriate [“funclet” bundle](#ob-funclet).

### Example:
\`\`\`
%tok = cleanuppad within %cs []
\`\`\`
`;

export const operators = raw.split('## `').map(value => {
  const text = '## `' + value;
  const re = /## `(.*?)` Instruction/;
  const match = re.exec(text);
  if (match) {
    return { name: match[1], detail: text };
  }
});


export const linkagetypes = [
  { name: 'private', detail: 'Global values with “private” linkage are only directly accessible by objects in the current module. In particular, linking code into a module with a private global value may cause the private to be renamed as necessary to avoid collisions. Because the symbol is private to the module, all references can be updated. This doesn’t show up in any symbol table in the object file.' },
  { name: 'internal', detail: 'Similar to private, but the value shows as a local symbol (STB_LOCAL in the case of ELF) in the object file. This corresponds to the notion of the ‘static’ keyword in C.' },
  { name: 'available_externally', detail: 'Globals with “available_externally” linkage are never emitted into the object file corresponding to the LLVM module. From the linker’s perspective, an available_externally global is equivalent to an external declaration. They exist to allow inlining and other optimizations to take place given knowledge of the definition of the global, which is known to be somewhere outside the module. Globals with available_externally linkage are allowed to be discarded at will, and allow inlining and other optimizations. This linkage type is only allowed on definitions, not declarations.' },
  { name: 'linkonce', detail: 'Globals with “linkonce” linkage are merged with other globals of the same name when linkage occurs. This can be used to implement some forms of inline functions, templates, or other code which must be generated in each translation unit that uses it, but where the body may be overridden with a more definitive definition later. Unreferenced linkonce globals are allowed to be discarded. Note that linkonce linkage does not actually allow the optimizer to inline the body of this function into callers because it doesn’t know if this definition of the function is the definitive definition within the program or whether it will be overridden by a stronger definition. To enable inlining and other optimizations, use “linkonce_odr” linkage.' },
  { name: 'weak', detail: '“weak” linkage has the same merging semantics as linkonce linkage, except that unreferenced globals with weak linkage may not be discarded. This is used for globals that are declared “weak” in C source code.' },
  { name: 'common', detail: '“common” linkage is most similar to “weak” linkage, but they are used for tentative definitions in C, such as “int X;” at global scope. Symbols with “common” linkage are merged in the same way as weak symbols, and they may not be deleted if unreferenced. common symbols may not have an explicit section, must have a zero initializer, and may not be marked ‘constant’. Functions and aliases may not have common linkage.' },
  { name: 'appending', detail: '“appending” linkage may only be applied to global variables of pointer to array type. When two global variables with appending linkage are linked together, the two global arrays are appended together. This is the LLVM, typesafe, equivalent of having the system linker append together “sections” with identical names when .o files are linked. Unfortunately this doesn’t correspond to any feature in .o files, so it can only be used for variables like llvm.global_ctors which llvm interprets specially.' },
  { name: 'extern_weak', detail: 'The semantics of this linkage follow the ELF object file model: the symbol is weak until linked, if not linked, the symbol becomes null instead of being an undefined reference.' },
  { name: 'linkonce_odr', detail: 'Some languages allow differing globals to be merged, such as two functions with different semantics. Other languages, such as C++, ensure that only equivalent globals are ever merged (the “one definition rule” — “ODR”). Such languages can use the linkonce_odr and weak_odr linkage types to indicate that the global will only be merged with equivalent globals. These linkage types are otherwise the same as their non-odr versions.' },
  { name: 'weak_odr', detail: 'Some languages allow differing globals to be merged, such as two functions with different semantics. Other languages, such as C++, ensure that only equivalent globals are ever merged (the “one definition rule” — “ODR”). Such languages can use the linkonce_odr and weak_odr linkage types to indicate that the global will only be merged with equivalent globals. These linkage types are otherwise the same as their non-odr versions.' },
  { name: 'external', detail: 'If none of the above identifiers are used, the global is externally visible, meaning that it participates in linkage and can be used to resolve external symbol references.' }
];

export const visibilitystyles = [
  { name: 'default', detail: 'On targets that use the ELF object file format, default visibility means that the declaration is visible to other modules and, in shared libraries, means that the declared entity may be overridden. On Darwin, default visibility means that the declaration is visible to other modules. On XCOFF, default visibility means no explicit visibility bit will be set and whether the symbol is visible (i.e “exported”) to other modules depends primarily on export lists provided to the linker. Default visibility corresponds to “external linkage” in the language.' },
  { name: 'hidden', detail: 'Two declarations of an object with hidden visibility refer to the same object if they are in the same shared object. Usually, hidden visibility indicates that the symbol will not be placed into the dynamic symbol table, so no other module (executable or shared library) can reference it directly.' },
  { name: 'protected', detail: 'On ELF, protected visibility indicates that the symbol will be placed in the dynamic symbol table, but that references within the defining module will bind to the local symbol. That is, the symbol cannot be overridden by another module.' }
];

export const dllstorageclasses: {name: string, detail: string}[] = [
  { name: 'dllimport', detail: '“dllimport” causes the compiler to reference a function or variable via a global pointer to a pointer that is set up by the DLL exporting the symbol. On Microsoft Windows targets, the pointer name is formed by combining __imp_ and the function or variable name.' },
  { name: 'dllexport', detail: 'On Microsoft Windows targets, “dllexport” causes the compiler to provide a global pointer to a pointer in a DLL, so that it can be referenced with the dllimport attribute. the pointer name is formed by combining __imp_ and the function or variable name. On XCOFF targets, dllexport indicates that the symbol will be made visible to other modules using “exported” visibility and thus placed by the linker in the loader section symbol table. Since this storage class exists for defining a dll interface, the compiler, assembler and linker know it is externally referenced and must refrain from deleting the symbol.' }
];

export const threadLocalStorageModels: { name: string, detail: string }[] = [
  { name: 'localdynamic', detail: 'For variables that are only used within the current shared library.'},
  { name: 'initialexec', detail: 'For variables in modules that will not be loaded dynamically.' },
  { name: 'localexec', detail: 'For variables defined in the executable and only used within it.' }
];

export const runtimePreemptionSpecifiers = [
  { name: 'dso_preemptable', detail: 'Indicates that the function or variable may be replaced by a symbol from outside the linkage unit at runtime.' },
  { name: 'dso_local', detail: 'The compiler may assume that a function or variable marked as dso_local will resolve to a symbol within the same linkage unit. Direct access will be generated even if the definition is not within this compilation unit.' },
];
export const callingConventions = [
  { name: 'ccc', detail: 'The C calling convention', document: 'This calling convention (the default if no other calling convention is specified) matches the target C calling conventions. This calling convention supports varargs function calls and tolerates some mismatch in the declared prototype and implemented declaration of the function (as does normal C).' },
  { name: 'fastcc', detail: 'The fast calling convention', document: 'This calling convention attempts to make calls as fast as possible (e.g. by passing things in registers). This calling convention allows the target to use whatever tricks it wants to produce fast code for the target, without having to conform to an externally specified ABI (Application Binary Interface). Tail calls can only be optimized when this, the tailcc, the GHC or the HiPE convention is used. This calling convention does not support varargs and requires the prototype of all callees to exactly match the prototype of the function definition.' },
  { name: 'coldcc', detail: 'The cold calling convention', document: 'This calling convention attempts to make code in the caller as efficient as possible under the assumption that the call is not commonly executed. As such, these calls often preserve all registers so that the call does not break any live ranges in the caller side. This calling convention does not support varargs and requires the prototype of all callees to exactly match the prototype of the function definition. Furthermore the inliner doesn’t consider such function calls for inlining.' },
  { name: 'webkit_jscc', detail: 'WebKit’s JavaScript calling convention', document: 'This calling convention has been implemented for WebKit FTL JIT. It passes arguments on the stack right to left (as cdecl does), and returns a value in the platform’s customary return register.' },
  { name: 'anyregcc', detail: 'Dynamic calling convention for code patching', document: 'This is a special convention that supports patching an arbitrary code sequence in place of a call site. This convention forces the call arguments into registers but allows them to be dynamically allocated. This can currently only be used with calls to llvm.experimental.patchpoint because only this intrinsic records the location of its arguments in a side table. See Stack maps and patch points in LLVM.' },
  { name: 'preserve_mostcc', detail: 'The `PreserveMost` calling convention', document: `
This calling convention attempts to make the code in the caller as unintrusive as possible. This convention behaves identically to the C calling convention on how arguments and return values are passed, but it uses a different set of caller/callee-saved registers. This alleviates the burden of saving and recovering a large register set before and after the call in the caller. If the arguments are passed in callee-saved registers, then they will be preserved by the callee across the call. This doesn’t apply for values returned in callee-saved registers.

  - On X86-64 the callee preserves all general purpose registers, except for R11. R11 can be used as a scratch register. Floating-point registers (XMMs/YMMs) are not preserved and need to be saved by the caller.
The idea behind this convention is to support calls to runtime functions that have a hot path and a cold path. The hot path is usually a small piece of code that doesn’t use many registers. The cold path might need to call out to another function and therefore only needs to preserve the caller-saved registers, which haven’t already been saved by the caller. The PreserveMost calling convention is very similar to the cold calling convention in terms of caller/callee-saved registers, but they are used for different types of function calls. coldcc is for function calls that are rarely executed, whereas preserve_mostcc function calls are intended to be on the hot path and definitely executed a lot. Furthermore preserve_mostcc doesn’t prevent the inliner from inlining the function call.

This calling convention will be used by a future version of the ObjectiveC runtime and should therefore still be considered experimental at this time. Although this convention was created to optimize certain runtime calls to the ObjectiveC runtime, it is not limited to this runtime and might be used by other runtimes in the future too. The current implementation only supports X86-64, but the intention is to support more architectures in the future.
` },
  { name: 'preserve_allcc', detail: 'The `PreserveAll` calling convention', document: `
This calling convention attempts to make the code in the caller even less intrusive than the PreserveMost calling convention. This calling convention also behaves identical to the C calling convention on how arguments and return values are passed, but it uses a different set of caller/callee-saved registers. This removes the burden of saving and recovering a large register set before and after the call in the caller. If the arguments are passed in callee-saved registers, then they will be preserved by the callee across the call. This doesn’t apply for values returned in callee-saved registers.

 - On X86-64 the callee preserves all general purpose registers, except for R11. R11 can be used as a scratch register. Furthermore it also preserves all floating-point registers (XMMs/YMMs).
The idea behind this convention is to support calls to runtime functions that don’t need to call out to any other functions.

This calling convention, like the PreserveMost calling convention, will be used by a future version of the ObjectiveC runtime and should be considered experimental at this time.
  ` },
  { name: 'cxx_fast_tlscc', detail: 'The `CXX_FAST_TLS` calling convention for access functions', document: `
Clang generates an access function to access C++-style TLS. The access function generally has an entry block, an exit block and an initialization block that is run at the first time. The entry and exit blocks can access a few TLS IR variables, each access will be lowered to a platform-specific sequence.

This calling convention aims to minimize overhead in the caller by preserving as many registers as possible (all the registers that are preserved on the fast path, composed of the entry and exit blocks).

This calling convention behaves identical to the C calling convention on how arguments and return values are passed, but it uses a different set of caller/callee-saved registers.

Given that each platform has its own lowering sequence, hence its own set of preserved registers, we can’t use the existing PreserveMost.

 - On X86-64 the callee preserves all general purpose registers, except for RDI and RAX.
  ` },
  { name: 'tailcc', detail: 'Tail callable calling convention', document: 'This calling convention ensures that calls in tail position will always be tail call optimized. This calling convention is equivalent to fastcc, except for an additional guarantee that tail calls will be produced whenever possible. Tail calls can only be optimized when this, the fastcc, the GHC or the HiPE convention is used. This calling convention does not support varargs and requires the prototype of all callees to exactly match the prototype of the function definition.' },
  { name: 'swiftcc', detail: 'This calling convention is used for Swift language.', document: `
 - On X86-64 RCX and R8 are available for additional integer returns, and XMM2 and XMM3 are available for additional FP/vector returns.
 - On iOS platforms, we use AAPCS-VFP calling convention.
  ` },
  { name: 'swifttailcc', detail: '', document: 'This calling convention is like swiftcc in most respects, but also the callee pops the argument area of the stack so that mandatory tail calls are possible as in tailcc.' },
  { name: 'cfguard_checkcc', detail: 'Windows Control Flow Guard (Check mechanism)', document: `
This calling convention is used for the Control Flow Guard check function, calls to which can be inserted before indirect calls to check that the call target is a valid function address. The check function has no return value, but it will trigger an OS-level error if the address is not a valid target. The set of registers preserved by the check function, and the register containing the target address are architecture-specific.

 - On X86 the target address is passed in ECX.
 - On ARM the target address is passed in R0.
 - On AArch64 the target address is passed in X15.  
` },
  { name: 'cc <n>', detail: 'Numbered convention', document: 'Any calling convention may be specified by number, allowing target-specific calling conventions to be used. Target specific calling conventions start at 64.' },
  { name: 'cc 11', detail: 'The HiPE calling convention', document: 'This calling convention has been implemented specifically for use by the High-Performance Erlang (HiPE) compiler, the native code compiler of the Ericsson’s Open Source Erlang/OTP system. It uses more registers for argument passing than the ordinary C calling convention and defines no callee-saved registers. The calling convention properly supports tail call optimization but requires that both the caller and the callee use it. It uses a register pinning mechanism, similar to GHC’s convention, for keeping frequently accessed runtime components pinned to specific hardware registers. At the moment only X86 supports this convention (both 32 and 64 bit).' },
  { name: 'cc 10', detail: 'GHC convention', document: `
This calling convention has been implemented specifically for use by the Glasgow Haskell Compiler (GHC). It passes everything in registers, going to extremes to achieve this by disabling callee save registers. This calling convention should not be used lightly but only for specific situations such as an alternative to the register pinning performance technique often used when implementing functional programming languages. At the moment only X86 supports this convention and it has the following limitations:

 - On X86-32 only supports up to 4 bit type parameters. No floating-point types are supported.
 - On X86-64 only supports up to 10 bit type parameters and 6 floating-point parameters.
This calling convention supports tail call optimization but requires both the caller and callee are using it.
  ` }
];




