import { CodeLens, Position, Range } from "vscode";
import { CompilationUnitContext, FuncDefContext, FuncHeaderContext, TopLevelEntityContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";


export class LLVMIRCodeLensVisitor extends LLVMIRBaseVisitor {
  private codelens: CodeLens[];

  constructor() {
    super();
    this.codelens = [];
  }
  visitCompilationUnit(ctx: CompilationUnitContext): void {
    ctx.topLevelEntity().forEach(entity => entity.accept(this));
  }
  // 不要访问其他的分支了
  visitTopLevelEntity(ctx: TopLevelEntityContext): void {
    ctx.funcDef()?.accept(this);
  }
  // 只需要重载这一个函数即可
  visitFuncDef(ctx: FuncDefContext): void {
    ctx.funcHeader().accept(this);
  }
  visitFuncHeader(ctx: FuncHeaderContext): void {
    const name = ctx.GlobalIdent().symbol;
    const line = name.line - 1;

    if (name.text === '@main') {
      // 增加一个 run | debug
      this.codelens.push(
        new CodeLens(
          new Range(
            new Position(line, 0),
            new Position(line, 4)
          ), 
          {
            title: '$(run)Run',
            command: 'llvm.run'
          }
        ),
        new CodeLens(
          new Range(
            new Position(line, 4),
            new Position(line, 9)
          ), 
          {
            title: '$(callstack-view-icon)Debug',
            command: 'llvm.debug'
          }
        )
      )
    }
  }

  getCodelens(): CodeLens[] {
    return this.codelens;
  }
}

