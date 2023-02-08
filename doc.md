## \`add\` Instruction
### Syntax:
\`\`\`
<result> = add <ty> <op1>, <op2>          ; yields ty:result
<result> = add nuw <ty> <op1>, <op2>      ; yields ty:result
<result> = add nsw <ty> <op1>, <op2>      ; yields ty:result
<result> = add nuw nsw <ty> <op1>, <op2>  ; yields ty:result
\`\`\`
### Overview:
The \`add\` instruction returns the sum of its two operands.
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