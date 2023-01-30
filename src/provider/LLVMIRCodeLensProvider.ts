import { CancellationToken, CodeLens, CodeLensProvider, Event, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";


export class LLVMIRCodeLensProvider implements CodeLensProvider {
  onDidChangeCodeLenses?: Event<void> | undefined;
  provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<CodeLens[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }
  resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): ProviderResult<CodeLens> {
    throw new Error("Method not implemented.");
  }
  
}




