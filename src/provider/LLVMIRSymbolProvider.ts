import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, Location, Position, ProviderResult, Range, ReferenceContext, ReferenceProvider, RenameProvider, SymbolInformation, TextDocument, WorkspaceEdit } from "vscode";
import { LLVMCache } from "../LLVMCache";

export class LLVMIRSymbolProvider
  implements DocumentSymbolProvider, RenameProvider, ReferenceProvider {
  provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }
  provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }
  prepareRename?(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | { range: Range; placeholder: string; }> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }
  provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
    const documents = LLVMCache.getInstance();
    documents.updateDocument(document);
    throw new Error("Method not implemented.");
  }

}



