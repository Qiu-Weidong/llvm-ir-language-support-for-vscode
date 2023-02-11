import { CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";
import { LLVMIRCompletionItemVisitor } from "../visitor/LLVMIRCompletionItemVisitor";


export class LLVMIRCompletionItemProvider implements CompletionItemProvider {
  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {

    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    const data = documents.getAllData(document.uri);
    if(data) {
      const { ast, scope } = data;
      const visitor = new LLVMIRCompletionItemVisitor(position, scope);
      try {
        ast.accept(visitor);
      } catch(err) { console.log(err); }
      return visitor.getCompletionItems();
    }
  }
  resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    throw new Error("Method not implemented.");
  }
  
}

