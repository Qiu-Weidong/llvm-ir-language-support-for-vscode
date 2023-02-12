import { ParserRuleContext } from "antlr4ts";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { CompletionItem, CompletionItemKind, Position } from "vscode";
import { ComdatDefContext, CompilationUnitContext, TargetDefContext, TypeDefContext } from "../llvmir/LLVMIRParser";
import { LLVMIRBaseVisitor } from "./LLVMIRBaseVisitor";
import { Scope } from "./LLVMIRScope";

export class LLVMIRCompletionItemVisitor extends LLVMIRBaseVisitor {
  private position: Position;
  private scope: Scope;
  private completionItems: CompletionItem[];
  constructor(position: Position, scope: Scope) {
    super();
    this.scope = scope;
    this.position = position;
    this.completionItems = [];
  }

  getCompletionItems() { return this.completionItems; }

  visitChildren(node: RuleNode) {
    for (let i = 0; i < node.childCount; i++) {
      const child = node.getChild(i);
      if (child instanceof ParserRuleContext && this.positionInContext(child, this.position)) {
        child.accept(this);
      }
      else if (child instanceof TerminalNode && this.positionInTerminal(child, this.position)) {
        child.accept(this);
      }
    }
  }

  visitCompilationUnit(ctx: CompilationUnitContext) {
    for (const entity of ctx.topLevelEntity()) {
      if (this.positionInContext(entity, this.position)) {
        const ret: any = entity.accept(this);
        return ret;
      }
    }
    // 提示关键字 define、declare、attribute、sourcefilename、target、module、uselistorder、uselistorderbb
    const items = ['define', 'declare', 'attributes', 'comdat',
      'target', 'module', 'uselistorder', 'uselistorder_bb', 'type'].map(kw => new CompletionItem(
        kw, CompletionItemKind.Keyword
      ));
    const props = ['source_filename', 'datalayout', 'triple'].map(kw => new CompletionItem(kw, CompletionItemKind.Property));
    this.completionItems.push(...items, ...props);
  }

  visitComdatDef(ctx: ComdatDefContext) {
    // 进得来
    const items = ['any', 'exactmatch', 'largest', 'nodeduplicate', 'samesize'].map(word =>
      new CompletionItem(word, CompletionItemKind.Enum)
    );
    this.completionItems.push(...items);
  }

}