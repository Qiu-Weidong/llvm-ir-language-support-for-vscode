import { CancellationToken, Hover, HoverProvider, Position, ProviderResult, TextDocument } from "vscode";
import { LLVMCache } from "../LLVMCache";

export class LLVMIRHoverProvider implements HoverProvider{
  provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }

}


