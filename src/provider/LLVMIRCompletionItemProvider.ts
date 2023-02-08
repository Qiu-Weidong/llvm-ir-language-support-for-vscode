import { CancellationToken, CompletionContext, CompletionItem, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";



export class LLVMIRCompletionItemProvider implements CompletionItemProvider {
  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {

    const documents = LLVMCache.getInstance();
    try {
      documents.updateDocument(document);
    }
    catch(err) {
      console.log(err)
    }
    return [];
  }
  resolveCompletionItem?(item: CompletionItem, token: CancellationToken): ProviderResult<CompletionItem> {
    throw new Error("Method not implemented.");
  }
  
}

