import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Position, Range, TextEdit } from "vscode";
import { BasicBlockContext, CompilationUnitContext, FuncBodyContext, FuncHeaderContext, UseListOrderContext } from "../llvmir/LLVMIRParser";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts";
// import { Token } from "antlr4ts";


export class LLVMIRFormattingEditVisitor extends LLVMIRBaseVisitor {
  private edits: TextEdit[];
  private content: string;
  private indentSize: number;
  private indent: number;
  private allComments: Token[];
  private funcComments: Token[];

  constructor(comments: Token[]) {
    super();
    this.edits = [];
    this.content = '';
    this.indentSize = 2;
    this.indent = 0;
    this.allComments = comments;
    this.funcComments = [];
  }

  private writeNewLine() {
    this.content += '\n';
    for (let i = 0; i < this.indent; i++) this.content += ' ';
  }

  private writeLeftComments(token: Token) {
    // 输出 token 前面的 注释
    while (this.funcComments.length > 0 && this.funcComments[0].tokenIndex < token.tokenIndex) {
      const comment = this.funcComments[0];
      this.funcComments = this.funcComments.slice(1, this.funcComments.length);
      const text = comment.text?.trim() || '';
      this.content += text;
      this.writeNewLine();
    }
  }

  getResult(): TextEdit[] { return this.edits; }

  // 默认情况下，所有 terminal 后面都有一个 空格 ',' 除外
  visitTerminal(node: TerminalNode): void {
    // 输出注释
    this.writeLeftComments(node.symbol);
    
    const text = node.symbol.text?.trim();
    if (text) {
      if (text === ',' || text === '*' || text === ')' || text == ']' || text === '>') {
        // 左边不要空格
        this.content = this.content.trimEnd() + text + ' ';
      } else if (text === '[' || text === '<') {
        // 右边不要空格
        this.content += text;
      }
      else if (text === '(') {
        // 左右都不要空格
        this.content = this.content.trimEnd() + text;
      } else {
        this.content += text + ' ';
      }
    }

  }

  visitCompilationUnit(ctx: CompilationUnitContext): void {
    // 如果在同一行，那么换行
    let last_line = -1;

    for (const entity of ctx.topLevelEntity()) {
      // 首先将输出清空
      this.content = '';
      entity.accept(this);
      const st = new Position(entity.start.line - 1, entity.start.charPositionInLine);
      const ed = entity.stop ? new Position(
        entity.stop.line - 1,
        entity.stop.charPositionInLine + (entity.stop.text?.length || 0)
      ) : st;

      // entity 的 range 改写为 content
      if (last_line == st.line) {
        const edit = new TextEdit(
          new Range(st, ed),
          '\n' + this.content.trim()
        );
        this.edits.push(edit);
      }
      else {
        const st = new Position(entity.start.line - 1, 0);
        const edit = new TextEdit(
          new Range(st, ed),
          this.content.trim()
        );
        this.edits.push(edit);
      }

      last_line = ed.line;

    }
  }

  // 只保留函数体内部的注释
  visitFuncBody(ctx: FuncBodyContext): void {
    const st = ctx.start.tokenIndex;
    const ed = ctx.stop?.tokenIndex || st;
    this.funcComments = this.allComments.filter(item => item.tokenIndex >= st && item.tokenIndex <= ed);

    ctx.LBraces().accept(this);
    // 注意这里不能设置缩进
    this.writeNewLine();

    ctx.basicBlock().forEach(block => block.accept(this));

    // 现在可以设置缩进了 并换行
    this.indent += this.indentSize;
    ctx.useListOrder().forEach(order => {
      // 先换行
      this.writeNewLine();
      order.accept(this);
    });
    this.indent -= this.indentSize;

    this.writeNewLine();
    ctx.RBraces().accept(this);
  }

  visitBasicBlock(ctx: BasicBlockContext): void {
    ctx.LabelIdent()?.accept(this);
    // 缩进
    this.indent += this.indentSize;
    if (ctx.LabelIdent()) this.writeNewLine();
    else {
      for (let i = 0; i < this.indent; i++) this.content += ' ';
    }
    // 输出 inst
    ctx.instruction().forEach(inst => {
      inst.accept(this);
      this.writeNewLine();
    });
    ctx.terminator().accept(this);
    this.indent -= this.indentSize;
  }
}



