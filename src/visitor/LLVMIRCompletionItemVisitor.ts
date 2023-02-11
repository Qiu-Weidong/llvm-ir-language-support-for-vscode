import { ParserRuleContext } from "antlr4ts";
import { CompletionItem, CompletionItemKind, Position } from "vscode";
import { CompilationUnitContext } from "../llvmir/LLVMIRParser";
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

  visitCompilationUnit(ctx: CompilationUnitContext) {
    for(const entity of ctx.topLevelEntity()) {
      if(this.positionInContext(entity, this.position)) {
        const ret: any = entity.accept(this);
        return ret;
      }
    }
    // 提示关键字 define、declare、attribute、sourcefilename、target、module、uselistorder、uselistorderbb
    const items = ['define', 'declare', 'attributes', 'source_filename', 'target', 'module', 'uselistorder', 'uselistorder_bb'].map(kw => new CompletionItem(
      kw, CompletionItemKind.Keyword
    ));
    this.completionItems.push(...items);
  }


}