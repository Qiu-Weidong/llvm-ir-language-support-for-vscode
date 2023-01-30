import { CancellationToken, DocumentFormattingEditProvider, FormattingOptions, ProviderResult, TextDocument, TextEdit } from "vscode";
import { LLVMCache } from "../LLVMCache";




export class LLVMIRFormattingEditProvider implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }
  
}



